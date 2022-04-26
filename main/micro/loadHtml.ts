export const loadHtml = async (app) => {
  let container = app.container;
  let entry = app.entry;
  const [dom, scripts] = await parseHtml(entry);

  console.log(scripts);

  const ct = document.querySelector(container);

  if (!ct) throw Error("容器不存在");
  ct.innerHTML = dom;

  scripts.forEach((script) => {
    sandBox(script, app.name);
  });

  return app;
};

export const parseHtml = async (entry) => {
  const html = await fetchResource(entry);

  let allScript = [];

  const div = document.createElement("div");

  div.innerHTML = html;

  const [dom, scriptUrl, script] = await getResource(div, entry);

  const fetchedScripts = await Promise.all(
    scriptUrl.map(async (item) => await fetchResource(item))
  );

  allScript = script.concat(fetchedScripts);

  return [dom, allScript];
};

export const fetchResource = (url) =>
  fetch(url).then(async (res) => await res.text());

export const getResource = async (root, entry) => {
  const dom = root.outerHTML;
  const scriptUrl = [];
  const script = [];

  function deepParse(element) {
    const children = element.children;
    const parent = element.parent;

    if (element.nodeName.toLowerCase() === "script") {
      const src = element.getAttribute("src");
      console.log(src);
      if (!src) {
        script.push(element.outerHTML);
      } else {
        if (src.startsWith("http")) {
          scriptUrl.push(src);
        } else {
          scriptUrl.push(`http:${entry}/${src}`);
        }
      }

      if (parent) {
        parent.replaceChild(
          document.createComment("此js内容已经被微前端替换"),
          element
        );
      }
    }

    if (element.nodeName.toLowerCase() === "link") {
      const href = element.getAttribute("href");
      if (href.endsWith(".js")) {
        if (href.startsWith("http")) {
          scriptUrl.push(href);
        } else {
          scriptUrl.push(`http:${entry}/${href}`);
        }
      }
    }

    for (let i = 0; i < children.length; i++) {
      deepParse(children[i]);
    }
  }

  deepParse(root);

  return [dom, scriptUrl, script];
};

const sandBox = (script, appName) => {
  window.__MICRO_WEB__ = true;

  // return eval(`
  // () => {
  //   ${script}
  //   return window['${appName}']
  // }`).call(window, window);

  const scriptText = `${script} return window['${appName}']`;
  const lifeCycle = new Function(scriptText).call(window, window);

  console.log(lifeCycle);
};
