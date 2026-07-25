'use client';

import { Lock, Trash2 } from 'lucide-react';
import { relativeTime } from '@/lib/format';
import { useStore } from '@/lib/store';
import type { Note } from '@/lib/types';

export default function NoteCard({ note }: { note: Note }) {
  const { dispatch } = useStore();

  return (
    <article className="group rounded-xl border border-white/10 bg-ink-900/50 p-3">
      {note.quote && (
        <blockquote className="mb-2 border-l-2 border-ember-400/60 pl-3 font-serif text-sm italic text-paper-100/90">
          “{note.quote}”
        </blockquote>
      )}

      <p className="whitespace-pre-wrap text-sm text-paper-50/90">{note.text}</p>

      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-paper-100/40">
        {note.page ? <span>pág. {note.page}</span> : null}
        <span>{relativeTime(note.createdAt)}</span>
        {note.private && (
          <span className="flex items-center gap-1 text-plum-400/80">
            <Lock size={10} /> privada
          </span>
        )}

        {note.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-paper-100/55">
            #{tag}
          </span>
        ))}

        <button
          type="button"
          onClick={() => dispatch({ type: 'deleteNote', noteId: note.id })}
          aria-label="Borrar nota"
          className="ml-auto rounded p-1 text-paper-100/30 opacity-0 transition hover:text-rose-300 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </article>
  );
}
