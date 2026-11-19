import { type IReading } from '../types/types';

const HASH_PARAM = /[#&]r=([^&]+)/;

export const encodeReading = (reading: Omit<IReading, 'id'>): string =>
  encodeURIComponent(JSON.stringify(reading));

/** Читает расклад из hash-параметра ссылки (#r=...), null если его нет или он битый */
export const decodeReading = (hash: string): IReading | null => {
  const match = HASH_PARAM.exec(hash);
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as IReading;
    if (!Array.isArray(parsed.cards) || parsed.cards.length === 0) return null;
    if (typeof parsed.type !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
};

export const buildShareUrl = (reading: Omit<IReading, 'id'>): string =>
  `${location.origin}${location.pathname}#r=${encodeReading(reading)}`;
