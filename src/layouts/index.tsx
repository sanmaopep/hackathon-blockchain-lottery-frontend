import MenuLayout from './menu';
import React from 'react';

export default function BasicLayout(props: any) {
  return <MenuLayout>{props.children}</MenuLayout>;
}
