import React, { useState } from 'react';
import { Button, Popconfirm, Tag, Typography } from 'antd';
import { drawRandomCard } from '../../utils/deck';
import { cardImage, getCardById } from '../../data/cards';
import { type ICardDrawn } from '../../types/types';
import s from './CardOfDay.module.scss';

const STORAGE_KEY = 'tarot-card-of-day';

interface IStoredDraw {
  date: string;
  cardId: number;
  reversed: boolean;
}

const todayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

const loadStoredDraw = (): ICardDrawn | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as IStoredDraw;
    const card = getCardById(stored.cardId);
    if (stored.date !== todayKey() || !card) return null;
    return { card, reversed: Boolean(stored.reversed) };
  } catch {
    return null;
  }
};

export const CardOfDay: React.FC = () => {
  const [initial] = useState(loadStoredDraw);
  const [draw, setDraw] = useState<ICardDrawn | null>(initial);
  const [revealed, setRevealed] = useState(Boolean(initial));

  const dateLabel = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleDraw = () => {
    const next = drawRandomCard();
    const stored: IStoredDraw = {
      date: todayKey(),
      cardId: next.card.id,
      reversed: next.reversed,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setDraw(next);
    setRevealed(false);
    // даём браузеру отрисовать рубашку, затем запускаем переворот
    requestAnimationFrame(() => requestAnimationFrame(() => setRevealed(true)));
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setDraw(null);
    setRevealed(false);
  };

  const orientation = draw?.reversed ? 'перевёрнутое' : 'прямое';

  return (
    <div className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>Карта дня</h1>
        <p className={s.date}>{dateLabel}</p>
      </header>

      <div className={s.layout}>
        <div className={s.cardArea}>
          <div className={`${s.flip} ${revealed ? s.flipped : ''}`}>
            <div className={s.flipInner}>
              <div
                className={s.faceBack}
                onClick={draw ? undefined : handleDraw}
              >
                <span className={s.backSymbol}>☾</span>
              </div>
              <div className={s.faceFront}>
                {draw && (
                  <img
                    className={draw.reversed ? s.imgReversed : s.img}
                    src={cardImage(draw.card.id)}
                    alt={draw.card.name}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={s.actions}>
            {!draw && (
              <Button type='primary' size='large' onClick={handleDraw}>
                Тянуть карту
              </Button>
            )}
            {draw && revealed && (
              <Popconfirm
                title='Тянуть другую карту?'
                description='Карта дня обычно остаётся на весь день.'
                okText='Тянуть'
                cancelText='Оставить'
                onConfirm={handleReset}
              >
                <Button>Тянуть заново</Button>
              </Popconfirm>
            )}
          </div>
        </div>

        <section className={s.reading}>
          {draw ? (
            <>
              <h2 className={s.cardName}>{draw.card.name}</h2>
              <Tag className={s.orientationTag} bordered={false}>
                {orientation} положение
              </Tag>
              <div className={s.keywords}>
                {draw.card.keywords.map((k) => (
                  <Tag key={k} bordered={false}>
                    {k}
                  </Tag>
                ))}
              </div>
              <hr className='tarot-divider' />
              <Typography.Paragraph className={s.text}>
                {draw.reversed ? draw.card.reversed : draw.card.upright}
              </Typography.Paragraph>
              <p className={s.hint}>Новая карта появится после полуночи</p>
            </>
          ) : (
            <p className={s.text}>
              Задайте себе вопрос дня и переверните карту: она подскажет, на что
              обратить внимание сегодня.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};
