import 'react-toastify/dist/ReactToastify.css';

import DrawerLayout from './drawerLayout';
import React from 'react';
import { toast } from 'react-toastify';

toast.configure({
  autoClose: 3000,
  hideProgressBar: true,
});

export default function BasicLayout(props: any) {
  if (props.location.pathname === '/login') {
    return props.children;
  }

  return <DrawerLayout>{props.children}</DrawerLayout>;
}
