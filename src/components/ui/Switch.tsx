import React from 'react';
import s from './Switch.module.scss';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  ariaLabel,
  className,
}) => (
  <button
    type='button'
    role='switch'
    aria-checked={checked}
    aria-label={ariaLabel}
    className={[s.switch, checked ? s.on : '', className]
      .filter(Boolean)
      .join(' ')}
    onClick={() => onChange(!checked)}
  >
    <span className={s.thumb} />
  </button>
);
