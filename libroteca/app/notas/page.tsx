'use client';

import { useMemo, useState } from 'react';
import { Lock, NotebookPen, Search, X } from 'lucide-react';
import Chip from '@/components/Chip';
import EmptyState from '@/components/EmptyState';
import NoteCard from '@/components/NoteCard';
import SectionHeader from '@/components/SectionHeader';
import { ButtonLink } from '@/components/Button';
import { useStore } from '@/lib/store';
import type { Note } from '@/lib/types';

export default function NotesPage() {
  const { state, ready } = useStore();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [onlyPrivate, setOnlyPrivate] = useState(false);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const note of state.notes) {
      for (const t of note.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name);
  }, [state.notes]);

  const notes = useMemo(() => {
    const needle = query.trim().toLowerCase();

    // La búsqueda cubre también el título del libro: es como uno recuerda
    // dónde escribió algo.
    const matches = (note: Note) => {
      if (!needle) return true;
      const haystack = [
        note.text,
        note.quote ?? '',
        note.tags.join(' '),
        state.books[note.bookId]?.title ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    };

    return state.notes
      .filter((note) => matches(note))
      .filter((note) => (tag ? note.tags.includes(tag) : true))
      .filter((note) => (onlyPrivate ? note.private : true))
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [state.notes, state.books, query, tag, onlyPrivate]);

  const empty = ready && state.notes.length === 0;

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Mis notas"
        title="Todo lo que has subrayado"
        description="Las notas de todos tus libros, juntas y buscables."
      />

      {!empty && (
        <>
          <div className="group relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint transition group-focus-within:text-accent"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca en tus notas, citas y etiquetas…"
              aria-label="Buscar en mis notas"
              className="w-full rounded-pill border border-line/60 bg-surface/70 py-3 pl-11 pr-10 text-sm text-ink placeholder:text-faint transition focus:border-accent/50 focus:bg-surface focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-faint transition hover:text-ink"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip
              tone="plum"
              active={onlyPrivate}
              onClick={() => setOnlyPrivate((v) => !v)}
            >
              <Lock size={12} />
              Sólo privadas
            </Chip>

            {tags.length > 0 && <span className="mx-1 h-5 w-px bg-line/70" aria-hidden />}

            {tags.map((name) => (
              <Chip
                key={name}
                active={tag === name}
                onClick={() => setTag(tag === name ? null : name)}
              >
                #{name}
              </Chip>
            ))}
          </div>
        </>
      )}

      {empty ? (
        <EmptyState
          icon={NotebookPen}
          title="Aún no has escrito ninguna nota"
          description="Abre un libro de tu biblioteca y guarda la primera cita que te haya parado."
          action={<ButtonLink href="/biblioteca">Ir a mi biblioteca</ButtonLink>}
        />
      ) : notes.length === 0 ? (
        <p className="py-10 text-center text-sm text-faint">
          Ninguna nota coincide con ese filtro.
        </p>
      ) : (
        <>
          <p className="eyebrow">
            {notes.length === state.notes.length
              ? `${notes.length} ${notes.length === 1 ? 'nota' : 'notas'}`
              : `${notes.length} de ${state.notes.length}`}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} showBook />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
