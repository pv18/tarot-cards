import React from 'react';
import s from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'medium' | 'large';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'ghost',
  size = 'medium',
  icon,
  className,
  children,
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={[s.btn, s[variant], s[size], className]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {icon && <span className={s.icon}>{icon}</span>}
    {children}
  </button>
);
