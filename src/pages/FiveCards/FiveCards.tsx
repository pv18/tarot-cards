import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { shuffle } from '../../utils/deck';
import { saveReading } from '../../utils/history';
import { useSharedReading } from '../../hooks/useSharedReading';
import { SharedReading } from '../../components/SharedReading/SharedReading';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { cardImage, cards, getCardById } from '../../data/cards';
import s from './FiveCards.module.scss';

const DECK_IDS = cards.map((c) => c.id);
const SPREAD_SIZE = 5;

export const FiveCards = () => {
  const [shared, clearShared] = useSharedReading();
  const [deck, setDeck] = useState<number[]>(DECK_IDS);
  const [drawn, setDrawn] = useState<number[]>([]);
  const [question, setQuestion] = useState('');

  const addCard = () => {
    if (deck.length === 0) return;
    const id = deck[Math.floor(Math.random() * deck.length)];
    const nextDeck = deck.filter((n) => n !== id);
    const nextDrawn = [...drawn, id];
    setDeck(nextDeck);
    setDrawn(nextDrawn);

    if (nextDrawn.length === SPREAD_SIZE) {
      saveReading({
        id: crypto.randomUUID(),
        type: 'five',
        date: new Date().toISOString(),
        question: question.trim() || undefined,
        cards: nextDrawn.map((cardId) => ({ cardId, reversed: false })),
      });
    }
  };

  const shuffleDeck = () => setDeck(shuffle(DECK_IDS));

  const restart = () => {
    setDeck(DECK_IDS);
    setDrawn([]);
  };

  if (shared) {
    return (
      <div className={s.container}>
        <SharedReading reading={shared} onClear={clearShared} />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h1>Пять карт</h1>
      <p className={s.subtitle}>
        Тасуйте колоду, думая о своём вопросе, и вытяните пять карт
      </p>

      <Input
        className={s.questionInput}
        placeholder='Сформулируйте вопрос (необязательно)'
        maxLength={200}
        allowClear
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={drawn.length > 0}
      />

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
          type='primary'
          size='large'
          disabled={drawn.length >= SPREAD_SIZE}
          onClick={addCard}
        >
          Взять карту
        </Button>
        <Button size='large' disabled={drawn.length > 0} onClick={shuffleDeck}>
          Тасовать карты
        </Button>
        <Button
          size='large'
          disabled={drawn.length < SPREAD_SIZE}
          onClick={restart}
        >
          Заново
        </Button>
        {drawn.length === SPREAD_SIZE && (
          <ShareButton
            reading={{
              type: 'five',
              date: new Date().toISOString(),
              question: question.trim() || undefined,
              cards: drawn.map((cardId) => ({ cardId, reversed: false })),
            }}
          />
        )}
      </div>
    </div>
  );
};
