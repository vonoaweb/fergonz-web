'use client';

import { useState } from 'react';
import { Lock, Quote, Unlock } from 'lucide-react';
import Chip from './Chip';
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
    <form onSubmit={save} className="card p-4">
      {showQuote && (
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={2}
          placeholder="Copia aquí la frase del libro…"
          className="mb-3 w-full resize-none border-l-2 border-accent/60 bg-transparent py-1 pl-4 font-read text-[0.95rem] italic leading-relaxed text-ink placeholder:font-sans placeholder:not-italic placeholder:text-faint focus:outline-none"
        />
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="¿Qué te dejó esta página?"
        className="field resize-none"
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Chip active={showQuote} onClick={() => setShowQuote((v) => !v)}>
          <Quote size={12} /> Cita
        </Chip>

        <input
          value={page}
          onChange={(e) => setPage(e.target.value)}
          inputMode="numeric"
          placeholder="Pág."
          aria-label="Número de página"
          className="w-[4.5rem] rounded-pill border border-line/60 bg-surface/50 px-3 py-1.5 text-xs text-ink placeholder:text-faint focus:border-accent/50 focus:outline-none"
        />

        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="etiquetas, separadas, por comas"
          aria-label="Etiquetas"
          className="min-w-[150px] flex-1 rounded-pill border border-line/60 bg-surface/50 px-3.5 py-1.5 text-xs text-ink placeholder:text-faint focus:border-accent/50 focus:outline-none"
        />

        <Chip
          tone="plum"
          active={isPrivate}
          onClick={() => setIsPrivate((v) => !v)}
          title={isPrivate ? 'Sólo tú la ves' : 'Visible si compartes el libro'}
        >
          {isPrivate ? <Lock size={12} /> : <Unlock size={12} />}
          {isPrivate ? 'Privada' : 'Pública'}
        </Chip>

        <button
          type="submit"
          disabled={!canSave}
          className="ml-auto rounded-pill bg-accent px-4 py-1.5 text-xs font-medium text-on-accent transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Guardar nota
        </button>
      </div>
    </form>
  );
}
