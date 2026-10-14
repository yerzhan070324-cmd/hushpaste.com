# Hushpaste

**Mask API keys and personal data before pasting into AI chats — then restore them in the reply.**

Live at **[gethushpaste.com](https://gethushpaste.com)**

Paste a log, a stack trace, a `.env` file or a customer email into the tool. Hushpaste finds the secrets, swaps them for readable placeholders, and gives you text that is safe to hand to ChatGPT, Claude or anything else. Paste the AI's answer back and the real values return.

Everything runs in the browser. Nothing you paste is uploaded, stored or logged.

---

## What it detects

API keys and tokens · passwords and connection strings · session cookies and JWTs · email addresses and phone numbers · payment card numbers · national ID numbers · IP addresses, hostnames and internal URLs · plus any custom words you add, such as client names or codenames.

Detection is not pattern-matching alone. Six validators cut false positives before a match is shown:

| Validator | Checks |
|---|---|
| `luhn` | payment card checksums |
| `iban_mod97` | IBAN account numbers |
| `ipv4_octets` | valid IPv4 ranges |
| `kz_iin` | Kazakh individual ID |
| `tr_tckn` | Turkish national ID |
| `ru_snils` | Russian SNILS |

Rules live in [`hushpaste-rules.json`](hushpaste-rules.json) (v1.2.0) as plain regular-expression sources, so they can be read, audited and reused independently of the UI.

## Running it locally

No build step, no dependencies, no package manager. It is static files.

```bash
git clone https://github.com/yerzhan070324-cmd/hushpaste.com
cd hushpaste.com
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` straight from the filesystem also works, but the Content-Security-Policy behaves more like production when it is served over HTTP.

## Tests

```bash
node --test tests/
```

37 tests. They load the detection core out of `app.js` in a `vm` sandbox without the page UI, check every rule and validator, and assert the privacy guarantees the pages make — so a change that quietly weakens the CSP or contradicts the privacy notice fails CI. Runs on every push to `main` via [`.github/workflows/test.yml`](.github/workflows/test.yml).

## Layout

```
index.html              landing page and the tool itself
app.js                  detection, masking and restore logic
hushpaste-rules.json    detection rules and validators
dossier.css             styles for the home pages (the "secret dossier" look)
fonts-dossier.css       typewriter font for the home pages: GNU FreeMono, subset, GPLv3 with the font embedding exception
fonts.css               self-hosted fonts for the other pages, no external font service
ru/ tr/                 Russian and Turkish translations
guides/                 five long-form guides
kit.html                AI Paste Safety Kit
privacy.html            privacy notice
manifest.webmanifest    install as an app (also ru/, tr/)
tests/                  detection and privacy-guarantee tests
```

## Install as an app

On iPhone or iPad open gethushpaste.com in Safari, tap Share, then Add to Home Screen. On Android, Chrome offers Install app. It opens full-screen with its own icon, and it still runs entirely in the browser.

## How it is served

GitHub Pages, with `CNAME` pointing at gethushpaste.com. No server, no database, no backend to operate.

Two outgoing requests are permitted by the Content-Security-Policy and nothing else: the waitlist form to Formspree, and a 1×1 image that counts page visits via GoatCounter. Third-party scripts are blocked outright. See [`privacy.html`](privacy.html) for exactly what each receives.

## Status

The free tool is live and working. The browser extension and the Pro and Team plans are scoped but not built; the pricing page collects a waitlist for them.

Contact: **hello@gethushpaste.com**
