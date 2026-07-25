'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowBigUp, Eye, Trash2 } from 'lucide-react';
import { bookHref, relativeTime } from '@/lib/format';
import { MOOD_LABELS, MOOD_STYLES } from '@/lib/prompts';
import { useStore } from '@/lib/store';
import type { Ending } from '@/lib/types';

interface Props {
  ending: Ending;
  /** En la página del libro el título ya se ve arriba; no hace falta repetirlo. */
  showBook?: boolean;
  /** Sólo los finales escritos por el usuario local se pueden borrar. */
  deletable?: boolean;
}

export default function EndingCard({ ending, showBook = true, deletable = false }: Props) {
  const { dispatch } = useStore();
  const [revealed, setRevealed] = useState(!ending.spoiler);

  return (
    <article className="rounded-xl border border-white/10 bg-ink-900/60 p-4 transition hover:border-white/20">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: 'voteEnding', endingId: ending.id })}
          aria-pressed={ending.votedByMe}
          aria-label={`Votar «${ending.title}»`}
          className={`flex shrink-0 flex-col items-center rounded-lg px-2 py-1 ring-1 transition ${
            ending.votedByMe
              ? 'bg-plum-500/20 text-plum-400 ring-plum-400/40'
              : 'text-paper-100/50 ring-white/10 hover:bg-white/5 hover:text-paper-50'
          }`}
        >
          <ArrowBigUp size={17} />
          <span className="text-[11px] font-medium tabular-nums">{ending.votes}</span>
        </button>

        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[15px] leading-snug text-paper-50">
            {ending.title}
          </h3>

          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-paper-100/45">
            <span className="text-paper-100/70">{ending.authorName}</span>
            <span>·</span>
            <span>{relativeTime(ending.createdAt)}</span>
            {showBook && (
              <>
                <span>·</span>
                <Link
                  href={bookHref(ending.bookId)}
                  className="text-ember-400/80 hover:text-ember-400"
                >
                  {ending.bookTitle}
                </Link>
              </>
            )}
            <span
              className={`rounded-full px-2 py-0.5 ring-1 ${MOOD_STYLES[ending.mood]}`}
            >
              {MOOD_LABELS[ending.mood]}
            </span>
          </p>

          <div className="relative mt-3">
            <p
              className={`whitespace-pre-wrap font-serif text-sm leading-relaxed text-paper-100/90 transition ${
                revealed ? '' : 'select-none blur-sm'
              }`}
              aria-hidden={!revealed}
            >
              {ending.body}
            </p>

            {!revealed && (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-ink-950/40 text-xs font-medium text-paper-50 backdrop-blur-[1px]"
              >
                <Eye size={14} />
                Contiene spoilers — toca para leer
              </button>
            )}
          </div>
        </div>

        {deletable && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'deleteEnding', endingId: ending.id })}
            aria-label="Borrar final"
            className="shrink-0 rounded p-1 text-paper-100/30 transition hover:text-rose-300"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </article>
  );
}
