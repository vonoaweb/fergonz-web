import type { AppState, Book, CommunityPost, Ending } from './types';

/**
 * Catálogo inicial para que la app tenga contenido antes de la primera
 * búsqueda. Los `id` imitan las work keys de Open Library, así que un libro
 * añadido después por búsqueda o escáner se reconcilia con el mismo id.
 */
const SEED_BOOKS: Book[] = [
  {
    id: '/works/OL10393363W',
    title: 'Cien años de soledad',
    authors: ['Gabriel García Márquez'],
    year: 1967,
    isbn: '9780307474728',
    subjects: ['realismo mágico', 'saga familiar', 'literatura latinoamericana'],
    pages: 417,
    description:
      'La estirpe de los Buendía funda Macondo y arrastra durante siete generaciones la misma soledad heredada.',
  },
  {
    id: '/works/OL1168083W',
    title: '1984',
    authors: ['George Orwell'],
    year: 1949,
    isbn: '9780451524935',
    subjects: ['distopía', 'política', 'ciencia ficción'],
    pages: 328,
    description:
      'Winston Smith reescribe el pasado para un Partido que vigila hasta el pensamiento.',
  },
  {
    id: '/works/OL27479W',
    title: 'La sombra del viento',
    authors: ['Carlos Ruiz Zafón'],
    year: 2001,
    isbn: '9788408163374',
    subjects: ['misterio', 'literatura española', 'histórica'],
    pages: 487,
    description:
      'Un niño elige un libro en el Cementerio de los Libros Olvidados y alguien empieza a quemar todo lo que ese autor escribió.',
  },
  {
    id: '/works/OL45804W',
    title: 'Rayuela',
    authors: ['Julio Cortázar'],
    year: 1963,
    isbn: '9788437604572',
    subjects: ['experimental', 'literatura latinoamericana', 'filosofía'],
    pages: 635,
    description:
      'Una novela que se puede leer en dos órdenes distintos y que cambia según cuál elijas.',
  },
  {
    id: '/works/OL8193420W',
    title: 'Kafka en la orilla',
    authors: ['Haruki Murakami'],
    year: 2002,
    isbn: '9788483835043',
    subjects: ['realismo mágico', 'japonesa', 'onírico'],
    pages: 618,
    description:
      'Un chico de quince años huye de casa mientras un anciano que habla con los gatos sigue la misma profecía por otro camino.',
  },
  {
    id: '/works/OL15626917W',
    title: 'La casa de los espíritus',
    authors: ['Isabel Allende'],
    year: 1982,
    isbn: '9780553383805',
    subjects: ['realismo mágico', 'saga familiar', 'política'],
    pages: 433,
    description:
      'Clara del Valle anota en sus cuadernos lo que va a pasar antes de que pase, durante tres generaciones de una familia chilena.',
  },
  {
    id: '/works/OL21177W',
    title: 'Fahrenheit 451',
    authors: ['Ray Bradbury'],
    year: 1953,
    isbn: '9781451673319',
    subjects: ['distopía', 'ciencia ficción', 'censura'],
    pages: 194,
    description:
      'Un bombero que quema libros empieza a leerlos.',
  },
  {
    id: '/works/OL27448W',
    title: 'El nombre del viento',
    authors: ['Patrick Rothfuss'],
    year: 2007,
    isbn: '9788401352836',
    subjects: ['fantasía', 'aventura', 'magia'],
    pages: 662,
    description:
      'Kvothe cuenta en tres días cómo pasó de músico huérfano a la leyenda que todos repiten mal.',
  },
  {
    id: '/works/OL2163649W',
    title: 'Los detectives salvajes',
    authors: ['Roberto Bolaño'],
    year: 1998,
    isbn: '9788433920584',
    subjects: ['literatura latinoamericana', 'road novel', 'poesía'],
    pages: 609,
    description:
      'Dos poetas real visceralistas buscan por medio mundo a una poeta que quizá no escribió nada.',
  },
  {
    id: '/works/OL5735363W',
    title: 'El cuento de la criada',
    authors: ['Margaret Atwood'],
    year: 1985,
    isbn: '9780385490818',
    subjects: ['distopía', 'feminismo', 'política'],
    pages: 311,
    description:
      'En Gilead, Defred recuerda un mundo en el que las mujeres podían leer.',
  },
  {
    id: '/works/OL3140834W',
    title: 'Pedro Páramo',
    authors: ['Juan Rulfo'],
    year: 1955,
    isbn: '9788437604183',
    subjects: ['realismo mágico', 'literatura latinoamericana', 'fantasmas'],
    pages: 124,
    description:
      'Juan Preciado va a Comala a buscar a su padre y descubre que ahí todos los que hablan están muertos.',
  },
  {
    id: '/works/OL262758W',
    title: 'Norwegian Wood (Tokio blues)',
    authors: ['Haruki Murakami'],
    year: 1987,
    isbn: '9788483835043',
    subjects: ['japonesa', 'romance', 'melancolía'],
    pages: 386,
    description:
      'Una canción de los Beatles devuelve a Toru a los dos amores que lo partieron en dos a los veinte años.',
  },
];

