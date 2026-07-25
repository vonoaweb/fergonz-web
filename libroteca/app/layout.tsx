import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Literata } from 'next/font/google';
import Nav from '@/components/Nav';
import { StoreProvider } from '@/lib/store';
import { THEME_STORAGE_KEY } from '@/lib/theme';
import './globals.css';

// Tres familias con un trabajo cada una: titular, interfaz y lectura larga.
// Fraunces se carga como fuente variable, así que no lleva `weight`.
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const read = Literata({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-read',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Libroteca — recomienda, anota, reescribe',
  description:
    'Descubre libros, guarda tus notas, escanea el ISBN de cualquier ejemplar y escribe tu propio final junto a una comunidad de lectores.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0a0f' },
    { media: '(prefers-color-scheme: light)', color: '#f4eee3' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/**
 * Aplica el tema guardado antes del primer pintado. Sin esto, el tema claro
 * parpadea en oscuro durante la hidratación.
 */
const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});document.documentElement.dataset.theme=(t==='papel'||t==='noche')?t:'noche';}catch(e){document.documentElement.dataset.theme='noche';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-theme="noche"
      className={`${display.variable} ${sans.variable} ${read.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <StoreProvider>
          <Nav />
          <main className="stack-layer pb-nav mx-auto max-w-5xl px-5 pt-8 sm:px-6">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
