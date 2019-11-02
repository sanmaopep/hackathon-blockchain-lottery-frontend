interface MenuItem {
  text: string;
  route: string;
  /** Look up Icons: https://ant.design/components/icon/ */
  icon: string;
}

const menuMap: MenuItem[] = [
  {
    route: '/lottery',
    icon: 'account-book',
    text: 'Lottery',
  },
  {
    route: '/blockBrowser',
    icon: 'api',
    text: 'Block Browser',
  },
];

export default menuMap;
