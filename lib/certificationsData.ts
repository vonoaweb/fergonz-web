export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string | null;
  type?: string;
  credentialId?: string;
}

export const certificationsData: Certification[] = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google / Coursera",
    date: "2023",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/GY4UVVKGEP85",
    type: "Professional Certificate"
  },
  {
    title: "Especialización en Desarrollo Web",
    issuer: "Coursera",
    date: "2023", 
    link: "https://www.coursera.org/account/accomplishments/verify/H5N7KMHBGABS",
    type: "Specialization"
  },
  {
    title: "Curso Completo de Desarrollo Web",
    issuer: "Udemy",
    date: "2023",
    link: "https://www.udemy.com/certificate/UC-D63IBHE5/",
    type: "Course"
  },
  {
    title: "Fundamentos de Marketing Digital",
    issuer: "Google Actívate",
    date: "Feb 2022",
    link: null,
    credentialId: "3AY NSD 3CC"
  },
  {
    title: "Introducción al Desarrollo Web II",
    issuer: "Google Actívate",
    date: "May 2020",
    link: null,
    credentialId: "L2T RR7 GDX"
  },
  {
    title: "Introducción al Desarrollo Web I",
    issuer: "Google Actívate",
    date: "Abr 2020",
    link: null,
    credentialId: "TAE ZS5 JVZ"
  }
];
