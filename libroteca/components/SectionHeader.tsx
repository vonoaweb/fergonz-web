import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Enlace secundario alineado a la derecha del título. */
  action?: { href: string; label: string };
  icon?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  icon,
}: Props) {
  return (
    <div className="mb-5">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="flex items-center gap-2 font-display text-[1.35rem] text-ink">
          {icon}
          {title}
        </h2>

        {action && (
          <Link
            href={action.href}
            className="text-xs text-muted underline-offset-4 transition hover:text-ink hover:underline"
          >
            {action.label}
          </Link>
        )}
      </div>

      {description && (
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
