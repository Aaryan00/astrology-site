/* ============================================================================
 * animations.js — Cosmic starfield, scroll reveal, parallax, card glow
 * ==========================================================================*/
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /* STARFIELD CANVAS (twinkling stars + drifting constellation lines)  */
  /* ------------------------------------------------------------------ */
  function initStarfield() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    let w, h, stars = [], dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 20000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.3 + 0.3) * dpr,
        a: Math.random(),
        da: (Math.random() * 0.02 + 0.004),
        vx: (Math.random() - 0.5) * 0.12 * dpr,
        vy: (Math.random() - 0.5) * 0.12 * dpr
      }));
    }
    const GOLD = '212,175,55', WHITE = '255,255,255';
    let last = 0;
    const FRAME = 1000 / 30; // cap at ~30fps to keep the main thread free
    function draw(now) {
      requestAnimationFrame(draw);
      // Skip work when the tab is hidden or between capped frames
      if (document.hidden || (now - last) < FRAME) return;
      last = now;
      ctx.clearRect(0, 0, w, h);
      // constellation links between nearby stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        s.a += s.da; if (s.a > 1 || s.a < 0.15) s.da *= -1;

        for (let j = i + 1; j < stars.length; j++) {
          const o = stars[j];
          const dx = s.x - o.x, dy = s.y - o.y;
          const dist = dx * dx + dy * dy;
          const max = (120 * dpr) * (120 * dpr);
          if (dist < max) {
            const op = (1 - dist / max) * 0.14;
            ctx.strokeStyle = `rgba(${GOLD},${op})`;
            ctx.lineWidth = 0.5 * dpr;
            ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(o.x, o.y); ctx.stroke();
          }
        }
      }
      for (const s of stars) {
        const col = s.r > 1.3 * dpr ? GOLD : WHITE;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${col},${s.a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    resize();
    requestAnimationFrame(draw);
    let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(resize, 200); });
  }

  /* ------------------------------------------------------------------ */
  /* SCROLL REVEAL                                                      */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible)');
    if (!els.length) return;
    if (reduce) { els.forEach(e => e.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
  }
  window.initReveal = initReveal; // called again by main.js after injection

  /* ------------------------------------------------------------------ */
  /* PARALLAX (elements with [data-parallax="speed"])                   */
  /* ------------------------------------------------------------------ */
  function initParallax() {
    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length || reduce) return;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      els.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* CARD POINTER GLOW (updates --mx/--my for radial highlight)         */
  /* ------------------------------------------------------------------ */
  function initCardGlow() {
    if (reduce || window.matchMedia('(hover: none)').matches) return;
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

  function boot() {
    initStarfield();
    initReveal();
    initParallax();
    initCardGlow();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
