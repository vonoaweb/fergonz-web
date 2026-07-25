'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Compass, Library, ScanLine, Users, PenLine } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Descubre', icon: Compass },
  { href: '/biblioteca', label: 'Biblioteca', icon: Library },
  { href: '/escanear', label: 'Escanear', icon: ScanLine },
  { href: '/comunidad', label: 'Comunidad', icon: Users },
  { href: '/finales', label: 'Finales', icon: PenLine },
] as const;

function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-serif text-lg text-paper-50">
            <BookOpen size={20} className="text-ember-400" />
            Libroteca
          </Link>

          <nav className="ml-auto hidden items-center gap-1 sm:flex">
            {LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(pathname, href) ? 'page' : undefined}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
                  isActive(pathname, href)
                    ? 'bg-ember-500/15 text-ember-400'
                    : 'text-paper-100/60 hover:bg-white/5 hover:text-paper-50'
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Barra inferior en móvil: la app se usa sobre todo con el libro en la mano. */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/95 backdrop-blur-xl sm:hidden">
        <div className="flex">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(pathname, href) ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] transition ${
                isActive(pathname, href) ? 'text-ember-400' : 'text-paper-100/50'
              }`}
            >
              <Icon size={19} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
