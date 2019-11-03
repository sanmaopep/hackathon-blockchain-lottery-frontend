import cosmosState from './store/comos';

interface MenuItem {
  text: string;
  route: string;
  /** Look up Icons: https://fontawesome.com/v4.7.0/icons/ */
  icon: string;
}

const menuMap: MenuItem[] = [
  {
    route: '/lottery',
    icon: 'fa fa-play-circle',
    text: 'Lottery',
  },
  // {
  //   route: '/blockBrowser',
  //   icon: 'fa fa-folder-open-o',
  //   text: 'Block Browser',
  // },
];

export default menuMap;
