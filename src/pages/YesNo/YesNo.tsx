import React from 'react';
import { Button, Input, Tag, Typography } from 'antd';
import { useSpread } from '../../hooks/useSpread';
import { SharedReading } from '../../components/SharedReading/SharedReading';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { cardImage } from '../../data/cards';
import s from './YesNo.module.scss';

export const YesNo = () => {
  const spread = useSpread({
    type: 'yesno',
    size: 1,
    positionOf: () => 'Ответ',
  });
  const { shared, clearShared, drawn, question, setQuestion, complete } =
    spread;
  const draw = drawn[0];
  const verdict = draw ? (draw.reversed ? 'Нет' : 'Да') : null;

  if (shared) {
    return (
      <div className={s.container}>
        <SharedReading reading={shared} onClear={clearShared} />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h1>Да или нет</h1>
      <p className={s.subtitle}>
        Сформулируйте вопрос так, чтобы на него можно было ответить «да» или
        «нет»
      </p>

      <Input
        className={s.questionInput}
        placeholder='Ваш вопрос'
        maxLength={200}
        allowClear
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={complete}
      />

      <div className={s.cardArea}>
        {draw ? (
          <img
            className={draw.reversed ? s.imgReversed : s.img}
            src={cardImage(draw.card.id)}
            alt={draw.card.name}
          />
        ) : (
          <div className={s.placeholder} />
        )}
        {verdict && <div className={s.verdict}>{verdict}</div>}
      </div>

      <div className={s.controls}>
        {!complete && (
          <Button type='primary' size='large' onClick={spread.addCard}>
            Тянуть карту
          </Button>
        )}
        {complete && (
          <>
            <Button size='large' onClick={spread.restart}>
              Спросить заново
            </Button>
            <ShareButton
              reading={{
                type: 'yesno',
                date: new Date().toISOString(),
                question: question.trim() || undefined,
                cards: [{ cardId: draw.card.id, reversed: draw.reversed }],
              }}
            />
          </>
        )}
      </div>

      {draw && (
        <section className={s.reading} aria-live='polite'>
          <h2 className={s.cardName}>{draw.card.name}</h2>
          <Tag bordered={false} className={s.orientation}>
            {draw.reversed ? 'перевёрнутое положение' : 'прямое положение'}
          </Tag>
          <div className={s.keywords}>
            {draw.card.keywords.map((k) => (
              <Tag key={k} bordered={false}>
                {k}
              </Tag>
            ))}
          </div>
          <hr className='tarot-divider' />
          <Typography.Paragraph className={s.meaning}>
            {draw.reversed ? draw.card.reversed : draw.card.upright}
          </Typography.Paragraph>
        </section>
      )}
    </div>
  );
};
