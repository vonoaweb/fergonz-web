export interface Project {
  id: number;
  title: string;
  role: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  link?: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  problem: string;
  solution: string;
  results?: string;
  isDemo?: boolean;
  tags?: string[];
}

export const projects: Project[] = [
  // Row 1: PayPal (2 cols) + Insurance (1 col) = 3
  {
    id: 7,
    title: 'PayPal EMEA – UI Standardization & Localization',
    role: 'UI/UX Designer & Localization Specialist',
    image: '/images/paypal-project.webp',
    images: [
      '/images/paypal-project-1.webp',
      '/images/paypal-project-2.webp',
      '/images/paypal-project-3.webp',
      '/images/paypal-project-4.webp',
    ],
    link: '#',
    size: 'medium',
    tags: ['Figma', 'Design Systems', 'Localization', 'Multi-region'],
    problem:
      'PayPal required a unified user experience across its global markets while respecting unique regional requirements. The main challenge was to standardize the visual interface for the EMEA region (UK, France, Spain) without breaking the Global Design System, while simultaneously adapting content for local currencies, regional products (e.g., "Pay in 3" in UK vs. "Paiement en 4X" in France), and legal compliance such as FCA mandates in the UK.',
    solution:
      'I led UI adaptation using Figma, leveraging Master Components to maintain brand integrity across all localized pages. Ensured typography, color palettes (PayPal Blue & Gold), and iconography remained consistent with global guidelines. Using Auto Layout, I managed text expansion challenges across languages to prevent layout breakage. Collaborated closely with engineering teams to ensure pixel-perfect implementation.',
    results:
      'Successfully launched fully localized landing pages maintaining 100% visual consistency with the US global brand while meeting all local legal and commercial requirements across UK, France, Spain, and Mexico.',
  },
  {
    id: 1,
    title: 'Insurance Transformation – Legacy to Modern UX Redesign',
    role: 'UX/UI Designer & Product Designer',
    image: '/images/seguros_header.jpg',
    images: [
      '/images/Seguros_wireframe_v1.jpg',
      '/images/Seguros_wireframe_v3.jpg',
      '/images/Seguros_wireframe_v4.jpg',
      '/images/11.jpg',
    ],
    link: '#',
    size: 'small',
    tags: ['UX Research', 'Wireframing', 'Figma', 'Responsive Design'],
    problem:
      'The legacy insurance website (K&K) suffered from outdated design, poor user experience, and low conversion rates. Users struggled with complex forms, unclear navigation, and a lack of transparency in policy information. The platform failed to meet modern user expectations and was losing potential customers to competitors.',
    solution:
      'I conducted comprehensive UX research including user interviews, persona development, and competitive analysis. Redesigned the entire platform with a modern, user-centered approach focusing on clarity, transparency, and ease of use. Implemented simplified forms, clear policy information, and improved mobile responsiveness. Created a visual comparison system to showcase the transformation.',
    results:
      'Dramatic improvement in user experience with increased engagement, higher conversion rates, and positive user feedback. Successfully modernized the platform while maintaining trust and credibility.',
  },
  // Row 2: Urrea (2 cols) + Fortius (1 col) = 3
  {
    id: 2,
    title: 'Urrea Online – E-commerce for 10,000+ SKUs',
    role: 'Digital Platforms Administrator & UX Designer',
    image: '/images/URREAONLINE.COM_Mesa_de_trabajo_1.webp',
    images: [
      '/images/urr_1.webp',
      '/images/urr_2.webp',
      '/images/urr_5.webp',
      '/images/urr_6.webp',
      '/images/urr_6.png',
    ],
    link: '#',
    size: 'medium',
    isDemo: false,
    tags: ['WooCommerce', 'E-commerce', 'UX Design', 'WordPress'],
    problem:
      'Grupo Urrea needed a unified e-commerce platform to manage 10,000+ SKUs across three tool brands (Urrea, Surtek, Lock). The existing platform had a low conversion rate (1.2%), users struggled to find products, and the design was outdated and not responsive — creating friction on mobile and slowing down bulk ordering for distributors.',
    solution:
      'Redesigned the complete e-commerce experience with a mobile-first approach on WooCommerce. Implemented advanced filtering and smart search across 10K+ products, tiered pricing for distributors, bulk ordering capabilities, and an internal operations dashboard. Optimized visual hierarchy and calls-to-action to better guide purchase decisions.',
    results:
      'Conversion rate increased from 1.2% to 3.8%. Time on site +45%, bounce rate -30%. Mobile sales increased by 120%. Order processing time reduced by 60%.',
  },
  {
    id: 10,
    title: 'Fortius – Corporate Website & Brand Presence',
    role: 'Web Designer & Developer',
    image: '/images/fortius.jpg',
    images: [
      '/images/fortius_mok.jpg',
      '/images/fortius.jpg',
    ],
    link: 'https://www.fortius.com.mx/',
    size: 'small',
    tags: ['WordPress', 'Web Design', 'Responsive', 'Corporate'],
    problem:
      'Fortius, a financial and investment company, needed a professional digital presence to establish credibility and attract high-value clients. Their existing website was outdated and did not reflect the company\'s positioning in the market.',
    solution:
      'Designed and developed a clean, modern corporate website on WordPress that communicates trust and professionalism. Created a responsive layout with clear value propositions, service breakdowns, and streamlined contact flows. Focused on a premium aesthetic with careful typography and whitespace.',
    results:
      'Delivered a polished, responsive website that strengthened Fortius\' digital brand presence and improved client acquisition through a professional online experience.',
  },
  // Row 3: Vytal (2 cols) + Eres Mi Tipo (1 col) = 3
  {
    id: 8,
    title: 'Vytal – Healthcare E-commerce & Prescription Dashboard',
    role: 'Product Designer / UI Designer',
    image: '/images/header_vytal_healthcare.jpg',
    images: [
      '/images/XL - Ecom - Consumer - Orders – 1.png',
      '/images/XL - Ecom - Consumer - Orders – 4.png',
      '/images/XL - Ecom - Consumer - Orders – 5.png',
      '/images/XL - Ecom - Consumer - Orders – 6.png',
      '/images/XL - Ecom - Consumer - Orders – 7.png',
      '/images/XL - Ecom - Consumer - Orders – 8.png',
      '/images/XL - Ecom - Consumer - Orders.png',
    ],
    link: '#',
    size: 'medium',
    tags: ['Product Design', 'Figma', 'Healthcare', 'Dashboard'],
    problem:
      'Healthcare interfaces are often cluttered and confusing, especially when dealing with insurance copays versus cash payments. Patients struggled with managing prescriptions, understanding payment structures, and tracking medication deliveries — leading to anxiety and confusion in an already stressful context.',
    solution:
      'Designed a healthcare delivery platform that transformed prescription management into a seamless, modern e-commerce experience. Created smart order tracking with visual timelines, flexible payment flows distinguishing "Insurance Copay" from "Cash Payments," simplified Rx refill features, and a calming visual language with friendly illustrations. Tools: Figma, Adobe Suite.',
    results:
      'Successfully transformed prescription management from a stressful experience into an intuitive, modern journey. Users gained clear visibility into order status and payment breakdowns, improving trust in the healthcare delivery process.',
  },
  {
    id: 11,
    title: 'Eres Mi Tipo – Blood Donation App',
    role: 'UX/UI Designer & Co-creator',
    image: '/images/eresmitipo1.jpg',
    images: [
      '/images/eresmitipo1.jpg',
      '/images/eresmitipo2.jpg',
      '/images/voy_iteso.png',
      '/images/unete_1.png',
    ],
    link: '#',
    size: 'small',
    tags: ['Mobile App', 'Social Impact', 'UX Research', 'Award Winner'],
    problem:
      'Mexico faces a critical blood donation shortage — fewer than 3% of donations are voluntary. There was no accessible platform connecting willing donors with blood banks in real time, making it difficult for people to find nearby donation centers or understand eligibility requirements.',
    solution:
      'Co-created "Eres Mi Tipo," a mobile app that connects blood donors with nearby blood banks in Guadalajara. Designed the complete UX/UI including donor profiles, real-time blood bank locations, donation scheduling, and educational content about blood donation. The app was developed at ITESO\'s Mobile Lab in partnership with Microsoft.',
    results:
      'Won the COECYTJAL 2015 award for innovation. Featured in ITESO news, Tec Review, and CONACYT Press. The app raised awareness and facilitated voluntary blood donations across the Guadalajara metropolitan area.',
  },
  // Row 4: Operations (2 cols) + Medical (1 col) = 3
  {
    id: 9,
    title: 'Operations Platform & Client Dashboard',
    role: 'Digital Platforms Administrator',
    image: '/images/proyecto_cliente.webp',
    images: [
      '/images/dashboard_cliente_2.png',
      '/images/dashboard_op.png',
      '/images/dashboard_operaciones_.png',
      '/images/tablet.png',
    ],
    link: '#',
    size: 'medium',
    isDemo: false,
    tags: ['Dashboard', 'Data Visualization', 'UX Design', 'Real-time'],
    problem:
      'A field service company relied on isolated views and manual reports, causing delays in decision-making and zero visibility into the real status of clients, orders, and operations. Report generation was entirely manual, consuming hours every week.',
    solution:
      'Built a real-time operations management system with consolidated operational and client dashboards, prioritizing critical KPIs, automated alerts, and clear workflows. Created a client portal for self-service tracking and automated reporting pipelines that eliminated manual report generation.',
    results:
      '100% digitized operations, 40% faster decision-making, and zero manual report hours per week. Cross-team coordination improved with a unified view of operational status.',
  },
  {
    id: 12,
    title: 'Medical Practice – Doctor Website',
    role: 'Web Designer & Developer',
    image: '/images/dr_pagina.png',
    images: [
      '/images/dr_pagina.png',
    ],
    link: 'https://cirugiagdl.mx/',
    size: 'small',
    tags: ['WordPress', 'Healthcare', 'SEO', 'Responsive'],
    problem:
      'A medical professional in Guadalajara needed a trustworthy online presence to attract patients and provide clear information about surgical services, qualifications, and appointment booking.',
    solution:
      'Designed and built a professional medical website on WordPress with a focus on trust signals — clean design, clear credentials display, service descriptions, patient testimonials, and an easy appointment booking flow. Optimized for local SEO to increase visibility in Guadalajara search results.',
    results:
      'The website established a strong digital presence for the medical practice, driving new patient inquiries through organic search and a clear, professional online experience.',
  },
  // Row 5: DEV Consultores (1 col) + AmazonProject (2 cols from page.tsx) = 3
  {
    id: 14,
    title: 'DEV Consultores – Enterprise Dashboards & Web Apps',
    role: 'UX/UI Designer',
    image: '/images/15.webp',
    images: [
      '/images/afo_2.webp',
      '/images/clo_1.webp',
      '/images/clo_2.webp',
      '/images/om31.webp',
    ],
    link: '#',
    size: 'small',
    tags: ['Enterprise', 'Dashboard', 'Figma', 'Web Apps'],
    problem:
      'DEV Consultores needed consistent, user-friendly interfaces for their enterprise consulting clients — including data dashboards, internal tools, and client-facing web applications with complex data requirements.',
    solution:
      'Designed intuitive enterprise dashboards and web applications focused on data clarity and ease of use. Created consistent UI component libraries, defined interaction patterns for complex data tables, and ensured responsive layouts for both desktop and tablet use cases.',
    results:
      'Delivered a suite of enterprise tools that improved client satisfaction and reduced support requests through clearer, more intuitive interfaces.',
  },
];
