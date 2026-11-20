import React from 'react';
import { useSpread } from '../../hooks/useSpread';
import { SharedReading } from '../../components/SharedReading/SharedReading';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { Button } from '../../components/ui/Button';
import { TextInput } from '../../components/ui/TextInput';
import { cardImage } from '../../data/cards';
import s from './FiveCards.module.scss';

const SPREAD_SIZE = 5;

export const FiveCards = () => {
  const spread = useSpread({ type: 'five', size: SPREAD_SIZE });
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
      <h1>Пять карт</h1>
      <p className={s.subtitle}>
        Тасуйте колоду, думая о своём вопросе, и вытяните пять карт
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
                  <span className={s.cardName}>{draw.card.name}</span>
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
              type: 'five',
              date: new Date().toISOString(),
              question: question.trim() || undefined,
              cards: drawn.map((d) => ({
                cardId: d.card.id,
                reversed: d.reversed,
              })),
            }}
          />
        )}
      </div>
    </div>
  );
};
