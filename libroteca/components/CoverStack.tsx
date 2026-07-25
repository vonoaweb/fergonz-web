'use client';

import Link from 'next/link';
import BookCover from './BookCover';
import { bookHref } from '@/lib/format';
import type { Book } from '@/lib/types';

/**
 * Inclinaciones fijas, como libros apoyados en un anaquel. El solape es
 * pequeño a propósito: si tapa el título, deja de leerse como una estantería.
 */
const SHELF = [
  '-rotate-[7deg] translate-y-1',
  '-rotate-[2deg] -translate-y-2',
  'rotate-[3deg] translate-y-2',
  'rotate-[8deg] -translate-y-1',
];

export default function CoverStack({ books }: { books: Book[] }) {
  const shown = books.slice(0, 4);
  if (shown.length === 0) return null;

  return (
    <div className="flex justify-center -space-x-2">
      {shown.map((book, index) => (
        <Link
          key={book.id}
          href={bookHref(book.id)}
          title={book.title}
          style={{ zIndex: index }}
          className={`group block origin-bottom transition duration-300 ease-out hover:z-10 hover:-translate-y-3 hover:rotate-0 ${SHELF[index]}`}
        >
          <BookCover book={book} size="M" className="h-[156px] w-[104px]" />
        </Link>
      ))}
    </div>
  );
}
