function _rw(type: string) {
  const origin = history[type];
  return function (...args) {
    const event = new Event(type);
    event.arguments = args;
    window.dispatchEvent(event);
    console.log("this =>", this);
    return origin.apply(this, args);
  };
}

export default function rewriteHistory() {
  history.pushState = _rw("pushState");
  history.replaceState = _rw("replaceState");
}
