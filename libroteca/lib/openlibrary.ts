import type { Book } from './types';

const SEARCH_URL = 'https://openlibrary.org/search.json';
const BOOKS_URL = 'https://openlibrary.org/api/books';

export function coverUrl(
  coverId: number | undefined,
  size: 'S' | 'M' | 'L' = 'M'
): string | null {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

/**
 * Portada de un libro. Prefiere el `coverId` de Open Library y cae al ISBN,
 * que es lo único que tenemos para los libros añadidos por escáner.
 */
export function bookCoverUrl(
  book: { coverId?: number; isbn?: string },
  size: 'S' | 'M' | 'L' = 'M'
): string | null {
  if (book.coverId) return coverUrl(book.coverId, size);
  if (book.isbn) {
    return `https://covers.openlibrary.org/b/isbn/${book.isbn}-${size}.jpg`;
  }
  return null;
}

interface SearchDoc {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  subject?: string[];
  number_of_pages_median?: number;
}

function docToBook(doc: SearchDoc): Book | null {
  if (!doc.title) return null;
  return {
    id: doc.key ?? `manual:${slugify(doc.title)}`,
    title: doc.title,
    authors: doc.author_name ?? ['Autor desconocido'],
    year: doc.first_publish_year,
    coverId: doc.cover_i,
    isbn: doc.isbn?.[0],
    subjects: (doc.subject ?? []).slice(0, 8),
    pages: doc.number_of_pages_median,
  };
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

/** Busca libros por título, autor o tema. Devuelve [] si la red falla. */
export async function searchBooks(
  query: string,
  signal?: AbortSignal
): Promise<Book[]> {
  const q = query.trim();
  if (!q) return [];

  const params = new URLSearchParams({
    q,
    limit: '20',
    fields:
      'key,title,author_name,first_publish_year,cover_i,isbn,subject,number_of_pages_median',
  });

  const res = await fetch(`${SEARCH_URL}?${params}`, { signal });
  if (!res.ok) throw new Error(`Open Library respondió ${res.status}`);

  const data = (await res.json()) as { docs?: SearchDoc[] };
  return (data.docs ?? []).map(docToBook).filter((b): b is Book => b !== null);
}

/**
 * Resuelve un ISBN (10 o 13 dígitos) a un libro.
 * Usa el endpoint `api/books`, que responde con datos ya normalizados,
 * y cae a `search.json` si el ISBN no está catalogado ahí.
 */
export async function lookupIsbn(
  rawIsbn: string,
  signal?: AbortSignal
): Promise<Book | null> {
  const isbn = normalizeIsbn(rawIsbn);
  if (!isbn) return null;

  const params = new URLSearchParams({
    bibkeys: `ISBN:${isbn}`,
    format: 'json',
    jscmd: 'data',
  });

  const res = await fetch(`${BOOKS_URL}?${params}`, { signal });
  if (res.ok) {
    const data = (await res.json()) as Record<string, ApiBook | undefined>;
    const entry = data[`ISBN:${isbn}`];
    if (entry) return apiBookToBook(entry, isbn);
  }

  // Fallback: el índice de búsqueda cubre ediciones que `api/books` no expone.
  const results = await searchBooks(`isbn:${isbn}`, signal);
  return results[0] ?? null;
}

interface ApiBook {
  title?: string;
  authors?: { name?: string }[];
  publish_date?: string;
  cover?: { small?: string; medium?: string; large?: string };
  subjects?: { name?: string }[];
  number_of_pages?: number;
  key?: string;
}

function apiBookToBook(entry: ApiBook, isbn: string): Book | null {
  if (!entry.title) return null;
  return {
    id: entry.key ? entry.key.replace('/books/', '/works/') : `manual:${isbn}`,
    title: entry.title,
    authors: entry.authors?.map((a) => a.name ?? '').filter(Boolean) ?? [
      'Autor desconocido',
    ],
    year: parseYear(entry.publish_date),
    coverId: parseCoverId(entry.cover?.medium ?? entry.cover?.large),
    isbn,
    subjects: (entry.subjects ?? [])
      .map((s) => s.name ?? '')
      .filter(Boolean)
      .slice(0, 8),
    pages: entry.number_of_pages,
  };
}

function parseYear(publishDate?: string): number | undefined {
  const match = publishDate?.match(/\d{4}/);
  return match ? Number(match[0]) : undefined;
}

/** Las URLs de portada tienen la forma `.../b/id/12345-M.jpg`. */
function parseCoverId(url?: string): number | undefined {
  const match = url?.match(/\/b\/id\/(\d+)-/);
  return match ? Number(match[1]) : undefined;
}

/** Quita guiones y espacios; acepta el dígito de control `X` de ISBN-10. */
export function normalizeIsbn(raw: string): string | null {
  const cleaned = raw.replace(/[\s-]/g, '').toUpperCase();
  if (/^\d{9}[\dX]$/.test(cleaned)) return cleaned;
  if (/^\d{13}$/.test(cleaned)) return cleaned;
  return null;
}

/**
 * Valida el dígito de control. Los códigos EAN-13 de libros empiezan por
 * 978/979, así que un código de barras de un producto cualquiera se rechaza.
 */
export function isValidIsbn(raw: string): boolean {
  const isbn = normalizeIsbn(raw);
  if (!isbn) return false;

  if (isbn.length === 10) {
    const sum = isbn
      .split('')
      .reduce((acc, char, i) => {
        const digit = char === 'X' ? 10 : Number(char);
        return acc + digit * (10 - i);
      }, 0);
    return sum % 11 === 0;
  }

  if (!isbn.startsWith('978') && !isbn.startsWith('979')) return false;
  const sum = isbn
    .split('')
    .reduce((acc, char, i) => acc + Number(char) * (i % 2 === 0 ? 1 : 3), 0);
  return sum % 10 === 0;
}
