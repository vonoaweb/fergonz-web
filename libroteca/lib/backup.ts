import { createInitialState } from './seed';
import {
  ENDING_MOODS,
  type AppState,
  type Book,
  type CommunityPost,
  type Ending,
  type EndingMood,
  type Note,
  type ReadingStatus,
  type ShelfEntry,
} from './types';

export const BACKUP_VERSION = 1;

export interface BackupFile {
  app: 'libroteca';
  version: number;
  exportedAt: string;
  state: AppState;
}

export type ParseResult =
  | { ok: true; state: AppState; dropped: number }
  | { ok: false; error: string };

const STATUSES: ReadingStatus[] = ['pendiente', 'leyendo', 'leido', 'abandonado'];
const KINDS: CommunityPost['kind'][] = ['resena', 'recomendacion', 'final'];

export function serializeBackup(state: AppState): string {
  const file: BackupFile = {
    app: 'libroteca',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    state,
  };
  return JSON.stringify(file, null, 2);
}

export function backupFilename(date = new Date()): string {
  return `libroteca-${date.toISOString().slice(0, 10)}.json`;
}

/**
 * Lee un archivo de copia. El contenido viene de fuera, así que cada entrada
 * se valida y las que no cuadran se descartan en vez de tumbar la importación
 * entera; sólo una cabecera irreconocible aborta.
 */
export function parseBackup(raw: string): ParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'El archivo no es JSON válido.' };
  }

  if (!isRecord(parsed)) {
    return { ok: false, error: 'El archivo no tiene el formato esperado.' };
  }
  if (parsed.app !== 'libroteca') {
    return { ok: false, error: 'Este archivo no es una copia de Libroteca.' };
  }
  if (typeof parsed.version !== 'number' || parsed.version > BACKUP_VERSION) {
    return {
      ok: false,
      error: 'La copia viene de una versión más nueva de la app.',
    };
  }
  if (!isRecord(parsed.state)) {
    return { ok: false, error: 'La copia no contiene datos.' };
  }

  return sanitizeState(parsed.state);
}

function sanitizeState(input: Record<string, unknown>): ParseResult {
  let dropped = 0;
  const count = <T,>(items: unknown, parse: (item: unknown) => T | null): T[] => {
    if (!Array.isArray(items)) return [];
    const kept: T[] = [];
    for (const item of items) {
      const value = parse(item);
      if (value) kept.push(value);
      else dropped += 1;
    }
    return kept;
  };

  const books: Record<string, Book> = {};
  if (isRecord(input.books)) {
    for (const value of Object.values(input.books)) {
      const book = parseBook(value);
      if (book) books[book.id] = book;
      else dropped += 1;
    }
  }

  const state: AppState = {
    profile: parseProfile(input.profile),
    books,
    shelf: count(input.shelf, parseShelfEntry),
    notes: count(input.notes, parseNote),
    endings: count(input.endings, parseEnding),
    posts: count(input.posts, parsePost),
  };

  if (Object.keys(state.books).length === 0 && state.shelf.length === 0) {
    return { ok: false, error: 'La copia no tiene ningún libro.' };
  }

  return { ok: true, state, dropped };
}

function parseProfile(value: unknown): AppState['profile'] {
  const fallback = createInitialState().profile;
  if (!isRecord(value)) return fallback;
  return {
    name: str(value.name) ?? fallback.name,
    favoriteSubjects: strArray(value.favoriteSubjects),
  };
}

function parseBook(value: unknown): Book | null {
  if (!isRecord(value)) return null;
  const id = str(value.id);
  const title = str(value.title);
  if (!id || !title) return null;

  const authors = strArray(value.authors);
  return {
    id,
    title,
    authors: authors.length ? authors : ['Autor desconocido'],
    year: num(value.year),
    coverId: num(value.coverId),
    isbn: str(value.isbn),
    subjects: strArray(value.subjects),
    pages: num(value.pages),
    description: str(value.description),
  };
}

function parseShelfEntry(value: unknown): ShelfEntry | null {
  if (!isRecord(value)) return null;
  const bookId = str(value.bookId);
  const status = value.status;
  if (!bookId || !isOneOf(status, STATUSES)) return null;

  return {
    bookId,
    status,
    rating: num(value.rating),
    addedAt: num(value.addedAt) ?? Date.now(),
    finishedAt: num(value.finishedAt),
    currentPage: num(value.currentPage),
  };
}

function parseNote(value: unknown): Note | null {
  if (!isRecord(value)) return null;
  const id = str(value.id);
  const bookId = str(value.bookId);
  const text = str(value.text);
  if (!id || !bookId || !text) return null;

  return {
    id,
    bookId,
    text,
    quote: str(value.quote),
    page: num(value.page),
    createdAt: num(value.createdAt) ?? Date.now(),
    private: value.private === true,
    tags: strArray(value.tags),
  };
}

function parseEnding(value: unknown): Ending | null {
  if (!isRecord(value)) return null;
  const id = str(value.id);
  const bookId = str(value.bookId);
  const title = str(value.title);
  const body = str(value.body);
  if (!id || !bookId || !title || !body) return null;

  const mood = isOneOf(value.mood, ENDING_MOODS as readonly EndingMood[])
    ? value.mood
    : 'ambiguo';

  return {
    id,
    bookId,
    bookTitle: str(value.bookTitle) ?? 'Libro desconocido',
    authorName: str(value.authorName) ?? 'Lector',
    title,
    body,
    mood,
    createdAt: num(value.createdAt) ?? Date.now(),
    votes: num(value.votes) ?? 0,
    votedByMe: value.votedByMe === true,
    spoiler: value.spoiler !== false,
  };
}

function parsePost(value: unknown): CommunityPost | null {
  if (!isRecord(value)) return null;
  const id = str(value.id);
  const bookId = str(value.bookId);
  const text = str(value.text);
  if (!id || !bookId || !text || !isOneOf(value.kind, KINDS)) return null;

  return {
    id,
    kind: value.kind,
    authorName: str(value.authorName) ?? 'Lector',
    bookId,
    bookTitle: str(value.bookTitle) ?? 'Libro desconocido',
    bookAuthors: strArray(value.bookAuthors),
    coverId: num(value.coverId),
    text,
    rating: num(value.rating),
    createdAt: num(value.createdAt) ?? Date.now(),
    likes: num(value.likes) ?? 0,
    likedByMe: value.likedByMe === true,
    endingId: str(value.endingId),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function num(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function strArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function isOneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === 'string' && (options as readonly string[]).includes(value);
}
