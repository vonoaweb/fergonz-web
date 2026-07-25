'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { createInitialState } from './seed';
import type {
  AppState,
  Book,
  CommunityPost,
  Ending,
  EndingMood,
  Note,
  ReadingStatus,
  ShelfEntry,
} from './types';

const STORAGE_KEY = 'libroteca:v1';

type Action =
  | { type: 'hydrate'; state: AppState }
  | { type: 'setProfileName'; name: string }
  | { type: 'toggleFavoriteSubject'; subject: string }
  | { type: 'upsertBook'; book: Book }
  | { type: 'addToShelf'; book: Book; status: ReadingStatus }
  | { type: 'setStatus'; bookId: string; status: ReadingStatus }
  | { type: 'setRating'; bookId: string; rating: number }
  | { type: 'setProgress'; bookId: string; page: number }
  | { type: 'removeFromShelf'; bookId: string }
  | { type: 'addNote'; note: Note }
  | { type: 'updateNote'; noteId: string; patch: Partial<Note> }
  | { type: 'deleteNote'; noteId: string }
  | { type: 'addEnding'; ending: Ending; share: boolean }
  | { type: 'voteEnding'; endingId: string }
  | { type: 'deleteEnding'; endingId: string }
  | { type: 'addPost'; post: CommunityPost }
  | { type: 'likePost'; postId: string }
  | { type: 'reset' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'hydrate':
      return action.state;

    case 'setProfileName':
      return { ...state, profile: { ...state.profile, name: action.name } };

    case 'toggleFavoriteSubject': {
      const current = state.profile.favoriteSubjects;
      const next = current.includes(action.subject)
        ? current.filter((s) => s !== action.subject)
        : [...current, action.subject];
      return { ...state, profile: { ...state.profile, favoriteSubjects: next } };
    }

    case 'upsertBook':
      return {
        ...state,
        books: { ...state.books, [action.book.id]: mergeBook(state.books[action.book.id], action.book) },
      };

    case 'addToShelf': {
      const books = {
        ...state.books,
        [action.book.id]: mergeBook(state.books[action.book.id], action.book),
      };
      const existing = state.shelf.find((e) => e.bookId === action.book.id);
      const shelf = existing
        ? state.shelf.map((e) =>
            e.bookId === action.book.id ? { ...e, status: action.status } : e
          )
        : [
            { bookId: action.book.id, status: action.status, addedAt: Date.now() },
            ...state.shelf,
          ];
      return { ...state, books, shelf };
    }

    case 'setStatus':
      return {
        ...state,
        shelf: state.shelf.map((e) =>
          e.bookId === action.bookId
            ? {
                ...e,
                status: action.status,
                finishedAt: action.status === 'leido' ? Date.now() : undefined,
              }
            : e
        ),
      };

    case 'setRating':
      return {
        ...state,
        shelf: state.shelf.map((e) =>
          e.bookId === action.bookId ? { ...e, rating: action.rating } : e
        ),
      };

    case 'setProgress':
      return {
        ...state,
        shelf: state.shelf.map((e) =>
          e.bookId === action.bookId ? { ...e, currentPage: action.page } : e
        ),
      };

    case 'removeFromShelf':
      return {
        ...state,
        shelf: state.shelf.filter((e) => e.bookId !== action.bookId),
      };

    case 'addNote':
      return { ...state, notes: [action.note, ...state.notes] };

    case 'updateNote':
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.noteId ? { ...n, ...action.patch } : n
        ),
      };

    case 'deleteNote':
      return { ...state, notes: state.notes.filter((n) => n.id !== action.noteId) };

    case 'addEnding': {
      const endings = [action.ending, ...state.endings];
      if (!action.share) return { ...state, endings };

      const book = state.books[action.ending.bookId];
      const post: CommunityPost = {
        id: `post-${action.ending.id}`,
        kind: 'final',
        authorName: action.ending.authorName,
        bookId: action.ending.bookId,
        bookTitle: action.ending.bookTitle,
        bookAuthors: book?.authors ?? [],
        coverId: book?.coverId,
        text: action.ending.title,
        createdAt: action.ending.createdAt,
        likes: 0,
        endingId: action.ending.id,
      };
      return { ...state, endings, posts: [post, ...state.posts] };
    }

    case 'voteEnding':
      return {
        ...state,
        endings: state.endings.map((e) =>
          e.id === action.endingId
            ? {
                ...e,
                votes: e.votedByMe ? e.votes - 1 : e.votes + 1,
                votedByMe: !e.votedByMe,
              }
            : e
        ),
      };

    case 'deleteEnding':
      return {
        ...state,
        endings: state.endings.filter((e) => e.id !== action.endingId),
        posts: state.posts.filter((p) => p.endingId !== action.endingId),
      };

    case 'addPost':
      return { ...state, posts: [action.post, ...state.posts] };

    case 'likePost':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.postId
            ? {
                ...p,
                likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
                likedByMe: !p.likedByMe,
              }
            : p
        ),
      };

    case 'reset':
      return createInitialState();

    default:
      return state;
  }
}

/**
 * Los libros llegan de fuentes con distinto detalle (búsqueda, ISBN, semilla).
 * Conservamos el campo más completo en vez de sobrescribir a ciegas.
 */
function mergeBook(existing: Book | undefined, incoming: Book): Book {
  if (!existing) return incoming;
  return {
    ...existing,
    ...incoming,
    coverId: incoming.coverId ?? existing.coverId,
    isbn: incoming.isbn ?? existing.isbn,
    description: incoming.description ?? existing.description,
    pages: incoming.pages ?? existing.pages,
    subjects: incoming.subjects.length ? incoming.subjects : existing.subjects,
  };
}

interface StoreValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  /** false hasta que se lee localStorage, para evitar desajustes de hidratación. */
  ready: boolean;
  shelfEntry: (bookId: string) => ShelfEntry | undefined;
  notesFor: (bookId: string) => Note[];
  endingsFor: (bookId: string) => Ending[];
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const [ready, setReady] = useState(false);

  // El primer render debe coincidir con el HTML del servidor, así que el
  // estado guardado se aplica en un efecto y no en el inicializador.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppState>;
        dispatch({ type: 'hydrate', state: { ...createInitialState(), ...parsed } });
      }
    } catch {
      // Un estado corrupto no debe romper la app: seguimos con la semilla.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Cuota llena o modo privado: la sesión sigue funcionando en memoria.
    }
  }, [state, ready]);

  const shelfEntry = useCallback(
    (bookId: string) => state.shelf.find((e) => e.bookId === bookId),
    [state.shelf]
  );

  const notesFor = useCallback(
    (bookId: string) =>
      state.notes
        .filter((n) => n.bookId === bookId)
        .sort((a, b) => b.createdAt - a.createdAt),
    [state.notes]
  );

  const endingsFor = useCallback(
    (bookId: string) =>
      state.endings
        .filter((e) => e.bookId === bookId)
        .sort((a, b) => b.votes - a.votes),
    [state.endings]
  );

  const value = useMemo(
    () => ({ state, dispatch, ready, shelfEntry, notesFor, endingsFor }),
    [state, ready, shelfEntry, notesFor, endingsFor]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore debe usarse dentro de <StoreProvider>');
  return ctx;
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function makeEnding(input: {
  bookId: string;
  bookTitle: string;
  authorName: string;
  title: string;
  body: string;
  mood: EndingMood;
  spoiler: boolean;
}): Ending {
  return {
    id: newId('ending'),
    createdAt: Date.now(),
    votes: 0,
    ...input,
  };
}
