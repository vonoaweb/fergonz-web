/** Whole-blood donation interval recommended for most donors (56 days / 8 weeks). */
export const DONATION_INTERVAL_DAYS = 56;

/** Estimated lives helped per whole-blood donation (a unit can be split into components). */
export const LIVES_PER_DONATION = 3;

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / MS_PER_DAY);
}

export function nextEligibleDate(lastDonation: Date | null): Date | null {
  if (!lastDonation) return null;
  const next = new Date(lastDonation);
  next.setDate(next.getDate() + DONATION_INTERVAL_DAYS);
  return next;
}

export interface EligibilityStatus {
  eligible: boolean;
  daysRemaining: number;
  nextDate: Date | null;
  progress: number; // 0..1 through the recovery window
}

export function getEligibility(
  lastDonation: Date | null,
  now: Date = new Date(),
): EligibilityStatus {
  if (!lastDonation) {
    return { eligible: true, daysRemaining: 0, nextDate: null, progress: 1 };
  }
  const next = nextEligibleDate(lastDonation)!;
  const daysRemaining = Math.max(0, daysBetween(now, next));
  const elapsed = DONATION_INTERVAL_DAYS - daysRemaining;
  const progress = Math.min(1, Math.max(0, elapsed / DONATION_INTERVAL_DAYS));
  return {
    eligible: daysRemaining <= 0,
    daysRemaining,
    nextDate: next,
    progress,
  };
}

const MONTHS = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

export function formatDate(date: Date | null): string {
  if (!date) return '—';
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatRelative(date: Date, now: Date = new Date()): string {
  const days = daysBetween(now, date);
  if (days === 0) return 'Hoy';
  if (days === 1) return 'Mañana';
  if (days === -1) return 'Ayer';
  if (days > 1 && days < 30) return `En ${days} días`;
  if (days < -1 && days > -30) return `Hace ${Math.abs(days)} días`;
  return formatDate(date);
}
