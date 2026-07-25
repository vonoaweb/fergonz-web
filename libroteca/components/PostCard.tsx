'use client';

import Link from 'next/link';
import { Heart, MessageSquareQuote, PenLine, Sparkles } from 'lucide-react';
import BookCover from './BookCover';
import RatingStars from './RatingStars';
import { authorLine, bookHref, relativeTime } from '@/lib/format';
import { useStore } from '@/lib/store';
import type { CommunityPost } from '@/lib/types';

const KIND_META = {
  resena: { label: 'Reseña', icon: MessageSquareQuote, tone: 'text-sky-300' },
  recomendacion: { label: 'Recomienda', icon: Sparkles, tone: 'text-ember-400' },
  final: { label: 'Final alternativo', icon: PenLine, tone: 'text-plum-400' },
} as const;

export default function PostCard({ post }: { post: CommunityPost }) {
  const { state, dispatch } = useStore();
  const meta = KIND_META[post.kind];
  const Icon = meta.icon;
  const book = state.books[post.bookId];

  return (
    <article className="rounded-xl border border-white/10 bg-ink-900/60 p-4 transition hover:border-white/20">
      <header className="flex items-center gap-2 text-xs">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-medium text-paper-50">
          {post.authorName.charAt(0).toUpperCase()}
        </span>
        <span className="font-medium text-paper-50">{post.authorName}</span>
        <span className={`flex items-center gap-1 ${meta.tone}`}>
          <Icon size={12} />
          {meta.label}
        </span>
        <span className="ml-auto text-paper-100/40">{relativeTime(post.createdAt)}</span>
      </header>

      <p className="mt-3 text-sm leading-relaxed text-paper-50/90">{post.text}</p>

      <Link
        href={bookHref(post.bookId)}
        className="mt-3 flex items-center gap-3 rounded-lg border border-white/8 bg-ink-950/50 p-2.5 transition hover:border-white/15"
      >
        <BookCover
          book={
            book ?? {
              title: post.bookTitle,
              authors: post.bookAuthors,
              coverId: post.coverId,
            }
          }
          size="S"
          className="h-14 w-10 shrink-0"
        />
        <div className="min-w-0">
          <p className="font-serif text-sm text-paper-50 line-clamp-1">{post.bookTitle}</p>
          <p className="text-[11px] text-paper-100/50 line-clamp-1">
            {authorLine(post.bookAuthors)}
          </p>
          {post.rating ? (
            <div className="mt-1">
              <RatingStars value={post.rating} size={12} />
            </div>
          ) : null}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => dispatch({ type: 'likePost', postId: post.id })}
        aria-pressed={post.likedByMe}
        className={`mt-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 transition ${
          post.likedByMe
            ? 'bg-rose-500/15 text-rose-300 ring-rose-400/30'
            : 'text-paper-100/50 ring-white/10 hover:bg-white/5 hover:text-paper-50'
        }`}
      >
        <Heart size={13} className={post.likedByMe ? 'fill-rose-300' : ''} />
        <span className="tabular-nums">{post.likes}</span>
      </button>
    </article>
  );
}
