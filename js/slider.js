/* ============================================================================
 * slider.js — Testimonial carousel (auto-advancing, swipeable, accessible)
 * Renders into #testimonial-slider and/or a full grid in #testimonials-grid.
 * ==========================================================================*/
(function () {
  'use strict';
  const D = window.SITE_DATA;
  const stars = (n) => '★★★★★☆☆☆☆☆'.slice(5 - n, 10 - n);
  const initials = (name) => name.split(' ').map(w => w[0]).slice(0, 2).join('');

  function card(t) {
    return `
      <article class="card testi-card">
        <div class="quote-mark" aria-hidden="true">&ldquo;</div>
        <div class="stars" aria-label="${t.rating} out of 5 stars">${stars(t.rating)}</div>
        <p class="body">${t.text}</p>
        <div class="testi-foot">
          <span class="testi-avatar" aria-hidden="true">${initials(t.name)}</span>
          <span>
            <span class="name">${t.name}</span><br>
            <span class="role">${t.role}</span>
          </span>
          <span class="testi-source">${t.source}</span>
        </div>
      </article>`;
  }

  /* ---- Full grid (testimonials page) ---- */
  function renderGrid() {
    const host = document.getElementById('testimonials-grid');
    if (!host) return;
    // No data-reveal wrapper: review cards must ALWAYS be visible (they are
    // re-rendered, which was defeating the scroll-reveal observer).
    host.innerHTML = D.testimonials.map(t => `<div>${card(t)}</div>`).join('');
  }

  /* ---- Carousel (home + testimonials highlight) ---- */
  function renderSlider() {
    const host = document.getElementById('testimonial-slider');
    if (!host) return;
    const slides = D.testimonials;
    host.innerHTML = `
      <div class="slider-viewport">
        <div class="slider-track">
          ${slides.map(t => `<div class="slide">${card(t)}</div>`).join('')}
        </div>
      </div>
      <div class="slider-controls">
        <button class="slider-btn" data-dir="-1" aria-label="Previous testimonial">${window.siteIcon ? window.siteIcon('arrow') : '‹'}</button>
        <div class="slider-dots" role="tablist"></div>
        <button class="slider-btn next" data-dir="1" aria-label="Next testimonial">${window.siteIcon ? window.siteIcon('arrow') : '›'}</button>
      </div>`;

    const track = host.querySelector('.slider-track');
    const dotsWrap = host.querySelector('.slider-dots');
    let perView = 1, index = 0, timer;

    const calcPerView = () => (innerWidth > 1024 ? 3 : innerWidth > 680 ? 2 : 1);

    function buildDots() {
      const pages = Math.max(1, slides.length - perView + 1);
      dotsWrap.innerHTML = Array.from({ length: pages }, (_, i) =>
        `<button class="slider-dot${i === 0 ? ' active' : ''}" role="tab" aria-label="Go to testimonial ${i + 1}" data-i="${i}"></button>`).join('');
      dotsWrap.querySelectorAll('.slider-dot').forEach(d =>
        d.addEventListener('click', () => go(+d.dataset.i)));
    }
    function go(i) {
      const max = Math.max(0, slides.length - perView);
      index = Math.max(0, Math.min(i, max));
      track.style.transform = `translateX(-${index * (100 / perView)}%)`;
      dotsWrap.querySelectorAll('.slider-dot').forEach((d, di) => d.classList.toggle('active', di === index));
    }
    function layout() {
      perView = calcPerView();
      track.querySelectorAll('.slide').forEach(s => s.style.flex = `0 0 ${100 / perView}%`);
      buildDots();
      go(Math.min(index, slides.length - perView));
    }
    function auto() {
      clearInterval(timer);
      timer = setInterval(() => {
        const max = Math.max(0, slides.length - perView);
        go(index >= max ? 0 : index + 1);
      }, 5000);
    }

    host.querySelectorAll('.slider-btn').forEach(b =>
      b.addEventListener('click', () => { go(index + (+b.dataset.dir)); auto(); }));
    host.addEventListener('mouseenter', () => clearInterval(timer));
    host.addEventListener('mouseleave', auto);

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) { go(index + (dx < 0 ? 1 : -1)); auto(); }
    }, { passive: true });

    layout();
    auto();
    let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(layout, 200); });
  }

  /* ---- Google reviews grid (auto-hides until data.googleReviews has items) ---- */
  function renderGoogleGrid() {
    const host = document.getElementById('google-reviews-grid');
    if (!host) return;
    const section = document.getElementById('google-reviews-section');
    const list = D.googleReviews || [];
    if (!list.length) { if (section) section.style.display = 'none'; return; }
    if (section) section.style.display = '';
    // Show a handful on the page; the rest are on Google ("See more" button)
    host.innerHTML = list.slice(0, 6).map(t => `<div>${card(t)}</div>`).join('');
  }

  window.initSlider = function () { renderGrid(); renderSlider(); renderGoogleGrid(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.initSlider);
  else window.initSlider();
})();
