import { findAppByRoute } from "./currentApp";
import { getMainLifeCycle } from "./mainLifeCycle";
import { loadHtml } from "./loadHtml";

export const lifeCycle = async () => {
  const prevAppConfig = findAppByRoute(window.__ORIGIN_APP__);
  const nextAppConfig = findAppByRoute(window.__CURRENT_SUB_APP__);

  if (!nextAppConfig) return;
  if (prevAppConfig) await destroyed(prevAppConfig);

  const app = await beforeLoad(nextAppConfig);
  await mounted(app);
};

export const beforeLoad = async (appConfig) => {
  await runMainLifeCycle("beforeLoad");
  const app = await loadHtml(appConfig);
  await app?.bootstrap?.();
  return app;
};

export const mounted = async (app) => {
  await app?.mount?.();
  await runMainLifeCycle("mounted");
};

export const destroyed = async (appConfig) => {
  await window[appConfig.name]?.unmount?.();
  await runMainLifeCycle("destroyed");
};

export const runMainLifeCycle = async (type: string) => {
  const mainLifeCycle = getMainLifeCycle();
  await Promise.all(mainLifeCycle[type].map(async (item) => await item()));
};
