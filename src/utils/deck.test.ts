import { describe, expect, it } from 'vitest';
import { drawCard, drawRandomCard, shuffle } from './deck';
import { cards } from '../data/cards';
import { type ICard } from '../types/types';

const stubDeck: ICard[] = [cards[0], cards[1], cards[2]];

describe('shuffle', () => {
  it('не мутирует исходный массив', () => {
    const source = [1, 2, 3, 4, 5];
    shuffle(source);
    expect(source).toEqual([1, 2, 3, 4, 5]);
  });

  it('сохраняет все элементы', () => {
    const shuffled = shuffle(stubDeck.map((c) => c.id));
    expect([...shuffled].sort((a, b) => a - b)).toEqual([1, 2, 3]);
  });
});

describe('drawCard', () => {
  it('возвращает карту из переданной колоды', () => {
    const deckIds = new Set(stubDeck.map((c) => c.id));
    for (let i = 0; i < 20; i += 1) {
      expect(deckIds.has(drawCard(stubDeck).card.id)).toBe(true);
    }
  });

  it('возвращает валидную ориентацию', () => {
    for (let i = 0; i < 20; i += 1) {
      expect(typeof drawCard(stubDeck).reversed).toBe('boolean');
    }
  });
});

describe('drawRandomCard', () => {
  it('возвращает карту из полной колоды', () => {
    const draw = drawRandomCard();
    expect(draw.card.id).toBeGreaterThanOrEqual(1);
    expect(draw.card.id).toBeLessThanOrEqual(78);
    expect(draw.reversed).toEqual(expect.any(Boolean));
  });
});
