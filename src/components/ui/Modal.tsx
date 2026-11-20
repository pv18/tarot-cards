import React, { useEffect, useRef } from 'react';
import s from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  // ограничение сверху; на узких экранах срабатывает min() в стилях
  width?: number;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  width,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape закрывает модалку; отдельный эффект, чтобы пересоздание слушателя
  // при смене обработчика не трогало блокировку скролла
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // пока модалка открыта, страница под ней не прокручивается,
  // а фокус уходит в панель — чтобы Escape и таб работали предсказуемо
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={s.overlay} role='presentation' onClick={onClose}>
      <div
        ref={panelRef}
        role='dialog'
        aria-modal='true'
        aria-label={title}
        tabIndex={-1}
        className={s.panel}
        style={width ? { maxWidth: `min(${width}px, 92vw)` } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.header}>
          {title && <h3 className={s.title}>{title}</h3>}
          <button
            type='button'
            className={s.close}
            aria-label='Закрыть'
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className={s.body}>{children}</div>
      </div>
    </div>
  );
};
