import React, { useState } from 'react';
import { Button, Empty, List, Modal, Popconfirm, Tag } from 'antd';
import { READING_LABELS, clearHistory, loadHistory } from '../../utils/history';
import { cardImage } from '../../data/cards';
import { type IReading } from '../../types/types';
import { ReadingView } from '../../components/ReadingView/ReadingView';
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
        >
          <Button danger disabled={history.length === 0}>
            Очистить
          </Button>
        </Popconfirm>
      </div>

      {history.length === 0 ? (
        <Empty
          description='Раскладов пока нет — тяни карту, и она появится здесь'
          style={{ marginTop: 80 }}
        />
      ) : (
        <List
          className={s.list}
          dataSource={history}
          renderItem={(reading) => (
            <List.Item className={s.item} onClick={() => setSelected(reading)}>
              <div className={s.itemMain}>
                <div className={s.itemMeta}>
                  <Tag bordered={false}>{READING_LABELS[reading.type]}</Tag>
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
            </List.Item>
          )}
        />
      )}

      <Modal
        open={selected !== null}
        title={selected && READING_LABELS[selected.type]}
        footer={null}
        width={720}
        centered
        onCancel={() => setSelected(null)}
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
