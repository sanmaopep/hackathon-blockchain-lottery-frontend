import DrawerLayout from './drawerLayout';
import React from 'react';

export default function BasicLayout(props: any) {
  return <DrawerLayout>{props.children}</DrawerLayout>;
}
