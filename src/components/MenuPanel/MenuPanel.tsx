import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  GiBriefcase,
  GiCardExchange,
  GiCardPick,
  GiCardPlay,
  GiCardRandom,
  GiHeartWings,
  GiOpenBook,
  GiSoundWaves,
  GiYinYang,
} from 'react-icons/gi';
import { ROUTES } from '../../routes';
import { isSoundEnabled, toggleSound } from '../../utils/sound';
import { Switch } from '../ui/Switch';
import s from './MenuPanel.module.scss';

const items = [
  { to: ROUTES.HOME, label: 'Карта дня', icon: <GiCardRandom />, end: true },
  { to: ROUTES.YESNO, label: 'Да / Нет', icon: <GiYinYang />, end: false },
  { to: ROUTES.THREE, label: 'Три карты', icon: <GiCardPlay />, end: false },
  {
    to: ROUTES.RELATIONSHIP,
    label: 'Отношения',
    icon: <GiHeartWings />,
    end: false,
  },
  { to: ROUTES.CAREER, label: 'Работа', icon: <GiBriefcase />, end: false },
  { to: ROUTES.FIVE, label: 'Пять карт', icon: <GiCardPick />, end: false },
  {
    to: ROUTES.CELTIC,
    label: 'Кельтский крест',
    icon: <GiCardExchange />,
    end: false,
  },
  { to: ROUTES.CARDS, label: 'Все карты', icon: <GiCardPick />, end: false },
  { to: ROUTES.HISTORY, label: 'История', icon: <GiOpenBook />, end: false },
];

interface MenuPanelProps {
  // вызывается после перехода по пункту — каркас закрывает мобильное меню
  onNavigate?: () => void;
}

export const MenuPanel: React.FC<MenuPanelProps> = ({ onNavigate }) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled);

  return (
    <div className={s.MenuPanel}>
      <div className={s.brand}>Таро</div>
      <nav className={s.nav} aria-label='Разделы сайта'>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [s.item, isActive ? s.itemActive : ''].filter(Boolean).join(' ')
            }
            onClick={onNavigate}
          >
            <span className={s.icon} aria-hidden='true'>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className={s.soundToggle}>
        <GiSoundWaves aria-hidden='true' />
        <span>Звуки колоды</span>
        <Switch
          ariaLabel='Включить или выключить звуки колоды'
          checked={soundOn}
          onChange={() => setSoundOn(toggleSound())}
        />
      </div>
    </div>
  );
};
