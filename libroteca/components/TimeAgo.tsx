'use client';

import { useEffect, useState } from 'react';
import { relativeTime } from '@/lib/format';

/**
 * Las páginas se prerenderizan en el build, así que un "hace 3 días" calculado
 * en el servidor no coincide con el del navegador y rompe la hidratación.
 * Por eso la etiqueta se rellena sólo después de montar.
 */
export default function TimeAgo({ at, className }: { at: number; className?: string }) {
  const [label, setLabel] = useState('');

  useEffect(() => setLabel(relativeTime(at)), [at]);

  return (
    <span className={className} suppressHydrationWarning>
      {label}
    </span>
  );
}
