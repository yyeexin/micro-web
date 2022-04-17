export function render(oldRender) {
  if (!window.__MICRO_WEB__) {
    oldRender();
  }
}

// export const bootstrap = () => {
//   console.log('开始加载');
// };

// export const mount = () => {
//   console.log('加载成功');
// };

// export const unmount = () => {
//   console.log('卸载完成');
// };
