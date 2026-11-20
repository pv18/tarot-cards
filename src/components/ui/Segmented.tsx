import React from 'react';
import s from './Segmented.module.scss';

interface SegmentedOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
}

// не React.FC: generic-компонент типизируется только напрямую стрелкой
export const Segmented = <T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedProps<T>) => (
  <div
    role='radiogroup'
    aria-label={ariaLabel}
    className={[s.group, className].filter(Boolean).join(' ')}
  >
    {options.map((option) => (
      <button
        key={option.value}
        type='button'
        role='radio'
        aria-checked={option.value === value}
        className={[s.option, option.value === value ? s.active : '']
          .filter(Boolean)
          .join(' ')}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
