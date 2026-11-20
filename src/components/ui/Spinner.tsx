import React from 'react';
import s from './Spinner.module.scss';

interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className }) => (
  <span
    className={[s.spinner, className].filter(Boolean).join(' ')}
    role='status'
    aria-label='Загрузка'
  />
);
