import React, { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../routes';
import {
  CAREER_POSITIONS,
  RELATIONSHIP_POSITIONS,
  THREE_POSITIONS,
} from '../../data/spreads';
import { MenuPanel } from '../MenuPanel/MenuPanel';
import { Spinner } from '../ui/Spinner';
import s from './App.module.scss';

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
const PositionSpread = lazy(() =>
  import('../../pages/PositionSpread/PositionSpread').then((m) => ({
    default: m.PositionSpread,
  }))
);
const YesNo = lazy(() =>
  import('../../pages/YesNo/YesNo').then((m) => ({ default: m.YesNo }))
);
const History = lazy(() =>
  import('../../pages/History/History').then((m) => ({ default: m.History }))
);
const CelticCross = lazy(() =>
  import('../../pages/CelticCross/CelticCross').then((m) => ({
    default: m.CelticCross,
  }))
);

const PageLoader: React.FC = () => (
  <div className={s.loader}>
    <Spinner />
  </div>
);

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={s.shell}>
      <button
        type='button'
        className={s.burger}
        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? '×' : '☰'}
      </button>
      <aside className={[s.sider, menuOpen ? s.siderOpen : ''].join(' ')}>
        <MenuPanel onNavigate={() => setMenuOpen(false)} />
      </aside>
      <main className={s.content}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<CardOfDay />} />
            <Route path={ROUTES.CARDS} element={<AllCards />} />
            <Route path={ROUTES.FIVE} element={<FiveCards />} />
            <Route
              path={ROUTES.THREE}
              element={
                <PositionSpread
                  type='three'
                  title='Три карты'
                  subtitle='Прошлое, настоящее и будущее — классический расклад на ситуацию'
                  positions={THREE_POSITIONS.map((p) => p.name)}
                />
              }
            />
            <Route
              path={ROUTES.RELATIONSHIP}
              element={
                <PositionSpread
                  type='relationship'
                  title='Отношения'
                  subtitle='Пять карт о вас, партнёре и том, что между вами'
                  positions={RELATIONSHIP_POSITIONS.map((p) => p.name)}
                />
              }
            />
            <Route
              path={ROUTES.CAREER}
              element={
                <PositionSpread
                  type='career'
                  title='Работа'
                  subtitle='Пять карт о делах: силы, препятствия и возможности'
                  positions={CAREER_POSITIONS.map((p) => p.name)}
                />
              }
            />
            <Route path={ROUTES.CELTIC} element={<CelticCross />} />
            <Route path={ROUTES.YESNO} element={<YesNo />} />
            <Route path={ROUTES.HISTORY} element={<History />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
