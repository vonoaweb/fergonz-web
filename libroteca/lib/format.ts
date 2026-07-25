/** "hace 3 días", "hace 2 h", "ahora mismo". */
export function relativeTime(timestamp: number): string {
  const seconds = Math.round((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'ahora mismo';

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;

  const days = Math.round(hours / 24);
  if (days < 30) return `hace ${days} ${days === 1 ? 'día' : 'días'}`;

  const months = Math.round(days / 30);
  if (months < 12) return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;

  const years = Math.round(months / 12);
  return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
}

export function bookHref(bookId: string): string {
  return `/libro?id=${encodeURIComponent(bookId)}`;
}

export function authorLine(authors: string[]): string {
  if (!authors.length) return 'Autor desconocido';
  if (authors.length <= 2) return authors.join(' y ');
  return `${authors[0]} y ${authors.length - 1} más`;
}

export function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}
