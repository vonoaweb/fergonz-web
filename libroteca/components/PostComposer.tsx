'use client';

import { useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import Chip from './Chip';
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
      <p className="rounded-card border border-dashed border-line/70 bg-surface/40 px-4 py-3.5 text-sm text-muted">
        Añade algún libro a tu biblioteca para poder publicar.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="card p-4">
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ['recomendacion', 'Recomendar'],
            ['resena', 'Reseñar'],
          ] as const
        ).map(([value, label]) => (
          <Chip key={value} active={kind === value} onClick={() => setKind(value)}>
            {label}
          </Chip>
        ))}

        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          aria-label="Libro"
          className="ml-auto min-w-[180px] max-w-full rounded-pill border border-line/60 bg-surface/60 px-3.5 py-1.5 text-xs text-ink focus:border-accent/50 focus:outline-none"
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
        className="field mt-3 resize-none"
      />

      <div className="mt-3 flex items-center gap-3">
        {kind === 'resena' && (
          <RatingStars value={rating} onChange={setRating} label="Puntuación" />
        )}
        <button
          type="submit"
          disabled={!canPost}
          className="ml-auto inline-flex items-center gap-2 rounded-pill bg-accent px-4 py-1.5 text-xs font-medium text-on-accent transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={13} />
          Publicar
        </button>
      </div>
    </form>
  );
}
