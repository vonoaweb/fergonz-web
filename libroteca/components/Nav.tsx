'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Compass, Library, ScanLine, Users, PenLine } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

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
      <header className="sticky top-0 z-40 border-b border-line/50 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg tracking-tight text-ink"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <BookOpen size={15} />
            </span>
            Libroteca
          </Link>

          <nav className="ml-auto hidden items-center gap-0.5 sm:flex">
            {LINKS.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm transition duration-200 ${
                    active
                      ? 'text-ink'
                      : 'text-muted hover:bg-surface/70 hover:text-ink'
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-pill border border-accent/35 bg-accent/12"
                    />
                  )}
                  <Icon size={15} className={active ? 'text-accent' : ''} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto sm:ml-1">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Barra inferior en móvil: la app se usa con el libro en la otra mano. */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line/50 bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:hidden">
        <div className="flex">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px]"
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 top-0 h-0.5 rounded-b bg-accent"
                  />
                )}
                <Icon
                  size={19}
                  className={active ? 'text-accent' : 'text-faint'}
                />
                <span className={active ? 'text-ink' : 'text-faint'}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
