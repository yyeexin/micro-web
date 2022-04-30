import { getList } from "./subApps";

export default () => {
  const currentUrl = window.location.pathname;
  return getList().find((item) => item.activeRule === currentUrl);
};

export const findAppByRoute = (router: string) => {
  return getList().find((item) => item.activeRule === router);
};
