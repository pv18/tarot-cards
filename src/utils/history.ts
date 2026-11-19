import { type IReading, type ReadingType } from '../types/types';

const STORAGE_KEY = 'tarot-history';
const MAX_READINGS = 60;

export const READING_LABELS: Record<ReadingType, string> = {
  day: 'Карта дня',
  three: 'Три карты',
  five: 'Пять карт',
  celtic: 'Кельтский крест',
};

export const loadHistory = (): IReading[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as IReading[]) : [];
  } catch {
    return [];
  }
};

export const saveReading = (reading: IReading): void => {
  const history = loadHistory();
  const updated = [reading, ...history].slice(0, MAX_READINGS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