const DAY = 86_400_000;

/** Sembrado relativo a "ahora" para que las fechas nunca queden en el futuro. */
function daysAgo(n: number): number {
  return Date.now() - n * DAY;
}

const SEED_ENDINGS: Ending[] = [
  {
    id: 'ending-seed-1',
    bookId: '/works/OL10393363W',
    bookTitle: 'Cien años de soledad',
    authorName: 'Mariana R.',
    title: 'Macondo no se lo lleva el viento',
    body: 'Aureliano termina de traducir los pergaminos y, en vez de dejar que el huracán borre el pueblo, arranca la última página. Macondo sobrevive, pero condenado a repetirse sin final escrito: cada generación vuelve a nombrar a sus hijos igual, sabiendo ya que nadie vendrá a leerlos.',
    mood: 'ambiguo',
    createdAt: daysAgo(12),
    votes: 148,
    spoiler: true,
  },
  {
    id: 'ending-seed-2',
    bookId: '/works/OL1168083W',
    bookTitle: '1984',
    authorName: 'Nico',
    title: 'La habitación 101 estaba vacía',
    body: 'Winston no ama al Gran Hermano: aprende a fingirlo tan bien que el Partido lo asciende a redactor jefe. Desde ahí, durante veinte años, introduce erratas mínimas en los archivos. Nadie las nota. Cuando muere, un becario encuentra el patrón y entiende que las erratas deletrean un nombre: Julia.',
    mood: 'esperanzador',
    createdAt: daysAgo(9),
    votes: 231,
    spoiler: true,
  },
  {
    id: 'ending-seed-3',
    bookId: '/works/OL21177W',
    bookTitle: 'Fahrenheit 451',
    authorName: 'Ferguson',
    title: 'Los hombres libro olvidan',
    body: 'Montag llega al río y descubre que los hombres libro están perdiendo la memoria. El que era el Eclesiastés ya sólo recuerda tres versículos. Entonces empieza el verdadero trabajo: no recordar los libros, sino volver a escribirlos mal, distintos, vivos.',
    mood: 'ambiguo',
    createdAt: daysAgo(5),
    votes: 97,
    spoiler: true,
  },
  {
    id: 'ending-seed-4',
    bookId: '/works/OL3140834W',
    bookTitle: 'Pedro Páramo',
    authorName: 'Ale V.',
    title: 'Comala amanece',
    body: 'Susana San Juan no muere: se levanta y camina hasta la plaza. Los murmullos callan por primera vez en cincuenta años. Pedro Páramo, que se estaba desmoronando como un montón de piedras, se detiene a medio derrumbe y no vuelve a moverse nunca, ni para caer.',
    mood: 'onirico',
    createdAt: daysAgo(3),
    votes: 64,
    spoiler: true,
  },
  {
    id: 'ending-seed-5',
    bookId: '/works/OL5735363W',
    bookTitle: 'El cuento de la criada',
    authorName: 'Paula',
    title: 'Las notas históricas',
    body: 'La furgoneta era una trampa. Defred no escapa, pero alcanza a esconder las cintas bajo el suelo del desván. El epílogo, doscientos años después, no es un congreso académico: es una niña de Gilead que encuentra las cintas y no entiende del todo el idioma, y aun así las copia entera, palabra por palabra, sin saber que eso es exactamente lo que Defred pedía.',
    mood: 'esperanzador',
    createdAt: daysAgo(1),
    votes: 189,
    spoiler: true,
  },
];

