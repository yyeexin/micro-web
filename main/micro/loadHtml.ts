export const loadHtml = async (app) => {
  let container = app.container;
  let entry = app.entry;
  const html = await parseHtml(entry);
  const ct = document.querySelector(container);

  if (!ct) throw Error("容器不存在");
  ct.innerHTML = html;

  return html;
};

export const parseHtml = async (entry) => {
  const html = await fetchResource(entry);
  return html;
};

export const fetchResource = (url) =>
  fetch(url).then(async (res) => await res.text());
