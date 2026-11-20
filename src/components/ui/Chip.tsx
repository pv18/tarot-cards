import React from 'react';
import s from './Chip.module.scss';

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ children, className }) => (
  <span className={[s.chip, className].filter(Boolean).join(' ')}>
    {children}
  </span>
);
