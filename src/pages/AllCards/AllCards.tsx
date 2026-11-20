import React, { useMemo, useState } from 'react';
import { cardImage, cards } from '../../data/cards';
import { type ICard, SUIT_TITLES, type Suit } from '../../types/types';
import { Chip } from '../../components/ui/Chip';
import { Modal } from '../../components/ui/Modal';
import { Segmented } from '../../components/ui/Segmented';
import { TextInput } from '../../components/ui/TextInput';
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
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ICard | null>(null);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cards
      .filter((c) => filter === 'all' || c.suit === filter)
      .filter((c) => c.name.toLowerCase().includes(query));
  }, [filter, search]);

  return (
    <div className={s.page}>
      <h1>Все карты</h1>
      <div className={s.toolbar}>
        <TextInput
          className={s.search}
          placeholder='Поиск по названию'
          allowClear
          value={search}
          onChange={setSearch}
        />
        <Segmented
          ariaLabel='Фильтр по мастям'
          options={filterOptions}
          value={filter}
          onChange={setFilter}
        />
      </div>
      <div className={s.grid}>
        {visible.map((card) => (
          <button
            key={card.id}
            type='button'
            className={s.item}
            onClick={() => setSelected(card)}
          >
            <img src={cardImage(card.id)} alt={card.name} loading='lazy' />
            <span className={s.name}>{card.name}</span>
          </button>
        ))}
      </div>

      <Modal
        open={selected !== null}
        title={selected?.name}
        width={720}
        onClose={() => setSelected(null)}
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
                  <Chip key={k}>{k}</Chip>
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
