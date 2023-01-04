import React, {useState} from 'react';
import {HomeOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Card, Menu, theme, Image} from 'antd';
import {GiDiceSixFacesThree} from 'react-icons/gi';
import {AllCards} from '../AllCards/AllCards';
import {BsBorderAll} from 'react-icons/bs';


const {Header, Content, Footer, Sider} = Layout;
const {Meta} = Card;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Все Карты', '1', <BsBorderAll/>),
    getItem('3 Карты', '2', <GiDiceSixFacesThree/>),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Menu
                    style={{margin: '15px 0 0 0'}}
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <AllCards/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
