'use client';

import type { ReadingStatus } from '@/lib/types';

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  pendiente: 'Por leer',
  leyendo: 'Leyendo',
  leido: 'Leído',
  abandonado: 'Abandonado',
};

export const STATUS_STYLES: Record<ReadingStatus, string> = {
  pendiente: 'bg-sky-500/15 text-sky-300 ring-sky-400/30',
  leyendo: 'bg-ember-500/15 text-ember-400 ring-ember-400/30',
  leido: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
  abandonado: 'bg-white/5 text-paper-100/50 ring-white/15',
};

const ORDER: ReadingStatus[] = ['pendiente', 'leyendo', 'leido', 'abandonado'];

export function StatusBadge({ status }: { status: ReadingStatus }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${STATUS_STYLES[status]}`}
    >
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
      {ORDER.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onChange(status)}
          aria-pressed={value === status}
          className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${
            value === status
              ? STATUS_STYLES[status]
              : 'text-paper-100/60 ring-white/10 hover:bg-white/5 hover:text-paper-50'
          }`}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
