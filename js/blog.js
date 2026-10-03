/* ============================================================================
 * blog.js — renders the Blog grid from a published Google Sheet (CSV).
 * Sheet columns (header row, any order, case-insensitive): title | link | image
 * Each card = image + title; clicking opens the link in a new tab.
 * All sheet content is treated as untrusted: built with textContent (no
 * innerHTML) and only http(s) URLs are accepted.
 * ==========================================================================*/
(function () {
  'use strict';

  // Google Sheet (shared "Anyone with the link: Viewer"); first tab exported as CSV.
  const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/18DZgyxUGso8qIGZbmzd-jA2svK1q3vuxEJ4YsUBl5pE/export?format=csv&gid=0';

  const host = document.getElementById('blog-grid');
  if (!host) return;

  function setStatus(msg) {
    host.textContent = '';
    const p = document.createElement('p');
    p.className = 'blog-status';
    p.textContent = msg;
    host.appendChild(p);
  }

  // Minimal RFC-4180 CSV parser (quoted fields, escaped quotes, newlines in cells)
  function parseCSV(text) {
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
        else cell += c;
      } else if (c === '"') q = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); rows.push(row); row = []; cell = '';
      } else cell += c;
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  function safeUrl(u) {
    try {
      const x = new URL((u || '').trim());
      return (x.protocol === 'https:' || x.protocol === 'http:') ? x.href : '';
    } catch (e) { return ''; }
  }

  // Google Drive share links -> directly embeddable image URL
  function imageUrl(u) {
    const url = safeUrl(u); if (!url) return '';
    const m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/) || url.match(/drive\.google\.com\/(?:open|uc)\?(?:[^#]*&)?id=([\w-]+)/);
    return m ? 'https://lh3.googleusercontent.com/d/' + m[1] : url;
  }

  function card(item, i) {
    const a = document.createElement('a');
    a.className = 'card blog-card';
    a.href = item.link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('data-reveal', '');
    a.setAttribute('data-delay', String((i % 3) + 1));

    const media = document.createElement('div');
    media.className = 'blog-media';
    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.addEventListener('error', () => { img.remove(); media.classList.add('is-empty'); });
      media.appendChild(img);
    } else media.classList.add('is-empty');

    const h = document.createElement('h3');
    h.className = 'blog-title';
    h.textContent = item.title;

    a.append(media, h);
    return a;
  }

  async function load() {
    if (!SHEET_CSV_URL) { setStatus('Articles are coming soon.'); return; }
    try {
      const res = await fetch(SHEET_CSV_URL, { credentials: 'omit' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const rows = parseCSV(await res.text()).filter(r => r.some(c => c.trim()));
      if (rows.length < 2) { setStatus('No articles yet — please check back soon.'); return; }
      const head = rows[0].map(h => h.trim().toLowerCase());
      const col = (...names) => head.findIndex(h => names.includes(h));
      const ti = col('title', 'heading', 'name'), li = col('link', 'url'), ii = col('image', 'image url', 'img', 'thumbnail');
      if (ti < 0 || li < 0) throw new Error('Missing title/link columns');
      const items = rows.slice(1).map(r => ({
        title: (r[ti] || '').trim(),
        link: safeUrl(r[li]),
        image: ii >= 0 ? imageUrl(r[ii]) : ''
      })).filter(x => x.title && x.link);
      if (!items.length) { setStatus('No articles yet — please check back soon.'); return; }
      host.textContent = '';
      items.forEach((it, i) => host.appendChild(card(it, i)));
      if (window.initReveal) window.initReveal();
    } catch (e) {
      setStatus('Unable to load articles right now. Please try again later.');
    }
  }
  load();
})();
