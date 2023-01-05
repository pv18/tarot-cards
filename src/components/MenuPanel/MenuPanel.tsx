import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes';
import {Menu} from 'antd';
import s from './MenuPanel.module.scss'

export const MenuPanel: React.FC = () => {

  return (
      <Menu
          className={s.MenuPanel}
          theme='dark'
          defaultSelectedKeys={['1']}
      >
          <Menu.Item key='1'>
              <NavLink to={ROUTES.HOME}>HOME</NavLink>
          </Menu.Item>
          <Menu.Item key='2'>
              <NavLink to={ROUTES.FIVE}>FIVE CARDS</NavLink>
          </Menu.Item>
      </Menu>
  );
};
