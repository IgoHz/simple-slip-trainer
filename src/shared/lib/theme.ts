export const THEME_STORAGE_KEY = 'simple-slip-trainer-theme';

export type Theme = 'dark' | 'light';

export function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light';
}

export function readThemePreference(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}

export function saveThemePreference(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme changes still apply when storage is unavailable.
  }
}
