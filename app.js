// ---- UI text (en / ru / tr), picked by <html lang> ----
var LANG = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2);
var I18N = {
  en: {
    items: function (n) { return n === 1 ? '1 item' : n + ' items'; },
    restored: function (n) { return n === 1 ? '1 value restored' : n + ' values restored'; },
    tooLong: function (max) { return 'This text is longer than ' + max + ' characters, so nothing was processed. Split it into smaller parts.'; },
    notProcessed: 'not processed',
    fileTooLarge: 'This file is too large. Open a smaller part of it.',
    high: 'HIGH RISK · DO NOT PASTE UNMASKED', medium: 'PERSONAL DATA FOUND', none: 'NOTHING SENSITIVE DETECTED',
    copied: 'Copied',
    exampleReply: function (a, b) { return 'I would rotate ' + a + ' first, then check whether ' + b + ' appears in older logs or tickets.'; },
    nothingMasked: 'Nothing was masked, so there is nothing to restore.',
    netZero: 'Network check: 0 requests since this page loaded. Your text has not left this tab.',
    netSome: function (n) { return 'Network check: ' + n + (n === 1 ? ' request' : ' requests') + ' since this page loaded. Only the waitlist form is allowed to send.'; },
    netHow: 'Verify it: developer tools → Network',
    plans: { free: 'Free', pro: 'Pro', team: 'Team' },
    badEmail: 'Enter a valid email to join the waitlist.',
    joining: 'Joining…',
    saveFailed: 'Sorry, your email was not saved. Please try again in a minute.',
    saveFailedHtml: 'The form did not go through. Write to <a href="mailto:hello@gethushpaste.com?subject=Waitlist">hello@gethushpaste.com</a> and I will add you by hand.',
    sample: 'ERROR 500 in billing-worker\nDB_HOST=10.24.3.17\nDB_PASSWORD=correct-horse-battery\nSTRIPE_KEY=sk-live-4f9a8c1d2e7b3a60f5d9c8e1\nAWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE\n\nCustomer anna.keller@example.com called from +49 151 2345 6789.\nRefund to IBAN DE89370400440532013000, please check why it failed.'
  },
  ru: {
    items: function (n) { var m10 = n % 10, m100 = n % 100; return n + (m10 === 1 && m100 !== 11 ? ' совпадение' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? ' совпадения' : ' совпадений'); },
    restored: function (n) { return 'восстановлено: ' + n; },
    tooLong: function (max) { return 'Текст длиннее ' + max + ' символов, поэтому он не обработан. Разбейте его на части.'; },
    notProcessed: 'не обработано',
    fileTooLarge: 'Файл слишком большой. Откройте его часть.',
    high: 'ВЫСОКИЙ РИСК · НЕ ВСТАВЛЯЙТЕ БЕЗ МАСКИРОВКИ', medium: 'НАЙДЕНЫ ЛИЧНЫЕ ДАННЫЕ', none: 'НИЧЕГО ЧУВСТВИТЕЛЬНОГО НЕ НАЙДЕНО',
    copied: 'Скопировано',
    exampleReply: function (a, b) { return 'Сначала я бы заменил ' + a + ', а потом проверил, не встречается ли ' + b + ' в старых логах и заявках.'; },
    nothingMasked: 'Ничего не замаскировано, восстанавливать нечего.',
    labels: { 'Private key': 'Приватный ключ', 'Database URL': 'URL базы данных', 'API key': 'API-ключ', 'AWS key': 'Ключ AWS', 'Google key': 'Ключ Google', 'Slack token': 'Токен Slack', 'GitHub token': 'Токен GitHub', 'SendGrid key': 'Ключ SendGrid', 'npm token': 'Токен npm', 'Bearer token': 'Bearer-токен', 'Secret in URL': 'Секрет в URL', 'Password': 'Пароль', 'Phone': 'Телефон', 'Card number': 'Номер карты', 'IIN': 'ИИН', 'IP address': 'IP-адрес', 'Your words': 'Ваши слова', 'SNILS': 'СНИЛС', 'INN': 'ИНН', 'Passport': 'Паспорт' },
    netZero: 'Проверка сети: 0 запросов с момента загрузки страницы. Ваш текст не покидал эту вкладку.',
    netSome: function (n) { return 'Проверка сети: запросов с момента загрузки страницы: ' + n + '. Отправлять данные разрешено только форме листа ожидания.'; },
    netHow: 'Проверьте сами: инструменты разработчика → Network',
    plans: { free: 'Free', pro: 'Pro', team: 'Team' },
    badEmail: 'Введите корректный email, чтобы попасть в список.',
    joining: 'Отправляем…',
    saveFailed: 'Не удалось сохранить email. Попробуйте ещё раз через минуту.',
    saveFailedHtml: 'Форма не сработала. Напишите на <a href="mailto:hello@gethushpaste.com?subject=Waitlist">hello@gethushpaste.com</a> — добавлю вас вручную.',
    sample: 'ОШИБКА 500 в billing-worker\nDB_HOST=10.24.3.17\nDB_PASSWORD=correct-horse-battery\nSTRIPE_KEY=sk-live-4f9a8c1d2e7b3a60f5d9c8e1\n\nКлиент: aigerim.n@example.kz, тел. 8 (701) 234-56-78, ИИН 040312500125.\nВерните деньги на IBAN KZ86125KZT5004100100, платёж не прошёл.'
  },
  tr: {
    items: function (n) { return n + ' öğe'; },
    restored: function (n) { return n + ' değer geri yüklendi'; },
    tooLong: function (max) { return 'Bu metin ' + max + ' karakterden uzun, bu yüzden işlenmedi. Daha küçük parçalara bölün.'; },
    notProcessed: 'işlenmedi',
    fileTooLarge: 'Bu dosya çok büyük. Daha küçük bir bölümünü açın.',
    high: 'YÜKSEK RİSK · MASKELEMEDEN YAPIŞTIRMAYIN', medium: 'KİŞİSEL VERİ BULUNDU', none: 'HASSAS BİR ŞEY BULUNMADI',
    copied: 'Kopyalandı',
    exampleReply: function (a, b) { return 'Önce ' + a + ' değerini yenilerdim, sonra ' + b + ' eski kayıtlarda veya taleplerde geçiyor mu diye bakardım.'; },
    nothingMasked: 'Hiçbir şey maskelenmedi, geri yüklenecek bir şey yok.',
    labels: { 'Private key': 'Özel anahtar', 'Database URL': 'Veritabanı URL', 'API key': 'API anahtarı', 'AWS key': 'AWS anahtarı', 'Google key': 'Google anahtarı', 'Slack token': 'Slack token', 'GitHub token': 'GitHub token', 'SendGrid key': 'SendGrid anahtarı', 'npm token': 'npm token', 'Secret in URL': 'URL’de sır', 'Password': 'Parola', 'Email': 'E-posta', 'Phone': 'Telefon', 'Card number': 'Kart numarası', 'IIN': 'IIN', 'IP address': 'IP adresi', 'Your words': 'Sizin kelimeleriniz', 'Passport': 'Pasaport' },
    netZero: 'Ağ kontrolü: sayfa yüklendiğinden beri 0 istek. Metniniz bu sekmeden çıkmadı.',
    netSome: function (n) { return 'Ağ kontrolü: sayfa yüklendiğinden beri ' + n + ' istek. Yalnızca bekleme listesi formunun veri göndermesine izin verilir.'; },
    netHow: 'Kendiniz doğrulayın: geliştirici araçları → Network',
    plans: { free: 'Free', pro: 'Pro', team: 'Team' },
    badEmail: 'Bekleme listesine katılmak için geçerli bir e-posta girin.',
    joining: 'Gönderiliyor…',
    saveFailed: 'E-postanız kaydedilemedi. Lütfen bir dakika sonra tekrar deneyin.',
    saveFailedHtml: 'Form gönderilemedi. <a href="mailto:hello@gethushpaste.com?subject=Waitlist">hello@gethushpaste.com</a> adresine yazın, sizi elle ekleyeyim.',
    sample: 'HATA 500: billing-worker\nDB_HOST=10.24.3.17\nDB_PASSWORD=correct-horse-battery\nSTRIPE_KEY=sk-live-4f9a8c1d2e7b3a60f5d9c8e1\n\nMüşteri: ayse.yilmaz@example.com.tr, tel 0532 123 45 67, TC 10000000146.\nİadeyi TR330006100519786457841326 IBAN\'ına yapın, ödeme başarısız oldu.'
  }
};
var T = I18N[LANG] || I18N.en;

