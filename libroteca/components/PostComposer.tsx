'use client';

import { useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import RatingStars from './RatingStars';
import { newId, useStore } from '@/lib/store';
import type { CommunityPost } from '@/lib/types';

export default function PostComposer() {
  const { state, dispatch } = useStore();
  const [kind, setKind] = useState<'recomendacion' | 'resena'>('recomendacion');
  const [bookId, setBookId] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  // Sólo se puede opinar de libros que están en tu biblioteca.
  const options = useMemo(
    () =>
      state.shelf
        .map((entry) => state.books[entry.bookId])
        .filter(Boolean)
        .sort((a, b) => a.title.localeCompare(b.title)),
    [state.shelf, state.books]
  );

  const canPost = bookId !== '' && text.trim().length >= 10;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const book = state.books[bookId];
    if (!canPost || !book) return;

    const post: CommunityPost = {
      id: newId('post'),
      kind,
      authorName: state.profile.name || 'Lector',
      bookId: book.id,
      bookTitle: book.title,
      bookAuthors: book.authors,
      coverId: book.coverId,
      text: text.trim(),
      rating: kind === 'resena' && rating > 0 ? rating : undefined,
      createdAt: Date.now(),
      likes: 0,
    };

    dispatch({ type: 'addPost', post });
    setText('');
    setRating(0);
  };

  if (options.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-white/12 bg-ink-900/40 px-4 py-3 text-sm text-paper-100/50">
        Añade algún libro a tu biblioteca para poder publicar.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-white/10 bg-ink-900/60 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ['recomendacion', 'Recomendar'],
            ['resena', 'Reseñar'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setKind(value)}
            aria-pressed={kind === value}
            className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
              kind === value
                ? 'bg-ember-500/15 text-ember-400 ring-ember-400/30'
                : 'text-paper-100/55 ring-white/10 hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}

        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          aria-label="Libro"
          className="ml-auto min-w-[180px] max-w-full rounded-full border border-white/10 bg-ink-950 px-3 py-1.5 text-xs text-paper-50 focus:border-ember-400/40 focus:outline-none"
        >
          <option value="">Elige un libro…</option>
          {options.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder={
          kind === 'recomendacion'
            ? '¿A quién se lo recomendarías y por qué?'
            : '¿Qué te pareció?'
        }
        className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-ink-950/60 px-3 py-2 text-sm text-paper-50 placeholder:text-paper-100/25 focus:border-ember-400/40 focus:outline-none"
      />

      <div className="mt-2 flex items-center gap-3">
        {kind === 'resena' && (
          <RatingStars value={rating} onChange={setRating} label="Puntuación" />
        )}
        <button
          type="submit"
          disabled={!canPost}
          className="ml-auto flex items-center gap-2 rounded-full bg-ember-500 px-4 py-1.5 text-xs font-medium text-ink-950 transition hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={13} />
          Publicar
        </button>
      </div>
    </form>
  );
}
