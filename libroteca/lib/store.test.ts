import { describe, expect, it } from 'vitest';
import { appReducer } from './store';
import { createInitialState } from './seed';
import type { AppState, Book, Ending, Note } from './types';

function emptyState(): AppState {
  return {
    profile: { name: 'Lector', favoriteSubjects: [] },
    books: {},
    shelf: [],
    notes: [],
    endings: [],
    posts: [],
  };
}

const BOOK: Book = {
  id: '/works/OL1W',
  title: 'Fahrenheit 451',
  authors: ['Ray Bradbury'],
  subjects: ['distopía'],
};

describe('estantería', () => {
  it('añade el libro al catálogo y a la estantería a la vez', () => {
    const next = appReducer(emptyState(), {
      type: 'addToShelf',
      book: BOOK,
      status: 'leyendo',
    });

    expect(next.books[BOOK.id]).toEqual(BOOK);
    expect(next.shelf).toHaveLength(1);
    expect(next.shelf[0].status).toBe('leyendo');
  });

  it('no duplica un libro que ya estaba, sólo cambia su estado', () => {
    const withBook = appReducer(emptyState(), {
      type: 'addToShelf',
      book: BOOK,
      status: 'pendiente',
    });
    const next = appReducer(withBook, {
      type: 'addToShelf',
      book: BOOK,
      status: 'leido',
    });

    expect(next.shelf).toHaveLength(1);
    expect(next.shelf[0].status).toBe('leido');
  });

  it('marca la fecha de fin al pasar a leído y la borra al salir', () => {
    const withBook = appReducer(emptyState(), {
      type: 'addToShelf',
      book: BOOK,
      status: 'leyendo',
    });

    const leido = appReducer(withBook, {
      type: 'setStatus',
      bookId: BOOK.id,
      status: 'leido',
    });
    expect(leido.shelf[0].finishedAt).toBeTypeOf('number');

    const releyendo = appReducer(leido, {
      type: 'setStatus',
      bookId: BOOK.id,
      status: 'leyendo',
    });
    expect(releyendo.shelf[0].finishedAt).toBeUndefined();
  });

  it('quita el libro de la estantería pero lo deja en el catálogo', () => {
    const withBook = appReducer(emptyState(), {
      type: 'addToShelf',
      book: BOOK,
      status: 'pendiente',
    });
    const next = appReducer(withBook, {
      type: 'removeFromShelf',
      bookId: BOOK.id,
    });

    expect(next.shelf).toHaveLength(0);
    expect(next.books[BOOK.id]).toBeDefined();
  });
});

describe('upsertBook', () => {
  it('conserva los campos ricos cuando llega una versión más pobre', () => {
    const rico: Book = { ...BOOK, coverId: 7, pages: 194, description: 'Un bombero.' };
    const conRico = appReducer(emptyState(), { type: 'upsertBook', book: rico });

    const pobre: Book = { id: BOOK.id, title: BOOK.title, authors: [], subjects: [] };
    const next = appReducer(conRico, { type: 'upsertBook', book: pobre });

    expect(next.books[BOOK.id].coverId).toBe(7);
    expect(next.books[BOOK.id].pages).toBe(194);
    expect(next.books[BOOK.id].description).toBe('Un bombero.');
    expect(next.books[BOOK.id].subjects).toEqual(['distopía']);
  });

  it('sí acepta datos nuevos que antes faltaban', () => {
    const conPobre = appReducer(emptyState(), { type: 'upsertBook', book: BOOK });
    const next = appReducer(conPobre, {
      type: 'upsertBook',
      book: { ...BOOK, isbn: '9781451673319' },
    });

    expect(next.books[BOOK.id].isbn).toBe('9781451673319');
  });
});

describe('temas favoritos', () => {
  it('alterna al pulsar dos veces', () => {
    const activado = appReducer(emptyState(), {
      type: 'toggleFavoriteSubject',
      subject: 'distopía',
    });
    expect(activado.profile.favoriteSubjects).toEqual(['distopía']);

    const desactivado = appReducer(activado, {
      type: 'toggleFavoriteSubject',
      subject: 'distopía',
    });
    expect(desactivado.profile.favoriteSubjects).toEqual([]);
  });
});