// Opened from the home screen on older iPhones: show only the tool (newer ones use the display-mode media query)
if (window.navigator && window.navigator.standalone === true) document.documentElement.classList.add('standalone');

// ---- SETTINGS ----
// The waitlist endpoint lives in <meta name="waitlist-url"> in the head, so it can be changed without touching this script
var WAITLIST_URL = (function () { var m = document.querySelector('meta[name="waitlist-url"]'); return m ? m.getAttribute('content') : ''; })();

(function () {
  'use strict';
  // Detection rules: same content as hushpaste-rules.json (single source of truth, copied here at build time).
  var RULES_DOC = {"rules":[{"id":"PRIVATE_KEY","pattern":"-----BEGIN [A-Z ]{0,30}PRIVATE KEY(?: BLOCK)?-----[\\s\\S]{0,12000}?(?:-----END [A-Z ]{0,30}PRIVATE KEY(?: BLOCK)?-----|$)","flags":"g","validator":null,"group":null},{"id":"DB_URL","pattern":"\\b[a-z][a-z0-9+.-]{1,30}:\\/\\/[^\\s:@\\/]{1,128}:[^\\s@\\/]{1,256}@[^\\s'\\\"]{1,512}","flags":"gi","validator":null,"group":null},{"id":"JWT","pattern":"\\beyJ[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9_-]{8,}","flags":"g","validator":null,"group":null},{"id":"API_KEY","pattern":"\\b(?:sk|pk|rk)[-_](?=[A-Za-z0-9_-]*\\d)[A-Za-z0-9_-]{16,}","flags":"g","validator":null,"group":null},{"id":"AWS_KEY","pattern":"\\b(?:AKIA|ASIA)[0-9A-Z]{16}\\b","flags":"g","validator":null,"group":null},{"id":"GOOGLE_KEY","pattern":"\\bAIza[0-9A-Za-z_-]{35}","flags":"g","validator":null,"group":null},{"id":"SLACK_TOKEN","pattern":"\\bxox[baprs]-[A-Za-z0-9-]{10,}","flags":"g","validator":null,"group":null},{"id":"SLACK_WEBHOOK","pattern":"https:\\/\\/hooks\\.slack\\.com\\/services\\/[A-Za-z0-9_\\/-]{20,}","flags":"g","validator":null,"group":null},{"id":"GH_TOKEN","pattern":"\\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})","flags":"g","validator":null,"group":null},{"id":"SENDGRID_KEY","pattern":"\\bSG\\.[A-Za-z0-9_-]{22}\\.[A-Za-z0-9_-]{43}","flags":"g","validator":null,"group":null},{"id":"NPM_TOKEN","pattern":"\\bnpm_[A-Za-z0-9]{36}\\b","flags":"g","validator":null,"group":null},{"id":"BEARER_TOKEN","pattern":"Bearer\\s+[A-Za-z0-9._~+\\/-]{16,}=*","flags":"g","validator":null,"group":null},{"id":"BASIC_AUTH","pattern":"Basic\\s+([A-Za-z0-9+\\/]{12,}={0,2})","flags":"g","validator":null,"group":1},{"id":"URL_SECRET","pattern":"[?&](?:api[_-]?key|access[_-]?token|token|secret|password|key)=([^&\\s#]{6,})","flags":"gi","validator":null,"group":1},{"id":"SECRET","pattern":"(?:password|passwd|pwd|secret(?:[_-]?(?:access[_-]?)?key)?|token|api[_-]?(?:key|secret)|apikey|access[_-]?key|private[_-]?key)[\"']?\\s*[:=]\\s*[\"']?([^\\s\"',;]{6,})","flags":"gi","validator":null,"group":1},{"id":"EMAIL","pattern":"[A-Za-z0-9._%+-]{1,100}@[A-Za-z0-9.-]{1,255}\\.[A-Za-z]{2,24}","flags":"g","validator":null,"group":null},{"id":"PHONE","pattern":"\\+\\d[\\d\\s().-]{8,}\\d","flags":"g","validator":null,"group":null},{"id":"PHONE_LOCAL","pattern":"\\b8[\\s-]?\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}\\b","flags":"g","validator":null,"group":null},{"id":"PHONE_TR","pattern":"\\b05\\d{2}[\\s-]?\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}\\b","flags":"g","validator":null,"group":null},{"id":"IBAN","pattern":"\\b[A-Z]{2}\\d{2}(?: ?[A-Z0-9]{4}){2,7}(?: ?[A-Z0-9]{1,3})?\\b","flags":"g","validator":"iban_mod97","group":null},{"id":"CARD","pattern":"\\b\\d(?:[ -]?\\d){12,18}\\b","flags":"g","validator":"luhn","group":null},{"id":"KZ_IIN","pattern":"\\b\\d{12}\\b","flags":"g","validator":"kz_iin","group":null},{"id":"TR_TCKN","pattern":"\\b[1-9]\\d{10}\\b","flags":"g","validator":"tr_tckn","group":null},{"id":"RU_SNILS","pattern":"\\b\\d{3}-\\d{3}-\\d{3}[ -]\\d{2}\\b","flags":"g","validator":"ru_snils","group":null},{"id":"RU_INN","pattern":"(?:ИНН|INN)\\s*[:№#]?\\s*(\\d{12}|\\d{10})\\b","flags":"gi","validator":null,"group":1},{"id":"PASSPORT","pattern":"(?:паспорт|passport|pasaport)[^\\n\\d]{0,24}?([A-Z]{0,2}\\d[\\d ]{5,10}\\d)","flags":"gi","validator":null,"group":1},{"id":"IP_ADDRESS","pattern":"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b","flags":"g","validator":"ipv4_octets","group":null},{"id":"US_SSN","pattern":"\\b\\d{3}-\\d{2}-\\d{4}\\b","flags":"g","validator":null,"group":null}]};
  var RULE_META = {"PRIVATE_KEY":["Private key","high"],"DB_URL":["Database URL","high"],"JWT":["JWT","high"],"API_KEY":["API key","high"],"AWS_KEY":["AWS key","high"],"GOOGLE_KEY":["Google key","high"],"SLACK_TOKEN":["Slack token","high"],"SLACK_WEBHOOK":["Slack webhook","high"],"GH_TOKEN":["GitHub token","high"],"SENDGRID_KEY":["SendGrid key","high"],"NPM_TOKEN":["npm token","high"],"BEARER_TOKEN":["Bearer token","high"],"BASIC_AUTH":["Basic auth","high"],"URL_SECRET":["Secret in URL","high"],"SECRET":["Password","high"],"EMAIL":["Email","medium"],"PHONE":["Phone","medium"],"PHONE_LOCAL":["Phone","medium"],"IBAN":["IBAN","high"],"CARD":["Card number","high"],"KZ_IIN":["IIN","high"],"IP_ADDRESS":["IP address","medium"],"US_SSN":["SSN","high"],"CUSTOM":["Your words","medium"],"PHONE_TR":["Phone","medium"],"TR_TCKN":["TC Kimlik","high"],"RU_SNILS":["SNILS","high"],"RU_INN":["INN","high"],"PASSPORT":["Passport","high"]};
  var MAX_CHARS = 300000;
  var SAMPLE = T.sample;
  var $ = function (id) { return document.getElementById(id); };
  var src = $('src'), reply = $('reply'), terms = $('terms');
  var cur = { tokens: [], masked: '' };
  var restoredText = '';
  var PH_RE = /\[[A-Z_]{1,40}_\d{1,6}\]/g;

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var VALIDATORS = {
    luhn: function (v) {
      var d = v.replace(/\D/g, '');
      if (d.length < 13 || d.length > 19) return false;
      var sum = 0, alt = false;
      for (var i = d.length - 1; i >= 0; i--) {
        var n = d.charCodeAt(i) - 48;
        if (alt) { n *= 2; if (n > 9) n -= 9; }
        sum += n; alt = !alt;
      }
      return sum % 10 === 0;
    },
    iban_mod97: function (v) {
      var s = v.replace(/\s/g, '').toUpperCase();
      if (s.length < 15 || s.length > 34 || !/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(s)) return false;
      var r = s.slice(4) + s.slice(0, 4), rem = 0;
      for (var i = 0; i < r.length; i++) {
        var c = r.charCodeAt(i), piece = c >= 65 ? String(c - 55) : String(c - 48);
        for (var j = 0; j < piece.length; j++) rem = (rem * 10 + (piece.charCodeAt(j) - 48)) % 97;
      }
      return rem === 1;
    },
    kz_iin: function (v) {
      if (!/^\d{12}$/.test(v)) return false;
      var d = v.split('').map(Number), w1 = [1,2,3,4,5,6,7,8,9,10,11], w2 = [3,4,5,6,7,8,9,10,11,1,2];
      function sum(w) { var t = 0; for (var i = 0; i < 11; i++) t += d[i] * w[i]; return t % 11; }
      var c = sum(w1);
      if (c === 10) c = sum(w2);
      return c !== 10 && c === d[11];
    },
    tr_tckn: function (v) {
      if (!/^[1-9]\d{10}$/.test(v)) return false;
      var d = v.split('').map(Number);
      var d10 = ((d[0] + d[2] + d[4] + d[6] + d[8]) * 7 - (d[1] + d[3] + d[5] + d[7])) % 10;
      if (d10 < 0) d10 += 10;
      var sum = 0;
      for (var i = 0; i < 10; i++) sum += d[i];
      return d10 === d[9] && sum % 10 === d[10];
    },
    ru_snils: function (v) {
      var d = v.replace(/\D/g, '');
      if (d.length !== 11) return false;
      var sum = 0;
      for (var i = 0; i < 9; i++) sum += (+d[i]) * (9 - i);
      var check = sum < 100 ? sum : (sum === 100 || sum === 101) ? 0 : sum % 101;
      if (check === 100) check = 0;
      return check === +d.slice(9);
    },
    ipv4_octets: function (v) {
      var p = v.split('.');
      if (p.length !== 4) return false;
      for (var i = 0; i < 4; i++) { if (!/^\d{1,3}$/.test(p[i]) || +p[i] > 255) return false; }
      return true;
    }
  };

  var COMPILED = RULES_DOC.rules.map(function (r) {
    return {
      id: r.id,
      re: new RegExp(r.pattern, r.flags.indexOf('g') > -1 ? r.flags : r.flags + 'g'),
      group: r.group,
      validator: r.validator ? VALIDATORS[r.validator] : null
    };
  });

  function analyze(text, extra) {
    var rules = [];
    (extra || '').split(',').forEach(function (t) {
      var w = t.trim();
      if (w.length >= 2) rules.push({ id: 'CUSTOM', re: new RegExp(w.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&'), 'gi'), group: null, validator: null });
    });
    COMPILED.forEach(function (r) { rules.push(r); });

    var found = [];
    rules.forEach(function (r, pri) {
      var re = r.re, m;
      re.lastIndex = 0;
      while ((m = re.exec(text)) !== null) {
        if (!m[0].length) { re.lastIndex++; continue; }
        var value = m[0], start = m.index;
        if (r.group === 1) {
          if (!m[1]) continue;
          value = m[1]; start = m.index + m[0].length - m[1].length;
        }
        if (r.validator && !r.validator(value)) continue;
        found.push({ type: r.id, start: start, end: start + value.length, value: value, pri: pri });
      }
    });
    found.sort(function (a, b) { return a.start - b.start || a.pri - b.pri || b.end - a.end; });
    var acc = [], last = 0;
    found.forEach(function (f) { if (f.start >= last) { acc.push(f); last = f.end; } });

    // placeholders already present in the text must not be reused
    var existing = Object.create(null);
    (text.match(PH_RE) || []).forEach(function (p) { existing[p] = true; });

    var counters = {}, map = {}, order = [], html = '', plain = '', pos = 0;
    acc.forEach(function (f) {
      var gap = text.slice(pos, f.start);
      html += esc(gap); plain += gap;
      var norm = (f.type === 'EMAIL' || f.type === 'CUSTOM') ? f.value.toLowerCase() : f.value;
      var key = f.type + '|' + norm;
      if (!map[key]) {
        var n = counters[f.type] || 0, ph;
        do { n++; ph = '[' + f.type + '_' + n + ']'; } while (existing[ph]);
        counters[f.type] = n;
        map[key] = ph;
        order.push({ ph: ph, orig: f.value, type: f.type });
      }
      html += '<span class="tok">' + esc(map[key]) + '</span>';
      plain += map[key];
      pos = f.end;
    });
    var tail = text.slice(pos);
    html += esc(tail); plain += tail;
    return { html: html, plain: plain, count: acc.length, tokens: order };
  }

  function render() {
    var tooLong = src.value.length > MAX_CHARS || reply.value.length > MAX_CHARS;
    $('copy1').disabled = tooLong; $('copy2').disabled = tooLong;
    if (tooLong) {
      cur = { tokens: [], masked: '' }; restoredText = '';
      $('out').textContent = T.tooLong(MAX_CHARS.toLocaleString('en-US'));
      $('count').textContent = T.notProcessed;
      $('map').textContent = ''; $('mapBox').hidden = true; $('gochat').hidden = true;
      $('risk').textContent = '';
      $('restored').textContent = ''; $('restCount').textContent = T.restored(0);
      return;
    }
    var a = analyze(src.value, terms.value);
    cur = { tokens: a.tokens, masked: a.plain };
    $('out').innerHTML = a.html;
    $('count').textContent = T.items(a.count);
    var rows = '';
    a.tokens.forEach(function (t) { rows += '<div class="r"><span>' + esc(t.ph) + '</span><span>' + esc(t.orig) + '</span></div>'; });
    $('map').innerHTML = rows;
    $('mapBox').hidden = !a.tokens.length;
    $('gochat').hidden = !a.tokens.length;
    renderRisk(a.tokens);
    var lookup = Object.create(null), hits = 0;
    a.tokens.forEach(function (t) { lookup[t.ph] = t.orig; });
    var r = reply.value.replace(PH_RE, function (m) {
      if (m in lookup) { hits++; return lookup[m]; }
      return m;
    });
    restoredText = r;
    $('restored').textContent = r;
    $('restCount').textContent = T.restored(hits);
  }

  function renderRisk(tokens) {
    var box = $('risk');
    if (!src.value.trim()) { box.textContent = ''; box.hidden = true; return; }
    box.hidden = false;
    var counts = {}, order = [], level = 'none';
    tokens.forEach(function (t) {
      if (!counts[t.type]) { counts[t.type] = 0; order.push(t.type); }
      counts[t.type]++;
    });
    order.sort(function (x, y) {
      var sx = (RULE_META[x] || [])[1] === 'high' ? 0 : 1, sy = (RULE_META[y] || [])[1] === 'high' ? 0 : 1;
      return sx - sy || counts[y] - counts[x];
    });
    var chips = '';
    order.forEach(function (type) {
      var m = RULE_META[type] || [type, 'medium'];
      if (m[1] === 'high') level = 'high'; else if (level === 'none') level = 'medium';
      chips += '<span class="chip ' + m[1] + '">' + esc((T.labels && T.labels[m[0]]) || m[0]) + (counts[type] > 1 ? ' ×' + counts[type] : '') + '</span>';
    });
    var title = T[level];
    box.innerHTML = '<span class="lvl ' + level + '">' + title + '</span>' + chips;
  }

  // ---- open or drop a file (read locally, never uploaded) ----
  function loadFile(file) {
    if (!file) return;
    if (file.size > MAX_CHARS * 4) { src.value = ''; render(); $('out').textContent = T.fileTooLarge; return; }
    var r = new FileReader();
    r.onload = function () { src.value = String(r.result || ''); render(); };
    r.readAsText(file);
  }
  $('btnFile').addEventListener('click', function () { $('file').click(); });
  $('file').addEventListener('change', function () { loadFile(this.files && this.files[0]); this.value = ''; });
  var srcPanel = src.parentNode;
  ['dragenter', 'dragover'].forEach(function (ev) {
    srcPanel.addEventListener(ev, function (e) { e.preventDefault(); srcPanel.classList.add('drag'); });
  });
  ['dragleave', 'drop'].forEach(function (ev) {
    srcPanel.addEventListener(ev, function (e) { e.preventDefault(); if (ev === 'drop' || !srcPanel.contains(e.relatedTarget)) srcPanel.classList.remove('drag'); });
  });
  srcPanel.addEventListener('drop', function (e) { loadFile(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]); });

  var timer = null;
  function schedule() {
    if (src.value.length > 20000 || reply.value.length > 20000) { clearTimeout(timer); timer = setTimeout(render, 150); }
    else render();
  }

  function copy(text, btn, label) {
    function done() { btn.textContent = T.copied; setTimeout(function () { btn.textContent = label; }, 1500); }
    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        done();
      } catch (e) {}
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }

  src.value = SAMPLE;
  src.addEventListener('input', schedule);
  reply.addEventListener('input', schedule);
  terms.addEventListener('input', schedule);
  $('btnSample').addEventListener('click', function () { src.value = SAMPLE; render(); });
  $('btnClear').addEventListener('click', function () { src.value = ''; reply.value = ''; render(); });
  $('btnExample').addEventListener('click', function () {
    var t = cur.tokens;
    reply.value = t.length
      ? T.exampleReply(t[0].ph, (t[1] || t[0]).ph)
      : T.nothingMasked;
    render();
  });
  // each button returns to its own label (in the page's language) after showing "Copied"
  function labelOf(btn) {
    if (!btn.getAttribute('data-label')) btn.setAttribute('data-label', btn.textContent);
    return btn.getAttribute('data-label');
  }
  $('copy1').addEventListener('click', function () { copy(cur.masked, this, labelOf(this)); });
  $('copy2').addEventListener('click', function () { copy(restoredText, this, labelOf(this)); });
  render();

  // ---- plan picker ----
  var PLAN_LABELS = T.plans;
  function currentPlan() {
    var c = document.querySelector('input[name=plan]:checked');
    return c ? c.value : 'pro';
  }
  function syncPlan() {
    var label = PLAN_LABELS[currentPlan()];
    Array.prototype.forEach.call(document.querySelectorAll('.plan-name'), function (el) { el.textContent = label; });
  }
  Array.prototype.forEach.call(document.querySelectorAll('input[name=plan]'), function (r) { r.addEventListener('change', syncPlan); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-plan]'), function (a) {
    a.addEventListener('click', function () {
      var r = document.querySelector('input[name=plan][value="' + a.getAttribute('data-plan') + '"]');
      if (r) { r.checked = true; syncPlan(); }
    });
  });
  syncPlan();

  // ---- waitlist forms ----
  function showOk() {
    Array.prototype.forEach.call(document.querySelectorAll('.wl'), function (w) {
      w.querySelector('form').hidden = true;
      w.querySelector('.ok').hidden = false;
    });
  }
  var forms = document.querySelectorAll('.wl form');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type=email]');
      var err = form.querySelector('.err');
      var btn = form.querySelector('button');
      var v = input.value.trim();
      if (!/^\S+@\S+\.\S+$/.test(v)) { err.textContent = T.badEmail; err.hidden = false; return; }
      err.hidden = true;
      if (!WAITLIST_URL) { showOk(); return; }
      var label = btn.textContent;
      btn.disabled = true; btn.textContent = T.joining;
      function fail() {
        btn.disabled = false; btn.textContent = label;
        err.innerHTML = T.saveFailedHtml || T.saveFailed;
        err.hidden = false;
      }
      var ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      var to = setTimeout(function () { if (ctl) ctl.abort(); }, 12000);
      fetch(WAITLIST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: v, plan: currentPlan() }),
        signal: ctl ? ctl.signal : undefined
      }).then(function (res) {
        clearTimeout(to);
        if (res.ok) showOk(); else fail();
      }).catch(function () { clearTimeout(to); fail(); });
    });
  });
})();

