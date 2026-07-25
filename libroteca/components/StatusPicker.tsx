'use client';

import { BookMarked, BookOpenCheck, Bookmark, PauseCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReadingStatus } from '@/lib/types';

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  pendiente: 'Por leer',
  leyendo: 'Leyendo',
  leido: 'Leído',
  abandonado: 'Abandonado',
};

export const STATUS_ICONS: Record<ReadingStatus, LucideIcon> = {
  pendiente: Bookmark,
  leyendo: BookMarked,
  leido: BookOpenCheck,
  abandonado: PauseCircle,
};

/**
 * Cada estado tiene su propio matiz. Los tonos claros van primero y `dark:`
 * cubre el tema noche, donde el mismo color necesita más luminosidad.
 */
export const STATUS_STYLES: Record<ReadingStatus, string> = {
  pendiente:
    'border-sky-600/30 bg-sky-500/12 text-sky-700 dark:border-sky-400/35 dark:text-sky-300',
  leyendo:
    'border-amber-600/35 bg-amber-500/14 text-amber-700 dark:border-amber-400/35 dark:text-amber-300',
  leido:
    'border-emerald-600/30 bg-emerald-500/12 text-emerald-700 dark:border-emerald-400/35 dark:text-emerald-300',
  abandonado: 'border-line/70 bg-surface/60 text-faint',
};

const ORDER: ReadingStatus[] = ['pendiente', 'leyendo', 'leido', 'abandonado'];

export function StatusBadge({ status }: { status: ReadingStatus }) {
  const Icon = STATUS_ICONS[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill border px-2 py-0.5 text-2xs font-medium ${STATUS_STYLES[status]}`}
    >
      <Icon size={11} />
      {STATUS_LABELS[status]}
    </span>
  );
}

interface Props {
  value: ReadingStatus | null;
  onChange: (status: ReadingStatus) => void;
}

export default function StatusPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ORDER.map((status) => {
        const Icon = STATUS_ICONS[status];
        const active = value === status;
        return (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-xs font-medium transition duration-200 ease-out ${
              active
                ? STATUS_STYLES[status]
                : 'border-line/60 bg-surface/50 text-muted hover:border-line hover:bg-raised hover:text-ink'
            }`}
          >
            <Icon size={12} />
            {STATUS_LABELS[status]}
          </button>
        );
      })}
    </div>
  );
}
