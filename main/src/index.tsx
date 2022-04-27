import React from "react";
import { createRoot } from "react-dom/client";
import "./global.less";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

const subAppList = [
  {
    name: "vue2-app",
    activeRule: "/vue2-app",
    container: "#micro-container",
    entry: "//localhost:6002",
  },
  {
    name: "vue3-app",
    activeRule: "/vue3-app",
    container: "#micro-container",
    entry: "//localhost:6003",
  },
  {
    name: "umi-app",
    activeRule: "/umi-app",
    container: "#micro-container",
    entry: "//localhost:6001",
  },
];

import { registerMicroApps, start } from "../micro";

registerMicroApps(subAppList, {
  beforeLoad: [
    () => {
      // console.log("开始加载");
      // console.log("loading...");
    },
  ],
  mounted: [
    () => {
      // console.log("渲染完成");
      // console.log("loaded");
    },
  ],
  destroyed: [
    () => {
      // console.log("卸载完成");
    },
  ],
});

start();
