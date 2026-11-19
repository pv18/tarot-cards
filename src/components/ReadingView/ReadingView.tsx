import React from 'react';
import { cardImage, getCardById } from '../../data/cards';
import { type ICardDrawn, type IReadingCard } from '../../types/types';
import s from './ReadingView.module.scss';

export interface IReadingViewItem extends ICardDrawn {
  position?: string;
}

interface ReadingViewProps {
  cards: IReadingCard[];
}

/** Разобранный расклад: картинки с ориентацией и толкованиями по позициям */
export const ReadingView: React.FC<ReadingViewProps> = ({ cards }) => (
  <div className={s.view}>
    {cards.map((item) => {
      const card = getCardById(item.cardId);
      if (!card) return null;
      return (
        <div key={item.cardId} className={s.item}>
          <img
            className={item.reversed ? s.imgReversed : s.img}
            src={cardImage(card.id)}
            alt={card.name}
          />
          <div className={s.info}>
            {item.position && <p className={s.position}>{item.position}</p>}
            <h3 className={s.name}>{card.name}</h3>
            <p className={s.orientation}>
              {item.reversed ? 'перевёрнутое положение' : 'прямое положение'}
            </p>
            <p className={s.meaning}>
              {item.reversed ? card.reversed : card.upright}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);
