// import 'antd/dist/antd.css';

import { ConfigProvider } from 'antd';
import MenuLayout from './menu';
import React from 'react';
import en_US from 'antd/es/locale/en_US';
import { setValidationLanguage } from '@uform/antd';

setValidationLanguage('en_US');

export default function BasicLayout(props: any) {
  return (
    <ConfigProvider locale={en_US}>
      <MenuLayout>{props.children}</MenuLayout>
    </ConfigProvider>
  );
}
