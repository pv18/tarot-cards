import React from 'react';
import { useSpread } from '../../hooks/useSpread';
import { SharedReading } from '../../components/SharedReading/SharedReading';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { TextInput } from '../../components/ui/TextInput';
import { cardImage } from '../../data/cards';
import { type ReadingType } from '../../types/types';
import s from './PositionSpread.module.scss';

interface PositionSpreadProps {
  type: ReadingType;
  title: string;
  subtitle: string;
  positions: string[];
}

/**
 * Линейный расклад: N карт, у каждой — название позиции.
 * Используется для «Трёх карт», «Отношений» и «Работы».
 */
export const PositionSpread: React.FC<PositionSpreadProps> = ({
  type,
  title,
  subtitle,
  positions,
}) => {
  const spread = useSpread({
    type,
    size: positions.length,
    positionOf: (i) => positions[i],
  });
  const { shared, clearShared, drawn, question, setQuestion, complete } =
    spread;

  if (shared) {
    return (
      <div className={s.container}>
        <SharedReading reading={shared} onClear={clearShared} />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h1>{title}</h1>
      <p className={s.subtitle}>{subtitle}</p>

      <TextInput
        className={s.questionInput}
        placeholder='Сформулируйте вопрос (необязательно)'
        maxLength={200}
        allowClear
        value={question}
        onChange={setQuestion}
        disabled={drawn.length > 0}
      />

      <div className={s.spread}>
        {positions.map((position, i) => {
          const draw = drawn[i];
          return (
            <div key={position} className={s.slot}>
              {draw ? (
                <>
                  <img
                    className={draw.reversed ? s.imgReversed : s.img}
                    src={cardImage(draw.card.id)}
                    alt={draw.card.name}
                  />
                  <span className={s.cardName}>{draw.card.name}</span>
                  <span className={s.position}>{position}</span>
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
          variant='primary'
          size='large'
          disabled={complete}
          onClick={spread.addCard}
        >
          Взять карту
        </Button>
        <Button
          size='large'
          disabled={drawn.length > 0}
          onClick={spread.shuffleDeck}
        >
          Тасовать карты
        </Button>
        <Button size='large' disabled={!complete} onClick={spread.restart}>
          Заново
        </Button>
        {complete && (
          <ShareButton
            reading={{
              type,
              date: new Date().toISOString(),
              question: question.trim() || undefined,
              cards: drawn.map((d, i) => ({
                cardId: d.card.id,
                reversed: d.reversed,
                position: positions[i],
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
                {positions[i]} — {d.card.name}
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
