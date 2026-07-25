'use client';

import { useMemo } from 'react';
import { ScanLine, Sparkles } from 'lucide-react';
import BookCard from '@/components/BookCard';
import BookSearch from '@/components/BookSearch';
import Chip from '@/components/Chip';
import CoverStack from '@/components/CoverStack';
import EndingCard from '@/components/EndingCard';
import SectionHeader from '@/components/SectionHeader';
import { ButtonLink } from '@/components/Button';
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
  const stackBooks = useMemo(
    () => recommendations.map((r) => r.book).slice(0, 4),
    [recommendations]
  );

  return (
    <div className="space-y-14">
      <section className="animate-fade-up grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="eyebrow">Tu mesa de noche, ordenada</p>
          <h1 className="mt-3 font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Lee, anota,
            <br />y reescribe el final.
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
            Recomendaciones a partir de lo que ya leíste, notas que no se pierden y una
            comunidad que discute finales alternativos.
          </p>

          <div className="mt-7">
            <BookSearch />
          </div>

          <ButtonLink href="/escanear" variant="ghost" className="mt-4 text-xs">
            <ScanLine size={14} className="text-accent" />
            ¿Tienes el libro en la mano? Escanea el código de barras
          </ButtonLink>
        </div>

        <div className="hidden lg:block">
          <CoverStack books={stackBooks} />
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Tus gustos"
          title="Afina lo que te mostramos"
          description="Marca los temas que te interesan y las recomendaciones se recalculan al instante."
        />
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <Chip
              key={subject}
              active={favorites.includes(subject)}
              onClick={() => dispatch({ type: 'toggleFavoriteSubject', subject })}
            >
              {subject}
            </Chip>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Recomendaciones"
          title="Para ti"
          icon={<Sparkles size={17} className="text-accent" />}
          action={{ href: '/biblioteca', label: 'Ver mi biblioteca' }}
        />

        {ready && recommendations.length === 0 ? (
          <p className="text-sm text-muted">
            Ya tienes todo el catálogo en tu biblioteca. Busca algo nuevo arriba.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {recommendations.map(({ book, reasons }) => (
              <BookCard key={book.id} book={book} reasons={reasons} />
            ))}
          </div>
        )}
      </section>

      {topEndings.length > 0 && (
        <section>
          <SectionHeader
            eyebrow="Comunidad"
            title="Finales más votados"
            action={{ href: '/finales', label: 'Ver todos' }}
          />
          <div className="space-y-3">
            {topEndings.map((ending) => (
              <EndingCard key={ending.id} ending={ending} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
