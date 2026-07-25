'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Library } from 'lucide-react';
import BookCard from '@/components/BookCard';
import EmptyState from '@/components/EmptyState';
import { STATUS_LABELS } from '@/components/StatusPicker';
import { useStore } from '@/lib/store';
import type { ReadingStatus } from '@/lib/types';

type Filter = ReadingStatus | 'todos';

const FILTERS: Filter[] = ['todos', 'leyendo', 'pendiente', 'leido', 'abandonado'];

export default function LibraryPage() {
  const { state, ready } = useStore();
  const [filter, setFilter] = useState<Filter>('todos');

  const counts = useMemo(() => {
    const result: Record<Filter, number> = {
      todos: state.shelf.length,
      pendiente: 0,
      leyendo: 0,
      leido: 0,
      abandonado: 0,
    };
    for (const entry of state.shelf) result[entry.status] += 1;
    return result;
  }, [state.shelf]);

  const visible = useMemo(
    () =>
      state.shelf
        .filter((entry) => filter === 'todos' || entry.status === filter)
        .sort((a, b) => b.addedAt - a.addedAt)
        .map((entry) => state.books[entry.bookId])
        .filter(Boolean),
    [state.shelf, state.books, filter]
  );

  const stats = useMemo(() => {
    const read = state.shelf.filter((e) => e.status === 'leido');
    const pages = read.reduce(
      (sum, entry) => sum + (state.books[entry.bookId]?.pages ?? 0),
      0
    );
    return { read: read.length, pages, notes: state.notes.length };
  }, [state.shelf, state.books, state.notes]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-2xl text-paper-50">Mi biblioteca</h1>
        <p className="mt-1 text-sm text-paper-100/55">
          {stats.read} leídos · {stats.pages.toLocaleString('es')} páginas · {stats.notes}{' '}
          notas
        </p>
      </header>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
              filter === option
                ? 'bg-ember-500/15 text-ember-400 ring-ember-400/30'
                : 'text-paper-100/55 ring-white/10 hover:bg-white/5 hover:text-paper-50'
            }`}
          >
            {option === 'todos' ? 'Todos' : STATUS_LABELS[option]}
            <span className="ml-1.5 tabular-nums opacity-60">{counts[option]}</span>
          </button>
        ))}
      </div>

      {ready && visible.length === 0 ? (
        <EmptyState
          icon={Library}
          title="Todavía no hay nada aquí"
          description={
            filter === 'todos'
              ? 'Busca un libro o escanea su código de barras para empezar tu biblioteca.'
              : `No tienes libros en «${STATUS_LABELS[filter as ReadingStatus]}».`
          }
          action={
            <Link
              href="/"
              className="rounded-full bg-ember-500 px-5 py-2 text-sm font-medium text-ink-950 transition hover:bg-ember-400"
            >
              Descubrir libros
            </Link>
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {visible.map((book) => (
            <BookCard key={book.id} book={book} quickAdd={false} />
          ))}
        </div>
      )}
    </div>
  );
}
