import { getList } from "./subApps";

export default () => {
  const currentUrl = window.location.pathname;
  return filterApp("activeRule", currentUrl);
};

const filterApp = (key: string, value: any) => {
  const currentApp = getList().filter((item) => item[key] === value);
  return Array.isArray(currentApp) && currentApp.length ? currentApp[0] : {};
};

export const findAppByRoute = (router) => {
  return filterApp("activeRule", router);
};