// ---- Motion: scroll reveal, count-up, spotlight, progress, sticky header ----
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  all('.cat, .box, .step, .cc, .price').forEach(function (el) {
    el.classList.add('spot');
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  var header = document.querySelector('header.site');
  var bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var ticking = false;
  function onScroll() {
    ticking = false;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ')';
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  if (reduce || !('IntersectionObserver' in window)) return;

  function countUp(el) {
    var m = /^(\D*)(\d+)$/.exec(el.textContent.trim());
    if (!m || +m[2] < 2) return;
    var end = +m[2], start = null;
    function step(t) {
      if (start === null) start = t;
      var k = Math.min(1, (t - start) / 1200);
      el.textContent = m[1] + Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.documentElement.classList.add('js');
  var targets = all('main section h2, main section .eyebrow, .stats > div, .row > *, .grid > *, .local > *, .chips > span, .kit, .tblw, .team > div, .faq, .panels, .terms');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('in');
      io.unobserve(el);
      if (el.parentNode && el.parentNode.classList.contains('stats')) countUp(el.querySelector('b'));
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  targets.forEach(function (el) {
    var sibs = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
    el.classList.add('rv');
    el.style.transitionDelay = Math.min(sibs, 6) * 70 + 'ms';
    el.addEventListener('transitionend', function () { el.style.transitionDelay = ''; }, { once: true });
    io.observe(el);
  });
})();

// ---- Live network check: counts requests this page makes after it has loaded ----
(function () {
  var box = document.getElementById('netm');
  if (!box || !window.performance || !performance.getEntriesByType) return;
  var base = null;
  function draw() {
    if (base === null) return;
    var n = performance.getEntriesByType('resource').length - base;
    box.textContent = '';
    box.className = 'netm' + (n ? ' warn' : '');
    box.appendChild(document.createElement('i'));
    var t = document.createElement('span');
    t.textContent = n ? T.netSome(n) : T.netZero;
    var how = document.createElement('small');
    how.textContent = ' ' + T.netHow;
    t.appendChild(how);
    box.appendChild(t);
    box.hidden = false;
  }
  function start() { base = performance.getEntriesByType('resource').length; draw(); }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  if ('PerformanceObserver' in window) {
    try { new PerformanceObserver(draw).observe({ type: 'resource' }); } catch (e) { /* older browsers: count stays as drawn */ }
  }
})();
