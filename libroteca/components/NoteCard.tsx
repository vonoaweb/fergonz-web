'use client';

import { Lock, Trash2 } from 'lucide-react';
import TimeAgo from './TimeAgo';
import { useStore } from '@/lib/store';
import type { Note } from '@/lib/types';

export default function NoteCard({ note }: { note: Note }) {
  const { dispatch } = useStore();

  return (
    <article className="card group p-4">
      {note.quote && (
        <blockquote className="mb-3 border-l-2 border-accent/60 pl-4 font-read text-[0.95rem] italic leading-relaxed text-ink/85">
          “{note.quote}”
        </blockquote>
      )}

      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink/90">
        {note.text}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-2xs text-faint">
        {note.page ? (
          <span className="rounded border border-line/60 px-1.5 py-0.5">
            pág. {note.page}
          </span>
        ) : null}
        <TimeAgo at={note.createdAt} />
        {note.private && (
          <span className="flex items-center gap-1 text-plum">
            <Lock size={10} /> privada
          </span>
        )}

        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill bg-raised/70 px-2 py-0.5 text-muted"
          >
            #{tag}
          </span>
        ))}

        <button
          type="button"
          onClick={() => dispatch({ type: 'deleteNote', noteId: note.id })}
          aria-label="Borrar nota"
          className="ml-auto rounded p-1 text-faint opacity-0 transition hover:text-rose-500 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </article>
  );
}
