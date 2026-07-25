export const THEME_STORAGE_KEY = 'libroteca:tema';

export type Theme = 'noche' | 'papel';

export function readTheme(): Theme {
  if (typeof document === 'undefined') return 'noche';
  return document.documentElement.dataset.theme === 'papel' ? 'papel' : 'noche';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // En modo privado el tema simplemente no se recuerda entre sesiones.
  }
}
