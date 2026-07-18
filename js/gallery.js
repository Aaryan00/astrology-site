/* ============================================================================
 * gallery.js — Masonry gallery, category filtering, lightbox with keyboard nav
 * Renders into #gallery-grid; filters read from #gallery-filters.
 * ==========================================================================*/
(function () {
  'use strict';
  const D = window.SITE_DATA;

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const items = D.gallery;

    // Build filter buttons from unique categories
    const filtersHost = document.getElementById('gallery-filters');
    const cats = ['all', ...Array.from(new Set(items.map(i => i.cat)))];
    if (filtersHost) {
      const label = { all: 'All', awards: 'Awards', events: 'Events', vastu: 'Vastu', media: 'Media' };
      filtersHost.innerHTML = cats.map((c, i) =>
        `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${c}">${label[c] || c}</button>`).join('');
    }

    grid.innerHTML = items.map((it, i) => `
      <figure class="masonry-item" data-cat="${it.cat}" data-index="${i}">
        <img src="${it.img}" alt="${it.caption}" loading="lazy" width="600" height="450">
        <figcaption class="cap">${it.caption}</figcaption>
      </figure>`).join('');

    // Filtering
    if (filtersHost) {
      filtersHost.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn'); if (!btn) return;
        filtersHost.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        grid.querySelectorAll('.masonry-item').forEach(item => {
          const show = f === 'all' || item.dataset.cat === f;
          item.classList.toggle('u-hidden', !show);
        });
      });
    }

    initLightbox(grid, items);
  }

  /* ---- Lightbox ---- */
  function initLightbox(grid, items) {
    let box = document.getElementById('lightbox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'lightbox';
      box.className = 'lightbox';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-label', 'Image viewer');
      box.innerHTML = `
        <button class="lb-close" aria-label="Close">&times;</button>
        <button class="lb-prev" aria-label="Previous image">&#8249;</button>
        <button class="lb-next" aria-label="Next image">&#8250;</button>
        <div>
          <img id="lb-img" src="" alt="">
          <p class="lb-cap" id="lb-cap"></p>
        </div>`;
      document.body.appendChild(box);
    }
    const img = box.querySelector('#lb-img');
    const cap = box.querySelector('#lb-cap');
    let current = 0;
    const visible = () => items.map((it, i) => ({ it, i }))
      .filter(({ i }) => !grid.querySelector(`[data-index="${i}"]`).classList.contains('u-hidden'));

    function open(i) {
      current = i; show(); box.classList.add('open');
      document.body.style.overflow = 'hidden';
      box.querySelector('.lb-close').focus();
    }
    function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
    function show() {
      const it = items[current];
      img.src = it.img; img.alt = it.caption; cap.textContent = it.caption;
    }
    function step(dir) {
      const vis = visible();
      let pos = vis.findIndex(v => v.i === current);
      pos = (pos + dir + vis.length) % vis.length;
      current = vis[pos].i; show();
    }

    grid.addEventListener('click', (e) => {
      const fig = e.target.closest('.masonry-item'); if (!fig) return;
      open(+fig.dataset.index);
    });
    box.querySelector('.lb-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', () => step(-1));
    box.querySelector('.lb-next').addEventListener('click', () => step(1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }

  window.initGallery = renderGallery;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderGallery);
  else renderGallery();
})();
