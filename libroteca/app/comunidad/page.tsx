'use client';

import { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import PostCard from '@/components/PostCard';
import PostComposer from '@/components/PostComposer';
import { useStore } from '@/lib/store';
import type { CommunityPost } from '@/lib/types';

type Filter = CommunityPost['kind'] | 'todo';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'recomendacion', label: 'Recomendaciones' },
  { value: 'resena', label: 'Reseñas' },
  { value: 'final', label: 'Finales' },
];

export default function CommunityPage() {
  const { state, dispatch } = useStore();
  const [filter, setFilter] = useState<Filter>('todo');

  const posts = useMemo(
    () =>
      state.posts
        .filter((post) => filter === 'todo' || post.kind === filter)
        .sort((a, b) => b.createdAt - a.createdAt),
    [state.posts, filter]
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-paper-50">Comunidad</h1>
          <p className="mt-1 text-sm text-paper-100/55">
            Lo que están leyendo, discutiendo y reescribiendo otros lectores.
          </p>
        </div>

        <label className="text-xs text-paper-100/50">
          Publicas como
          <input
            value={state.profile.name}
            onChange={(e) => dispatch({ type: 'setProfileName', name: e.target.value })}
            maxLength={24}
            aria-label="Tu nombre en la comunidad"
            className="ml-2 w-32 rounded-full border border-white/10 bg-ink-900 px-3 py-1.5 text-xs text-paper-50 focus:border-ember-400/40 focus:outline-none"
          />
        </label>
      </header>

      <PostComposer />

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
              filter === value
                ? 'bg-ember-500/15 text-ember-400 ring-ember-400/30'
                : 'text-paper-100/55 ring-white/10 hover:bg-white/5 hover:text-paper-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {posts.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nada por aquí todavía"
          description="Comparte una recomendación o una reseña y empieza la conversación."
        />
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
