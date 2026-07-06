import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fergonz-web.vercel.app'),
  title: 'Fernando González | Senior UX/UI Designer — 10+ Years of Digital Experience',
  description: 'Senior UX/UI Designer with 10+ years transforming business goals into seamless digital experiences. Worked with Amazon, PayPal, and Grupo Urrea. Based in Guadalajara, Mexico.',
  keywords: ['UX Designer', 'UI Designer', 'Product Designer', 'Frontend Developer', 'Guadalajara', 'Fernando González', 'Web Design', 'E-commerce', 'React Native', 'WordPress', 'VonoaWeb'],
  authors: [{ name: 'Fernando González' }],
  openGraph: {
    title: 'Fernando González | UX/UI Designer & Developer',
    description: 'UX/UI Designer with 10+ years of experience creating user-centered digital experiences.',
    url: 'https://fergonz-web.vercel.app',
    siteName: 'Fernando González Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fernando González | UX/UI Designer & Developer',
    description: 'UX/UI Designer with 10+ years of experience creating user-centered digital experiences.',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fernando González',
  alternateName: 'FerGonz',
  jobTitle: 'Senior UX/UI Designer & Digital Product Developer',
  url: 'https://fergonz-web.vercel.app',
  email: 'mailto:contacto@fergonz.com',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'ITESO Universidad Jesuita de Guadalajara',
  },
  sameAs: ['https://www.linkedin.com/in/fergonz/', 'https://en.fergonz.com'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Guadalajara',
    addressCountry: 'MX',
  },
  knowsAbout: [
    'UX Design',
    'UI Design',
    'Design Systems',
    'User Research',
    'E-commerce',
    'React',
    'Next.js',
    'React Native',
    'WordPress',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
