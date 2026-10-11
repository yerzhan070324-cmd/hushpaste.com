// Run with: node --test tests/
// Checks the detection rules in app.js and the page's privacy guarantees.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('..', import.meta.url);
const app = readFileSync(new URL('app.js', root), 'utf8');
const pages = ['index.html', 'ru/index.html', 'tr/index.html'].map(p => [p, readFileSync(new URL(p, root), 'utf8')]);

// Load the detection core (rules, validators, analyze) without the page UI.
const start = app.indexOf('  var RULES_DOC');
const end = app.indexOf('\n  }\n', app.indexOf('return { html: html, plain: plain')) + 4;
assert.ok(start > 0 && end > start, 'detection core not found in app.js');
const ctx = {};
vm.runInNewContext(
  'var T = {}, document = { getElementById: function () { return {}; } };\n' +
  'var PH_RE = /\\[[A-Z_]{1,40}_\\d{1,6}\\]/g; function esc(s) { return s; }\n' +
  app.slice(start, end) + '\nthis.analyze = analyze;', ctx);
const { analyze } = ctx;

function restore(reply, tokens) {
  const lookup = Object.fromEntries(tokens.map(t => [t.ph, t.orig]));
  return reply.replace(/\[[A-Z_]{1,40}_\d{1,6}\]/g, m => (m in lookup ? lookup[m] : m));
}
const types = (text, extra) => Array.from(analyze(text, extra).tokens, t => t.type);

const MASKED = [
  ['SECRET_KEY=abc123xyz789', 'SECRET'],
  ['key sk_live_51Hx9aQ2kLmN8pQrStUv here', 'API_KEY'],
  ['AKIAIOSFODNN7EXAMPLE', 'AWS_KEY'],
  ['ghp_abcdefghijklmnopqrstuvwxyz0123456789', 'GH_TOKEN'],
  ['postgres://app:S3cr3t@10.0.4.12/prod', 'DB_URL'],
  ['Authorization: Bearer abcdefghijklmnop1234', 'BEARER_TOKEN'],
  ['password=correct-horse-battery', 'SECRET'],
  ['write to anna.keller@example.com', 'EMAIL'],
  ['call +7 701 234 56 78', 'PHONE'],
  ['call 0532 123 45 67', 'PHONE_TR'],
  ['IBAN DE89370400440532013000', 'IBAN'],
  ['счёт KZ86125KZT5004100100', 'IBAN'],
  ['card 4111 1111 1111 1111', 'CARD'],
  ['ИИН 040312500125', 'KZ_IIN'],
  ['TC 10000000146', 'TR_TCKN'],
  ['СНИЛС 112-233-445 95', 'RU_SNILS'],
  ['ИНН 7707083893', 'RU_INN'],
  ['паспорт N12345678', 'PASSPORT'],
  ['DB_HOST=10.24.3.17', 'IP_ADDRESS'],
];
for (const [text, type] of MASKED) {
  test(`masks ${type}: ${text}`, () => {
    assert.ok(types(text).includes(type), `got ${JSON.stringify(types(text))}`);
  });
}

const LEFT_ALONE = [
  ['order 123456789012 shipped', 'a 12-digit number that is not a valid IIN'],
  ['card 4111 1111 1111 1112', 'a card number that fails the Luhn check'],
  ['IBAN DE89370400440532013001', 'an IBAN that fails mod-97'],
  ['version 999.1.2.3', 'an impossible IP address'],
  ['TC 12345678901', 'a TC number with wrong check digits'],
  ['The meeting is at 10:30 in room 4', 'ordinary text'],
];
for (const [text, why] of LEFT_ALONE) {
  test(`leaves alone ${why}`, () => {
    assert.deepEqual(types(text), []);
  });
}

test('custom words are masked case-insensitively', () => {
  assert.deepEqual(types('Jane Doe from ACME BANK', 'Acme Bank, Jane Doe'), ['CUSTOM', 'CUSTOM']);
});

test('same value gets the same placeholder', () => {
  const a = analyze('a@b.co wrote to a@b.co and c@d.co');
  assert.equal(a.plain, '[EMAIL_1] wrote to [EMAIL_1] and [EMAIL_2]');
});

test('placeholders already in the text are not reused', () => {
  const a = analyze('[EMAIL_1] and x@y.co');
  assert.equal(a.plain, '[EMAIL_1] and [EMAIL_2]');
});

test('round trip: masked text restores to the original', () => {
  const text = 'DB_URL=postgres://u:p4ssw0rd@10.0.0.5/db\nCustomer x@y.kz, +7 701 234 56 78, IIN 040312500125';
  const a = analyze(text);
  assert.ok(!a.plain.includes('p4ssw0rd') && !a.plain.includes('x@y.kz') && !a.plain.includes('040312500125'));
  assert.equal(restore(a.plain, a.tokens), text);
});

test('a placeholder the AI changed is left as is, not guessed', () => {
  const a = analyze('mail x@y.co');
  assert.equal(restore('send to [EMAIL_9] and [Email_1]', a.tokens), 'send to [EMAIL_9] and [Email_1]');
});

// Privacy guarantees that can be checked from the source.
test('app.js has exactly one network call: the waitlist form', () => {
  assert.equal(app.match(/\bfetch\(/g).length, 1);
  assert.match(app, /fetch\(WAITLIST_URL/);
  for (const api of ['XMLHttpRequest', 'sendBeacon', 'WebSocket', 'EventSource', 'localStorage', 'sessionStorage', 'indexedDB', 'document.cookie', 'importScripts']) {
    assert.ok(!app.includes(api), `app.js uses ${api}`);
  }
});

for (const [name, html] of pages) {
  test(`${name}: CSP only allows connections to the waitlist form`, () => {
    const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
    assert.match(csp, /default-src 'none'/);
    assert.match(csp, /connect-src https:\/\/formspree\.io(;|$)/);
    assert.match(csp, /script-src 'self'(;|$)/);
    assert.match(csp, /form-action 'none'/);
  });
  test(`${name}: no inline or third-party scripts`, () => {
    const scripts = html.match(/<script\b[^>]*>/g) || [];
    assert.deepEqual(scripts, ['<script src="/app.js">']);
  });
}
