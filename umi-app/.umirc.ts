import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  devServer: {
    port: 6001,
    output: {
      libraryTarget: 'umd',
      library: 'umiApp',
    },
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.output.libraryTarget('umd');
    memo.output.library('umiApp');
  },
});
