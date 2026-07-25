'use client';

import Link from 'next/link';
import { Heart, MessageSquareQuote, PenLine, Sparkles } from 'lucide-react';
import BookCover from './BookCover';
import RatingStars from './RatingStars';
import TimeAgo from './TimeAgo';
import { authorLine, bookHref } from '@/lib/format';
import { useStore } from '@/lib/store';
import type { CommunityPost } from '@/lib/types';

const KIND_META = {
  resena: { label: 'Reseña', icon: MessageSquareQuote, tone: 'text-sky-600 dark:text-sky-300' },
  recomendacion: { label: 'Recomienda', icon: Sparkles, tone: 'text-accent' },
  final: { label: 'Final alternativo', icon: PenLine, tone: 'text-plum' },
} as const;

/** Color de avatar estable a partir del nombre. */
const AVATAR_TINTS = [
  'bg-rose-500/20 text-rose-700 dark:text-rose-300',
  'bg-sky-500/20 text-sky-700 dark:text-sky-300',
  'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
  'bg-violet-500/20 text-violet-700 dark:text-violet-300',
  'bg-amber-500/20 text-amber-700 dark:text-amber-300',
];

function tintFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_TINTS[Math.abs(hash) % AVATAR_TINTS.length];
}

export default function PostCard({ post }: { post: CommunityPost }) {
  const { state, dispatch } = useStore();
  const meta = KIND_META[post.kind];
  const Icon = meta.icon;
  const book = state.books[post.bookId];

  return (
    <article className="card card-hover group p-4">
      <header className="flex items-center gap-2.5 text-xs">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm ${tintFor(
            post.authorName
          )}`}
        >
          {post.authorName.charAt(0).toUpperCase()}
        </span>

        <div className="min-w-0">
          <p className="font-medium text-ink">{post.authorName}</p>
          <p className={`flex items-center gap-1 text-2xs ${meta.tone}`}>
            <Icon size={11} />
            {meta.label}
          </p>
        </div>

        <TimeAgo at={post.createdAt} className="ml-auto text-2xs text-faint" />
      </header>

      <p className="mt-3.5 text-sm leading-relaxed text-ink/90">{post.text}</p>

      <Link
        href={bookHref(post.bookId)}
        className="mt-3.5 flex items-center gap-3 rounded-xl border border-line/50 bg-raised/40 p-3 transition duration-200 hover:border-line hover:bg-raised/80"
      >
        <BookCover
          flat
          size="S"
          book={
            book ?? {
              title: post.bookTitle,
              authors: post.bookAuthors,
              coverId: post.coverId,
            }
          }
          className="h-16 w-11 shrink-0"
        />
        <div className="min-w-0">
          <p className="font-display text-sm text-ink line-clamp-1">{post.bookTitle}</p>
          <p className="mt-0.5 text-2xs text-muted line-clamp-1">
            {authorLine(post.bookAuthors)}
          </p>
          {post.rating ? (
            <div className="mt-1.5">
              <RatingStars value={post.rating} size={12} />
            </div>
          ) : null}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => dispatch({ type: 'likePost', postId: post.id })}
        aria-pressed={post.likedByMe}
        aria-label={`Me gusta (${post.likes})`}
        className={`mt-3.5 inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-xs transition duration-200 ${
          post.likedByMe
            ? 'border-rose-500/40 bg-rose-500/12 text-rose-600 dark:text-rose-300'
            : 'border-line/60 bg-surface/50 text-muted hover:border-line hover:bg-raised hover:text-ink'
        }`}
      >
        <Heart size={13} className={post.likedByMe ? 'fill-current' : ''} />
        <span className="tabular-nums">{post.likes}</span>
      </button>
    </article>
  );
}
