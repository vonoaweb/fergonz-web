export type ReadingStatus = 'pendiente' | 'leyendo' | 'leido' | 'abandonado';

export interface Book {
  /** Identificador estable: la work key de Open Library, o `manual:<slug>`. */
  id: string;
  title: string;
  authors: string[];
  year?: number;
  /** ID de portada de Open Library (`cover_i` / `covers[0]`). */
  coverId?: number;
  isbn?: string;
  subjects: string[];
  pages?: number;
  description?: string;
}

export interface Note {
  id: string;
  bookId: string;
  /** Cita textual resaltada del libro, opcional. */
  quote?: string;
  text: string;
  page?: number;
  createdAt: number;
  /** Las notas privadas nunca se muestran en la comunidad. */
  private: boolean;
  tags: string[];
}

/** Un final alternativo escrito por un lector: "tu propio final". */
export interface Ending {
  id: string;
  bookId: string;
  bookTitle: string;
  authorName: string;
  title: string;
  body: string;
  /** Tono narrativo, usado para filtrar y colorear la tarjeta. */
  mood: EndingMood;
  createdAt: number;
  votes: number;
  /** Si el usuario local ya votó, para no contar dos veces. */
  votedByMe?: boolean;
  spoiler: boolean;
}

export const ENDING_MOODS = [
  'esperanzador',
  'tragico',
  'ambiguo',
  'vengativo',
  'onirico',
  'comico',
] as const;

export type EndingMood = (typeof ENDING_MOODS)[number];

export interface ShelfEntry {
  bookId: string;
  status: ReadingStatus;
  rating?: number;
  addedAt: number;
  finishedAt?: number;
  currentPage?: number;
}

export interface CommunityPost {
  id: string;
  kind: 'resena' | 'recomendacion' | 'final';
  authorName: string;
  bookId: string;
  bookTitle: string;
  bookAuthors: string[];
  coverId?: number;
  text: string;
  rating?: number;
  createdAt: number;
  likes: number;
  likedByMe?: boolean;
  /** Sólo para posts de tipo `final`. */
  endingId?: string;
}

export interface Profile {
  name: string;
  /** Géneros favoritos declarados; alimentan las recomendaciones. */
  favoriteSubjects: string[];
}

export interface AppState {
  profile: Profile;
  books: Record<string, Book>;
  shelf: ShelfEntry[];
  notes: Note[];
  endings: Ending[];
  posts: CommunityPost[];
}
