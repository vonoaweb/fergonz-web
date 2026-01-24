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
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Insurance Transformation – Legacy to Modern UX Redesign',
    role: 'UX/UI Designer & Product Designer',
    image: '/images/pantalla_2.webp',
    images: [
      '/images/pantalla_3.webp',
      '/images/pantalla_4.webp',
    ],
    link: '#',
    size: 'medium',
    problem:
      'The legacy insurance website (K&K) suffered from outdated design, poor user experience, and low conversion rates. Users struggled with complex forms, unclear navigation, and a lack of transparency in policy information. The platform failed to meet modern user expectations and was losing potential customers to competitors with better digital experiences.',
    solution:
      'I conducted comprehensive UX research including user interviews, persona development, and competitive analysis. Redesigned the entire platform with a modern, user-centered approach focusing on clarity, transparency, and ease of use. Implemented a clean, intuitive interface with simplified forms, clear policy information, and improved mobile responsiveness. Created a visual comparison system to showcase the transformation from legacy to modern design.',
    results:
      'The redesign resulted in a dramatic improvement in user experience, with increased engagement, higher conversion rates, and positive user feedback. The new design successfully modernized the insurance platform while maintaining trust and credibility.',
  },
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
    problem:
      'PayPal required a unified user experience across its global markets while respecting unique regional requirements. The main challenge was to standardize the visual interface (UI) for the EMEA region (UK, France, Spain) without breaking the Global Design System, while simultaneously adapting content for: local currencies (seamlessly integrating Pounds £ and Euros €), regional products (highlighting specific credit offers like "Pay in 3" in UK vs. "Paiement en 4X" in France), and legal compliance (strict adherence to regulations such as FCA - Financial Conduct Authority mandates in the UK).',
    solution:
      'I worked on UI adaptation using Figma, leveraging Master Components to maintain brand integrity across all localized pages. Visual Standardization: I ensured that typography, color palettes (PayPal Blue & Gold), and iconography remained consistent with global brand guidelines. Responsive Content: Using Figma\'s Auto Layout, I managed text expansion challenges typical of multi-language support (e.g., French/Spanish copy requiring more space than English) to prevent layout breakage. Production Oversight: I collaborated with engineering teams to ensure the final live build matched design specifications pixel-for-pixel. Tools: Figma (Auto Layout, Component Management). Regions: UK, France, Spain, Mexico.',
    results:
      'The project resulted in the successful launch of fully localized landing pages that maintain 100% visual consistency with the US global brand while meeting all local legal and commercial requirements.',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    role: 'UX/UI Designer',
    image: '/images/URREAONLINE.COM_Mesa_de_trabajo_1.webp',
    images: [
      '/images/urr_2.webp',
      '/images/urr_6.webp',
    ],
    link: '#',
    size: 'medium',
    isDemo: false,
    problem:
      'As a Digital Platforms Administrator, I identified that the platform had a low conversion rate (1.2%) and users reported difficulty finding products. The design was outdated and not responsive, creating friction on mobile devices.',
    solution:
      'With my team, we redesigned the experience with a mobile-first approach. We implemented improved search with smart filters, clear categorization, and personalized recommendations. We also optimized visual hierarchy and calls-to-action to better guide purchase decisions.',
    results:
      'Conversion rate increased to 3.8%, time on site +45%, bounce rate -30%. Mobile sales increased by 120%.',
  },
  {
    id: 8,
    title: 'Vytal – Healthcare E-commerce & Prescription Management Dashboard',
    role: 'Product Designer / UI Designer',
    image: '/images/tuul_m1.webp',
    images: [
      '/images/XL - Ecom - Consumer - Orders – 1.webp',
      '/images/XL - Ecom - Consumer - Orders – 3.webp',
      '/images/iPad Pro de 11 – 1pqd.webp',
      '/images/app_dormir1.webp',
    ],
    link: '#',
    size: 'xlarge',
    problem:
      'Healthcare interfaces are often cluttered and confusing, especially when dealing with insurance copays versus cash payments. The challenge was to create a trusting, transparent, and user-friendly interface that clearly communicated order status and complex payment breakdowns. Patients struggled with managing prescriptions, understanding payment structures, and tracking their medication deliveries, leading to anxiety and confusion in an already stressful healthcare context.',
    solution:
      'Designed a healthcare delivery platform that transformed the stressful experience of managing prescriptions into a seamless, modern e-commerce experience. Smart Order Tracking: Created a visual timeline allowing users to track their delivery from the pharmacy to their door, reducing user anxiety. Flexible Payment Flows: Designed a custom checkout flow that clearly distinguishes between "Insurance Copay" and "Cash Payments," giving users complete clarity on what they owe. Rx Management: Simplified "Refill Rx" features for recurring prescriptions, making it easy for users to manage their medication needs. Reassurance UX: Used friendly illustrations and clean typography to create a calming user experience, essential for health-related products. Tools: Figma, Adobe Suite.',
    results:
      'The platform successfully transformed prescription management from a stressful experience into an intuitive, modern e-commerce journey. Users gained clear visibility into order status and payment breakdowns, reducing anxiety and improving trust in the healthcare delivery process.',
  },
  {
    id: 9,
    title: 'Operations Platform & Client Dashboard',
    role: 'Digital Platforms Administrator',
    image: '/images/afo_2.webp',
    images: [
      '/images/afo_2.webp',
      '/images/om31.webp',
      '/images/pantalla_2.webp',
      '/images/pantalla_3.webp',
    ],
    link: '#',
    size: 'medium',
    isDemo: false,
    problem:
      'Operations relied on isolated views and manual reports, which caused delays in decision-making and limited visibility into the real status of clients, orders, and operations.',
    solution:
      'With my team, we consolidated information into operational and client dashboards, prioritizing critical KPIs, alerts, and clear workflows. We standardized layouts and components to speed up maintenance and daily scanning.',
    results:
      'Analysis time decreased, cross-team coordination improved, and a unified view of operational status was achieved.',
  },
];
