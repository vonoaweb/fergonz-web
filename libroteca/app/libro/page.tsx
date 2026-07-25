'use client';

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
import { ButtonLink } from '@/components/Button';
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
    if (!ready) return <p className="text-sm text-faint">Cargando…</p>;

    return (
      <EmptyState
        icon={BookX}
        title="No encontramos ese libro"
        description="Puede que lo hayas borrado o que el enlace esté incompleto."
        action={<ButtonLink href="/">Volver a descubrir</ButtonLink>}
      />
    );
  }

  const progress =
    entry?.currentPage && book.pages
      ? Math.min(100, Math.round((entry.currentPage / book.pages) * 100))
      : null;

  return (
    <div className="space-y-8">
      <header className="card group relative overflow-hidden p-6">
        {/* Halo cálido detrás de la portada, para separarla del fondo plano. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 sm:flex-row">
          <BookCover book={book} size="L" className="h-[228px] w-[152px] shrink-0" />

          <div className="min-w-0 flex-1">
            <h1 className="font-display text-[1.75rem] leading-tight text-ink">
              {book.title}
            </h1>
            <p className="mt-1.5 text-sm text-muted">
              {authorLine(book.authors)}
              {book.year ? ` · ${book.year}` : ''}
              {book.pages ? ` · ${book.pages} págs.` : ''}
            </p>

            {book.description && (
              <p className="mt-4 max-w-lg font-read text-[0.95rem] leading-[1.65] text-ink/80">
                {book.description}
              </p>
            )}

            {book.subjects.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {book.subjects.slice(0, 6).map((subject) => (
                  <span
                    key={subject}
                    className="rounded-pill border border-line/50 bg-raised/50 px-2.5 py-0.5 text-2xs text-muted"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-4">
              <StatusPicker
                value={entry?.status ?? null}
                onChange={(status) =>
                  entry
                    ? dispatch({ type: 'setStatus', bookId, status })
                    : dispatch({ type: 'addToShelf', book, status })
                }
              />

              {entry && (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xs uppercase tracking-eyebrow text-faint">
                      Tu nota
                    </span>
                    <RatingStars
                      value={entry.rating ?? 0}
                      onChange={(rating) => dispatch({ type: 'setRating', bookId, rating })}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'removeFromShelf', bookId })}
                    className="flex items-center gap-1.5 text-2xs text-faint transition hover:text-rose-500"
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
                    className="flex items-center justify-between text-2xs text-faint"
                  >
                    <span>
                      Página{' '}
                      <span className="tabular-nums text-ink">
                        {entry.currentPage ?? 0}
                      </span>{' '}
                      de {book.pages}
                    </span>
                    {progress !== null && (
                      <span className="tabular-nums text-accent">{progress}%</span>
                    )}
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
                    className="mt-2 w-full accent-accent"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div
        role="tablist"
        aria-label="Contenido del libro"
        className="flex gap-1 border-b border-line/60"
      >
        {(
          [
            ['notas', NotebookPen, `Notas (${notes.length})`],
            ['finales', PenLine, `Finales (${endings.length})`],
          ] as const
        ).map(([key, Icon, label]) => {
          const active = tab === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`tab-${key}`}
              aria-controls={`panel-${key}`}
              aria-selected={active}
              onClick={() => setTab(key)}
              className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm transition duration-200 ${
                active
                  ? 'border-accent text-ink'
                  : 'border-transparent text-muted hover:border-line hover:text-ink'
              }`}
            >
              <Icon size={15} className={active ? 'text-accent' : ''} />
              {label}
            </button>
          );
        })}
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
            <p className="py-8 text-center text-sm text-faint">
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
            <p className="py-8 text-center text-sm text-faint">
              Nadie ha reescrito el final todavía. Sé el primero.
            </p>
          ) : (
            <>
              <p className="eyebrow pt-3">
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
    <Suspense fallback={<p className="text-sm text-faint">Cargando…</p>}>
      <BookDetail />
    </Suspense>
  );
}
