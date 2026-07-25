'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { applyTheme, readTheme, type Theme } from '@/lib/theme';

export default function ThemeToggle() {
  // El valor real lo fija el script del layout antes de pintar; aquí sólo
  // sincronizamos el icono una vez montado.
  const [theme, setTheme] = useState<Theme>('noche');

  useEffect(() => setTheme(readTheme()), []);

  const toggle = () => {
    const next: Theme = theme === 'noche' ? 'papel' : 'noche';
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'noche' ? 'Cambiar a tema papel' : 'Cambiar a tema noche'}
      title={theme === 'noche' ? 'Tema papel' : 'Tema noche'}
      className="rounded-pill border border-line/60 bg-surface/60 p-2 text-muted transition hover:border-line hover:text-ink"
    >
      {theme === 'noche' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
