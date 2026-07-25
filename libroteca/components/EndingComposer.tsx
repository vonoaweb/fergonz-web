'use client';

import { useState } from 'react';
import { EyeOff, Send, Sparkles } from 'lucide-react';
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

  const remaining = MIN_BODY - body.trim().length;
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
      className="rounded-xl border border-plum-500/25 bg-gradient-to-b from-plum-600/10 to-transparent p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-base text-paper-50">Escribe tu propio final</h3>
        <button
          type="button"
          onClick={() => setSpark(randomSpark(spark ?? undefined))}
          className="flex items-center gap-1.5 rounded-full bg-plum-500/15 px-3 py-1.5 text-xs text-plum-400 ring-1 ring-plum-400/30 transition hover:bg-plum-500/25"
        >
          <Sparkles size={13} />
          Dame una idea
        </button>
      </div>

      {spark && (
        <p className="mt-3 rounded-lg border-l-2 border-plum-400/60 bg-ink-950/50 px-3 py-2 text-sm italic text-plum-400/90">
          {spark}
        </p>
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de tu final"
        maxLength={80}
        className="mt-3 w-full rounded-lg border border-white/10 bg-ink-950/60 px-3 py-2.5 font-serif text-sm text-paper-50 placeholder:font-sans placeholder:text-paper-100/25 focus:border-plum-400/50 focus:outline-none"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={7}
        placeholder={`Reescribe el final de ${book.title}…`}
        className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-ink-950/60 px-3 py-2.5 font-serif text-sm leading-relaxed text-paper-50 placeholder:font-sans placeholder:text-paper-100/25 focus:border-plum-400/50 focus:outline-none"
      />

      <p className="mt-1 text-right text-[11px] text-paper-100/35">
        {remaining > 0
          ? `${remaining} caracteres más para poder publicar`
          : `${body.trim().length} caracteres`}
      </p>

      <fieldset className="mt-3">
        <legend className="mb-1.5 text-xs font-medium text-paper-100/60">Tono</legend>
        <div className="flex flex-wrap gap-1.5">
          {ENDING_MOODS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMood(option)}
              aria-pressed={mood === option}
              className={`rounded-full px-3 py-1 text-xs ring-1 transition ${
                mood === option
                  ? MOOD_STYLES[option]
                  : 'text-paper-100/55 ring-white/10 hover:bg-white/5'
              }`}
            >
              {MOOD_LABELS[option]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSpoiler((v) => !v)}
          aria-pressed={spoiler}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ring-1 transition ${
            spoiler
              ? 'bg-white/10 text-paper-50 ring-white/20'
              : 'text-paper-100/55 ring-white/10 hover:bg-white/5'
          }`}
        >
          <EyeOff size={13} />
          {spoiler ? 'Marcado como spoiler' : 'Sin spoiler'}
        </button>

        <label className="flex cursor-pointer items-center gap-2 text-xs text-paper-100/60">
          <input
            type="checkbox"
            checked={share}
            onChange={(e) => setShare(e.target.checked)}
            className="h-3.5 w-3.5 accent-plum-500"
          />
          Compartir en la comunidad
        </label>

        <button
          type="submit"
          disabled={!canSave}
          className="ml-auto flex items-center gap-2 rounded-full bg-plum-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-plum-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={14} />
          Publicar final
        </button>
      </div>
    </form>
  );
}
