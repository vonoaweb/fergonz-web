'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { CheckCircle2, Loader2, SearchX } from 'lucide-react';
import BookCover from '@/components/BookCover';
import Scanner from '@/components/Scanner';
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
        setRecent((prev) =>
          [book, ...prev.filter((b) => b.id !== book.id)].slice(0, 6)
        );
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
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-2xl text-paper-50">Escanear un libro</h1>
        <p className="mt-1 max-w-lg text-sm text-paper-100/55">
          Apunta la cámara al código de barras de la contraportada. Buscamos el ISBN en
          Open Library y lo añadimos a tu biblioteca con un toque.
        </p>
      </header>

      <Scanner onDetected={handleDetected} paused={result.kind === 'loading'} />

      {result.kind === 'loading' && (
        <p className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-paper-100/70">
          <Loader2 size={15} className="animate-spin text-ember-400" />
          Buscando ISBN {result.isbn}…
        </p>
      )}

      {result.kind === 'missing' && (
        <div className="rounded-xl border border-white/10 bg-ink-900/60 px-4 py-4">
          <p className="flex items-center gap-2 text-sm text-paper-50">
            <SearchX size={15} className="text-paper-100/50" />
            El ISBN {result.isbn} no está en Open Library.
          </p>
          <p className="mt-1 text-xs text-paper-100/50">
            Suele pasar con ediciones locales.{' '}
            <Link href="/" className="text-ember-400 hover:underline">
              Búscalo por título
            </Link>
            .
          </p>
        </div>
      )}

      {result.kind === 'error' && (
        <p className="rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          No se pudo consultar Open Library para {result.isbn}. Revisa tu conexión e
          inténtalo otra vez.
        </p>
      )}

      {result.kind === 'found' && (
        <ScanResult book={result.book} onAdd={addToShelf} added={!!shelfEntry(result.book.id)} />
      )}

      {recent.length > 1 && (
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-paper-100/40">
            Escaneados en esta sesión
          </h2>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {recent.map((book) => (
              <Link
                key={book.id}
                href={bookHref(book.id)}
                className="w-[70px] shrink-0"
                title={book.title}
              >
                <BookCover book={book} className="h-[104px] w-[70px]" />
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
    <div className="animate-fade-up rounded-xl border border-emerald-400/25 bg-emerald-500/[0.06] p-4">
      <p className="flex items-center gap-2 text-xs font-medium text-emerald-300">
        <CheckCircle2 size={14} />
        Libro identificado
      </p>

      <div className="mt-3 flex gap-4">
        <Link href={bookHref(book.id)} className="shrink-0">
          <BookCover book={book} className="h-[130px] w-[88px]" />
        </Link>

        <div className="min-w-0 flex-1">
          <Link href={bookHref(book.id)}>
            <h2 className="font-serif text-lg leading-snug text-paper-50">{book.title}</h2>
          </Link>
          <p className="mt-0.5 text-xs text-paper-100/55">
            {authorLine(book.authors)}
            {book.year ? ` · ${book.year}` : ''}
          </p>

          <p className="mt-3 text-xs text-paper-100/45">
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
