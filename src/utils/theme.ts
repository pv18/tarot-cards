export type ThemeId = 'midnight' | 'obsidian' | 'crimson' | 'forest';

const STORAGE_KEY = 'tarot-theme';
const DEFAULT_THEME: ThemeId = 'midnight';

const THEMES: ThemeId[] = ['midnight', 'obsidian', 'crimson', 'forest'];

export const loadTheme = (): ThemeId => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(raw as ThemeId) ? (raw as ThemeId) : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

// применяем тему к <html> и запоминаем выбор;
// базовая тема «Полночь» соответствует :root без переопределений
export const applyTheme = (id: ThemeId): void => {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // приватный режим — тема просто не сохранится между визитами
  }
};
