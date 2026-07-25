import { describe, expect, it } from 'vitest';
import { backupFilename, parseBackup, serializeBackup } from './backup';
import { createInitialState } from './seed';

describe('ida y vuelta', () => {
  it('recupera el estado exportado sin perder nada', () => {
    const original = createInitialState();
    const result = parseBackup(serializeBackup(original));

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.dropped).toBe(0);
    expect(result.state.profile).toEqual(original.profile);
    expect(Object.keys(result.state.books)).toHaveLength(
      Object.keys(original.books).length
    );
    expect(result.state.notes).toHaveLength(original.notes.length);
    expect(result.state.endings).toHaveLength(original.endings.length);
    expect(result.state.posts).toHaveLength(original.posts.length);
  });
});

describe('backupFilename', () => {
  it('lleva la fecha en el nombre', () => {
    expect(backupFilename(new Date('2026-07-25T10:00:00Z'))).toBe(
      'libroteca-2026-07-25.json'
    );
  });
});

describe('cabecera', () => {
  it('rechaza JSON inválido', () => {
    const result = parseBackup('{no soy json');
    expect(result).toEqual({ ok: false, error: 'El archivo no es JSON válido.' });
  });

  it('rechaza un archivo de otra app', () => {
    const result = parseBackup(JSON.stringify({ app: 'otra', version: 1, state: {} }));
    expect(result.ok).toBe(false);
  });

  it('rechaza una versión futura', () => {
    const result = parseBackup(
      JSON.stringify({ app: 'libroteca', version: 99, state: {} })
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain('más nueva');
  });

  it('rechaza una copia sin libros', () => {
    const result = parseBackup(
      JSON.stringify({ app: 'libroteca', version: 1, state: { books: {}, shelf: [] } })
    );
    expect(result.ok).toBe(false);
  });
});

/** Envuelve un estado parcial en la cabecera que espera `parseBackup`. */
function wrap(state: unknown): string {
  return JSON.stringify({ app: 'libroteca', version: 1, state });
}

describe('saneado de contenido', () => {
  const libro = {
    id: '/works/OL1W',
    title: 'Fahrenheit 451',
    authors: ['Ray Bradbury'],
    subjects: ['distopía'],
  };

  it('descarta entradas rotas y las cuenta', () => {
    const result = parseBackup(
      wrap({
        books: { ok: libro, roto: { title: 'Sin id' } },
        notes: [
          { id: 'n1', bookId: '/works/OL1W', text: 'vale', createdAt: 1, tags: [] },
          { id: 'n2', bookId: '/works/OL1W' }, // sin texto
        ],
        shelf: [
          { bookId: '/works/OL1W', status: 'leido', addedAt: 1 },
          { bookId: '/works/OL1W', status: 'inventado' },
        ],
      })
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(Object.keys(result.state.books)).toEqual(['/works/OL1W']);
    expect(result.state.notes).toHaveLength(1);
    expect(result.state.shelf).toHaveLength(1);
    expect(result.dropped).toBe(3);
  });

  it('ignora campos con el tipo equivocado en vez de propagarlos', () => {
    const result = parseBackup(
      wrap({
        profile: { name: 42, favoriteSubjects: ['ok', 7, null] },
        books: { ok: { ...libro, pages: 'muchas', coverId: 12 } },
      })
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.state.profile.name).toBe('Lector');
    expect(result.state.profile.favoriteSubjects).toEqual(['ok']);
    expect(result.state.books['/works/OL1W'].pages).toBeUndefined();
    expect(result.state.books['/works/OL1W'].coverId).toBe(12);
  });

  it('normaliza un tono de final desconocido', () => {
    const result = parseBackup(
      wrap({
        books: { ok: libro },
        endings: [
          {
            id: 'e1',
            bookId: '/works/OL1W',
            title: 'Otro final',
            body: 'texto',
            mood: 'inventado',
          },
        ],
      })
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.endings[0].mood).toBe('ambiguo');
    // Sin marca explícita, un final se asume con spoiler.
    expect(result.state.endings[0].spoiler).toBe(true);
  });

  it('no acepta arrays donde espera objetos', () => {
    const result = parseBackup(wrap({ books: [libro], shelf: [] }));
    expect(result.ok).toBe(false);
  });

  it('descarta publicaciones con un tipo desconocido', () => {
    const result = parseBackup(
      wrap({
        books: { ok: libro },
        posts: [
          { id: 'p1', kind: 'resena', bookId: '/works/OL1W', text: 'buena' },
          { id: 'p2', kind: 'spam', bookId: '/works/OL1W', text: 'nope' },
        ],
      })
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.posts).toHaveLength(1);
    expect(result.state.posts[0].id).toBe('p1');
  });
});
