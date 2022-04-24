import { createRoot } from "react-dom/client";
import "./global.less";
import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

// 重写pushState replaceState

function _rw(type: string) {
  const origin = history[type];
  return function (...args) {
    const event = new Event(type);
    event.arguments = args;
    window.dispatchEvent(event);

    return origin.apply(this, args);
  };
}

history.pushState = _rw("pushState");
history.replaceState = _rw("replaceState");
