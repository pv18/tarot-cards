import React from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { CardOfDay } from '../../pages/CardOfDay/CardOfDay';
import { AllCards } from '../../pages/AllCards/AllCards';
import { FiveCards } from '../../pages/FiveCards/FiveCards';
import { MenuPanel } from '../MenuPanel/MenuPanel';

const { Sider, Content } = Layout;

const App: React.FC = () => (
  <ConfigProvider
    locale={ruRU}
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#d4af37',
        colorInfo: '#d4af37',
        colorBgBase: '#14101c',
        colorText: '#e8e2f0',
        borderRadius: 10,
      },
      components: {
        Layout: {
          bodyBg: 'transparent',
          siderBg: 'rgba(18, 12, 27, 0.72)',
        },
        Menu: {
          itemBg: 'transparent',
          darkItemBg: 'transparent',
          darkItemSelectedBg: 'rgba(212, 175, 55, 0.18)',
        },
      },
    }}
  >
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={200}
        style={{ borderRight: '1px solid rgba(212, 175, 55, 0.15)' }}
      >
        <MenuPanel />
      </Sider>
      <Layout>
        <Content style={{ padding: '28px 20px 56px' }}>
          <Routes>
            <Route path={ROUTES.HOME} element={<CardOfDay />} />
            <Route path={ROUTES.CARDS} element={<AllCards />} />
            <Route path={ROUTES.FIVE} element={<FiveCards />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  </ConfigProvider>
);

export default App;
