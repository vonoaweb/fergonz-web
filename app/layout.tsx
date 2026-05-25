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
  title: 'Ferguson González | UX/UI Designer & Digital Product Developer',
  description: 'UX/UI Designer with 10+ years of experience. Worked with Amazon, PayPal, and Urrea. Based in Guadalajara, Mexico.',
  keywords: ['UX Designer', 'UI Designer', 'Product Designer', 'Frontend Developer', 'Guadalajara', 'Ferguson González'],
  authors: [{ name: 'Ferguson González' }],
  openGraph: {
    title: 'Ferguson González | UX/UI Designer & Developer',
    description: 'UX/UI Designer with 10+ years of experience creating user-centered digital experiences.',
    url: 'https://fergonz-web.vercel.app',
    siteName: 'Ferguson González Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferguson González | UX/UI Designer & Developer',
    description: 'UX/UI Designer with 10+ years of experience creating user-centered digital experiences.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
