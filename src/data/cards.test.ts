import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { cards } from './cards';

const imagePath = (id: number) => resolve(process.cwd(), 'public/img', `${id}.jpg`);

describe('данные колоды', () => {
  it('содержит ровно 78 карт', () => {
    expect(cards).toHaveLength(78);
  });

  it('id уникальны и покрывают диапазон 1–78', () => {
    const ids = new Set(cards.map((c) => c.id));
    expect(ids.size).toBe(78);
    for (let i = 1; i <= 78; i += 1) {
      expect(ids.has(i), `нет карты с id=${i}`).toBe(true);
    }
  });

  it('старших арканов 22 с рангами 0–21', () => {
    const majors = cards.filter((c) => c.suit === 'major');
    expect(majors).toHaveLength(22);
    expect(new Set(majors.map((c) => c.rank))).toEqual(
      new Set(Array.from({ length: 22 }, (_, i) => i))
    );
  });

  it('каждой младшей масти 14 карт с рангами 1–14', () => {
    for (const suit of ['cups', 'swords', 'pentacles', 'wands'] as const) {
      const suited = cards.filter((c) => c.suit === suit);
      expect(suited, suit).toHaveLength(14);
      expect(new Set(suited.map((c) => c.rank))).toEqual(
        new Set(Array.from({ length: 14 }, (_, i) => i + 1))
      );
    }
  });

  it('каждой карте хватает заполненного описания', () => {
    for (const card of cards) {
      expect(card.name.trim(), `id=${card.id}: имя`).not.toBe('');
      expect(card.keywords.length, `id=${card.id}: ключевые слова`).toBeGreaterThanOrEqual(3);
      expect(card.upright.trim().length, `id=${card.id}: прямое`).toBeGreaterThan(40);
      expect(card.reversed.trim().length, `id=${card.id}: перевёрнутое`).toBeGreaterThan(40);
    }
  });

  it('для каждой карты существует файл картинки', () => {
    for (const card of cards) {
      expect(existsSync(imagePath(card.id)), `нет файла: ${card.id}.jpg`).toBe(true);
    }
  });
});