describe('notas', () => {
  const note: Note = {
    id: 'n1',
    bookId: BOOK.id,
    text: 'Una idea',
    createdAt: 1,
    private: false,
    tags: [],
  };

  it('pone las nuevas primero', () => {
    const una = appReducer(emptyState(), { type: 'addNote', note });
    const dos = appReducer(una, {
      type: 'addNote',
      note: { ...note, id: 'n2', text: 'Otra' },
    });

    expect(dos.notes.map((n) => n.id)).toEqual(['n2', 'n1']);
  });

  it('actualiza sólo los campos del parche', () => {
    const una = appReducer(emptyState(), { type: 'addNote', note });
    const next = appReducer(una, {
      type: 'updateNote',
      noteId: 'n1',
      patch: { private: true },
    });

    expect(next.notes[0].private).toBe(true);
    expect(next.notes[0].text).toBe('Una idea');
  });

  it('borra por id', () => {
    const una = appReducer(emptyState(), { type: 'addNote', note });
    expect(appReducer(una, { type: 'deleteNote', noteId: 'n1' }).notes).toHaveLength(0);
  });
});

describe('finales alternativos', () => {
  const ending: Ending = {
    id: 'e1',
    bookId: BOOK.id,
    bookTitle: BOOK.title,
    authorName: 'Lector',
    title: 'El fuego se apaga',
    body: 'texto largo',
    mood: 'ambiguo',
    createdAt: 1,
    votes: 0,
    spoiler: true,
  };

  const base = appReducer(emptyState(), { type: 'upsertBook', book: BOOK });

  it('publicar sin compartir no toca la comunidad', () => {
    const next = appReducer(base, { type: 'addEnding', ending, share: false });

    expect(next.endings).toHaveLength(1);
    expect(next.posts).toHaveLength(0);
  });

  it('compartir crea una publicación enlazada al final', () => {
    const next = appReducer(base, { type: 'addEnding', ending, share: true });

    expect(next.posts).toHaveLength(1);
    expect(next.posts[0].kind).toBe('final');
    expect(next.posts[0].endingId).toBe('e1');
    expect(next.posts[0].bookAuthors).toEqual(['Ray Bradbury']);
  });

  it('borrar el final se lleva su publicación', () => {
    const compartido = appReducer(base, { type: 'addEnding', ending, share: true });
    const next = appReducer(compartido, { type: 'deleteEnding', endingId: 'e1' });

    expect(next.endings).toHaveLength(0);
    expect(next.posts).toHaveLength(0);
  });

  it('el voto suma, marca y se puede retirar', () => {
    const conFinal = appReducer(base, { type: 'addEnding', ending, share: false });

    const votado = appReducer(conFinal, { type: 'voteEnding', endingId: 'e1' });
    expect(votado.endings[0].votes).toBe(1);
    expect(votado.endings[0].votedByMe).toBe(true);

    const retirado = appReducer(votado, { type: 'voteEnding', endingId: 'e1' });
    expect(retirado.endings[0].votes).toBe(0);
    expect(retirado.endings[0].votedByMe).toBe(false);
  });
});

describe('estado global', () => {
  it('importState reemplaza todo', () => {
    const importado = emptyState();
    importado.profile.name = 'Otra persona';

    const next = appReducer(createInitialState(), {
      type: 'importState',
      state: importado,
    });

    expect(next.profile.name).toBe('Otra persona');
    expect(next.shelf).toHaveLength(0);
  });

  it('reset vuelve al catálogo inicial', () => {
    const vacío = appReducer(emptyState(), { type: 'reset' });
    expect(Object.keys(vacío.books).length).toBeGreaterThan(0);
  });

  it('no muta el estado que recibe', () => {
    const antes = emptyState();
    const copia = JSON.parse(JSON.stringify(antes));

    appReducer(antes, { type: 'addToShelf', book: BOOK, status: 'leido' });

    expect(antes).toEqual(copia);
  });
});
