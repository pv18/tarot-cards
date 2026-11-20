import React, { useState } from 'react';
import { READING_LABELS, clearHistory, loadHistory } from '../../utils/history';
import { cardImage } from '../../data/cards';
import { type IReading } from '../../types/types';
import { ReadingView } from '../../components/ReadingView/ReadingView';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';
import { Popconfirm } from '../../components/ui/Popconfirm';
import s from './History.module.scss';

export const History: React.FC = () => {
  const [history, setHistory] = useState<IReading[]>(loadHistory);
  const [selected, setSelected] = useState<IReading | null>(null);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={s.page}>
      <div className={s.header}>
        <h1>История раскладов</h1>
        <Popconfirm
          title='Очистить всю историю?'
          okText='Очистить'
          cancelText='Оставить'
          onConfirm={handleClear}
          disabled={history.length === 0}
          danger
        >
          <Button variant='danger' disabled={history.length === 0}>
            Очистить
          </Button>
        </Popconfirm>
      </div>

      {history.length === 0 ? (
        <EmptyState
          className={s.emptyBlock}
          description='Раскладов пока нет — тяни карту, и она появится здесь'
        />
      ) : (
        <ul className={s.list}>
          {history.map((reading) => (
            <li
              key={reading.id}
              className={s.item}
              onClick={() => setSelected(reading)}
            >
              <div className={s.itemMain}>
                <div className={s.itemMeta}>
                  <Chip>{READING_LABELS[reading.type]}</Chip>
                  <span className={s.date}>{formatDate(reading.date)}</span>
                </div>
                {reading.question && (
                  <p className={s.question}>«{reading.question}»</p>
                )}
                <div className={s.thumbs}>
                  {reading.cards.map((c) => (
                    <img
                      key={c.cardId}
                      className={c.reversed ? s.thumbReversed : s.thumb}
                      src={cardImage(c.cardId)}
                      alt=''
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={selected !== null}
        title={selected ? READING_LABELS[selected.type] : undefined}
        width={720}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className={s.modalBody}>
            {selected.question && (
              <p className={s.modalQuestion}>«{selected.question}»</p>
            )}
            <p className={s.modalDate}>{formatDate(selected.date)}</p>
            <ReadingView cards={selected.cards} />
          </div>
        )}
      </Modal>
    </div>
  );
};
