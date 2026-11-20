import React from 'react';
import s from './TextInput.module.scss';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  allowClear?: boolean;
  disabled?: boolean;
  className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  maxLength,
  allowClear,
  disabled,
  className,
}) => (
  <span className={[s.wrap, className].filter(Boolean).join(' ')}>
    <input
      type='text'
      className={[s.input, allowClear && value ? s.hasClear : '']
        .filter(Boolean)
        .join(' ')}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
    {allowClear && value && !disabled && (
      <button
        type='button'
        className={s.clear}
        aria-label='Очистить'
        onClick={() => onChange('')}
      >
        ×
      </button>
    )}
  </span>
);
