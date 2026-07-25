'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PenLine } from 'lucide-react';
import Chip from '@/components/Chip';
import EmptyState from '@/components/EmptyState';
import EndingCard from '@/components/EndingCard';
import SectionHeader from '@/components/SectionHeader';
import { ENDING_SPARKS, MOOD_LABELS } from '@/lib/prompts';
import { useStore } from '@/lib/store';
import { ENDING_MOODS, type EndingMood } from '@/lib/types';

type Sort = 'votados' | 'recientes';
type MoodFilter = EndingMood | 'todos';

export default function EndingsPage() {
  const { state } = useStore();
  const [sort, setSort] = useState<Sort>('votados');
  const [mood, setMood] = useState<MoodFilter>('todos');

  const endings = useMemo(() => {
    const filtered = state.endings.filter((e) => mood === 'todos' || e.mood === mood);
    return filtered.sort((a, b) =>
      sort === 'votados' ? b.votes - a.votes : b.createdAt - a.createdAt
    );
  }, [state.endings, sort, mood]);

  const mine = state.profile.name;

  return (
    <div className="space-y-7">
      <SectionHeader
        eyebrow="Tu propio final"
        title="Cómo debería haber terminado"
        description="Reescribe el desenlace de cualquier libro de tu biblioteca. Los demás lectores votan el que más les convence."
      />

      <section className="rounded-card border border-plum/25 bg-gradient-to-b from-plum/[0.08] to-transparent p-5">
        <h2 className="eyebrow text-plum">Ideas para empezar</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {ENDING_SPARKS.slice(0, 6).map((spark) => (
            <li
              key={spark}
              className="flex gap-2 font-read text-sm italic leading-relaxed text-ink/80"
            >
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plum/70" />
              {spark}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">
          Abre cualquier libro y ve a la pestaña <span className="text-plum">Finales</span>{' '}
          para escribir el tuyo.{' '}
          <Link
            href="/biblioteca"
            className="text-accent underline-offset-2 hover:underline"
          >
            Ir a mi biblioteca
          </Link>
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-2">
        {(['votados', 'recientes'] as const).map((option) => (
          <Chip
            key={option}
            tone="neutral"
            active={sort === option}
            onClick={() => setSort(option)}
          >
            {option === 'votados' ? 'Más votados' : 'Recientes'}
          </Chip>
        ))}

        <span className="mx-1 h-5 w-px bg-line/70" aria-hidden />

        <Chip tone="neutral" active={mood === 'todos'} onClick={() => setMood('todos')}>
          Todos los tonos
        </Chip>
        {ENDING_MOODS.map((option) => (
          <Chip
            key={option}
            tone="plum"
            active={mood === option}
            onClick={() => setMood(option)}
          >
            {MOOD_LABELS[option]}
          </Chip>
        ))}
      </div>

      {endings.length === 0 ? (
        <EmptyState
          icon={PenLine}
          title="Ningún final con ese tono"
          description="Prueba otro filtro, o escribe el primero desde la ficha de un libro."
        />
      ) : (
        <div className="space-y-3">
          {endings.map((ending) => (
            <EndingCard
              key={ending.id}
              ending={ending}
              deletable={ending.authorName === mine}
            />
          ))}
        </div>
      )}
    </div>
  );
}
