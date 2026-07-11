/* ============================================================================
 * main.js — Global behaviour + shared components + data rendering
 * ----------------------------------------------------------------------------
 * Responsibilities:
 *   • Inject shared header (nav) and footer so markup stays DRY
 *   • Mobile nav drawer, sticky/scrolled header, back-to-top
 *   • SVG icon library
 *   • Animated stat counters
 *   • Contact form -> WhatsApp/mailto handoff
 *   • Data-driven renderers (services, packages, awards, faqs) used by pages
 * ==========================================================================*/
(function () {
  'use strict';
  const D = window.SITE_DATA;
  const P = D.profile;
  const waLink = (msg) => `https://wa.me/${P.whatsapp}?text=${encodeURIComponent(msg || 'Namaste, I would like to book a consultation with Shri Shri Amit Agarwal.')}`;

  /* ------------------------------------------------------------------ */
  /* SVG ICON LIBRARY (stroke-based, inherits currentColor)             */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    zodiac:   '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18"/>',
    scroll:   '<path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 0-2-2h3z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    palm:     '<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5m0-1V4.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a5 5 0 0 1-5 5h-1a5 5 0 0 1-4.3-2.5L5 14a1.5 1.5 0 0 1 2.6-1.5L8 13"/>',
    face:     '<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15c1 1 5 1 6 0"/>',
    numbers:  '<path d="M6 8h2v8M14 8h2a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h4"/>',
    compass:  '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2z"/>',
    rings:    '<circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="M9 9l3-4 3 4"/>',
    briefcase:'<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    chart:    '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7"/>',
    lotus:    '<path d="M12 21c-4 0-7-2.5-7-6 2 0 3.5.8 4.5 2M12 21c4 0 7-2.5 7-6-2 0-3.5.8-4.5 2M12 21c0-4 1.5-7 3.5-9M12 21c0-4-1.5-7-3.5-9M12 21c0-5 0-8 0-12"/>',
    heart:    '<path d="M12 20s-7-4.3-9.2-8.4C1.3 8.7 2.6 5.5 5.7 5.5c1.8 0 3 .9 3.8 2 .8-1.1 2-2 3.8-2 3.1 0 4.4 3.2 2.9 6.1C19 15.7 12 20 12 20z"/>',
    gem:      '<path d="M6 3h12l3 6-9 12L3 9l3-6z"/><path d="M3 9h18M9 3l-3 6 6 12 6-12-3-6"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M16 15h.01M10 21v-4h4v4"/>',
    temple:   '<path d="M12 3l9 5H3l9-5zM5 8v10M19 8v10M9 8v10M15 8v10M3 21h18M3 18h18"/>',
    factory:  '<path d="M3 21V9l6 4V9l6 4V6l6 4v11H3z"/><path d="M7 17h.01M12 17h.01M17 17h.01"/>',
    medal:    '<circle cx="12" cy="15" r="6"/><path d="M12 12v6M9.5 15h5M8 3l2 6M16 3l-2 6"/>',
    phone:    '<path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin:      '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    arrow:    '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check:    '<path d="M20 6 9 17l-5-5"/>',
    star:     '<path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18l-5.9 3 1.2-6.5L2.5 9.9 9 9z"/>',
    film:     '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4"/>',
    users:    '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M16 6a3 3 0 0 1 0 6M18 15c2 .5 3 1.9 3 5"/>',
    globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    trophy:   '<path d="M8 4h8v4a4 4 0 0 1-8 0V4zM8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3M10 14h4v3h-4zM8 20h8M9 17h6"/>',
    linkedin: '<path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.5 8.7h3.1V21H3.5zM9.5 8.7h3v1.7c.5-.9 1.6-1.9 3.5-1.9 3 0 4.5 2 4.5 5.4V21h-3.1v-6c0-1.6-.6-2.6-2-2.6-1.1 0-1.7.7-2 1.5-.1.2-.1.6-.1.9V21h-3z"/>',
    youtube:  '<path d="M22 12s0-3-.4-4.4a2.5 2.5 0 0 0-1.8-1.8C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.8.4A2.5 2.5 0 0 0 2.4 7.6C2 9 2 12 2 12s0 3 .4 4.4a2.5 2.5 0 0 0 1.8 1.8c1.4.4 7.8.4 7.8.4s6.4 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15 22 12 22 12z"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1z"/>',
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M8.5 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.1.7.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.1-.3-.2-.6-.4l-1.6-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.6-2.4-1.6-.7-.7-1.1-1.5-1.3-1.8-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3.2-.5 0-.2 0-.3-.1-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.4z" fill="currentColor" stroke="none"/>',
    write:    '<path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="M14 6l3 3"/>'
  };
  function icon(name, cls) {
    const p = ICONS[name] || ICONS.star;
    const filled = /fill="currentColor" stroke="none"/.test(p);
    return `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }
  window.siteIcon = icon; // expose for other scripts

  /* ------------------------------------------------------------------ */
  /* CHROME — wire the STATIC nav/footer baked into each page's HTML    */
  /* (Nav & footer are now hard-coded in the HTML for instant paint;    */
  /*  this only attaches behaviour + fills decorative icons.)           */
  /* ------------------------------------------------------------------ */
  function initChrome() {
    // Highlight the active nav link based on the current URL
    let path = location.pathname.replace(/index\.html$/, '');
    if (path === '') path = '/';
    document.querySelectorAll('#nav-links > a[href]').forEach(a => {
      if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
    });

    // Mobile drawer toggle
    const header = document.getElementById('site-header');
    const toggle = document.getElementById('nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const open = document.body.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      document.querySelectorAll('#nav-links a').forEach(a =>
        a.addEventListener('click', () => {
          document.body.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // Sticky header "scrolled" state
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Fill decorative icons (footer + back-to-top) via [data-ic]
    document.querySelectorAll('[data-ic]').forEach(e => { e.innerHTML = icon(e.dataset.ic); });

    // Back-to-top button
    const top = document.querySelector('.to-top');
    if (top) {
      top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      window.addEventListener('scroll', () => top.classList.toggle('show', window.scrollY > 600), { passive: true });
    }

    // Footer year
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------ */
  /* ANIMATED COUNTERS                                                  */
  /* ------------------------------------------------------------------ */
  function initCounters() {
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1600, start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.floor(eased * target);
        el.textContent = val.toLocaleString('en-IN') + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('en-IN') + suffix;
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  }

  /* ------------------------------------------------------------------ */
  /* DATA RENDERERS (shared across pages)                               */
  /* ------------------------------------------------------------------ */
  const el = (id) => document.getElementById(id);

  function renderStats(target, list) {
    const host = el(target); if (!host) return;
    host.innerHTML = list.map(s => `
      <div class="stat" data-reveal data-delay="1">
        <div class="num"><span data-count="${s.value}" data-suffix="${s.suffix}">0</span></div>
        <div class="label">${s.label}</div>
      </div>`).join('');
  }

  function serviceCard(s, i) {
    return `
      <article class="card service-card" data-reveal data-delay="${(i % 3) + 1}">
        <div class="icon-badge">${icon(s.icon)}</div>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <ul class="service-benefits">${s.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
        <a class="card-link" href="/contact/">Enquire ${icon('arrow')}</a>
      </article>`;
  }
  function renderServices(target, limit) {
    const host = el(target); if (!host) return;
    const list = limit ? D.services.slice(0, limit) : D.services;
    host.innerHTML = list.map(serviceCard).join('');
  }

  function packageCard(p, i) {
    const tiers = p.tiers.map(t => `
      <div class="pkg-tier"><span class="label">${t.label}</span><span class="price">${t.price}</span></div>`).join('');
    const feats = p.features.map(f => `<li>${f}</li>`).join('');
    const msg = `Namaste, I am interested in the "${p.name}" package. Kindly share availability.`;
    return `
      <article class="card package-card${p.featured ? ' is-featured' : ''}" data-reveal data-delay="${(i % 3) + 1}">
        ${p.featured ? '<span class="pkg-ribbon">Most Popular</span>' : ''}
        <span class="pkg-badge">${p.badge}</span>
        <h3>${p.name}</h3>
        <p>${p.summary}</p>
        <div class="pkg-tiers">${tiers}</div>
        <ul class="pkg-features">${feats}</ul>
        <a class="btn btn-block" href="${waLink(msg)}" target="_blank" rel="noopener">Book Now</a>
      </article>`;
  }
  function renderPackages(target, filter) {
    const host = el(target); if (!host) return;
    const list = filter ? D.packages.filter(p => p.category === filter) : D.packages;
    host.innerHTML = list.map(packageCard).join('');
  }

  function renderAwards(target) {
    const host = el(target); if (!host) return;
    host.innerHTML = D.awards.map((a, i) => `
      <article class="card award-card" data-reveal data-delay="${(i % 3) + 1}">
        <span class="medal">${icon('medal')}</span>
        <div><h4>${a.title}</h4><p>${a.desc}</p></div>
      </article>`).join('');
  }

  function videoCard(v, i, featured) {
    const hasId = v.id && v.id.trim().length > 0;
    const yt = P.social.youtube;
    const thumb = hasId
      ? `<iframe src="https://www.youtube-nocookie.com/embed/${v.id}" title="${v.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      : `<a class="play" href="${yt}" target="_blank" rel="noopener" aria-label="Watch on YouTube: ${v.title}"><span>${icon('arrow')}</span></a>`;
    return `
      <article class="card video-card${featured ? ' video-featured' : ''}" data-reveal data-delay="${(i % 3) + 1}">
        <div class="video-thumb">${thumb}</div>
        <div class="video-meta">
          <h3>${v.title}</h3>
          <p>${v.desc}</p>
        </div>
      </article>`;
  }
  function renderVideos() {
    const featHost = el('video-featured'), gridHost = el('videos-grid');
    if (!featHost && !gridHost) return;
    const feat = D.videos.find(v => v.featured);
    const rest = D.videos.filter(v => !v.featured);
    if (featHost && feat) featHost.innerHTML = videoCard(feat, 0, true);
    if (gridHost) gridHost.innerHTML = rest.map((v, i) => videoCard(v, i)).join('');
  }

  function renderFaqs(target, limit) {
    const host = el(target); if (!host) return;
    const list = limit ? D.faqs.slice(0, limit) : D.faqs;
    host.innerHTML = list.map((f, i) => `
      <details class="faq-item" data-reveal ${i === 0 ? 'open' : ''}>
        <summary class="faq-q">${f.q}<span class="plus" aria-hidden="true"></span></summary>
        <div class="faq-a">${f.a}</div>
      </details>`).join('');
  }

  /* ------------------------------------------------------------------ */
  /* CONTACT FORM -> WhatsApp / mailto                                  */
  /* ------------------------------------------------------------------ */
  function initContactForm() {
    const form = el('contact-form'); if (!form) return;
    const status = el('form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const service = (data.get('service') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !phone || !message) {
        status.className = 'form-status err';
        status.textContent = 'Please fill in your name, phone number and message.';
        return;
      }
      // Basic email sanity check (optional field)
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.className = 'form-status err';
        status.textContent = 'Please enter a valid email address, or leave it blank.';
        return;
      }
      const text =
        `Namaste, I would like to book a consultation.%0A%0A` +
        `*Name:* ${name}%0A*Phone:* ${phone}%0A` +
        (email ? `*Email:* ${email}%0A` : '') +
        (service ? `*Interested in:* ${service}%0A` : '') +
        `*Message:* ${message}`;
      window.open(`https://wa.me/${P.whatsapp}?text=${text}`, '_blank', 'noopener');
      status.className = 'form-status ok';
      status.textContent = 'Thank you! Your WhatsApp is opening with your details pre-filled. If it does not, please call us directly.';
      form.reset();
    });
  }

  /* ------------------------------------------------------------------ */
  /* WHATSAPP LINK WIRING (any [data-wa] element)                       */
  /* ------------------------------------------------------------------ */
  function wireWhatsapp() {
    document.querySelectorAll('[data-wa]').forEach(a => {
      a.href = waLink(a.dataset.wa || '');
      a.target = '_blank'; a.rel = 'noopener';
    });
  }

  /* ------------------------------------------------------------------ */
  /* BOOT                                                               */
  /* ------------------------------------------------------------------ */
  function boot() {
    initChrome();
    wireWhatsapp();

    // Page-scoped data rendering (guards check element existence)
    renderStats('stats-row', D.stats);
    renderServices('services-preview', 6);
    renderServices('services-full');
    renderPackages('packages-all');
    renderPackages('packages-consult', 'consultation');
    renderPackages('packages-vastu', 'vastu');
    renderAwards('awards-grid');
    renderVideos();
    renderFaqs('faq-list', el('faq-home') ? 4 : null);

    initCounters();
    initContactForm();

    // Re-run reveal + counters after dynamic injection
    if (window.initReveal) window.initReveal();
    if (window.initSlider) window.initSlider();
    if (window.initGallery) window.initGallery();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
