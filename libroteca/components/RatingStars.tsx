'use client';

import { Star } from 'lucide-react';

interface Props {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  label?: string;
}

export default function RatingStars({ value, onChange, size = 16, label }: Props) {
  const readOnly = !onChange;

  return (
    <div
      className="flex items-center gap-0.5"
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={label ?? `Puntuación: ${value} de 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        const icon = (
          <Star
            size={size}
            className={filled ? 'fill-accent text-accent' : 'text-faint/50'}
          />
        );

        if (readOnly) return <span key={star}>{icon}</span>;

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} de 5`}
            onClick={() => onChange(star === value ? 0 : star)}
            className="rounded transition duration-200 hover:scale-110"
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}
