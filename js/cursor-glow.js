/* ============================================================================
 * cursor-glow.js — soft gold cursor light + rising bubble trail
 * Desktop / fine-pointer only; respects prefers-reduced-motion.
 * Pure canvas, no external assets — CSP-safe.
 * ==========================================================================*/
(function () {
  'use strict';
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-fx';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100vw', height: '100vh',
    pointerEvents: 'none', zIndex: '9999', mixBlendMode: 'screen'
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener('resize', resize);

  let mx = -999, my = -999, lx = -999, ly = -999;
  let active = false;
  addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY; active = true;
  }, { passive: true });
  addEventListener('pointerleave', () => { active = false; });
  document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) active = false; });

  /* ---- rising bubbles, spawned as the pointer travels ---- */
  const bubbles = [];
  const MAX_BUBBLES = 60;
  function spawnBubble(x, y) {
    if (bubbles.length >= MAX_BUBBLES) bubbles.shift();
    bubbles.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      r: 1.4 + Math.random() * 2.6,
      vy: -(0.28 + Math.random() * 0.5),
      vx: (Math.random() - 0.5) * 0.35,
      life: 1,
      decay: 0.012 + Math.random() * 0.014
    });
  }

  let travelled = 0;
  let px = mx, py = my;

  function frame() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // damped follow for the glow (a touch of lag = weight)
    lx += (mx - lx) * 0.16;
    ly += (my - ly) * 0.16;

    // spawn bubbles proportional to distance travelled
    const dx = mx - px, dy = my - py;
    const dist = Math.hypot(dx, dy);
    px = mx; py = my;
    if (active && dist > 1) {
      travelled += dist;
      while (travelled > 14) {
        travelled -= 14;
        spawnBubble(lx, ly);
      }
    }

    // soft glow at the cursor
    if (active) {
      const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, 26);
      g.addColorStop(0, 'rgba(247, 224, 138, 0.55)');
      g.addColorStop(0.4, 'rgba(212, 175, 55, 0.22)');
      g.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(lx, ly, 26, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 250, 230, 0.9)';
      ctx.beginPath();
      ctx.arc(lx, ly, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // bubbles: rise, drift, fade
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.x += b.vx; b.y += b.vy; b.life -= b.decay;
      if (b.life <= 0) { bubbles.splice(i, 1); continue; }
      const a = Math.max(0, b.life);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(247, 224, 138, ${a * 0.65})`;
      ctx.fillStyle = `rgba(212, 175, 55, ${a * 0.12})`;
      ctx.lineWidth = 1;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
