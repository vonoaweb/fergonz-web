'use client';

import Link from 'next/link';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookX, NotebookPen, PenLine, Trash2 } from 'lucide-react';
import BookCover from '@/components/BookCover';
import EmptyState from '@/components/EmptyState';
import EndingCard from '@/components/EndingCard';
import EndingComposer from '@/components/EndingComposer';
import NoteCard from '@/components/NoteCard';
import NoteComposer from '@/components/NoteComposer';
import RatingStars from '@/components/RatingStars';
import StatusPicker from '@/components/StatusPicker';
import { authorLine, plural } from '@/lib/format';
import { useStore } from '@/lib/store';

type Tab = 'notas' | 'finales';

function BookDetail() {
  const params = useSearchParams();
  const bookId = params.get('id') ?? '';
  const { state, dispatch, ready, shelfEntry, notesFor, endingsFor } = useStore();
  const [tab, setTab] = useState<Tab>('notas');

  const book = state.books[bookId];
  const entry = shelfEntry(bookId);
  const notes = useMemo(() => notesFor(bookId), [notesFor, bookId]);
  const endings = useMemo(() => endingsFor(bookId), [endingsFor, bookId]);

  if (!book) {
    // Antes de hidratar localStorage el catálogo puede no tener el libro aún.
    if (!ready) return <p className="text-sm text-paper-100/45">Cargando…</p>;

    return (
      <EmptyState
        icon={BookX}
        title="No encontramos ese libro"
        description="Puede que lo hayas borrado o que el enlace esté incompleto."
        action={
          <Link
            href="/"
            className="rounded-full bg-ember-500 px-5 py-2 text-sm font-medium text-ink-950 transition hover:bg-ember-400"
          >
            Volver a descubrir
          </Link>
        }
      />
    );
  }

  const progress =
    entry?.currentPage && book.pages
      ? Math.min(100, Math.round((entry.currentPage / book.pages) * 100))
      : null;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 sm:flex-row">
        <BookCover book={book} size="L" className="h-[210px] w-[140px] shrink-0" />

        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-2xl leading-tight text-paper-50">{book.title}</h1>
          <p className="mt-1 text-sm text-paper-100/60">
            {authorLine(book.authors)}
            {book.year ? ` · ${book.year}` : ''}
            {book.pages ? ` · ${book.pages} págs.` : ''}
          </p>

          {book.description && (
            <p className="mt-3 text-sm leading-relaxed text-paper-100/70">
              {book.description}
            </p>
          )}

          {book.subjects.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {book.subjects.slice(0, 6).map((subject) => (
                <span
                  key={subject}
                  className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-paper-100/55"
                >
                  {subject}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 space-y-3">
            <StatusPicker
              value={entry?.status ?? null}
              onChange={(status) =>
                entry
                  ? dispatch({ type: 'setStatus', bookId, status })
                  : dispatch({ type: 'addToShelf', book, status })
              }
            />

            {entry && (
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-paper-100/50">Tu nota</span>
                  <RatingStars
                    value={entry.rating ?? 0}
                    onChange={(rating) => dispatch({ type: 'setRating', bookId, rating })}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => dispatch({ type: 'removeFromShelf', bookId })}
                  className="flex items-center gap-1.5 text-xs text-paper-100/40 transition hover:text-rose-300"
                >
                  <Trash2 size={12} />
                  Quitar de mi biblioteca
                </button>
              </div>
            )}

            {entry?.status === 'leyendo' && book.pages ? (
              <div className="max-w-xs">
                <label
                  htmlFor="progreso"
                  className="flex items-center justify-between text-xs text-paper-100/50"
                >
                  <span>Página {entry.currentPage ?? 0}</span>
                  {progress !== null && <span>{progress}%</span>}
                </label>
                <input
                  id="progreso"
                  type="range"
                  min={0}
                  max={book.pages}
                  value={entry.currentPage ?? 0}
                  onChange={(e) =>
                    dispatch({ type: 'setProgress', bookId, page: Number(e.target.value) })
                  }
                  className="mt-1.5 w-full accent-ember-500"
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div role="tablist" aria-label="Contenido del libro" className="flex gap-1 border-b border-white/10">
        {(
          [
            ['notas', NotebookPen, `Notas (${notes.length})`],
            ['finales', PenLine, `Finales (${endings.length})`],
          ] as const
        ).map(([key, Icon, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`tab-${key}`}
            aria-controls={`panel-${key}`}
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm transition ${
              tab === key
                ? 'border-ember-400 text-paper-50'
                : 'border-transparent text-paper-100/45 hover:text-paper-50'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'notas' ? (
        <section
          id="panel-notas"
          role="tabpanel"
          aria-labelledby="tab-notas"
          className="space-y-3"
        >
          <NoteComposer bookId={bookId} />
          {notes.length === 0 ? (
            <p className="py-6 text-center text-sm text-paper-100/40">
              Aún no tienes notas de este libro.
            </p>
          ) : (
            notes.map((note) => <NoteCard key={note.id} note={note} />)
          )}
        </section>
      ) : (
        <section
          id="panel-finales"
          role="tabpanel"
          aria-labelledby="tab-finales"
          className="space-y-3"
        >
          <EndingComposer book={book} onDone={() => setTab('finales')} />
          {endings.length === 0 ? (
            <p className="py-6 text-center text-sm text-paper-100/40">
              Nadie ha reescrito el final todavía. Sé el primero.
            </p>
          ) : (
            <>
              <p className="pt-2 text-xs text-paper-100/45">
                {plural(endings.length, 'final alternativo', 'finales alternativos')}
              </p>
              {endings.map((ending) => (
                <EndingCard
                  key={ending.id}
                  ending={ending}
                  showBook={false}
                  deletable={ending.authorName === state.profile.name}
                />
              ))}
            </>
          )}
        </section>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<p className="text-sm text-paper-100/45">Cargando…</p>}>
      <BookDetail />
    </Suspense>
  );
}
