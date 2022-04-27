export const loadHtml = async (app) => {
  let container = app.container;
  const ct = document.querySelector(container);
  if (!ct) throw Error("容器不存在");

  let entry = app.entry;
  const [dom, scripts] = await parseHtml(entry);

  ct.innerHTML = dom;

  scripts.forEach((script) => {
    sandBox(app, script);
  });

  return app;
};

export const parseHtml = async (entry: string): Promise<[string, string[]]> => {
  const htmlText = await fetchResource(entry);
  let allScripts = [];

  // 将html文本转换成dom
  const htmlDom = document.createElement("div");
  htmlDom.innerHTML = htmlText;

  const [replacedHtmlText, scriptUrls, scripts] = await getResource(
    htmlDom,
    entry
  );

  const fetchedScripts = await Promise.all(
    scriptUrls.map(async (item) => await fetchResource(item))
  );

  allScripts = scripts.concat(fetchedScripts);

  return [replacedHtmlText, allScripts];
};

export const getResource = async (
  root: HTMLElement,
  entry: string
): Promise<[string, string[], string[]]> => {
  const scriptUrl: string[] = [];
  const script: string[] = [];

  function deepParse(element: Element) {
    const parent = element.parentElement;
    const children = element.children;

    for (let i = 0; i < children.length; i++) {
      deepParse(children[i]);
    }

    if (element.nodeName.toLowerCase() === "script") {
      const src = element.getAttribute("src");
      if (!src) {
        script.push(element.outerHTML);
      } else {
        if (src.startsWith("http")) {
          scriptUrl.push(src);
        } else {
          scriptUrl.push(`http:${entry}${src}`);
        }
      }

      if (parent) {
        const shadowScript = document.createElement("script");
        shadowScript.innerHTML = "/** 此js内容已经被微前端替换 */";
        parent.replaceChild(shadowScript, element);
      }
    }

    if (element.nodeName.toLowerCase() === "link") {
      const href = element.getAttribute("href");
      if (href?.endsWith(".js")) {
        if (href.startsWith("http")) {
          scriptUrl.push(href);
        } else {
          scriptUrl.push(`http:${entry}/${href}`);
        }
      }
    }
  }

  deepParse(root);

  return [root.outerHTML, scriptUrl, script];
};

export const fetchResource = (url: string) =>
  fetch(url).then(async (res) => await res.text());

const sandBox = (app, script: string) => {
  window.__MICRO_WEB__ = true;

  // return eval(`
  // () => {
  //   ${script}
  //   return window['${appName}']
  // }`).call(window, window);
  const appName = app.name;
  const scriptText = `${script} return window['${appName}']`;
  const lifeCycle = new Function(scriptText).call(window, window);

  if (lifeCycle?.bootstrap && lifeCycle?.mount && lifeCycle?.unmount) {
    app.bootstrap = lifeCycle.bootstrap;
    app.mount = lifeCycle.mount;
    app.unmount = lifeCycle.unmount;
  }

  return app;
};
