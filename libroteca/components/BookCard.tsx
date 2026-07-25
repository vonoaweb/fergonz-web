'use client';

import Link from 'next/link';
import { NotebookPen, PenLine, Plus, Check } from 'lucide-react';
import BookCover from './BookCover';
import RatingStars from './RatingStars';
import { StatusBadge } from './StatusPicker';
import { authorLine, bookHref } from '@/lib/format';
import { useStore } from '@/lib/store';
import type { Book } from '@/lib/types';

interface Props {
  book: Book;
  reasons?: string[];
  /** Muestra el botón de guardar rápido en la esquina de la portada. */
  quickAdd?: boolean;
}

export default function BookCard({ book, reasons, quickAdd = true }: Props) {
  const { state, dispatch, shelfEntry } = useStore();
  const entry = shelfEntry(book.id);
  const noteCount = state.notes.filter((n) => n.bookId === book.id).length;
  const endingCount = state.endings.filter((e) => e.bookId === book.id).length;

  return (
    <article className="group relative flex gap-3 rounded-xl border border-white/10 bg-ink-900/60 p-3 transition hover:border-white/20 hover:bg-ink-800/60">
      <Link href={bookHref(book.id)} className="shrink-0">
        <BookCover book={book} className="h-[104px] w-[70px]" />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={bookHref(book.id)} className="block">
          <h3 className="font-serif text-[15px] leading-snug text-paper-50 line-clamp-2">
            {book.title}
          </h3>
          <p className="mt-0.5 text-xs text-paper-100/55 line-clamp-1">
            {authorLine(book.authors)}
            {book.year ? ` · ${book.year}` : ''}
          </p>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {entry && <StatusBadge status={entry.status} />}
          {entry?.rating ? <RatingStars value={entry.rating} size={13} /> : null}
        </div>

        {reasons?.length ? (
          <ul className="mt-2 space-y-0.5">
            {reasons.slice(0, 2).map((reason) => (
              <li key={reason} className="text-[11px] text-plum-400/85">
                · {reason}
              </li>
            ))}
          </ul>
        ) : null}

        {(noteCount > 0 || endingCount > 0) && (
          <div className="mt-2 flex items-center gap-3 text-[11px] text-paper-100/45">
            {noteCount > 0 && (
              <span className="flex items-center gap-1">
                <NotebookPen size={12} />
                {noteCount}
              </span>
            )}
            {endingCount > 0 && (
              <span className="flex items-center gap-1">
                <PenLine size={12} />
                {endingCount}
              </span>
            )}
          </div>
        )}
      </div>

      {quickAdd && !entry && (
        <button
          type="button"
          onClick={() => dispatch({ type: 'addToShelf', book, status: 'pendiente' })}
          aria-label={`Añadir ${book.title} a por leer`}
          className="absolute right-2 top-2 rounded-full bg-white/5 p-1.5 text-paper-100/60 opacity-0 ring-1 ring-white/10 transition hover:bg-ember-500/20 hover:text-ember-400 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Plus size={14} />
        </button>
      )}

      {quickAdd && entry && (
        <span className="absolute right-2 top-2 rounded-full bg-emerald-500/15 p-1.5 text-emerald-300 ring-1 ring-emerald-400/25">
          <Check size={14} />
        </span>
      )}
    </article>
  );
}
