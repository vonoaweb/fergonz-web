'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowBigUp, Eye, Trash2 } from 'lucide-react';
import TimeAgo from './TimeAgo';
import { bookHref } from '@/lib/format';
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
    <article className="card card-hover group relative overflow-hidden p-4 pl-5">
      {/* Filete lateral: marca la tarjeta como territorio de "finales". */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-plum/45" />

      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => dispatch({ type: 'voteEnding', endingId: ending.id })}
          aria-pressed={ending.votedByMe}
          aria-label={`Votar «${ending.title}»`}
          className={`flex w-11 shrink-0 flex-col items-center rounded-xl border py-1.5 transition duration-200 ${
            ending.votedByMe
              ? 'border-plum/45 bg-plum/15 text-plum'
              : 'border-line/60 bg-surface/50 text-muted hover:border-line hover:bg-raised hover:text-ink'
          }`}
        >
          <ArrowBigUp size={18} className={ending.votedByMe ? 'fill-plum/40' : ''} />
          <span className="text-2xs font-semibold tabular-nums">{ending.votes}</span>
        </button>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base leading-snug text-ink">
            {ending.title}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-2xs text-faint">
            <span className="font-medium text-muted">{ending.authorName}</span>
            <span aria-hidden>·</span>
            <TimeAgo at={ending.createdAt} />
            {showBook && (
              <>
                <span aria-hidden>·</span>
                <Link
                  href={bookHref(ending.bookId)}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {ending.bookTitle}
                </Link>
              </>
            )}
            <span
              className={`rounded-pill border px-2 py-0.5 font-medium ${MOOD_STYLES[ending.mood]}`}
            >
              {MOOD_LABELS[ending.mood]}
            </span>
          </div>

          <div className="relative mt-3">
            <p
              className={`whitespace-pre-wrap font-read text-[0.95rem] leading-[1.7] text-ink/90 transition duration-300 ${
                revealed ? '' : 'select-none blur-[5px]'
              }`}
              aria-hidden={!revealed}
            >
              {ending.body}
            </p>

            {!revealed && (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex items-center gap-2 rounded-pill border border-line/70 bg-bg/85 px-4 py-2 text-xs font-medium text-ink shadow-card backdrop-blur-sm transition hover:border-accent/50">
                  <Eye size={14} />
                  Contiene spoilers — toca para leer
                </span>
              </button>
            )}
          </div>
        </div>

        {deletable && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'deleteEnding', endingId: ending.id })}
            aria-label="Borrar final"
            className="shrink-0 rounded p-1 text-faint opacity-0 transition hover:text-rose-500 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </article>
  );
}
