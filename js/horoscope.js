/* Horoscope page — loads Panchang + Rashifal from the MathuraNow public API (CC BY-NC 4.0, attribution shown). */
(function () {
  'use strict';

  var API = 'https://mathuranow.in/api/v1/';
  var SOURCE_URL = 'https://mathuranow.in/';
  var cache = {};

  var UI = {
    en: {
      eyebrow: 'Daily Guidance', title: "Today's", gold: 'Horoscope',
      lead: "Today's Panchang and Rashifal for all twelve zodiac signs, by Shri Shri Amit Agarwal.",
      pnEyebrow: 'Panchang', pnHead: "Today's <Panchang>", rfEyebrow: 'Rashifal', rfHead: 'Daily <Rashifal>',
      loading: 'Loading…', pending: "Today's entry is coming soon. Please check back shortly.",
      error: 'Unable to load right now. Please try again later.', source: 'Source', ai: 'Partly AI-assisted.',
      locale: 'en-IN', panchang: 'Panchang', rashifal: 'Rashifal'
    },
    hi: {
      eyebrow: 'दैनिक मार्गदर्शन', title: 'आज का', gold: 'राशिफल',
      lead: 'श्री श्री अमित अग्रवाल द्वारा आज का पंचांग और सभी बारह राशियों का राशिफल।',
      pnEyebrow: 'पंचांग', pnHead: 'आज का <पंचांग>', rfEyebrow: 'राशिफल', rfHead: 'दैनिक <राशिफल>',
      loading: 'लोड हो रहा है…', pending: 'आज की प्रविष्टि जल्द ही उपलब्ध होगी। कृपया थोड़ी देर बाद देखें।',
      error: 'अभी लोड नहीं हो सका। कृपया बाद में प्रयास करें।', source: 'स्रोत', ai: 'आंशिक रूप से AI-सहायता प्राप्त।',
      locale: 'hi-IN', panchang: 'पंचांग', rashifal: 'राशिफल'
    }
  };

  var FIELDS = ['vaar', 'tithi', 'nakshatra', 'yoga', 'karana', 'chandra_rashi', 'sunrise', 'sunset',
    'rahu_kaal', 'yamaganda', 'gulika_kaal', 'muhurat'];
  var LABELS = {
    en: { vaar: 'Day (Vaar)', tithi: 'Tithi', nakshatra: 'Nakshatra', yoga: 'Yoga', karana: 'Karana',
      chandra_rashi: 'Moon Sign', sunrise: 'Sunrise', sunset: 'Sunset', rahu_kaal: 'Rahu Kaal',
      yamaganda: 'Yamaganda', gulika_kaal: 'Gulika Kaal', muhurat: 'Muhurat' },
    hi: { vaar: 'वार', tithi: 'तिथि', nakshatra: 'नक्षत्र', yoga: 'योग', karana: 'करण',
      chandra_rashi: 'चंद्र राशि', sunrise: 'सूर्योदय', sunset: 'सूर्यास्त', rahu_kaal: 'राहु काल',
      yamaganda: 'यमगण्ड', gulika_kaal: 'गुलिक काल', muhurat: 'मुहूर्त' }
  };
  var EXTRA_HI = { bhadra: 'भद्रा', ganda_moola: 'गण्ड मूल', panchak: 'पंचक', disha_shool: 'दिशा शूल',
    moonrise: 'चंद्रोदय', moonset: 'चंद्रास्त' };

  var lang = 'en';

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function str(v) { return typeof v === 'string' ? v.trim() : ''; }

  function fetchJson(kind, l) {
    var key = kind + '.' + l;
    if (!cache[key]) {
      cache[key] = fetch(API + kind + '/today.' + l + '.json', { headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .catch(function (e) { delete cache[key]; throw e; });
    }
    return cache[key];
  }

  function fmtDate(iso, l) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return '';
    var d = new Date(iso + 'T00:00:00Z');
    if (isNaN(d)) return '';
    return d.toLocaleDateString(UI[l].locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  }

  function setHeading(node, tpl) {
    var m = /^(.*)<(.+)>(.*)$/.exec(tpl);
    node.textContent = '';
    node.appendChild(document.createTextNode(m[1]));
    node.appendChild(el('span', 'text-gold', m[2]));
    node.appendChild(document.createTextNode(m[3]));
  }

  function status(container, msg) {
    container.textContent = '';
    container.appendChild(el('p', 'hs-status', msg));
  }

  function renderPanchang(d, l) {
    var body = $('panchang-body');
    $('pn-date').textContent = fmtDate(d.date, l);
    var dl = el('dl', 'panchang-grid');
    function add(label, value) {
      value = str(value);
      if (!label || !value) return;
      var item = el('div', 'card panchang-item');
      item.appendChild(el('dt', null, label));
      item.appendChild(el('dd', null, value));
      dl.appendChild(item);
    }
    var f = (d.data && d.data.fields) || {};
    FIELDS.forEach(function (k) { add(LABELS[l][k], f[k]); });
    ((d.data && d.data.extra) || []).forEach(function (x) {
      if (!x || typeof x !== 'object') return;
      add(l === 'hi' && EXTRA_HI[x.key] ? EXTRA_HI[x.key] : str(x.label), x.value);
    });
    body.textContent = '';
    if (dl.children.length) body.appendChild(dl); else status(body, UI[l].pending);
  }

  function renderRashifal(d, l) {
    var body = $('rashifal-body');
    $('rf-date').textContent = fmtDate(d.date, l);
    body.textContent = '';
    var signs = (d.data && Array.isArray(d.data.signs)) ? d.data.signs : [];
    signs.forEach(function (s, i) {
      if (!s || !str(s.name) || !str(s.text)) return;
      var card = el('article', 'card rashi-card');
      card.setAttribute('data-reveal', '');
      card.setAttribute('data-delay', String((i % 3) + 1));
      card.appendChild(el('h3', null, s.name));
      card.appendChild(el('p', null, s.text));
      body.appendChild(card);
    });
    if (!body.children.length) { status(body, UI[l].pending); return; }
    if (typeof window.initReveal === 'function') window.initReveal();
  }

  function renderCredit(d, l) {
    var box = $('hs-credit');
    box.textContent = '';
    var name = d.credit && str(d.credit.name);
    box.appendChild(document.createTextNode(UI[l].source + ': '));
    var a = el('a', null, 'MathuraNow');
    a.href = SOURCE_URL; a.target = '_blank'; a.rel = 'noopener';
    box.appendChild(a);
    if (name) box.appendChild(document.createTextNode(' · ' + name));
    var ai = (d.data && d.data.signs || []).some(function (s) { return s && s.ai; });
    if (ai) box.appendChild(document.createTextNode(' · ' + UI[l].ai));
  }

  function load(kind, l, render, container) {
    status(container, UI[l].loading);
    return fetchJson(kind, l).then(function (d) {
      if (l !== lang) return null; // user switched language meanwhile
      if (!d || d.status !== 'published' || !d.data) { status(container, UI[l].pending); return null; }
      render(d, l);
      return d;
    }).catch(function () {
      if (l === lang) status(container, UI[l].error);
      return null;
    });
  }

  function apply(l) {
    lang = l;
    var u = UI[l];
    document.documentElement.lang = l;
    $('hs-eyebrow').textContent = u.eyebrow;
    $('hs-title').textContent = u.title;
    $('hs-title-gold').textContent = u.gold;
    $('hs-lead').textContent = u.lead;
    $('pn-eyebrow').textContent = u.pnEyebrow;
    $('rf-eyebrow').textContent = u.rfEyebrow;
    setHeading($('pn-heading'), u.pnHead);
    setHeading($('rf-heading'), u.rfHead);
    $('pn-date').textContent = ''; $('rf-date').textContent = ''; $('hs-credit').textContent = '';
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      var on = b.getAttribute('data-lang') === l;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    load('panchang', l, renderPanchang, $('panchang-body'));
    load('rashifal', l, renderRashifal, $('rashifal-body')).then(function (d) {
      if (d && l === lang) renderCredit(d, l);
    });
  }

  function init() {
    if (!$('panchang-body')) return;
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-lang');
        if (UI[l] && l !== lang) apply(l);
      });
    });
    apply('en');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
