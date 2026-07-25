'use client';

import { useState } from 'react';
import { bookCoverUrl } from '@/lib/openlibrary';
import type { Book } from '@/lib/types';

const GRADIENTS = [
  'from-plum-600 to-ink-800',
  'from-ember-600 to-ink-800',
  'from-emerald-700 to-ink-800',
  'from-rose-700 to-ink-800',
  'from-sky-700 to-ink-800',
  'from-amber-700 to-ink-800',
];

/** Gradiente estable por título: la misma portada falsa en cada render. */
function gradientFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

interface Props {
  book: Pick<Book, 'title' | 'authors' | 'coverId' | 'isbn'>;
  size?: 'S' | 'M' | 'L';
  className?: string;
}

export default function BookCover({ book, size = 'M', className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  const url = bookCoverUrl(book, size);

  // Open Library devuelve una imagen de 1px cuando no tiene portada, así que
  // también tratamos como fallo cualquier imagen sospechosamente pequeña.
  const showFallback = !url || failed;

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-ink-800 ring-1 ring-white/10 ${className}`}
    >
      {showFallback ? (
        <div
          className={`flex h-full w-full flex-col justify-end bg-gradient-to-br p-2 ${gradientFor(
            book.title
          )}`}
        >
          <p className="font-serif text-[11px] leading-tight text-white/95 line-clamp-4">
            {book.title}
          </p>
          <p className="mt-1 text-[9px] uppercase tracking-wide text-white/60 line-clamp-1">
            {book.authors[0] ?? 'Anónimo'}
          </p>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={url}
          alt={`Portada de ${book.title}`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
          onLoad={(event) => {
            if (event.currentTarget.naturalWidth <= 2) setFailed(true);
          }}
        />
      )}
    </div>
  );
}
