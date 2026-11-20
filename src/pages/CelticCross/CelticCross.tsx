import React from 'react';
import { playFlip, playShuffle } from '../../utils/sound';
import { useSpread } from '../../hooks/useSpread';
import { SharedReading } from '../../components/SharedReading/SharedReading';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { TextInput } from '../../components/ui/TextInput';
import { cardImage } from '../../data/cards';
import { CELTIC_POSITIONS } from '../../data/spreads';
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
  const spread = useSpread({
    type: 'celtic',
    size: SPREAD_SIZE,
    positionOf: (i) => `${i + 1}. ${CELTIC_POSITIONS[i].name}`,
  });
  const { shared, clearShared, drawn, question, setQuestion, complete } =
    spread;

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
            <span className={s.label}>
              {position}. {CELTIC_POSITIONS[position - 1].name}
            </span>
          </>
        ) : (
          <>
            <div className={s.placeholder} />
            <span className={s.label}>
              {position}. {CELTIC_POSITIONS[position - 1].name}
            </span>
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

      <TextInput
        className={s.questionInput}
        placeholder='Сформулируйте вопрос (необязательно)'
        maxLength={200}
        allowClear
        value={question}
        onChange={setQuestion}
        disabled={drawn.length > 0}
      />

      <div className={s.board}>
        {Array.from({ length: SPREAD_SIZE }, (_, i) => slotFor(i + 1))}
      </div>

      <div className={s.controls}>
        <Button
          variant='primary'
          size='large'
          disabled={complete}
          onClick={() => {
            playFlip();
            spread.addCard();
          }}
        >
          Взять карту
        </Button>
        <Button
          size='large'
          disabled={drawn.length > 0}
          onClick={() => {
            playShuffle();
            spread.shuffleDeck();
          }}
        >
          Тасовать карты
        </Button>
        <Button size='large' disabled={!complete} onClick={spread.restart}>
          Заново
        </Button>
        {complete && (
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

      {complete && (
        <div className={s.readings}>
          {drawn.map((d, i) => (
            <div key={d.card.id} className={s.reading}>
              <h3 className={s.readingTitle}>
                {i + 1}. {CELTIC_POSITIONS[i].name} — {d.card.name}
              </h3>
              <Chip className={s.orientation}>
                {d.reversed ? 'перевёрнутое положение' : 'прямое положение'}
              </Chip>
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
