import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Card, Menu, theme, Image } from 'antd';
import {RandomCard} from '../RandomCard/RandomCard';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [getItem('5 Карт', '1', <HomeOutlined />)];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
      </Sider>
      <Layout className='site-layout'>
        {/*<Header style={{padding: 0, background: colorBgContainer}}/>*/}
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: 'inherit',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <RandomCard/>
            <RandomCard/>
            <RandomCard/>
            <RandomCard/>
            <RandomCard/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: 'black', color: 'white' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
