let shadowWindowContainer = {}; // 子应用沙箱容器

export default class ProxySandbox {
  windowProxy = null;

  constructor() {
    this.active();
  }

  active() {
    this.windowProxy = new Proxy(window, {
      get(target, key) {
        if (typeof target[key] === "function") {
          return target[key].bind(target);
        }
        return shadowWindowContainer[key] || target[key];
      },
      set(target, key, value) {
        shadowWindowContainer[key] = value;
        return true;
      },
    });
  }

  inactive() {
    shadowWindowContainer = {};
  }
}
