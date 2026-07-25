'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ChipTone = 'neutral' | 'accent' | 'plum';

const ACTIVE: Record<ChipTone, string> = {
  neutral: 'border-ink/25 bg-ink/10 text-ink',
  accent: 'border-accent/45 bg-accent/15 text-accent',
  plum: 'border-plum/45 bg-plum/15 text-plum',
};

const IDLE =
  'border-line/60 bg-surface/50 text-muted hover:border-line hover:bg-raised hover:text-ink';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  active?: boolean;
  tone?: ChipTone;
  children: ReactNode;
}

/** Pastilla de filtro/selección. Es el único control de este tipo en la app. */
export default function Chip({
  active = false,
  tone = 'accent',
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-xs font-medium transition duration-200 ease-out ${
        active ? ACTIVE[tone] : IDLE
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
