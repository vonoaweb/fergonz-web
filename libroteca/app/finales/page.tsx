'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PenLine } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import EndingCard from '@/components/EndingCard';
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
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-2xl text-paper-50">Tu propio final</h1>
        <p className="mt-1 max-w-lg text-sm text-paper-100/55">
          Reescribe el desenlace de cualquier libro de tu biblioteca. Los demás lectores
          votan el que más les convence.
        </p>
      </header>

      <div className="rounded-xl border border-plum-500/25 bg-gradient-to-b from-plum-600/10 to-transparent p-4">
        <h2 className="text-xs font-medium uppercase tracking-widest text-plum-400">
          Ideas para empezar
        </h2>
        <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
          {ENDING_SPARKS.slice(0, 6).map((spark) => (
            <li key={spark} className="text-sm text-paper-100/70">
              · {spark}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-paper-100/45">
          Abre cualquier libro y ve a la pestaña <span className="text-plum-400">Finales</span>{' '}
          para escribir el tuyo.{' '}
          <Link href="/biblioteca" className="text-ember-400 hover:underline">
            Ir a mi biblioteca
          </Link>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {(['votados', 'recientes'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSort(option)}
            aria-pressed={sort === option}
            className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
              sort === option
                ? 'bg-white/10 text-paper-50 ring-white/20'
                : 'text-paper-100/55 ring-white/10 hover:bg-white/5'
            }`}
          >
            {option === 'votados' ? 'Más votados' : 'Recientes'}
          </button>
        ))}

        <span className="mx-1 h-4 w-px bg-white/10" aria-hidden />

        <button
          type="button"
          onClick={() => setMood('todos')}
          aria-pressed={mood === 'todos'}
          className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
            mood === 'todos'
              ? 'bg-white/10 text-paper-50 ring-white/20'
              : 'text-paper-100/55 ring-white/10 hover:bg-white/5'
          }`}
        >
          Todos los tonos
        </button>
        {ENDING_MOODS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMood(option)}
            aria-pressed={mood === option}
            className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
              mood === option
                ? 'bg-plum-500/15 text-plum-400 ring-plum-400/30'
                : 'text-paper-100/55 ring-white/10 hover:bg-white/5'
            }`}
          >
            {MOOD_LABELS[option]}
          </button>
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
