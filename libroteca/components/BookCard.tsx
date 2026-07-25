'use client';

import Link from 'next/link';
import { Check, NotebookPen, PenLine, Plus } from 'lucide-react';
import BookCover from './BookCover';
import RatingStars from './RatingStars';
import { StatusBadge } from './StatusPicker';
import { authorLine, bookHref } from '@/lib/format';
import { useStore } from '@/lib/store';
import type { Book } from '@/lib/types';

interface Props {
  book: Book;
  reasons?: string[];
  /** Muestra el botón de guardar rápido en la esquina de la tarjeta. */
  quickAdd?: boolean;
}

export default function BookCard({ book, reasons, quickAdd = true }: Props) {
  const { state, dispatch, shelfEntry } = useStore();
  const entry = shelfEntry(book.id);
  const noteCount = state.notes.filter((n) => n.bookId === book.id).length;
  const endingCount = state.endings.filter((e) => e.bookId === book.id).length;

  return (
    <article className="card card-hover group relative flex gap-4 p-4">
      <Link
        href={bookHref(book.id)}
        className="shrink-0"
        tabIndex={-1}
        aria-hidden
      >
        <BookCover book={book} className="h-[126px] w-[84px]" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <Link href={bookHref(book.id)} className="block">
          <h3 className="font-display text-base leading-snug text-ink line-clamp-2">
            {book.title}
          </h3>
          <p className="mt-1 text-xs text-muted line-clamp-1">
            {authorLine(book.authors)}
            {book.year ? ` · ${book.year}` : ''}
          </p>
        </Link>

        {entry && (
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <StatusBadge status={entry.status} />
            {entry.rating ? <RatingStars value={entry.rating} size={13} /> : null}
          </div>
        )}

        {reasons?.length ? (
          <ul className="mt-2.5 space-y-1">
            {reasons.slice(0, 2).map((reason) => (
              <li
                key={reason}
                className="flex gap-1.5 text-2xs leading-relaxed text-muted"
              >
                <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                {reason}
              </li>
            ))}
          </ul>
        ) : null}

        {(noteCount > 0 || endingCount > 0) && (
          <div className="mt-auto flex items-center gap-3 pt-2.5 text-2xs text-faint">
            {noteCount > 0 && (
              <span className="flex items-center gap-1">
                <NotebookPen size={12} />
                {noteCount}
              </span>
            )}
            {endingCount > 0 && (
              <span className="flex items-center gap-1 text-plum/80">
                <PenLine size={12} />
                {endingCount}
              </span>
            )}
          </div>
        )}
      </div>

      {quickAdd &&
        (entry ? (
          <span
            title="Ya está en tu biblioteca"
            className="absolute right-3 top-3 rounded-pill border border-emerald-600/30 bg-emerald-500/12 p-1.5 text-emerald-700 dark:border-emerald-400/35 dark:text-emerald-300"
          >
            <Check size={13} />
          </span>
        ) : (
          <button
            type="button"
            onClick={() => dispatch({ type: 'addToShelf', book, status: 'pendiente' })}
            aria-label={`Añadir ${book.title} a por leer`}
            className="absolute right-3 top-3 rounded-pill border border-line/60 bg-surface/80 p-1.5 text-muted opacity-0 transition duration-200 hover:border-accent/45 hover:bg-accent/15 hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
          >
            <Plus size={13} />
          </button>
        ))}
    </article>
  );
}
