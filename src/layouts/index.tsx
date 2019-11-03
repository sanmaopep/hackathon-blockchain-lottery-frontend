import 'react-toastify/dist/ReactToastify.css';

import DrawerLayout from './drawerLayout';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { toast } from 'react-toastify';

toast.configure({
  autoClose: 3000,
  hideProgressBar: true,
});

// const theme = {
//   palette: {
//     common: { black: '#000', white: '#fff' },
//     background: { paper: '#fff', default: '#fafafa' },
//     primary: {
//       light: 'rgba(187, 200, 231, 1)',
//       main: 'rgba(63, 81, 181, 0.08)',
//       dark: 'rgba(215, 218, 233, 1)',
//       contrastText: 'rgba(0, 0, 0, 1)',
//     },
//     secondary: { light: '#ff4081', main: '#f50057', dark: '#c51162', contrastText: '#fff' },
//     error: { light: '#e57373', main: '#f44336', dark: '#d32f2f', contrastText: '#fff' },
//     text: {
//       primary: 'rgba(0, 0, 0, 0.87)',
//       secondary: 'rgba(0, 0, 0, 0.54)',
//       disabled: 'rgba(0, 0, 0, 0.38)',
//       hint: 'rgba(0, 0, 0, 0.38)',
//     },
//   },
// };

export default function BasicLayout(props: any) {
  if (props.location.pathname === '/login') {
    return props.children;
  }

  return <DrawerLayout>{props.children}</DrawerLayout>;
}
