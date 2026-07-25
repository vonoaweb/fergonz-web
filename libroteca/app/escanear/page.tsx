'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { CheckCircle2, Loader2, SearchX } from 'lucide-react';
import BookCover from '@/components/BookCover';
import Scanner from '@/components/Scanner';
import SectionHeader from '@/components/SectionHeader';
import StatusPicker from '@/components/StatusPicker';
import { authorLine, bookHref } from '@/lib/format';
import { lookupIsbn } from '@/lib/openlibrary';
import { useStore } from '@/lib/store';
import type { Book, ReadingStatus } from '@/lib/types';

type Result =
  | { kind: 'idle' }
  | { kind: 'loading'; isbn: string }
  | { kind: 'found'; book: Book }
  | { kind: 'missing'; isbn: string }
  | { kind: 'error'; isbn: string };

export default function ScanPage() {
  const { dispatch, shelfEntry } = useStore();
  const [result, setResult] = useState<Result>({ kind: 'idle' });
  const [recent, setRecent] = useState<Book[]>([]);

  const handleDetected = useCallback(
    async (isbn: string) => {
      setResult({ kind: 'loading', isbn });
      try {
        const book = await lookupIsbn(isbn);
        if (!book) {
          setResult({ kind: 'missing', isbn });
          return;
        }
        dispatch({ type: 'upsertBook', book });
        setResult({ kind: 'found', book });
        setRecent((prev) => [book, ...prev.filter((b) => b.id !== book.id)].slice(0, 6));
      } catch {
        setResult({ kind: 'error', isbn });
      }
    },
    [dispatch]
  );

  const addToShelf = (book: Book, status: ReadingStatus) => {
    dispatch({ type: 'addToShelf', book, status });
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <SectionHeader
        eyebrow="Escáner"
        title="Escanear un libro"
        description="Apunta la cámara al código de barras de la contraportada. Buscamos el ISBN en Open Library y lo añadimos a tu biblioteca con un toque."
      />

      <Scanner onDetected={handleDetected} paused={result.kind === 'loading'} />

      {result.kind === 'loading' && (
        <p className="card flex items-center gap-2.5 px-4 py-3.5 text-sm text-muted">
          <Loader2 size={15} className="animate-spin text-accent" />
          Buscando ISBN{' '}
          <span className="font-mono text-ink">{result.isbn}</span>…
        </p>
      )}

      {result.kind === 'missing' && (
        <div className="card px-4 py-4">
          <p className="flex items-center gap-2 text-sm text-ink">
            <SearchX size={15} className="text-faint" />
            El ISBN <span className="font-mono">{result.isbn}</span> no está en Open
            Library.
          </p>
          <p className="mt-1.5 text-xs text-muted">
            Suele pasar con ediciones locales.{' '}
            <Link href="/" className="text-accent underline-offset-2 hover:underline">
              Búscalo por título
            </Link>
            .
          </p>
        </div>
      )}

      {result.kind === 'error' && (
        <p className="rounded-card border border-rose-500/30 bg-rose-500/10 px-4 py-3.5 text-sm leading-relaxed text-rose-600 dark:text-rose-300">
          No se pudo consultar Open Library para {result.isbn}. Revisa tu conexión e
          inténtalo otra vez.
        </p>
      )}

      {result.kind === 'found' && (
        <ScanResult
          book={result.book}
          onAdd={addToShelf}
          added={!!shelfEntry(result.book.id)}
        />
      )}

      {recent.length > 1 && (
        <section>
          <h2 className="eyebrow mb-3">Escaneados en esta sesión</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {recent.map((book) => (
              <Link
                key={book.id}
                href={bookHref(book.id)}
                className="group w-[72px] shrink-0"
                title={book.title}
              >
                <BookCover book={book} className="h-[108px] w-[72px]" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ScanResult({
  book,
  added,
  onAdd,
}: {
  book: Book;
  added: boolean;
  onAdd: (book: Book, status: ReadingStatus) => void;
}) {
  return (
    <div className="animate-fade-up rounded-card border border-emerald-500/30 bg-emerald-500/[0.07] p-5 shadow-card">
      <p className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-eyebrow text-emerald-700 dark:text-emerald-300">
        <CheckCircle2 size={14} />
        Libro identificado
      </p>

      <div className="group mt-4 flex gap-5">
        <Link href={bookHref(book.id)} className="shrink-0">
          <BookCover book={book} size="L" className="h-[144px] w-[96px]" />
        </Link>

        <div className="min-w-0 flex-1">
          <Link href={bookHref(book.id)}>
            <h2 className="font-display text-xl leading-snug text-ink">{book.title}</h2>
          </Link>
          <p className="mt-1 text-xs text-muted">
            {authorLine(book.authors)}
            {book.year ? ` · ${book.year}` : ''}
          </p>

          <p className="mt-4 text-2xs text-faint">
            {added ? 'Ya está en tu biblioteca. Puedes cambiar el estado:' : 'Añadir como:'}
          </p>
          <div className="mt-2">
            <StatusPicker value={null} onChange={(status) => onAdd(book, status)} />
          </div>
        </div>
      </div>
    </div>
  );
}
