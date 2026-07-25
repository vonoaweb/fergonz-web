'use client';

import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'plum' | 'ghost';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-on-accent hover:brightness-110 active:brightness-95 shadow-card',
  plum: 'bg-plum text-white hover:brightness-110 active:brightness-95 shadow-card',
  ghost: 'border border-line/70 bg-surface/60 text-ink hover:border-line hover:bg-raised',
};

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  className = '',
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
      {children}
    </Link>
  );
}
