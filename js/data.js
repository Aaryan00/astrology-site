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
    phones: ['+91 93363 33207', '+91 70190 01990'],
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
      id: 'personal', name: 'Personal Meeting', featured: true,
      category: 'consultation', badge: 'In-Person',
      summary: 'Face-to-face holistic consultation with tailored remedies in Kanpur.',
      tiers: [
        { label: 'One Hour · Per Person',        price: '₹31,000', unit: '' },
        { label: 'One Hour 30 Min · Per Couple', price: '₹51,000', unit: '' }
      ],
      features: ['In-person combined analysis', 'Life chart & horoscope reading', 'Palmistry, face & Vedic astrology', 'Recommended practical remedies']
    },
    {
      id: 'video', name: 'Video / Phone Consultation', featured: false,
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

  /* ---- Gallery items (replace `img` with real photos in /images/gallery) */
  gallery: [
    { img: 'images/gallery/g1.svg',  cat: 'awards',   caption: 'Durga Swarupa Samman Felicitation' },
    { img: 'images/gallery/g2.svg',  cat: 'events',   caption: 'Rotary Club Kanpur Global Charter' },
    { img: 'images/gallery/g3.svg',  cat: 'awards',   caption: 'Icon of India Award' },
    { img: 'images/gallery/g4.svg',  cat: 'vastu',    caption: 'Cricket Stadium Vastu Guidance' },
    { img: 'images/gallery/g5.svg',  cat: 'events',   caption: 'Motivational Speaking Session' },
    { img: 'images/gallery/g6.svg',  cat: 'awards',   caption: 'National Pride & Excellence Award' },
    { img: 'images/gallery/g7.svg',  cat: 'media',    caption: 'Press & Media Feature' },
    { img: 'images/gallery/g8.svg',  cat: 'events',   caption: 'Community Service Initiative' },
    { img: 'images/gallery/g9.svg',  cat: 'vastu',    caption: 'Corporate Vastu Consultation' },
    { img: 'images/gallery/g10.svg', cat: 'media',    caption: 'Television Interview' },
    { img: 'images/gallery/g11.svg', cat: 'awards',   caption: 'Best Rotary President Award' },
    { img: 'images/gallery/g12.svg', cat: 'events',   caption: 'Spiritual Discourse Gathering' }
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
