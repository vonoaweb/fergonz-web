import type { EndingMood } from './types';

export const MOOD_LABELS: Record<EndingMood, string> = {
  esperanzador: 'Esperanzador',
  tragico: 'Trágico',
  ambiguo: 'Ambiguo',
  vengativo: 'Vengativo',
  onirico: 'Onírico',
  comico: 'Cómico',
};

export const MOOD_STYLES: Record<EndingMood, string> = {
  esperanzador: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
  tragico: 'bg-rose-500/15 text-rose-300 ring-rose-400/30',
  ambiguo: 'bg-sky-500/15 text-sky-300 ring-sky-400/30',
  vengativo: 'bg-orange-500/15 text-orange-300 ring-orange-400/30',
  onirico: 'bg-plum-500/15 text-plum-400 ring-plum-400/30',
  comico: 'bg-ember-500/15 text-ember-400 ring-ember-400/30',
};

/**
 * Disparadores para desbloquear a quien se queda mirando la página en blanco.
 * Deliberadamente genéricos: sirven para cualquier libro.
 */
export const ENDING_SPARKS: string[] = [
  '¿Y si el narrador estuvo mintiendo desde la primera página?',
  'Escribe el final desde el punto de vista del personaje que menos habla.',
  'El antagonista gana, pero descubre que ganar no era lo que quería.',
  'Alguien que murió a mitad del libro nunca murió.',
  'El final ocurre veinte años después, en una conversación de cinco líneas.',
  'La decisión clave se toma al revés. Todo lo demás sigue igual.',
  'Nadie aprende nada. Escribe eso sin que resulte cruel.',
  'Un objeto menor del capítulo tres resulta ser lo único que importaba.',
  'El personaje se queda, en vez de irse.',
  'Termina con una carta que nunca se envía.',
  'Los dos protagonistas no se encuentran. Cuenta el casi.',
  'El libro entero era el recuerdo de alguien que lo recuerda mal.',
  'Cambia el escenario final a un lugar cotidiano: una cocina, un andén.',
  'El final se cuenta a través de lo que come cada personaje esa noche.',
  'Deja abierta una sola pregunta, y que sea la equivocada.',
];

export function randomSpark(exclude?: string): string {
  const pool = exclude
    ? ENDING_SPARKS.filter((s) => s !== exclude)
    : ENDING_SPARKS;
  return pool[Math.floor(Math.random() * pool.length)];
}
