import React, { useState } from 'react';
import { drawRandomCard } from '../../utils/deck';
import { saveReading } from '../../utils/history';
import { playFlip } from '../../utils/sound';
import { useSharedReading } from '../../hooks/useSharedReading';
import { SharedReading } from '../../components/SharedReading/SharedReading';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { Popconfirm } from '../../components/ui/Popconfirm';
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
  const [shared, clearShared] = useSharedReading();
  const [initial] = useState(loadStoredDraw);
  const [draw, setDraw] = useState<ICardDrawn | null>(initial);
  const [revealed, setRevealed] = useState(Boolean(initial));

  const dateLabel = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleDraw = () => {
    playFlip();
    const next = drawRandomCard();
    const stored: IStoredDraw = {
      date: todayKey(),
      cardId: next.card.id,
      reversed: next.reversed,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    saveReading({
      id: crypto.randomUUID(),
      type: 'day',
      date: new Date().toISOString(),
      cards: [{ cardId: next.card.id, reversed: next.reversed }],
    });
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

  if (shared) {
    return (
      <div className={s.page}>
        <SharedReading reading={shared} onClear={clearShared} />
      </div>
    );
  }

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
              <button
                type='button'
                className={s.faceBack}
                onClick={draw ? undefined : handleDraw}
                aria-label='Тянуть карту дня'
              >
                <span className={s.backSymbol}>☾</span>
              </button>
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
              <Button variant='primary' size='large' onClick={handleDraw}>
                Тянуть карту
              </Button>
            )}
            {draw && revealed && (
              <>
                <Popconfirm
                  title='Тянуть другую карту?'
                  description='Карта дня обычно остаётся на весь день.'
                  okText='Тянуть'
                  cancelText='Оставить'
                  onConfirm={handleReset}
                >
                  <Button>Тянуть заново</Button>
                </Popconfirm>
                <ShareButton
                  reading={{
                    type: 'day',
                    date: new Date().toISOString(),
                    cards: [{ cardId: draw.card.id, reversed: draw.reversed }],
                  }}
                />
              </>
            )}
          </div>
        </div>

        <section className={s.reading} aria-live='polite'>
          {draw ? (
            <>
              <h2 className={s.cardName}>{draw.card.name}</h2>
              <Chip className={s.orientationTag}>{orientation} положение</Chip>
              <div className={s.keywords}>
                {draw.card.keywords.map((k) => (
                  <Chip key={k}>{k}</Chip>
                ))}
              </div>
              <hr className='tarot-divider' />
              <p className={s.text}>
                {draw.reversed ? draw.card.reversed : draw.card.upright}
              </p>
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
