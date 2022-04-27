/* eslint-disable */
// @ts-nocheck

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

let instance = null;

const render = () => {
  instance = createApp(App).use(store).use(router).mount("#app");
};

if (!window.__MICRO_WEB__) {
  render();
}

export const bootstrap = () => {
  console.log("开始加载");
};

export const mount = () => {
  console.log("加载成功");
  render();
};

export const unmount = () => {
  console.log("卸载完成");
};
