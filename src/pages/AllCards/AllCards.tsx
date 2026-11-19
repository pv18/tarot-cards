import React, { useMemo, useState } from 'react';
import { Modal, Segmented, Tag } from 'antd';
import { cardImage, cards } from '../../data/cards';
import { ICard, SUIT_TITLES, Suit } from '../../types/types';
import s from './AllCards.module.scss';

type Filter = 'all' | Suit;

const filterOptions: { label: string; value: Filter }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Старшие', value: 'major' },
  { label: 'Кубки', value: 'cups' },
  { label: 'Мечи', value: 'swords' },
  { label: 'Пентакли', value: 'pentacles' },
  { label: 'Посохи', value: 'wands' },
];

export const AllCards: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<ICard | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? cards : cards.filter((c) => c.suit === filter)),
    [filter]
  );

  return (
    <div className={s.page}>
      <h1>Все карты</h1>
      <Segmented
        className={s.filter}
        options={filterOptions}
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
      />
      <div className={s.grid}>
        {visible.map((card) => (
          <button
            key={card.id}
            type="button"
            className={s.item}
            onClick={() => setSelected(card)}
          >
            <img src={cardImage(card.id)} alt={card.name} loading="lazy" />
            <span className={s.name}>{card.name}</span>
          </button>
        ))}
      </div>

      <Modal
        open={selected !== null}
        title={selected?.name}
        footer={null}
        width={720}
        centered
        onCancel={() => setSelected(null)}
      >
        {selected && (
          <div className={s.modalBody}>
            <img
              className={s.modalImage}
              src={cardImage(selected.id)}
              alt={selected.name}
            />
            <div className={s.modalText}>
              <p className={s.suitTitle}>{SUIT_TITLES[selected.suit]}</p>
              <div className={s.keywords}>
                {selected.keywords.map((k) => (
                  <Tag key={k} bordered={false}>
                    {k}
                  </Tag>
                ))}
              </div>
              <h4 className={s.modalHeading}>Прямое положение</h4>
              <p>{selected.upright}</p>
              <h4 className={s.modalHeading}>Перевёрнутое положение</h4>
              <p>{selected.reversed}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
