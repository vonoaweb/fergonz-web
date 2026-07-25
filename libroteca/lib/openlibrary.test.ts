import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  bookCoverUrl,
  coverUrl,
  isValidIsbn,
  lookupIsbn,
  normalizeIsbn,
  searchBooks,
  slugify,
} from './openlibrary';

describe('normalizeIsbn', () => {
  it('quita guiones y espacios', () => {
    expect(normalizeIsbn('978-84-663-2452-6')).toBe('9788466324526');
    expect(normalizeIsbn(' 0 306 40615 2 ')).toBe('0306406152');
  });

  it('acepta la X final de un ISBN-10', () => {
    expect(normalizeIsbn('043942089x')).toBe('043942089X');
  });

  it('rechaza longitudes que no son 10 ni 13', () => {
    expect(normalizeIsbn('12345')).toBeNull();
    expect(normalizeIsbn('97884663245261')).toBeNull();
    expect(normalizeIsbn('')).toBeNull();
  });

  it('rechaza una X en mitad del código', () => {
    expect(normalizeIsbn('04394X0895')).toBeNull();
  });
});

describe('isValidIsbn', () => {
  it('valida dígitos de control correctos', () => {
    expect(isValidIsbn('0306406152')).toBe(true); // ISBN-10
    expect(isValidIsbn('043942089X')).toBe(true); // ISBN-10 acabado en X
    expect(isValidIsbn('9780451524935')).toBe(true); // EAN-13
    expect(isValidIsbn('978-0-451-52493-5')).toBe(true);
  });

  it('rechaza dígitos de control incorrectos', () => {
    expect(isValidIsbn('0306406153')).toBe(false);
    expect(isValidIsbn('9780451524936')).toBe(false);
  });

  it('rechaza códigos de barras que no son de libro', () => {
    // EAN-13 válido pero con prefijo de producto, no de publicación.
    expect(isValidIsbn('4006381333931')).toBe(false);
  });

  it('acepta el prefijo 979 además del 978', () => {
    expect(isValidIsbn('9791234567896')).toBe(true);
  });
});

describe('slugify', () => {
  it('quita acentos y signos', () => {
    expect(slugify('Cien años de soledad')).toBe('cien-anos-de-soledad');
    expect(slugify('¿Quién mató a Palomino Molero?')).toBe(
      'quien-mato-a-palomino-molero'
    );
  });

  it('no deja guiones sueltos en los extremos', () => {
    expect(slugify('  ¡Hola!  ')).toBe('hola');
  });
});

describe('coverUrl', () => {
  it('devuelve null sin id de portada', () => {
    expect(coverUrl(undefined)).toBeNull();
  });

  it('prefiere el id de Open Library sobre el ISBN', () => {
    const url = bookCoverUrl({ coverId: 42, isbn: '9780451524935' }, 'L');
    expect(url).toBe('https://covers.openlibrary.org/b/id/42-L.jpg');
  });

  it('cae al ISBN cuando no hay id', () => {
    expect(bookCoverUrl({ isbn: '9780451524935' })).toBe(
      'https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg'
    );
  });

  it('devuelve null cuando no hay ninguno de los dos', () => {
    expect(bookCoverUrl({})).toBeNull();
  });
});

/** Respuesta mínima con la forma que devuelve `search.json`. */
function mockFetchOnce(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: async () => body,
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('searchBooks', () => {
  it('no llama a la red con una consulta vacía', async () => {
    const fetchMock = mockFetchOnce({ docs: [] });
    vi.stubGlobal('fetch', fetchMock);

    expect(await searchBooks('   ')).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('convierte los documentos al modelo de la app', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchOnce({
        docs: [
          {
            key: '/works/OL1W',
            title: 'Fahrenheit 451',
            author_name: ['Ray Bradbury'],
            first_publish_year: 1953,
            cover_i: 99,
            isbn: ['9781451673319', 'otro'],
            subject: Array.from({ length: 12 }, (_, i) => `tema-${i}`),
            number_of_pages_median: 194,
          },
        ],
      })
    );

    const [book] = await searchBooks('fahrenheit');
    expect(book.id).toBe('/works/OL1W');
    expect(book.title).toBe('Fahrenheit 451');
    expect(book.authors).toEqual(['Ray Bradbury']);
    expect(book.year).toBe(1953);
    expect(book.isbn).toBe('9781451673319');
    expect(book.pages).toBe(194);
    // Los temas se recortan para no llenar la ficha de ruido.
    expect(book.subjects).toHaveLength(8);
  });

  it('descarta documentos sin título', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchOnce({ docs: [{ key: '/works/OL2W' }, { title: 'Válido' }] })
    );

    const results = await searchBooks('lo que sea');
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Válido');
  });

  it('propaga un fallo de la API', async () => {
    vi.stubGlobal('fetch', mockFetchOnce({}, false));
    await expect(searchBooks('algo')).rejects.toThrow('Open Library');
  });
});

describe('lookupIsbn', () => {
  it('rechaza un ISBN mal formado sin tocar la red', async () => {
    const fetchMock = mockFetchOnce({});
    vi.stubGlobal('fetch', fetchMock);

    expect(await lookupIsbn('12345')).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('lee el ISBN del endpoint de libros', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchOnce({
        'ISBN:9780451524935': {
          title: '1984',
          key: '/books/OL7440033M',
          authors: [{ name: 'George Orwell' }],
          publish_date: 'July 1, 1961',
          cover: { medium: 'https://covers.openlibrary.org/b/id/8575741-M.jpg' },
          subjects: [{ name: 'distopía' }],
          number_of_pages: 328,
        },
      })
    );

    const book = await lookupIsbn('978-0-451-52493-5');
    expect(book).not.toBeNull();
    expect(book?.title).toBe('1984');
    expect(book?.authors).toEqual(['George Orwell']);
    expect(book?.year).toBe(1961);
    // El id de portada se extrae de la URL que devuelve la API.
    expect(book?.coverId).toBe(8575741);
    expect(book?.isbn).toBe('9780451524935');
  });

  it('recurre a la búsqueda cuando el endpoint no conoce el ISBN', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          docs: [{ key: '/works/OL9W', title: 'Edición rara' }],
        }),
      });
    vi.stubGlobal('fetch', fetchMock);

    const book = await lookupIsbn('9780451524935');
    expect(book?.title).toBe('Edición rara');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
