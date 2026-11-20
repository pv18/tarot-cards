import React from 'react';
import { READING_LABELS } from '../../utils/history';
import { type IReading } from '../../types/types';
import { ReadingView } from '../ReadingView/ReadingView';
import { Button } from '../ui/Button';
import s from './SharedReading.module.scss';

interface SharedReadingProps {
  reading: IReading;
  onClear: () => void;
}

/** Вид присланного по ссылке расклада */
export const SharedReading: React.FC<SharedReadingProps> = ({
  reading,
  onClear,
}) => (
  <div className={s.wrap}>
    <p className={s.banner}>
      Вам прислали расклад «{READING_LABELS[reading.type]}»
      {reading.question ? ` по вопросу «${reading.question}»` : ''}
    </p>
    <ReadingView cards={reading.cards} />
    <Button variant='primary' onClick={onClear}>
      Сделать свой расклад
    </Button>
  </div>
);
