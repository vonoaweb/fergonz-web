import type { AppState, Book } from './types';

export interface Recommendation {
  book: Book;
  score: number;
  /** Frases cortas que explican al lector por qué le sale este libro. */
  reasons: string[];
}

/**
 * Perfil de gustos: pesa cada tema según de dónde viene la señal.
 * Un libro puntuado con 5 dice mucho más que uno pendiente de leer.
 */
export function tasteProfile(state: AppState): Map<string, number> {
  const weights = new Map<string, number>();

  const add = (subject: string, weight: number) => {
    const key = subject.toLowerCase();
    weights.set(key, (weights.get(key) ?? 0) + weight);
  };

  for (const subject of state.profile.favoriteSubjects) add(subject, 3);

  for (const entry of state.shelf) {
    const book = state.books[entry.bookId];
    if (!book) continue;

    let weight = 0;
    if (entry.status === 'leido') weight = 1.5;
    else if (entry.status === 'leyendo') weight = 1;
    else if (entry.status === 'pendiente') weight = 0.5;
    else if (entry.status === 'abandonado') weight = -1;

    if (entry.rating) weight *= entry.rating / 3;

    for (const subject of book.subjects) add(subject, weight);
  }

  // Escribir un final alternativo es la señal de afinidad más fuerte que hay.
  for (const ending of state.endings) {
    const book = state.books[ending.bookId];
    if (!book) continue;
    for (const subject of book.subjects) add(subject, 1.2);
  }

  return weights;
}

/** Autores de libros que el lector puntuó con 4 o más. */
function lovedAuthors(state: AppState): Set<string> {
  const authors = new Set<string>();
  for (const entry of state.shelf) {
    if (!entry.rating || entry.rating < 4) continue;
    const book = state.books[entry.bookId];
    book?.authors.forEach((a) => authors.add(a));
  }
  return authors;
}

export function recommend(
  state: AppState,
  options: { limit?: number; pool?: Book[] } = {}
): Recommendation[] {
  const { limit = 8, pool } = options;
  const weights = tasteProfile(state);
  const authors = lovedAuthors(state);
  const onShelf = new Set(state.shelf.map((e) => e.bookId));

  const communityBuzz = new Map<string, number>();
  for (const post of state.posts) {
    communityBuzz.set(
      post.bookId,
      (communityBuzz.get(post.bookId) ?? 0) + post.likes
    );
  }

  const candidates = pool ?? Object.values(state.books);

  const scored = candidates
    .filter((book) => !onShelf.has(book.id))
    .map<Recommendation>((book) => {
      let score = 0;
      const reasons: string[] = [];

      const matched: string[] = [];
      for (const subject of book.subjects) {
        const weight = weights.get(subject.toLowerCase());
        if (weight && weight > 0) {
          score += weight;
          matched.push(subject);
        }
      }
      if (matched.length) {
        reasons.push(`Coincide con ${matched.slice(0, 2).join(' y ')}`);
      }

      const authorMatch = book.authors.find((a) => authors.has(a));
      if (authorMatch) {
        score += 4;
        reasons.push(`Del mismo autor que puntuaste alto: ${authorMatch}`);
      }

      const buzz = communityBuzz.get(book.id) ?? 0;
      if (buzz > 0) {
        score += Math.min(buzz / 25, 2);
        reasons.push(`${buzz} me gusta en la comunidad`);
      }

      const endings = state.endings.filter((e) => e.bookId === book.id).length;
      if (endings > 0) {
        score += Math.min(endings * 0.8, 2);
        reasons.push(
          `${endings} final${endings === 1 ? '' : 'es'} alternativo${
            endings === 1 ? '' : 's'
          } escrito${endings === 1 ? '' : 's'}`
        );
      }

      if (!reasons.length) reasons.push('Nuevo en el catálogo');

      return { book, score, reasons };
    });

  // Desempate estable por título para que el orden no baile entre renders.
  scored.sort((a, b) => b.score - a.score || a.book.title.localeCompare(b.book.title));

  return scored.slice(0, limit);
}

/** Temas más frecuentes del catálogo, para los chips de "elige tus gustos". */
export function popularSubjects(state: AppState, limit = 14): string[] {
  const counts = new Map<string, number>();
  for (const book of Object.values(state.books)) {
    for (const subject of book.subjects) {
      const key = subject.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([subject]) => subject);
}
