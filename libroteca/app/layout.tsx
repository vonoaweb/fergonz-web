import type { Metadata, Viewport } from 'next';
import Nav from '@/components/Nav';
import { StoreProvider } from '@/lib/store';
import './globals.css';

export const metadata: Metadata = {
  title: 'Libroteca — recomienda, anota, reescribe',
  description:
    'Descubre libros, guarda tus notas, escanea el ISBN de cualquier ejemplar y escribe tu propio final junto a una comunidad de lectores.',
};

export const viewport: Viewport = {
  themeColor: '#0b0a0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          <Nav />
          <main className="pb-nav mx-auto max-w-5xl px-4 pt-6">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
