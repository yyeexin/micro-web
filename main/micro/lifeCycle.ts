import { findAppByRoute } from "./currentApp";
import { getMainLifeCycle } from "./mainLifeCycle";

export const lifeCycle = async () => {
  const prevApp = findAppByRoute(window.__ORIGIN_APP__);
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__);

  console.log(prevApp);
  console.log(nextApp);

  if (!nextApp) return;
  if (prevApp) await destroyed(prevApp);

  const app = await beforeLoad(nextApp);
  await mounted(app);
};

export const beforeLoad = async (app) => {
  await runMainLifeCycle("beforeLoad");
  await app?.beforeLoad?.();
  const appContext = null;
  return appContext;
};

export const mounted = async (app) => {
  await app?.mounted?.();
  await runMainLifeCycle("mounted");
};

export const destroyed = async (app) => {
  await app?.destroyed?.();
  await runMainLifeCycle("destroyed");
};

export const runMainLifeCycle = async (type: string) => {
  const mainLifeCycle = getMainLifeCycle();
  await Promise.all(mainLifeCycle[type].map(async (item) => await item()));
};
