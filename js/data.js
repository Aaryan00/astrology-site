/* ============================================================================
 * data.js — Single source of truth for editable site content
 * ----------------------------------------------------------------------------
 * All pricing, services, packages, testimonials, gallery and video items live
 * here so non-developers can update the site by editing one file. Each page
 * reads from the global `window.SITE_DATA` object.
 * ==========================================================================*/

window.SITE_DATA = {
  /* ---- Astrologer profile / contact (used across pages + footer) -------- */
  profile: {
    name: 'Shri Shri Amit Agarwal',
    titles: [
      'Celebrity Astrologer', 'Vastu Consultant', 'Palmist',
      'Numerologist', 'Life Coach', 'Motivational Speaker', 'Writer'
    ],
    tagline: 'विश्वास, अनुभव और दिव्य मार्गदर्शन',
    taglineEn: 'Faith, Experience & Divine Guidance',
    location: 'Kanpur, Uttar Pradesh, India',
    phones: ['+91 93363 33207'],
    whatsapp: '919336333207',
    emails: ['contact@shrishriamit.com'],
    social: {
      linkedin: 'https://www.linkedin.com/in/shri-shri-amit-agarwal-1a9832266',
      youtube: 'https://youtube.com/@shrishriamitagrawal',
      instagram: 'https://www.instagram.com/shri.shri.amit.agrawal',
      facebook: 'https://www.facebook.com/profile.php?id=1749439378'
    },
    writer: 'Featured Writer at MathuraNow'
  },

  /* ---- Headline stat counters (Home hero) ------------------------------ */
  stats: [
    { value: 35,   suffix: '+',  label: 'Years of Experience' },
    { value: 50000, suffix: '+', label: 'Lives Guided' },
    { value: 75,   suffix: '+',  label: 'Countries Served' },
    { value: 15,   suffix: '+',  label: 'Awards & Honours' }
  ],

  /* ---- Services (Services page + Home preview) ------------------------- */
  services: [
    { icon: 'zodiac',     name: 'Vedic Astrology',        desc: 'Time-honoured Jyotish analysis of your birth chart to reveal life patterns, planetary influences and the path ahead.', benefits: ['Complete Kundali study', 'Dasha & transit timing', 'Practical Vedic remedies'] },
    { icon: 'scroll',     name: 'Horoscope Reading',      desc: 'Precise predictions across career, wealth, relationships and health, decoded from your personal horoscope.', benefits: ['Yearly & life predictions', 'Auspicious muhurat', 'Decision guidance'] },
    { icon: 'palm',       name: 'Palmistry',              desc: 'The lines of your palm read to understand character, destiny and the turning points of your life.', benefits: ['Line & mount analysis', 'Career & marriage lines', 'Health indicators'] },
    { icon: 'face',       name: 'Face Reading',           desc: 'Ancient Samudrik Shastra reveals personality, strengths and fortune through facial features.', benefits: ['Personality insight', 'Fortune indicators', 'Compatibility cues'] },
    { icon: 'numbers',    name: 'Numerology',             desc: 'The hidden power of numbers in your name and birth date, aligned for success and harmony.', benefits: ['Name correction', 'Lucky numbers & dates', 'Business naming'] },
    { icon: 'compass',    name: 'Vastu Consultation',     desc: 'Align your home or workplace with the five elements for health, wealth and lasting prosperity.', benefits: ['Site energy audit', 'No-demolition remedies', 'Directional balancing'] },
    { icon: 'rings',      name: 'Marriage Matching',      desc: 'Ashtakoot Guna Milan with deep horoscope, palmistry and face analysis for a blissful lifelong bond.', benefits: ['36 Guna matching', 'Manglik analysis', 'Compatibility roadmap'] },
    { icon: 'briefcase',  name: 'Career Guidance',        desc: 'Discover your true calling and the most favourable timing for growth, change and opportunity.', benefits: ['Career direction', 'Job vs. business', 'Timing of success'] },
    { icon: 'chart',      name: 'Business Astrology',     desc: 'Strategic astrological insight for entrepreneurs — expansion, partnerships and profitable timing.', benefits: ['Venture timing', 'Partnership fit', 'Growth remedies'] },
    { icon: 'lotus',      name: 'Health Guidance',        desc: 'Astrological insight into wellbeing, supported by gentle, positive lifestyle remedies.', benefits: ['Wellbeing outlook', 'Preventive guidance', 'Balancing remedies'] },
    { icon: 'heart',      name: 'Relationship Consultation', desc: 'Understand, heal and strengthen relationships through compassionate astrological counsel.', benefits: ['Compatibility insight', 'Conflict resolution', 'Emotional harmony'] },
    { icon: 'gem',        name: 'Gemstone Guidance',      desc: 'Personalised Abhimantrit gemstone, Rudraksha and crystal recommendations to amplify positive energy.', benefits: ['Right stone & weight', 'Energised remedies', 'Wearing muhurat'] },
    { icon: 'building',   name: 'Corporate Vastu',        desc: 'Vastu alignment for offices and corporate spaces to boost productivity, culture and profits.', benefits: ['Office layout audit', 'Cabin & seating', 'Growth alignment'] },
    { icon: 'temple',     name: 'Institution Vastu',      desc: 'Harmonising schools, hospitals and institutions for positive energy and collective wellbeing.', benefits: ['Campus energy plan', 'Entrance & zoning', 'Custom remedies'] },
    { icon: 'factory',    name: 'Industrial Vastu',       desc: 'Vastu for factories and industries to enhance output, safety and sustained prosperity.', benefits: ['Plant layout audit', 'Machinery placement', 'Prosperity remedies'] }
  ],

  /* ---- Consultation & Vastu packages (Packages page) -------------------
   * EDIT PRICES HERE. `featured: true` highlights the recommended card. */
  packages: [
    {
      id: 'overseas', name: 'International Consultation', featured: false,
      category: 'consultation', badge: 'Overseas Clients',
      summary: 'Horoscope + Palmistry + Face Reading for clients residing outside India.',
      tiers: [
        { label: 'One Hour · Per Person',        price: '$350',  unit: '' },
        { label: 'One Hour 30 Min · Per Couple', price: '$600',  unit: '' }
      ],
      features: ['Complete Vedic horoscope study', 'Palmistry & face reading', 'Business, career & relationship insight', 'Practical remedies']
    },
    {
      id: 'personal', name: 'Personal Meeting', featured: false,
      category: 'consultation', badge: 'In-Person',
      summary: 'Face-to-face holistic consultation with tailored remedies in Kanpur.',
      tiers: [
        { label: 'One Hour · Per Person',        price: '₹31,000', unit: '' },
        { label: 'One Hour 30 Min · Per Couple', price: '₹51,000', unit: '' }
      ],
      features: ['In-person combined analysis', 'Life chart & horoscope reading', 'Palmistry, face & Vedic astrology', 'Recommended practical remedies']
    },
    {
      id: 'video', name: 'Video / Phone Consultation', featured: true,
      category: 'consultation', badge: 'Remote',
      summary: 'Complete analysis over phone or video call from anywhere in the world.',
      tiers: [
        { label: 'One Hour · Per Person',        price: '₹21,000', unit: '' },
        { label: 'One Hour 30 Min · Per Couple', price: '₹36,000', unit: '' }
      ],
      features: ['Live one-to-one session', 'Horoscope, palmistry & face reading', 'Career, business & relationship focus', 'Remedies for your concerns']
    },
    {
      id: 'marriage', name: 'Marriage Matching', featured: false,
      category: 'consultation', badge: 'Kundali Milan',
      summary: 'Ashtakoot Guna Milan with palmistry & face reading for lifelong marital bliss.',
      tiers: [
        { label: '45 Minutes · Over Phone', price: '₹36,000', unit: '' },
        { label: '75 Minutes · Over Phone', price: '₹51,000', unit: '' }
      ],
      features: ['36 Guna Kundali matching', 'Nature & compatibility study', 'Palmistry & face reading', 'Guidance for a harmonious life']
    },
    {
      id: 'social', name: 'Social Service Package', featured: false,
      category: 'consultation', badge: 'Complimentary',
      summary: 'Free guidance for the underprivileged and special concessions for students.',
      tiers: [
        { label: 'Underprivileged · 2 per month', price: 'Complimentary', unit: '' },
        { label: 'Students · Special discount',    price: 'On Request',   unit: '' }
      ],
      features: ['Free for 2 deserving people monthly', 'Special student discounts', 'Subject to prior appointment', 'First-come, first-served']
    },
    {
      id: 'vastu-home', name: 'Vastu for Home', featured: false,
      category: 'vastu', badge: 'Residential',
      summary: 'Align your home with the five elements for health, wealth and prosperity.',
      tiers: [
        { label: 'Home Visit Charges', price: '₹5,100',  unit: '' },
        { label: 'Vastu for Home',     price: '₹51,000', unit: '' }
      ],
      features: ['On-site energy assessment', 'No-demolition remedies', 'Directional balancing', 'Abhimantrit remedies available']
    },
    {
      id: 'vastu-office', name: 'Vastu for Office', featured: false,
      category: 'vastu', badge: 'Commercial',
      summary: 'Harmonise your workplace to boost productivity, culture and profits.',
      tiers: [
        { label: 'Vastu for Office',            price: '₹51,000', unit: '' },
        { label: 'Showroom / Flat',             price: '₹25,000', unit: '' }
      ],
      features: ['Cabin & seating alignment', 'Entrance & zoning audit', 'Growth-oriented remedies', 'Gemstone & crystal remedies']
    },
    {
      id: 'vastu-institution', name: 'Institution & Industry Vastu', featured: false,
      category: 'vastu', badge: 'Large Projects',
      summary: 'Vastu for institutions, hospitals and industries — scoped to your project.',
      tiers: [
        { label: 'Institution / Hospital', price: 'On Request', unit: '' },
        { label: 'Industry',               price: 'On Request', unit: '' }
      ],
      features: ['Campus / plant layout audit', 'Machinery & zoning placement', 'Custom prosperity remedies', 'Ongoing advisory support']
    }
  ],

  /* ---- Testimonials (real reviews sourced from JustDial, 4.9 / 37) ----- */
  testimonials: [
    { name: 'Rohit',              role: 'Verified Client', rating: 5, source: 'JustDial', text: 'I had an amazing experience with Shri Shri Amit Agarwal. He provides great solutions to life’s challenges and helps you find peace and clarity. His guidance is both practical and spiritual. I felt supported and uplifted after our sessions — highly recommend him!' },
    { name: 'Damini Gupta',       role: 'Verified Client', rating: 5, source: 'JustDial', text: 'Life-changing health guidance. I was dealing with recurring health issues with no clear medical diagnosis. He patiently listened to my concerns and did a detailed analysis of my horoscope. His predictions were incredibly accurate.' },
    { name: 'PREKER',             role: 'Verified Client', rating: 5, source: 'JustDial', text: 'Exceptional astrological guidance. From the very beginning he listened with great patience and offered clear, accurate readings based on my birth chart. His predictions about my career and personal life were remarkably accurate, and the remedies were simple and effective.' },
    { name: 'La Rozaa Boutique',  role: 'Verified Client', rating: 5, source: 'JustDial', text: 'A great astrologer who gave great solutions to my questions. He was friendly and listened well. I felt comfortable during our talk and his advice helped me a lot. Overall a wonderful experience.' },
    { name: 'Aruna',              role: 'Verified Client', rating: 5, source: 'JustDial', text: 'I had a great interaction with Shri Shri Amit Agarwal. He was very helpful and friendly, and the services were reasonably priced. I felt comfortable asking questions, and he answered them well. A positive experience I really appreciated.' },
    { name: 'Sunita',             role: 'Verified Client', rating: 5, source: 'JustDial', text: 'I love the way he listened and gave solutions — truly a spiritual and wonderful person with deep knowledge.' },
    { name: 'Kiran Gupta',        role: 'Verified Client', rating: 5, source: 'JustDial', text: 'Had an amazing experience and his reading was profound and accurate.' },
    { name: 'Anjali',             role: 'Verified Client', rating: 5, source: 'JustDial', text: 'I had a great experience and his predictions are so absolute and accurate to the maximum.' }
  ],

  /* ---- Google reviews (add real ones from your Google Business profile) ---
   * Google blocks automated export, so paste them here manually. Format:
   *   { name: 'Reviewer', role: 'Google Review', rating: 5, source: 'Google', text: '…' }
   * The "Loved on Google" section appears automatically once this has entries. */
  googleReviews: [
    { name: 'Rahul Agarwal',         role: 'Google Review', rating: 5, source: 'Google', text: 'I consulted Shri Amit Ji regarding my horoscope (Kundali) — a very positive and insightful experience. He has deep knowledge of astrology and explained things clearly. I appreciated his calm and patient approach; he listened carefully and the remedies he suggested were simple and practical.' },
    { name: 'Prakher Singhal',       role: 'Local Guide',   rating: 5, source: 'Google', text: 'I had a consultation with Shri Amit Agrawal Ji and I’m truly impressed with his guidance and accuracy. He patiently listened and gave detailed insights into my horoscope. His predictions about my health and career were precise, practical and reassuring. Highly recommended.' },
    { name: 'Dr. Vivek Kumar Shukla',role: 'Google Review', rating: 5, source: 'Google', text: 'Shri Shri Amit Agarwal ji is a good astrologer — the predictions are accurate and he suggests viable solutions. He has in-depth knowledge of Vastu and Palmistry with scientific connections. One shall definitely benefit from his consultations. Strongly recommended.' },
    { name: 'Himanshu Agarwal',      role: 'Local Guide',   rating: 5, source: 'Google', text: 'Amazing astrologer! Shri Shri Amit Agarwal gave accurate insights and very helpful guidance. Highly trustworthy and highly recommended.' },
    { name: 'Divya Melwani',         role: 'Google Review', rating: 5, source: 'Google', text: 'I recently consulted Sri Amit ji — he’s very good at reading horoscope (kundali) and has good knowledge of it. He listens patiently and calmly and suggests remedies which can be done at ease. Thank you for your guidance.' },
    { name: 'Uttam Prasad Kesarwani',role: 'Google Review', rating: 5, source: 'Google', text: 'Good reader of horoscope and his advice is par excellence. Proud of him for being such a nice human being. Keep rocking! 🙏' },
    { name: 'Vinod K Mishra',        role: 'Google Review', rating: 5, source: 'Google', text: 'Very good astrologer having deep knowledge of the subject. I surely recommend him. Value for money — very accurate and trustworthy.' },
    { name: 'Roli',                  role: 'Google Review', rating: 5, source: 'Google', text: 'Best astrologer and Vastu specialist, really value for money. His approach is very positive and he is a very good listener. I highly recommend him.' },
    { name: 'Pranav Chawla',         role: 'Local Guide',   rating: 5, source: 'Google', text: 'Incredibly insightful reading! He was spot-on with my chart and offered clear, uplifting guidance.' },
    { name: 'Sanjay Srivastava',     role: 'Google Review', rating: 5, source: 'Google', text: 'One stop place for all your problems and queries. Have faith and trust in him.' },
    { name: 'Sayraa Chawla',         role: 'Google Review', rating: 5, source: 'Google', text: 'Amazing experience! His deep understanding of the stars gave me clarity and hope.' },
    { name: 'Harshit Agarwal',       role: 'Google Review', rating: 5, source: 'Google', text: 'Most accurate palm reading — highly recommended.' }
  ],

  /* ---- Gallery items. `caption` is also used as the image alt text (see js/gallery.js). */
  gallery: [
    /* ----- Celebrities (actors, cricketers, film personalities) — shown first ----- */
    { img: "/images/gallery/amit-agarwal-with-actor-nawazuddin-siddiqui.jpg", cat: "celebrities", caption: "Shri Shri Amit Agarwal with Bollywood actor Nawazuddin Siddiqui" },
    { img: "/images/gallery/amit-agarwal-with-director-vishal-ranjan-mishra-and-nawazuddin-siddiqui.jpg", cat: "celebrities", caption: "Shri Shri Amit Agarwal with film director Vishal Ranjan Mishra and actor Nawazuddin Siddiqui" },
    { img: "/images/gallery/amit-agarwal-with-film-actor-ashutosh-rana.jpg", cat: "celebrities", caption: "Shri Shri Amit Agarwal with film actor Ashutosh Rana" },
    { img: "/images/gallery/amit-agarwal-with-cricketer-kuldeep-yadav.jpg", cat: "celebrities", caption: "Shri Shri Amit Agarwal with Indian cricket team chinaman spinner Kuldeep Yadav" },
    { img: "/images/gallery/amit-agarwal-with-film-star-ronnie-shah.jpg", cat: "celebrities", caption: "Shri Shri Amit Agarwal with film star Ronnie Shah" },
    { img: "/images/gallery/amit-agarwal-with-mla-amitabh-bajpai-film-star-rauni-shah.jpg", cat: "celebrities", caption: "Shri Shri Amit Agarwal with local MLA Amitabh Bajpai and film star Rauni Shah at his residence" },
    { img: "/images/gallery/amit-agarwal-with-film-director-vishal-ranjan-mishra.jpg", cat: "celebrities", caption: "Shri Shri Amit Agarwal with film director Vishal Ranjan Mishra" },
    { img: "/images/gallery/amit-agarwal-with-producer-khyati-madaan-director-vishal-ranjan-mishra.jpg", cat: "celebrities", caption: "Shri Shri Amit Agarwal with Khyati Madaan, owner and producer of Not Out Entertainment, and film director Vishal Ranjan Mishra" },

    /* ----- Awards & honours ----- */
    { img: "/images/gallery/durga-swaroopa-samman-2025-felicitation-lucknow.jpg", cat: "awards", caption: "Durga Swaroopa Samman 2025 felicitation of celebrity astrologer Amit Agarwal at Urdu Akademi, Lucknow" },
    { img: "/images/gallery/amit-agarwal-durga-swaroopa-foundation-award-trophy.jpg", cat: "awards", caption: "Shri Shri Amit Agarwal with the Durga Swaroopa Foundation award trophy at the felicitation ceremony" },
    { img: "/images/gallery/durga-swaroopa-samman-2025-honour-poster-amit-agarwal.jpg", cat: "awards", caption: "Durga Swaroopa Samman 2025 honour poster for celebrity astrologer Shri Shri Amit Agarwal" },
    { img: "/images/gallery/icons-of-bharat-award-2025-certificate-amit-agarwal.jpg", cat: "awards", caption: "Icons of Bharat Award 2025 certificate presented to Shri Shri Amit Agarwal, celebrity astrologer and Vastu consultant" },
    { img: "/images/gallery/amit-agarwal-icons-of-bharat-award-kanpur-kavi-sammelan.jpg", cat: "awards", caption: "Shri Shri Amit Agarwal receiving the Icons of Bharat Award 2025 at the National Kavi Sammelan, Merchant Chamber, Kanpur" },
    { img: "/images/gallery/national-pride-and-excellence-award-2026-amit-agarwal.jpg", cat: "awards", caption: "National Pride and Excellence Award 2026 presented to Shri Shri Amit Agarwal on Republic Day by Tretayug Foundation" },
    { img: "/images/gallery/rotary-governors-excellence-award-2024-amit-agarwal.jpg", cat: "awards", caption: "Rotary District 3110 Governor's Excellence Award 2024 for Rtn. Amit Agarwal, President of Rotary Club of Kanpur Global" },
    { img: "/images/gallery/rotary-club-kanpur-global-district-recognition-award.jpg", cat: "awards", caption: "Rotary Club of Kanpur Global receiving a district recognition award, Rotary District 3110" },
    { img: "/images/gallery/amit-agarwal-rotary-district-award-ceremony-trophy.jpg", cat: "awards", caption: "Rtn. Amit Agarwal with the trophy at the Rotary District Award Ceremony, Kanpur" },

    /* ----- Events & community ----- */
    { img: "/images/gallery/amit-agarwal-networking-meet-kanpur.jpg", cat: "events", caption: "Shri Shri Amit Agarwal with associates at a networking meet in Kanpur" },
    { img: "/images/gallery/amit-agarwal-with-nidhipati-singhania-jk-cement-upca-president.jpg", cat: "events", caption: "Shri Shri Amit Agarwal with renowned industrialist Shri Nidhipati Singhania, Chairman of J.K. Cement and President of the Uttar Pradesh Cricket Association" },
    { img: "/images/gallery/amit-agarwal-with-asim-arun-up-minister-former-police-commissioner.jpg", cat: "events", caption: "Shri Shri Amit Agarwal with Shri Asim Arun, former Police Commissioner and current Minister of State, Government of Uttar Pradesh" },
    { img: "/images/gallery/amit-agarwal-meets-kanpur-police-commissioner.jpg", cat: "events", caption: "Shri Shri Amit Agarwal felicitating the Kanpur Police Commissioner" },
    { img: "/images/gallery/rotary-kanpur-green-felicitates-mla-mahesh-trivedi.jpg", cat: "events", caption: "Rotary Club Kanpur Green felicitating MLA Mahesh Trivedi at a mega blood donation camp" },
    { img: "/images/gallery/amit-agarwal-samajik-adhikarita-shivir-kanpur.jpg", cat: "events", caption: "Samajik Adhikarita Shivir assistive-device distribution camp with MP Satyadev Pachauri, Lajpat Bhawan, Kanpur" },
    { img: "/images/gallery/amit-agarwal-rotary-kanya-shree-cycle-donation.jpg", cat: "events", caption: "Rtn. Amit Agarwal receiving a Certificate of Appreciation for the Rotary Kanya Shree cycle-donation project" },
    { img: "/images/gallery/amit-agarwal-amar-ujala-kavya-rang-kanpur.jpg", cat: "events", caption: "Amar Ujala Kavya Rang cultural event in Kanpur" },
    { img: "/images/gallery/amit-agarwal-with-rotary-international-director-vyanktesh.jpg", cat: "events", caption: "Shri Shri Amit Agarwal with Rotary International Director Rtn. Vyanktesh" },
    { img: "/images/gallery/matri-diwas-brahma-kumaris-dance-performance-kanpur.jpg", cat: "events", caption: "Cultural dance performance at the Matri Diwas (Mother's Day) celebration, Brahma Kumaris, Kanpur" },
    { img: "/images/gallery/matri-diwas-brahma-kumaris-dignitaries-kanpur.jpg", cat: "events", caption: "Dignitaries at the Matri Diwas celebration honouring mothers, Brahma Kumaris, Kanpur" },
    { img: "/images/gallery/matri-diwas-brahma-kumaris-audience-kanpur.jpg", cat: "events", caption: "Audience at the Matri Diwas (Mother's Day) event, Brahma Kumaris, Kanpur" },
    { img: "/images/gallery/matri-diwas-brahma-kumaris-lamp-lighting-kanpur.jpg", cat: "events", caption: "Guests on stage at the Matri Diwas celebration, Brahma Kumaris, Kanpur" },
    { img: "/images/gallery/amit-agarwal-addressing-matri-diwas-kanpur.jpg", cat: "events", caption: "Shri Shri Amit Agarwal addressing the Matri Diwas (Mother's Day) gathering, Kanpur" },
    { img: "/images/gallery/amit-agarwal-matri-diwas-family-photo-kanpur.jpg", cat: "events", caption: "Shri Shri Amit Agarwal honouring an elderly mother at the Matri Diwas event, Kanpur" },
    { img: "/images/gallery/matri-diwas-brahma-kumaris-candle-lighting-kanpur.jpg", cat: "events", caption: "Candle-lighting ceremony at the Matri Diwas celebration, Brahma Kumaris, Kanpur" },

    /* ----- Press & media ----- */
    { img: "/images/gallery/amit-agarwal-durga-swaroopa-award-amar-ujala-news.jpg", cat: "media", caption: "Amar Ujala newspaper coverage: Vastu expert Amit Agarwal honoured with the Durga Swaroopa Award" },
    { img: "/images/gallery/amit-agarwal-durga-swaroopa-award-tc-news-india.jpg", cat: "media", caption: "TC News India feature: Shri Shri Amit Agarwal honoured with the Durga Swaroopa Samman by Deputy CM Brajesh Pathak" },
    { img: "/images/gallery/amit-agarwal-durga-swaroopa-award-newspaper-report.jpg", cat: "media", caption: "Newspaper report: Astrologer Amit Agarwal receives the Durga Swaroopa Award" },
    { img: "/images/gallery/amit-agarwal-durga-swaroopa-award-press-coverage.jpg", cat: "media", caption: "Press coverage of Shri Shri Amit Agarwal's Durga Swaroopa Award felicitation" },
    { img: "/images/gallery/amit-agarwal-tc-news-india-feature-kanpur.jpg", cat: "media", caption: "TC News India feature on celebrity astrologer and Vastu expert Shri Shri Amit Agarwal of Kanpur" },
    { img: "/images/gallery/gopal-krishna-singhania-cricket-stadium-vastu-news.jpg", cat: "media", caption: "Newspaper report on the Gopal Krishna Singhania Railway Cricket Stadium noting Amit Agarwal's Vastu contribution" },
    { img: "/images/gallery/amit-agarwal-jyotish-vastu-samajseva-newspaper-profile.jpg", cat: "media", caption: "Newspaper profile: Shri Shri Amit Agarwal, an inspiring personality in astrology, Vastu and social service" },
    { img: "/images/gallery/matri-diwas-event-newspaper-coverage-pratibha-shukla.jpg", cat: "media", caption: "Newspaper coverage of the Matri Diwas event honouring mothers, with Pratibha Shukla" }
  ],

  /* ---- Video items (replace `id` with real YouTube video IDs) ---------- */
  videos: [
    { id: '', title: 'Introduction to Shri Shri Amit Agarwal',  desc: 'A glimpse into the philosophy and journey of a celebrity astrologer.', featured: true },
    { id: '', title: 'Understanding Your Horoscope',            desc: 'How Vedic astrology decodes the map of your life.' },
    { id: '', title: 'The Power of Vastu Shastra',              desc: 'Aligning spaces with the five elements for prosperity.' },
    { id: '', title: 'Gemstones & Their Energy',                desc: 'Choosing the right Abhimantrit gemstone for you.' },
    { id: '', title: 'Marriage Matching Explained',             desc: 'Ashtakoot Guna Milan for a blissful married life.' },
    { id: '', title: 'Motivational Talk: Faith & Success',      desc: 'Wisdom for a purposeful and prosperous life.' }
  ],

  /* ---- Featured self-hosted (portrait) videos -------------------------- */
  localVideos: [
    { src: '/assets/videos/ronnie-shah.mp4', poster: '/assets/videos/ronnie-shah.jpg', title: 'Ronnie Shah', role: 'Actor' },
    { src: '/assets/videos/vishal-ranjan-mishra.mp4', poster: '/assets/videos/vishal-ranjan-mishra.jpg', title: 'Vishal Ranjan Mishra', role: 'Film Director' }
  ],

  /* ---- Awards & recognitions (About + Home) ---------------------------- */
  awards: [
    { title: 'Durga Swarupa Samman',            desc: 'For exceptional contributions to spiritual welfare and society.' },
    { title: 'Icon of India Award',             desc: 'For exemplary leadership and mastery over the Vedic sciences.' },
    { title: 'National Pride & Excellence',     desc: 'Recognised nationally for institutional and professional brilliance.' },
    { title: 'Best Rotary President Award',     desc: 'For outstanding leadership of major social-impact initiatives.' },
    { title: 'Best Rotary Secretary Award',     desc: 'For exceptional organisational management and district excellence.' }
  ],

  /* ---- Frequently asked questions -------------------------------------- */
  faqs: [
    { q: 'How can I book a consultation?', a: 'Simply WhatsApp us at +91 93363 33207 or use the contact form. We will confirm your appointment slot and share the next steps.' },
    { q: 'Do you offer online consultations?', a: 'Yes. We serve clients worldwide through phone and video consultations, in addition to in-person meetings in Kanpur.' },
    { q: 'What information do I need to provide?', a: 'For an accurate reading, please share your full name, date of birth, exact time of birth and place of birth.' },
    { q: 'How accurate are the predictions?', a: 'Guidance is based on authentic Vedic principles combined with decades of experience. It is intended to empower better decisions, not to replace personal responsibility.' },
    { q: 'Do you provide Vastu without demolition?', a: 'Absolutely. Most Vastu concerns are resolved through practical, no-demolition remedies and directional balancing.' },
    { q: 'Are gemstone remedies included?', a: 'Personalised Abhimantrit gemstone, Rudraksha and crystal recommendations are available as part of relevant consultations.' }
  ]
};
