import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  // todo
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [{ path: '/', component: '../pages/index' }],
  //   },
  // ],
  proxy: {
    '/api': {
      // todo
      target: 'http://182.254.137.15:8080/finance/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: { webpackChunkName: true },
        title: 'Super Chain',
        dll: true,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};

export default config;
