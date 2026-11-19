import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  GiCardExchange,
  GiCardPick,
  GiCardPlay,
  GiCardRandom,
  GiOpenBook,
} from 'react-icons/gi';
import { ROUTES } from '../../routes';
import s from './MenuPanel.module.scss';

const items = [
  { key: ROUTES.HOME, label: 'Карта дня', icon: <GiCardRandom /> },
  { key: ROUTES.THREE, label: 'Три карты', icon: <GiCardPlay /> },
  { key: ROUTES.FIVE, label: 'Пять карт', icon: <GiCardPick /> },
  { key: ROUTES.CELTIC, label: 'Кельтский крест', icon: <GiCardExchange /> },
  { key: ROUTES.CARDS, label: 'Все карты', icon: <GiCardPick /> },
  { key: ROUTES.HISTORY, label: 'История', icon: <GiOpenBook /> },
];

export const MenuPanel: React.FC = () => {
  const location = useLocation();

  return (
    <div className={s.MenuPanel}>
      <div className={s.brand}>Таро</div>
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[location.pathname]}
        items={items.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: <NavLink to={item.key}>{item.label}</NavLink>,
        }))}
      />
    </div>
  );
};
