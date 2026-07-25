'use client';

import { useMemo, useState } from 'react';
import { Library } from 'lucide-react';
import BookCard from '@/components/BookCard';
import Chip from '@/components/Chip';
import EmptyState from '@/components/EmptyState';
import SectionHeader from '@/components/SectionHeader';
import { ButtonLink } from '@/components/Button';
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
    const mine = state.endings.filter((e) => e.authorName === state.profile.name);
    return [
      { label: 'Leídos', value: read.length.toString() },
      { label: 'Páginas', value: pages.toLocaleString('es') },
      { label: 'Notas', value: state.notes.length.toString() },
      { label: 'Finales', value: mine.length.toString() },
    ];
  }, [state.shelf, state.books, state.notes, state.endings, state.profile.name]);

  return (
    <div className="space-y-7">
      <SectionHeader
        eyebrow="Mi biblioteca"
        title="Todo lo que has guardado"
        description="Cambia el estado de un libro desde su ficha; aquí sólo eliges qué ver."
      />

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="card px-4 py-3.5">
            <dt className="eyebrow">{label}</dt>
            <dd className="mt-1 font-display text-2xl tabular-nums text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <Chip
            key={option}
            active={filter === option}
            onClick={() => setFilter(option)}
          >
            {option === 'todos' ? 'Todos' : STATUS_LABELS[option]}
            <span className="tabular-nums opacity-55">{counts[option]}</span>
          </Chip>
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
          action={<ButtonLink href="/">Descubrir libros</ButtonLink>}
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
