export interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
  current?: boolean;
}

export const experienceData: Experience[] = [
  {
    company: 'VonoaWeb',
    role: 'Founder & Lead Designer/Developer',
    period: '2023 – Present',
    description: 'Leading digital strategy and delivering 20+ projects across web design, mobile apps, e-commerce, and custom platforms.',
    current: true,
  },
  {
    company: 'KenisIT',
    role: 'Senior User Interface Designer',
    period: 'Mar 2021 – Sep 2023',
    description: 'Led UI design for PayPal EMEA localization, insurance platform redesign, and healthcare e-commerce dashboards.',
  },
  {
    company: 'Grupo Urrea',
    role: 'Digital Platforms Administrator',
    period: 'May 2020 – Dec 2020',
    description: 'Managed e-commerce for 10,000+ SKUs across 3 brands. Built operations dashboard and client portal.',
  },
  {
    company: 'Derevo',
    role: 'UX/UI Designer',
    period: 'Aug 2018 – Apr 2020',
    description: 'Designed web and mobile interfaces for various clients. Led user research and prototyping efforts.',
  },
  {
    company: '121 Corp',
    role: 'Digital Designer',
    period: 'Apr 2018 – Aug 2018',
    description: 'Created digital assets, marketing materials, and web interfaces for corporate clients.',
  },
  {
    company: 'DEV Consultores',
    role: 'UX/UI Designer',
    period: 'Aug 2016 – Feb 2018',
    description: 'Designed dashboards, web applications, and user flows for enterprise consulting projects.',
  },
  {
    company: 'Gusanito',
    role: 'UX/UI Designer',
    period: 'Aug 2016 – Dec 2017',
    description: 'Redesigned the user experience for one of Latin America\'s most popular greeting card platforms.',
  },
  {
    company: 'Panther',
    role: 'UX/UI Designer',
    period: 'Aug 2015 – Jul 2016',
    description: 'Created user interfaces and interactive prototypes for web and mobile products.',
  },
  {
    company: 'Mobile Lab ITESO / Microsoft',
    role: 'UX/UI Designer',
    period: 'Jan 2015 – Sep 2015',
    description: 'Designed mobile apps in partnership with Microsoft. Won COECYTJAL 2015 award for "Eres Mi Tipo" blood donation app.',
  },
];
