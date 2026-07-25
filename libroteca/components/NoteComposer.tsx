'use client';

import { useState } from 'react';
import { Lock, Quote, Unlock } from 'lucide-react';
import { newId, useStore } from '@/lib/store';

interface Props {
  bookId: string;
  onSaved?: () => void;
}

export default function NoteComposer({ bookId, onSaved }: Props) {
  const { dispatch } = useStore();
  const [text, setText] = useState('');
  const [quote, setQuote] = useState('');
  const [page, setPage] = useState('');
  const [tags, setTags] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const canSave = text.trim().length > 0;

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSave) return;

    const pageNumber = Number.parseInt(page, 10);

    dispatch({
      type: 'addNote',
      note: {
        id: newId('note'),
        bookId,
        text: text.trim(),
        quote: quote.trim() || undefined,
        page: Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : undefined,
        createdAt: Date.now(),
        private: isPrivate,
        tags: tags
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean),
      },
    });

    setText('');
    setQuote('');
    setPage('');
    setTags('');
    setShowQuote(false);
    onSaved?.();
  };

  return (
    <form onSubmit={save} className="rounded-xl border border-white/10 bg-ink-900/60 p-3">
      {showQuote && (
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={2}
          placeholder="Copia aquí la frase del libro…"
          className="mb-2 w-full resize-none rounded-lg border-l-2 border-ember-400/60 bg-ink-950/60 px-3 py-2 font-serif text-sm italic text-paper-100 placeholder:not-italic placeholder:text-paper-100/25 focus:outline-none"
        />
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="¿Qué te dejó esta página?"
        className="w-full resize-none rounded-lg border border-white/10 bg-ink-950/60 px-3 py-2 text-sm text-paper-50 placeholder:text-paper-100/25 focus:border-ember-400/40 focus:outline-none"
      />

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setShowQuote((v) => !v)}
          aria-pressed={showQuote}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 transition ${
            showQuote
              ? 'bg-ember-500/15 text-ember-400 ring-ember-400/30'
              : 'text-paper-100/55 ring-white/10 hover:bg-white/5'
          }`}
        >
          <Quote size={12} /> Cita
        </button>

        <input
          value={page}
          onChange={(e) => setPage(e.target.value)}
          inputMode="numeric"
          placeholder="Pág."
          aria-label="Número de página"
          className="w-16 rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 text-xs text-paper-50 placeholder:text-paper-100/25 focus:outline-none"
        />

        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="etiquetas, separadas, por comas"
          aria-label="Etiquetas"
          className="min-w-[140px] flex-1 rounded-full border border-white/10 bg-ink-950/60 px-3 py-1 text-xs text-paper-50 placeholder:text-paper-100/25 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => setIsPrivate((v) => !v)}
          aria-pressed={isPrivate}
          title={isPrivate ? 'Sólo tú la ves' : 'Visible si compartes el libro'}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 transition ${
            isPrivate
              ? 'bg-plum-500/15 text-plum-400 ring-plum-400/30'
              : 'text-paper-100/55 ring-white/10 hover:bg-white/5'
          }`}
        >
          {isPrivate ? <Lock size={12} /> : <Unlock size={12} />}
          {isPrivate ? 'Privada' : 'Pública'}
        </button>

        <button
          type="submit"
          disabled={!canSave}
          className="ml-auto rounded-full bg-ember-500 px-4 py-1.5 text-xs font-medium text-ink-950 transition hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Guardar nota
        </button>
      </div>
    </form>
  );
}
