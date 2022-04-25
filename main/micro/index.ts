import { setList, getList } from "./subApps";
import { setMainLifeCycle } from ".//mainLifeCycle";
import rewriteHistory from "./rewriteHistory";
import currentApp from "./currentApp";
import { lifeCycle } from "./lifeCycle";

export const routerHandler = () => {
  history.pushState = rewriteHistory("pushState");
  history.replaceState = rewriteHistory("replaceState");

  window.addEventListener("pushState", turnApp);
  window.addEventListener("replaceState", turnApp);
  window.addEventListener("popstate", turnApp);
};

const turnApp = async () => {
  if (isTurnChild()) {
    console.log("路由切换了");
    await lifeCycle();
  }
};

// 实现路由拦截
routerHandler();

export const registerMicroApps = (appList, lifeCycle) => {
  setList(appList);
  setMainLifeCycle(lifeCycle);
};

// 启动微前端框架
export const start = () => {
  // 首先验证当前子应用列表是否为空
  const apps = getList();
  if (!apps.length) {
    throw Error("子应用列表为空");
  }

  // 有子应用，查找符合当前路由的子应用
  const app = currentApp();
  console.log("初始子应用：", app);

  if (app) {
    window.__CURRENT_SUB_APP__ = app.activeRule;
    turnApp();
  }
};

// 子应用是否做了切换
const isTurnChild = () => {
  window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__;
  if (window.__CURRENT_SUB_APP__ === window.location.pathname) return false;

  const currentApp = window.location.pathname.match(/(\/[\w-]+)/);
  if (!currentApp) return;

  window.__CURRENT_SUB_APP__ = currentApp[0];
  return true;
};
