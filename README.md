# Shri Shri Amit Agarwal — Astrology &amp; Vastu Website

A premium, fully responsive, multi-page website for celebrity astrologer & Vastu consultant
**Shri Shri Amit Agarwal**. Built with **pure HTML5, CSS3 and vanilla JavaScript** — no
frameworks, no build step. Just open the files or serve the folder.

## Quick start

```bash
# From this folder, start a simple local server:
python3 -m http.server 8777
# then open http://localhost:8777/index.html
```

(Opening `index.html` directly via `file://` also works, but a local server is recommended so
the fonts, images and Google Maps embed load correctly.)

## Folder structure

Pages use **clean URLs** — each lives in its own folder as `index.html`, so the
address bar shows `/about/` instead of `/about.html`. This works on any host and
in local preview with no configuration. Nav & footer are baked into every page
(static HTML) for instant loads.

```
astrology-site/
├── index.html          # Home            →  /
├── about/index.html    # Biography       →  /about/
├── services/index.html # 15 services     →  /services/
├── packages/index.html # Pricing + table →  /packages/
├── gallery/index.html  # Masonry + box   →  /gallery/
├── videos/index.html   # YouTube grid    →  /videos/
├── testimonials/index.html # Reviews     →  /testimonials/
├── contact/index.html  # Form, map, FAQ  →  /contact/
├── css/
│   ├── style.css       # Design system: tokens, components, layout
│   ├── responsive.css  # Breakpoints (1100 / 960 / 860 / 620 px)
│   └── animations.css  # Keyframes + scroll-reveal utilities
├── js/
│   ├── data.js         # ★ SINGLE SOURCE OF TRUTH — edit content here
│   ├── main.js         # Header/footer injection, counters, forms, renderers
│   ├── animations.js   # Starfield canvas, scroll reveal, parallax
│   ├── slider.js       # Testimonial carousel
│   └── gallery.js      # Masonry filter + lightbox
├── images/
│   ├── profile/        # amit-agarwal-standing.jpeg (hero), *-garland.jpeg (about)
│   ├── gallery/        # g1–g12 placeholder SVGs — REPLACE with real photos
│   ├── icons/          # (icons are inline SVG in main.js)
│   └── videos/
├── assets/             # logo.svg, favicon.svg
└── fonts/              # (Google Fonts loaded via CDN)
```

## Editing content (no coding needed)

Almost everything is driven by **`js/data.js`**. Open it and edit the plain-text values:

| What to change            | Where in `js/data.js` |
|---------------------------|-----------------------|
| Name, phone, email, socials | `profile` object    |
| Hero stat counters        | `stats` array         |
| Services                  | `services` array      |
| **Package prices**        | `packages` array (each `tiers[].price`) |
| Testimonials / reviews    | `testimonials` array  |
| Gallery captions          | `gallery` array       |
| YouTube videos            | `videos` array (add each `id`) |
| Awards                    | `awards` array        |
| FAQs                      | `faqs` array          |

### Replace placeholder images
- **Profile photos:** already using the two real portraits in `images/profile/`.
- **Gallery:** replace `images/gallery/g1.svg … g12.svg` with real photos. Either keep the
  `.svg` names, or change the extensions in the `gallery` array in `js/data.js`.
- **Videos:** add real YouTube video IDs to the `videos` array — the grid auto-embeds them.

### Change prices
All pricing lives in the `packages` array in `js/data.js`. The pricing cards, "Book Now"
WhatsApp links and the comparison table on `packages.html` read from there.

## Features
- Handcrafted cosmic dark theme (deep navy, royal purple, gold, saffron)
- Animated constellation starfield (Canvas), scroll-reveal, counters, parallax, glassmorphism
- Sticky glass navigation with mobile drawer
- Data-driven services, packages, testimonials, gallery, videos & FAQs
- Testimonial carousel (autoplay, swipe, dots)
- Filterable masonry gallery with keyboard-navigable lightbox
- WhatsApp-integrated contact form (no backend required)
- SEO: semantic HTML, meta + Open Graph + Twitter tags, canonical URLs, JSON-LD schema
- Accessibility: ARIA labels, keyboard navigation, focus states, `prefers-reduced-motion`
- Fully responsive down to small phones

## Notes
- The contact form has **no server backend** — on submit it opens WhatsApp with the message
  pre-filled. To collect submissions by email instead, wire the form to a service such as
  Formspree or your own endpoint in `js/main.js` (`initContactForm`).
- Update the `canonical` / Open Graph URLs in each page's `<head>` once the real domain is live.
- Bank/payment details from the source brochure are intentionally **not** published on the
  public site; share them privately with clients after booking.
