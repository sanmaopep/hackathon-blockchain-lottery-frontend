import { Icon, Layout, Menu } from 'antd';
import React, { Component, Fragment } from 'react';

import Link from 'umi/link';
import menuMap from '@/menu';
import styles from './index.css';

const { Footer, Sider, Content } = Layout;

export default class MenuLayout extends Component {
  getCurrKey() {
    //@ts-ignore
    const { pathname } = this.props.location;

    // @todo
  }

  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
          <h1 className={styles.title}>Super Lottery</h1>
          <Menu theme="dark" mode="inline">
            {menuMap.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  <Link to={item.route}>
                    <Icon type={item.icon} theme="outlined" />
                    <span>{item.text}</span>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 480 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Fragment>
              <Icon type="copyright" /> 2019 Super Chainer
            </Fragment>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
