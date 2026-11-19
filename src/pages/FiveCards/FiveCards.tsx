import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { shuffle } from '../../utils/deck';
import { cardImage, cards, getCardById } from '../../data/cards';
import s from './FiveCards.module.scss';

const DECK_IDS = cards.map((c) => c.id);
const SPREAD_SIZE = 5;

export const FiveCards = () => {
  const [deck, setDeck] = useState<number[]>(DECK_IDS);
  const [drawn, setDrawn] = useState<number[]>([]);

  const addCard = () => {
    if (deck.length === 0) return;
    const id = deck[Math.floor(Math.random() * deck.length)];
    setDeck(deck.filter((n) => n !== id));
    setDrawn([...drawn, id]);
  };

  const shuffleDeck = () => setDeck(shuffle(DECK_IDS));

  const restart = () => {
    setDeck(DECK_IDS);
    setDrawn([]);
  };

  return (
    <div className={s.container}>
      <h1>Пять карт</h1>
      <p className={s.subtitle}>
        Тасуйте колоду, думая о своём вопросе, и вытяните пять карт
      </p>

      <div className={s.spread}>
        {Array.from({ length: SPREAD_SIZE }, (_, i) => {
          const id = drawn[i];
          const card = id !== undefined ? getCardById(id) : null;
          return (
            <div key={i} className={s.slot}>
              {card ? (
                <>
                  <img src={cardImage(card.id)} alt={card.name} />
                  <Typography.Text className={s.cardName}>
                    {card.name}
                  </Typography.Text>
                </>
              ) : (
                <div className={s.placeholder} />
              )}
            </div>
          );
        })}
      </div>

      <div className={s.controls}>
        <Button
          type="primary"
          size="large"
          disabled={drawn.length >= SPREAD_SIZE}
          onClick={addCard}
        >
          Взять карту
        </Button>
        <Button
          size="large"
          disabled={drawn.length > 0}
          onClick={shuffleDeck}
        >
          Тасовать карты
        </Button>
        <Button
          size="large"
          disabled={drawn.length < SPREAD_SIZE}
          onClick={restart}
        >
          Заново
        </Button>
      </div>
    </div>
  );
};
