import React, { useState } from 'react';
import { Button, Input, Tag, Typography } from 'antd';
import { drawCard, shuffle } from '../../utils/deck';
import { saveReading } from '../../utils/history';
import { playFlip, playShuffle } from '../../utils/sound';
import { useSharedReading } from '../../hooks/useSharedReading';
import { SharedReading } from '../../components/SharedReading/SharedReading';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { cardImage, cards } from '../../data/cards';
import { CELTIC_POSITIONS } from '../../data/spreads';
import { type ICard, type ICardDrawn } from '../../types/types';
import s from './CelticCross.module.scss';

const SPREAD_SIZE = 10;

/** Сетка креста: [строка, колонка] для позиций 1–10 */
const CELL: Record<number, [number, number]> = {
  1: [2, 2],
  2: [2, 2],
  3: [3, 2],
  4: [2, 1],
  5: [1, 2],
  6: [2, 3],
  7: [4, 4],
  8: [3, 4],
  9: [2, 4],
  10: [1, 4],
};

export const CelticCross = () => {
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
        type: 'celtic',
        date: new Date().toISOString(),
        question: question.trim() || undefined,
        cards: nextDrawn.map((d, i) => ({
          cardId: d.card.id,
          reversed: d.reversed,
          position: `${i + 1}. ${CELTIC_POSITIONS[i].name}`,
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

  const slotFor = (position: number) => {
    const draw = drawn[position - 1];
    const style = {
      gridRow: CELL[position][0],
      gridColumn: CELL[position][1],
    };

    // вторая карта креста лежит поперёк первой, поверх неё
    if (position === 2) {
      return (
        <div key={position} className={s.crossed} style={style}>
          {draw ? (
            <img
              className={draw.reversed ? s.crossImgReversed : s.crossImg}
              src={cardImage(draw.card.id)}
              alt={draw.card.name}
            />
          ) : (
            <div className={s.crossPlaceholder} />
          )}
        </div>
      );
    }

    return (
      <div key={position} className={s.slot} style={style}>
        {draw ? (
          <>
            <img
              className={draw.reversed ? s.imgReversed : s.img}
              src={cardImage(draw.card.id)}
              alt={draw.card.name}
            />
            <Typography.Text className={s.label}>
              {position}. {CELTIC_POSITIONS[position - 1].name}
            </Typography.Text>
          </>
        ) : (
          <>
            <div className={s.placeholder} />
            <Typography.Text className={s.label}>
              {position}. {CELTIC_POSITIONS[position - 1].name}
            </Typography.Text>
          </>
        )}
      </div>
    );
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
      <h1>Кельтский крест</h1>
      <p className={s.subtitle}>
        Десять карт — самый полный расклад на сложную ситуацию
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

      <div className={s.board}>
        {Array.from({ length: SPREAD_SIZE }, (_, i) => slotFor(i + 1))}
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
              type: 'celtic',
              date: new Date().toISOString(),
              question: question.trim() || undefined,
              cards: drawn.map((d, i) => ({
                cardId: d.card.id,
                reversed: d.reversed,
                position: `${i + 1}. ${CELTIC_POSITIONS[i].name}`,
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
                {i + 1}. {CELTIC_POSITIONS[i].name} — {d.card.name}
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
