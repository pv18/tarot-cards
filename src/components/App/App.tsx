import React, { lazy, Suspense } from 'react';
import { ConfigProvider, Layout, Spin, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { MenuPanel } from '../MenuPanel/MenuPanel';

// страницы грузим лениво — каждый расклад в своём чанке
const CardOfDay = lazy(() =>
  import('../../pages/CardOfDay/CardOfDay').then((m) => ({
    default: m.CardOfDay,
  }))
);
const AllCards = lazy(() =>
  import('../../pages/AllCards/AllCards').then((m) => ({ default: m.AllCards }))
);
const FiveCards = lazy(() =>
  import('../../pages/FiveCards/FiveCards').then((m) => ({
    default: m.FiveCards,
  }))
);
const ThreeCards = lazy(() =>
  import('../../pages/ThreeCards/ThreeCards').then((m) => ({
    default: m.ThreeCards,
  }))
);
const History = lazy(() =>
  import('../../pages/History/History').then((m) => ({ default: m.History }))
);
const CelticCross = lazy(() =>
  import('../../pages/CelticCross/CelticCross').then((m) => ({
    default: m.CelticCross,
  }))
);

const { Sider, Content } = Layout;

const PageLoader: React.FC = () => (
  <div
    style={{
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spin size='large' />
  </div>
);

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
        breakpoint='lg'
        collapsedWidth='0'
        width={200}
        style={{ borderRight: '1px solid rgba(212, 175, 55, 0.15)' }}
      >
        <MenuPanel />
      </Sider>
      <Layout>
        <Content style={{ padding: '28px 20px 56px' }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<CardOfDay />} />
              <Route path={ROUTES.CARDS} element={<AllCards />} />
              <Route path={ROUTES.FIVE} element={<FiveCards />} />
              <Route path={ROUTES.THREE} element={<ThreeCards />} />
              <Route path={ROUTES.CELTIC} element={<CelticCross />} />
              <Route path={ROUTES.HISTORY} element={<History />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  </ConfigProvider>
);

export default App;
