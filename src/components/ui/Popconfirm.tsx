import React, { cloneElement, useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import s from './Popconfirm.module.scss';

interface PopconfirmProps {
  title: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  // у неактивного триггера подтверждение не открывается
  disabled?: boolean;
  // подтверждение разрушающего действия — кнопка ОК в danger-стиле
  danger?: boolean;
  children: React.ReactElement;
}

// подтверждение поверх Modal вместо всплывашки у триггера:
// не требует позиционирования, доступно с клавиатуры и удобно на мобильных
export const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  okText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
  disabled,
  danger,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {cloneElement(children, {
        onClick: () => {
          if (!disabled) setOpen(true);
        },
      })}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        width={360}
      >
        <div className={s.actions}>
          <Button variant='ghost' onClick={() => setOpen(false)}>
            {cancelText}
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            autoFocus
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
          >
            {okText}
          </Button>
        </div>
      </Modal>
    </>
  );
};