const SEED_POSTS: CommunityPost[] = [
  {
    id: 'post-seed-1',
    kind: 'recomendacion',
    authorName: 'Mariana R.',
    bookId: '/works/OL2163649W',
    bookTitle: 'Los detectives salvajes',
    bookAuthors: ['Roberto Bolaño'],
    text: 'Si te gustó Rayuela pero querías menos teoría y más carretera, este es. Las 400 páginas del medio son cincuenta voces distintas y ninguna sobra.',
    rating: 5,
    createdAt: daysAgo(2),
    likes: 42,
  },
  {
    id: 'post-seed-2',
    kind: 'resena',
    authorName: 'Nico',
    bookId: '/works/OL27448W',
    bookTitle: 'El nombre del viento',
    bookAuthors: ['Patrick Rothfuss'],
    text: 'Prosa preciosa, estructura perfecta, y una promesa de trilogía que llevo esperando desde 2011. Cinco estrellas al libro, cero a mi paciencia.',
    rating: 4,
    createdAt: daysAgo(4),
    likes: 77,
  },
  {
    id: 'post-seed-3',
    kind: 'final',
    authorName: 'Nico',
    bookId: '/works/OL1168083W',
    bookTitle: '1984',
    bookAuthors: ['George Orwell'],
    text: 'Escribí un final donde Winston gana, pero tarda veinte años y nadie se entera. Se aceptan quejas.',
    createdAt: daysAgo(9),
    likes: 118,
    endingId: 'ending-seed-2',
  },
  {
    id: 'post-seed-4',
    kind: 'recomendacion',
    authorName: 'Ale V.',
    bookId: '/works/OL8193420W',
    bookTitle: 'Kafka en la orilla',
    bookAuthors: ['Haruki Murakami'],
    text: 'Para leer de noche y sin buscarle explicación a nada. Los gatos hablan y hay que dejarlos.',
    rating: 5,
    createdAt: daysAgo(6),
    likes: 55,
  },
  {
    id: 'post-seed-5',
    kind: 'resena',
    authorName: 'Paula',
    bookId: '/works/OL15626917W',
    bookTitle: 'La casa de los espíritus',
    bookAuthors: ['Isabel Allende'],
    text: 'La primera mitad es magia y la segunda es un país rompiéndose. El cambio de tono es el punto, no un defecto.',
    rating: 5,
    createdAt: daysAgo(8),
    likes: 63,
  },
];

export function createInitialState(): AppState {
  const books: Record<string, Book> = {};
  for (const book of SEED_BOOKS) books[book.id] = book;

  return {
    profile: { name: 'Lector', favoriteSubjects: [] },
    books,
    shelf: [
      {
        bookId: '/works/OL1168083W',
        status: 'leido',
        rating: 5,
        addedAt: daysAgo(40),
        finishedAt: daysAgo(30),
      },
      {
        bookId: '/works/OL10393363W',
        status: 'leyendo',
        addedAt: daysAgo(10),
        currentPage: 210,
      },
      {
        bookId: '/works/OL27479W',
        status: 'pendiente',
        addedAt: daysAgo(4),
      },
    ],
    notes: [
      {
        id: 'note-seed-1',
        bookId: '/works/OL10393363W',
        quote:
          'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.',
        text: 'Toda la novela cabe en esta frase: futuro, pasado y presente en una sola respiración.',
        page: 9,
        createdAt: daysAgo(9),
        private: false,
        tags: ['apertura', 'estructura'],
      },
      {
        id: 'note-seed-2',
        bookId: '/works/OL1168083W',
        quote: 'Quien controla el pasado controla el futuro.',
        text: 'Releer esto cada vez que alguien edite un titular sin avisar.',
        page: 44,
        createdAt: daysAgo(31),
        private: false,
        tags: ['política'],
      },
    ],
    endings: SEED_ENDINGS,
    posts: SEED_POSTS,
  };
}

export const SEED_BOOK_LIST = SEED_BOOKS;
