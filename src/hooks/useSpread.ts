import { useState } from 'react';
import { drawCard, shuffle } from '../utils/deck';
import { saveReading } from '../utils/history';
import { cards } from '../data/cards';
import { useSharedReading } from './useSharedReading';
import { type ICard, type ICardDrawn, type ReadingType } from '../types/types';

interface UseSpreadOptions {
  type: ReadingType;
  /** Сколько карт в раскладе */
  size: number;
  /** Название позиции i-й карты для истории и шаринга */
  positionOf?: (index: number) => string | undefined;
}

/**
 * Общая логика любого расклада: колода, тяга карт, вопрос,
 * сохранение в историю при завершении и присланные по ссылке расклады.
 */
export const useSpread = ({ type, size, positionOf }: UseSpreadOptions) => {
  const [shared, clearShared] = useSharedReading();
  const [deck, setDeck] = useState<ICard[]>(shuffle(cards));
  const [drawn, setDrawn] = useState<ICardDrawn[]>([]);
  const [question, setQuestion] = useState('');

  const complete = drawn.length === size;

  const addCard = () => {
    if (drawn.length >= size || deck.length === 0) return;
    const draw = drawCard(deck);
    const nextDeck = deck.filter((c) => c.id !== draw.card.id);
    const nextDrawn = [...drawn, draw];
    setDeck(nextDeck);
    setDrawn(nextDrawn);

    if (nextDrawn.length === size) {
      saveReading({
        id: crypto.randomUUID(),
        type,
        date: new Date().toISOString(),
        question: question.trim() || undefined,
        cards: nextDrawn.map((d, i) => ({
          cardId: d.card.id,
          reversed: d.reversed,
          position: positionOf?.(i),
        })),
      });
    }
  };

  const shuffleDeck = () => {
    setDeck(shuffle(cards));
    setDrawn([]);
  };

  const restart = () => {
    setDeck(shuffle(cards));
    setDrawn([]);
  };

  return {
    shared,
    clearShared,
    drawn,
    question,
    setQuestion,
    addCard,
    shuffleDeck,
    restart,
    complete,
  };
};
