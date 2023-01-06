import React from 'react';
import { Card, Layout, Menu } from 'antd';
import { AllCards } from '../../pages/AllCards/AllCards';
import { NavLink, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { FiveCards } from '../../pages/FiveCards/FiveCards';
import { MenuPanel } from '../MenuPanel/MenuPanel';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <MenuPanel />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Routes>
            <Route path={ROUTES.HOME} element={<AllCards />} />
            <Route path={ROUTES.FIVE} element={<FiveCards />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
