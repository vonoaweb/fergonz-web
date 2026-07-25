'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import BookCard from './BookCard';
import { searchBooks } from '@/lib/openlibrary';
import { useStore } from '@/lib/store';
import type { Book } from '@/lib/types';

export default function BookSearch({ placeholder = 'Busca por título, autor o tema…' }) {
  const { dispatch } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) {
      setResults(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = window.setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const found = await searchBooks(q, controller.signal);
        setResults(found);
        setError(null);
        // Cachear lo encontrado permite recomendar sobre un catálogo más rico.
        found.forEach((book) => dispatch({ type: 'upsertBook', book }));
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('No se pudo consultar Open Library. Revisa tu conexión.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [query, dispatch]);

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <div className="space-y-5">
      <div className="group relative">
        <Search
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint transition group-focus-within:text-accent"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar libros"
          className="w-full rounded-pill border border-line/60 bg-surface/70 py-3.5 pl-12 pr-11 text-sm text-ink shadow-card placeholder:text-faint transition focus:border-accent/50 focus:bg-surface focus:outline-none"
        />
        {loading && (
          <Loader2
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-accent"
          />
        )}
        {!loading && query && (
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

      {error && (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-300">
          {error}
        </p>
      )}

      {results && !loading && (
        <div className="animate-fade-up space-y-3">
          <p className="eyebrow">
            {results.length
              ? `${results.length} resultado${results.length === 1 ? '' : 's'}`
              : 'Sin resultados — prueba con otro título'}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
