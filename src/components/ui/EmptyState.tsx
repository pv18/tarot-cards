import React from 'react';
import s from './EmptyState.module.scss';

interface EmptyStateProps {
  description: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  description,
  className,
}) => (
  <div className={[s.empty, className].filter(Boolean).join(' ')}>
    <span className={s.icon} aria-hidden='true'>
      ☾
    </span>
    <p className={s.text}>{description}</p>
  </div>
);
