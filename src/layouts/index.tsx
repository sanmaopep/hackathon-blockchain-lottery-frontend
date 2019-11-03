import 'react-toastify/dist/ReactToastify.css';

import { createMuiTheme, useTheme } from '@material-ui/core/styles';

import DrawerLayout from './drawerLayout';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { toast } from 'react-toastify';

toast.configure({
  autoClose: 3000,
  hideProgressBar: true,
});

const theme = createMuiTheme({
  palette: {
    common: { black: '#000', white: '#fff' },
    background: { paper: '#fff', default: '#fafafa' },
    primary: {
      light: 'rgba(242, 242, 242, 1)',
      main: 'rgba(240, 240, 240, 1)',
      dark: 'rgba(224, 224, 224, 1)',
      contrastText: 'rgba(0, 0, 0, 1)',
    },
    secondary: { light: '#ff4081', main: '#f50057', dark: '#c51162', contrastText: '#fff' },
    error: { light: '#e57373', main: '#f44336', dark: '#d32f2f', contrastText: '#fff' },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

export default function BasicLayout(props: any) {
  if (props.location.pathname === '/login') {
    return props.children;
  }

  return (
    <ThemeProvider theme={theme}>
      <DrawerLayout>{props.children}</DrawerLayout>
    </ThemeProvider>
  );
}
