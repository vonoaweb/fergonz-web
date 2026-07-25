'use client';

import { useState } from 'react';
import { bookCoverUrl } from '@/lib/openlibrary';
import type { Book } from '@/lib/types';

/**
 * Paleta de portadas inventadas, en la línea de las colecciones de bolsillo
 * clásicas: un color de fondo profundo y tinta crema.
 */
const CLOTHS = [
  '#7c2d12',
  '#1e3a5f',
  '#14532d',
  '#4c1d95',
  '#7f1d1d',
  '#78350f',
  '#164e63',
  '#3b3355',
  '#5b2333',
  '#25453a',
];

/** Color estable por título: la misma portada en cada render. */
function clothFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return CLOTHS[Math.abs(hash) % CLOTHS.length];
}

interface Props {
  book: Pick<Book, 'title' | 'authors' | 'coverId' | 'isbn'>;
  size?: 'S' | 'M' | 'L';
  /** Controla el tamaño; el componente sólo aporta la proporción del libro. */
  className?: string;
  /** Desactiva la inclinación al pasar el ratón (útil en listas densas). */
  flat?: boolean;
  /**
   * Miniatura decorativa: por debajo de ~40 px de ancho no cabe ni el título,
   * así que la portada de respaldo se queda en el color de tela.
   */
  mini?: boolean;
}

export default function BookCover({
  book,
  size = 'M',
  className = '',
  flat = false,
  mini = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const url = bookCoverUrl(book, size);
  const showFallback = !url || failed;

  return (
    <div className={`[perspective:900px] ${className}`}>
      <div
        className={`group/cover relative h-full w-full overflow-hidden rounded-l-[3px] rounded-r-md shadow-book transition duration-300 ease-out [transform-style:preserve-3d] ${
          flat ? '' : 'group-hover:shadow-book-lift group-hover:[transform:rotateY(-9deg)_translateZ(6px)]'
        }`}
      >
        {showFallback ? (
          <FallbackCover
            title={book.title}
            author={book.authors[0]}
            // A tamaño pequeño sólo cabe el título sin que se recorte.
            compact={size === 'S'}
            mini={mini}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={url}
            alt={`Portada de ${book.title}`}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
            // Open Library devuelve un pixel transparente cuando no tiene portada.
            onLoad={(event) => {
              if (event.currentTarget.naturalWidth <= 2) setFailed(true);
            }}
          />
        )}

        {/* Lomo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[9%] min-w-[4px] bg-gradient-to-r from-black/55 via-black/20 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[9%] w-px bg-white/15"
        />
        {/* Canto de las páginas */}
        <div
          aria-hidden
          className="page-edge pointer-events-none absolute inset-y-[2%] right-0 w-[3px] rounded-r-md opacity-70"
        />
        {/* Brillo del barniz */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/25"
        />
      </div>
    </div>
  );
}

function FallbackCover({
  title,
  author,
  compact,
  mini,
}: {
  title: string;
  author?: string;
  compact?: boolean;
  mini?: boolean;
}) {
  const cloth = clothFor(title);

  if (mini) {
    return <div className="h-full w-full" style={{ backgroundColor: cloth }} />;
  }

  if (compact) {
    return (
      <div
        className="flex h-full w-full items-center justify-center p-[8%]"
        style={{ backgroundColor: cloth }}
      >
        <p className="text-center font-display text-[0.5rem] font-medium leading-[1.2] text-[#f7efdf] line-clamp-4">
          {title}
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col justify-between p-[8%]"
      style={{ backgroundColor: cloth }}
    >
      <div className="border-b border-[#f2e8d5]/30 pb-[5%]">
        <span className="block truncate text-[0.45rem] uppercase tracking-eyebrow text-[#f2e8d5]/55">
          Libroteca
        </span>
      </div>

      <p className="font-display text-[0.78rem] font-medium leading-[1.15] text-[#f7efdf] line-clamp-5">
        {title}
      </p>

      <div className="border-t border-[#f2e8d5]/30 pt-[5%]">
        <span className="block truncate text-[0.45rem] uppercase tracking-eyebrow text-[#f2e8d5]/65">
          {author ?? 'Anónimo'}
        </span>
      </div>
    </div>
  );
}
