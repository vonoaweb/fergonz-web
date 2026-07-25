'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ScanLine, Sparkles } from 'lucide-react';
import BookCard from '@/components/BookCard';
import BookSearch from '@/components/BookSearch';
import EndingCard from '@/components/EndingCard';
import { popularSubjects, recommend } from '@/lib/recommend';
import { useStore } from '@/lib/store';

export default function DiscoverPage() {
  const { state, dispatch, ready } = useStore();

  const recommendations = useMemo(() => recommend(state, { limit: 6 }), [state]);
  const subjects = useMemo(() => popularSubjects(state), [state]);
  const topEndings = useMemo(
    () => [...state.endings].sort((a, b) => b.votes - a.votes).slice(0, 2),
    [state.endings]
  );

  const favorites = state.profile.favoriteSubjects;

  return (
    <div className="space-y-10">
      <section className="animate-fade-up">
        <h1 className="font-serif text-3xl leading-tight text-paper-50 sm:text-4xl">
          Lee, anota, y reescribe el final.
        </h1>
        <p className="mt-2 max-w-xl text-sm text-paper-100/55">
          Recomendaciones a partir de lo que ya leíste, notas que no se pierden y una
          comunidad que discute finales alternativos.
        </p>

        <div className="mt-5">
          <BookSearch />
        </div>

        <Link
          href="/escanear"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/60 px-4 py-2 text-xs text-paper-100/70 transition hover:border-ember-400/40 hover:text-ember-400"
        >
          <ScanLine size={14} />
          ¿Tienes el libro en la mano? Escanea el código de barras
        </Link>
      </section>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-widest text-paper-100/40">
          Tus gustos
        </h2>
        <p className="mt-1 text-sm text-paper-100/55">
          Marca temas para afinar las recomendaciones.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {subjects.map((subject) => {
            const active = favorites.includes(subject);
            return (
              <button
                key={subject}
                type="button"
                onClick={() => dispatch({ type: 'toggleFavoriteSubject', subject })}
                aria-pressed={active}
                className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
                  active
                    ? 'bg-ember-500/15 text-ember-400 ring-ember-400/30'
                    : 'text-paper-100/55 ring-white/10 hover:bg-white/5 hover:text-paper-50'
                }`}
              >
                {subject}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="flex items-center gap-2 font-serif text-xl text-paper-50">
            <Sparkles size={17} className="text-ember-400" />
            Para ti
          </h2>
          <Link href="/biblioteca" className="text-xs text-paper-100/45 hover:text-paper-50">
            Ver mi biblioteca
          </Link>
        </div>

        {ready && recommendations.length === 0 ? (
          <p className="mt-4 text-sm text-paper-100/50">
            Ya tienes todo el catálogo en tu biblioteca. Busca algo nuevo arriba.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {recommendations.map(({ book, reasons }) => (
              <BookCard key={book.id} book={book} reasons={reasons} />
            ))}
          </div>
        )}
      </section>

      {topEndings.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-serif text-xl text-paper-50">Finales más votados</h2>
            <Link href="/finales" className="text-xs text-paper-100/45 hover:text-paper-50">
              Ver todos
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {topEndings.map((ending) => (
              <EndingCard key={ending.id} ending={ending} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
