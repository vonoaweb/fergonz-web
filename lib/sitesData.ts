export interface Site {
  name: string;
  url: string;
  /** Short eyebrow shown above the name. */
  category: string;
  description: string;
  image: string;
  stack: string[];
}

/**
 * Live client websites designed and built through VonoaWeb, my studio.
 * Every entry links to a site that is online right now — screenshots are
 * captures of the real production pages.
 */
export const sites: Site[] = [
  {
    name: 'Taller Metro',
    url: 'https://tallermetro.com/',
    category: 'Architecture & Urbanism',
    description:
      'Corporate site for a Guadalajara architecture and urbanism studio: high-resolution project galleries, an editorial blog for SEO, and a contact flow built to turn visits into real enquiries.',
    image: '/images/sites/tallermetro.webp',
    stack: ['WordPress', 'UX/UI', 'SEO', 'Editorial'],
  },
  {
    name: 'Livi México',
    url: 'https://livimexico.com/',
    category: 'Proptech · Housing',
    description:
      'Landing platform for a company that buys, renovates and resells Infonavit housing. The five-step process is the backbone of the page so sellers understand the deal before they enquire.',
    image: '/images/sites/livimexico.webp',
    stack: ['WordPress', 'UX Writing', 'Lead Gen', 'Brand'],
  },
  {
    name: 'Talent Connect',
    url: 'https://talent-connect.com.mx/',
    category: 'Recruitment Agency',
    description:
      'Site for a Guadalajara recruiting firm. Candidate-card UI, success-rate proof points and a structured process section that make an intangible service feel concrete.',
    image: '/images/sites/talentconnect.webp',
    stack: ['Web Design', 'UI Design', 'Conversion', 'B2B'],
  },
  {
    name: 'Moncatu',
    url: 'https://moncatu.com/',
    category: 'E-commerce · Jewelry',
    description:
      'Handmade .925 silver jewelry store. Dark editorial art direction, guided WhatsApp shopping and a headless storefront wired to a Medusa backend with Mercado Pago checkout.',
    image: '/images/sites/moncatu.webp',
    stack: ['Medusa', 'E-commerce', 'Mercado Pago', 'Art Direction'],
  },
  {
    name: 'Ye6 Otay',
    url: 'https://ye6otay.com/',
    category: 'Cross-Border Logistics',
    description:
      'Bilingual site for a 2-hectare warehousing and cross-docking hub in Otay Mesa, San Diego. Structured by service — storage, trailer parking, transloading — for B2B buyers on both sides of the border.',
    image: '/images/sites/ye6otay.webp',
    stack: ['WordPress', 'Bilingual', 'SEO', 'B2B'],
  },
  {
    name: 'Reciclaje de la Costa',
    url: 'https://reciclajedelacosta.com/',
    category: 'Waste Management',
    description:
      'Corporate site for a waste-management company in Colima whose client list includes Coca-Cola, Coppel and Office Depot. Built to win tenders: service depth, environmental impact and institutional trust.',
    image: '/images/sites/reciclaje.webp',
    stack: ['WordPress', 'B2B', 'SEO', 'Corporate'],
  },
  {
    name: 'Desazolves de la Costa',
    url: 'https://desazolvesdelacosta.com/',
    category: 'Sanitation Services',
    description:
      'Sewer-cleaning and septic services in Manzanillo. Emergency-first layout: institutional agreements up front, one-tap WhatsApp, and quote requests reachable from any scroll position.',
    image: '/images/sites/desazolves.webp',
    stack: ['WordPress', 'WhatsApp Business', 'Local SEO', 'B2B'],
  },
  {
    name: 'Pipas de la Costa',
    url: 'https://pipasdelacosta.com/',
    category: 'Water Supply',
    description:
      'Twenty years of potable-water delivery in Manzanillo, brought online. Fleet specs, port-access permits and coverage presented as the credibility argument for industrial buyers.',
    image: '/images/sites/pipas.webp',
    stack: ['WordPress', 'Local SEO', 'Lead Gen', 'B2B'],
  },
  {
    name: 'CIAPSA',
    url: 'https://ciapsa.com/',
    category: 'Offset Printing',
    description:
      'Zapopan printing house with a decade of offset and finishing work. The full production chain — pre-press, UV varnish, die-cutting, gluing — laid out as a technical showcase.',
    image: '/images/sites/ciapsa.webp',
    stack: ['WordPress', 'Industrial', 'B2B', 'SEO'],
  },
  {
    name: 'Fundación BDW',
    url: 'https://fundacionbdw.org/',
    category: 'Non-profit · Wellbeing',
    description:
      'BreatheDance foundation: movement, breathing and emotional health. A warm, human visual identity carrying the mission, the BD Kids programme and a physical agenda sold from the site.',
    image: '/images/sites/fundacionbdw.webp',
    stack: ['WordPress', 'Brand', 'UX/UI', 'Non-profit'],
  },
  {
    name: "Jesa's Cleaning Service",
    url: 'https://jesascleaningservice.ca/',
    category: 'Services · Canada',
    description:
      'English-language site for a Canadian cleaning company covering homes, offices and Airbnb turnovers. Transparent room-by-room pricing and reviews answer the two questions buyers actually have.',
    image: '/images/sites/jesas.webp',
    stack: ['WordPress', 'English', 'Pricing UX', 'Reviews'],
  },
  {
    name: 'Tu Gran Evento',
    url: 'https://tugranevento.com/',
    category: 'Digital Invitations',
    description:
      'Digital wedding and event invitations sold against a market still sending static PDFs. A three-step conversion flow — pick a package, personalise, share by WhatsApp — with tiered pricing.',
    image: '/images/sites/tugranevento.webp',
    stack: ['WordPress', 'E-commerce', 'Conversion', 'Brand'],
  },
];
