import { describe, expect, it } from 'vitest';
import { popularSubjects, recommend, tasteProfile } from './recommend';
import type { AppState, Book, Ending, ShelfEntry } from './types';

function book(id: string, subjects: string[], authors = ['Autora X']): Book {
  return { id, title: `Libro ${id}`, authors, subjects };
}

function state(overrides: Partial<AppState> = {}): AppState {
  return {
    profile: { name: 'Lector', favoriteSubjects: [] },
    books: {},
    shelf: [],
    notes: [],
    endings: [],
    posts: [],
    ...overrides,
  };
}

function shelf(bookId: string, extra: Partial<ShelfEntry> = {}): ShelfEntry {
  return { bookId, status: 'leido', addedAt: 0, ...extra };
}

describe('tasteProfile', () => {
  it('pondera los favoritos declarados por encima de todo lo demás', () => {
    const weights = tasteProfile(
      state({ profile: { name: 'L', favoriteSubjects: ['distopía'] } })
    );
    expect(weights.get('distopía')).toBe(3);
  });

  it('escala el peso de un libro leído según su puntuación', () => {
    const alto = tasteProfile(
      state({
        books: { a: book('a', ['fantasía']) },
        shelf: [shelf('a', { rating: 5 })],
      })
    );
    const bajo = tasteProfile(
      state({
        books: { a: book('a', ['fantasía']) },
        shelf: [shelf('a', { rating: 1 })],
      })
    );

    expect(alto.get('fantasía')!).toBeGreaterThan(bajo.get('fantasía')!);
  });

  it('resta cuando el libro se abandonó', () => {
    const weights = tasteProfile(
      state({
        books: { a: book('a', ['ensayo']) },
        shelf: [shelf('a', { status: 'abandonado' })],
      })
    );
    expect(weights.get('ensayo')!).toBeLessThan(0);
  });

  it('trata escribir un final como señal de afinidad', () => {
    const ending: Ending = {
      id: 'e1',
      bookId: 'a',
      bookTitle: 'Libro a',
      authorName: 'Lector',
      title: 'Otro final',
      body: 'texto',
      mood: 'ambiguo',
      createdAt: 0,
      votes: 0,
      spoiler: false,
    };

    const weights = tasteProfile(
      state({ books: { a: book('a', ['terror']) }, endings: [ending] })
    );
    expect(weights.get('terror')).toBe(1.2);
  });

  it('normaliza mayúsculas para no duplicar temas', () => {
    const weights = tasteProfile(
      state({ profile: { name: 'L', favoriteSubjects: ['Distopía'] } })
    );
    expect(weights.get('distopía')).toBe(3);
  });
});

describe('recommend', () => {
  it('nunca recomienda algo que ya está en la estantería', () => {
    const result = recommend(
      state({
        books: { a: book('a', ['x']), b: book('b', ['x']) },
        shelf: [shelf('a')],
      })
    );

    expect(result.map((r) => r.book.id)).toEqual(['b']);
  });

  it('ordena por coincidencia de temas', () => {
    const result = recommend(
      state({
        profile: { name: 'L', favoriteSubjects: ['distopía'] },
        books: {
          match: book('match', ['distopía']),
          otro: book('otro', ['cocina']),
        },
      })
    );

    expect(result[0].book.id).toBe('match');
    expect(result[0].reasons[0]).toContain('distopía');
  });

  it('sube los libros del mismo autor que puntuaste alto', () => {
    const result = recommend(
      state({
        books: {
          leido: book('leido', ['x'], ['Ursula K. Le Guin']),
          mismo: book('mismo', [], ['Ursula K. Le Guin']),
          ajeno: book('ajeno', []),
        },
        shelf: [shelf('leido', { rating: 5 })],
      })
    );

    expect(result[0].book.id).toBe('mismo');
    expect(result[0].reasons.join(' ')).toContain('Ursula K. Le Guin');
  });

  it('no considera autor afín a quien puntuaste bajo', () => {
    const result = recommend(
      state({
        books: {
          leido: book('leido', [], ['Autor Regular']),
          mismo: book('mismo', [], ['Autor Regular']),
        },
        shelf: [shelf('leido', { rating: 2 })],
      })
    );

    expect(result[0].reasons).toEqual(['Nuevo en el catálogo']);
  });

  it('desempata por título para que el orden no baile', () => {
    const sinSenal = state({
      books: { z: book('z', []), a: book('a', []) },
    });

    const primera = recommend(sinSenal).map((r) => r.book.title);
    const segunda = recommend(sinSenal).map((r) => r.book.title);

    expect(primera).toEqual(segunda);
    expect(primera[0]).toBe('Libro a');
  });

  it('respeta el límite pedido', () => {
    const books: Record<string, Book> = {};
    for (let i = 0; i < 20; i++) books[`b${i}`] = book(`b${i}`, []);

    expect(recommend(state({ books }), { limit: 3 })).toHaveLength(3);
  });

  it('siempre explica por qué aparece un libro', () => {
    const result = recommend(state({ books: { a: book('a', []) } }));
    expect(result[0].reasons.length).toBeGreaterThan(0);
  });
});

describe('popularSubjects', () => {
  it('ordena por frecuencia', () => {
    const subjects = popularSubjects(
      state({
        books: {
          a: book('a', ['común', 'raro']),
          b: book('b', ['común']),
        },
      })
    );

    expect(subjects[0]).toBe('común');
  });

  it('respeta el límite', () => {
    const books: Record<string, Book> = {};
    for (let i = 0; i < 30; i++) books[`b${i}`] = book(`b${i}`, [`tema-${i}`]);

    expect(popularSubjects(state({ books }), 5)).toHaveLength(5);
  });
});
