'use client';

import { useState } from 'react';
import { EyeOff, Send, Sparkles } from 'lucide-react';
import Chip from './Chip';
import { makeEnding, useStore } from '@/lib/store';
import { MOOD_LABELS, MOOD_STYLES, randomSpark } from '@/lib/prompts';
import { ENDING_MOODS, type Book, type EndingMood } from '@/lib/types';

const MIN_BODY = 80;

interface Props {
  book: Book;
  onDone?: () => void;
}

export default function EndingComposer({ book, onDone }: Props) {
  const { state, dispatch } = useStore();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState<EndingMood>('ambiguo');
  const [spoiler, setSpoiler] = useState(true);
  const [share, setShare] = useState(true);
  const [spark, setSpark] = useState<string | null>(null);

  const length = body.trim().length;
  const remaining = MIN_BODY - length;
  const canSave = title.trim().length > 2 && remaining <= 0;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSave) return;

    dispatch({
      type: 'addEnding',
      share,
      ending: makeEnding({
        bookId: book.id,
        bookTitle: book.title,
        authorName: state.profile.name || 'Lector',
        title: title.trim(),
        body: body.trim(),
        mood,
        spoiler,
      }),
    });

    setTitle('');
    setBody('');
    setSpark(null);
    onDone?.();
  };

  return (
    <form
      onSubmit={submit}
      className="relative overflow-hidden rounded-card border border-plum/25 bg-gradient-to-b from-plum/[0.08] to-transparent p-5 shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow text-plum">Tu propio final</p>
          <h3 className="mt-1 font-display text-lg text-ink">
            Reescribe el desenlace
          </h3>
        </div>

        <Chip tone="plum" onClick={() => setSpark(randomSpark(spark ?? undefined))}>
          <Sparkles size={13} />
          Dame una idea
        </Chip>
      </div>

      {spark && (
        <p className="mt-4 animate-pop-in rounded-xl border-l-2 border-plum/60 bg-plum/[0.07] px-4 py-3 font-read text-sm italic leading-relaxed text-ink/85">
          {spark}
        </p>
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de tu final"
        maxLength={80}
        className="field mt-4 font-display text-base placeholder:font-sans placeholder:text-sm"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        placeholder={`Reescribe el final de ${book.title}…`}
        className="field mt-2.5 resize-y font-read text-[0.95rem] leading-[1.7] placeholder:font-sans placeholder:text-sm placeholder:leading-normal"
      />

      {/* Medidor de longitud mínima: más claro que un contador a secas. */}
      <div className="mt-2 flex items-center gap-3">
        <div className="h-0.5 flex-1 overflow-hidden rounded-pill bg-line/50">
          <div
            className="h-full rounded-pill bg-plum transition-[width] duration-300"
            style={{ width: `${Math.min(100, (length / MIN_BODY) * 100)}%` }}
          />
        </div>
        <span className="text-2xs tabular-nums text-faint">
          {remaining > 0 ? `faltan ${remaining}` : `${length} caracteres`}
        </span>
      </div>

      <fieldset className="mt-4">
        <legend className="eyebrow mb-2">Tono</legend>
        <div className="flex flex-wrap gap-1.5">
          {ENDING_MOODS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMood(option)}
              aria-pressed={mood === option}
              className={`rounded-pill border px-3 py-1.5 text-xs font-medium transition duration-200 ${
                mood === option
                  ? MOOD_STYLES[option]
                  : 'border-line/60 bg-surface/50 text-muted hover:border-line hover:bg-raised hover:text-ink'
              }`}
            >
              {MOOD_LABELS[option]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Chip active={spoiler} onClick={() => setSpoiler((v) => !v)}>
          <EyeOff size={13} />
          {spoiler ? 'Marcado como spoiler' : 'Sin spoiler'}
        </Chip>

        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={share}
            onChange={(e) => setShare(e.target.checked)}
            className="h-3.5 w-3.5 accent-plum"
          />
          Compartir en la comunidad
        </label>

        <button
          type="submit"
          disabled={!canSave}
          className="ml-auto inline-flex items-center gap-2 rounded-pill bg-plum px-5 py-2.5 text-sm font-medium text-white shadow-card transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
        >
          <Send size={14} />
          Publicar final
        </button>
      </div>
    </form>
  );
}
