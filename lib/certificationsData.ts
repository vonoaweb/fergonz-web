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
    date: "Dec 2022",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/GY4UVVKGEP85",
    type: "Professional Certificate"
  },
  {
    title: "Web Development Specialization",
    issuer: "Coursera",
    date: "2023", 
    link: "https://www.coursera.org/account/accomplishments/verify/H5N7KMHBGABS",
    type: "Specialization"
  },
  {
    title: "Complete Web Development Course",
    issuer: "Udemy",
    date: "2023",
    link: "https://www.udemy.com/certificate/UC-D63IBHE5/",
    type: "Course"
  },
  {
    title: "Google Dynamic UI Creation for Websites",
    issuer: "Google / Coursera",
    date: "Dec 2022",
    link: null,
    type: "Course"
  },
  {
    title: "Digital Marketing Fundamentals",
    issuer: "Google Actívate",
    date: "Feb 2022",
    link: null,
    credentialId: "3AY NSD 3CC"
  },
  {
    title: "Introduction to Web Development II",
    issuer: "Google Actívate",
    date: "May 2020",
    link: null,
    credentialId: "L2T RR7 GDX"
  },
  {
    title: "Introduction to Web Development I",
    issuer: "Google Actívate",
    date: "Apr 2020",
    link: null,
    credentialId: "TAE ZS5 JVZ"
  },
  {
    title: "WordPress & Divi Advanced Course",
    issuer: "Udemy",
    date: "Jun 2019",
    link: null,
    type: "Course"
  },
  {
    title: "Web Design Diploma",
    issuer: "eduMac Centro de Artes Digitales",
    date: "Oct 2018",
    link: null,
    type: "Diploma"
  },
  {
    title: "Social Media Management & Basic Programming Diploma",
    issuer: "ITESO Universidad Jesuita de Guadalajara",
    date: "Apr 2017",
    link: null,
    type: "Diploma"
  }
];
