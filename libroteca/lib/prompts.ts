import type { EndingMood } from './types';

export const MOOD_LABELS: Record<EndingMood, string> = {
  esperanzador: 'Esperanzador',
  tragico: 'Trágico',
  ambiguo: 'Ambiguo',
  vengativo: 'Vengativo',
  onirico: 'Onírico',
  comico: 'Cómico',
};

/**
 * Un matiz por tono. El color claro va primero y `dark:` sube la luminosidad
 * para el tema noche, donde el mismo tinte se apagaría.
 */
export const MOOD_STYLES: Record<EndingMood, string> = {
  esperanzador:
    'border-emerald-600/30 bg-emerald-500/12 text-emerald-700 dark:border-emerald-400/35 dark:text-emerald-300',
  tragico:
    'border-rose-600/30 bg-rose-500/12 text-rose-700 dark:border-rose-400/35 dark:text-rose-300',
  ambiguo:
    'border-sky-600/30 bg-sky-500/12 text-sky-700 dark:border-sky-400/35 dark:text-sky-300',
  vengativo:
    'border-orange-600/30 bg-orange-500/12 text-orange-700 dark:border-orange-400/35 dark:text-orange-300',
  onirico:
    'border-violet-600/30 bg-violet-500/12 text-violet-700 dark:border-violet-400/35 dark:text-violet-300',
  comico:
    'border-amber-600/35 bg-amber-500/14 text-amber-700 dark:border-amber-400/35 dark:text-amber-300',
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
  const pool = exclude ? ENDING_SPARKS.filter((s) => s !== exclude) : ENDING_SPARKS;
  return pool[Math.floor(Math.random() * pool.length)];
}
