import React, { useState } from 'react';
import { Button, Input, Tag, Typography } from 'antd';
import { drawCard, shuffle } from '../../utils/deck';
import { saveReading } from '../../utils/history';
import { playFlip, playShuffle } from '../../utils/sound';
import { useSharedReading } from '../../hooks/useSharedReading';
import { SharedReading } from '../../components/SharedReading/SharedReading';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { cardImage, cards } from '../../data/cards';
import { THREE_POSITIONS } from '../../data/spreads';
import { type ICard, type ICardDrawn } from '../../types/types';
import s from './ThreeCards.module.scss';

const SPREAD_SIZE = 3;

export const ThreeCards = () => {
  const [shared, clearShared] = useSharedReading();
  const [deck, setDeck] = useState<ICard[]>(shuffle(cards));
  const [drawn, setDrawn] = useState<ICardDrawn[]>([]);
  const [question, setQuestion] = useState('');

  const addCard = () => {
    if (deck.length === 0) return;
    playFlip();
    const draw = drawCard(deck);
    const nextDeck = deck.filter((c) => c.id !== draw.card.id);
    const nextDrawn = [...drawn, draw];
    setDeck(nextDeck);
    setDrawn(nextDrawn);

    if (nextDrawn.length === SPREAD_SIZE) {
      saveReading({
        id: crypto.randomUUID(),
        type: 'three',
        date: new Date().toISOString(),
        question: question.trim() || undefined,
        cards: nextDrawn.map((d, i) => ({
          cardId: d.card.id,
          reversed: d.reversed,
          position: THREE_POSITIONS[i].name,
        })),
      });
    }
  };

  const shuffleDeck = () => {
    playShuffle();
    setDeck(shuffle(cards));
    setDrawn([]);
  };

  const restart = () => {
    setDeck(shuffle(cards));
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
      <h1>Три карты</h1>
      <p className={s.subtitle}>
        Прошлое, настоящее и будущее — классический расклад на ситуацию
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
          const draw = drawn[i];
          return (
            <div key={i} className={s.slot}>
              {draw ? (
                <>
                  <img
                    className={draw.reversed ? s.imgReversed : s.img}
                    src={cardImage(draw.card.id)}
                    alt={draw.card.name}
                  />
                  <Typography.Text className={s.cardName}>
                    {draw.card.name}
                  </Typography.Text>
                  <Typography.Text className={s.position}>
                    {THREE_POSITIONS[i].name}
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
              type: 'three',
              date: new Date().toISOString(),
              question: question.trim() || undefined,
              cards: drawn.map((d, i) => ({
                cardId: d.card.id,
                reversed: d.reversed,
                position: THREE_POSITIONS[i].name,
              })),
            }}
          />
        )}
      </div>

      {drawn.length === SPREAD_SIZE && (
        <div className={s.readings}>
          {drawn.map((d, i) => (
            <div key={d.card.id} className={s.reading}>
              <h3 className={s.readingTitle}>
                {THREE_POSITIONS[i].name} — {d.card.name}
              </h3>
              <Tag bordered={false} className={s.orientation}>
                {d.reversed ? 'перевёрнутое положение' : 'прямое положение'}
              </Tag>
              <p className={s.meaning}>
                {d.reversed ? d.card.reversed : d.card.upright}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
