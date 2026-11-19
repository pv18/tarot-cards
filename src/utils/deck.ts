import { type ICard, type ICardDrawn } from '../types/types';
import { cards } from '../data/cards';

/** Тасовка Фишера–Йетса, исходный массив не изменяется */
export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/** Тянет одну карту из переданной колоды со случайной ориентацией */
export const drawCard = (deck: ICard[]): ICardDrawn => {
  const card = deck[Math.floor(Math.random() * deck.length)];
  return { card, reversed: Math.random() < 0.5 };
};

/** Случайная карта из всей колоды */
export const drawRandomCard = (): ICardDrawn => drawCard(cards);
