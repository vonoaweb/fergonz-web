'use client';

import { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import Chip from '@/components/Chip';
import EmptyState from '@/components/EmptyState';
import PostCard from '@/components/PostCard';
import PostComposer from '@/components/PostComposer';
import SectionHeader from '@/components/SectionHeader';
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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Comunidad"
          title="Qué se está leyendo"
          description="Reseñas, recomendaciones y finales alternativos de otros lectores."
        />

        <label className="mb-5 text-2xs text-faint">
          <span className="eyebrow block">Publicas como</span>
          <input
            value={state.profile.name}
            onChange={(e) => dispatch({ type: 'setProfileName', name: e.target.value })}
            maxLength={24}
            aria-label="Tu nombre en la comunidad"
            className="mt-1.5 w-36 rounded-pill border border-line/60 bg-surface/60 px-3.5 py-1.5 text-xs text-ink focus:border-accent/50 focus:outline-none"
          />
        </label>
      </div>

      <PostComposer />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map(({ value, label }) => (
          <Chip key={value} active={filter === value} onClick={() => setFilter(value)}>
            {label}
          </Chip>
        ))}
      </div>

      {posts.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nada por aquí todavía"
          description="Comparte una recomendación o una reseña y empieza la conversación."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
