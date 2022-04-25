// @ts-nocheck

export default function rewriteHistory(type: string) {
  const origin = history[type];
  return function (...args) {
    origin.apply(this, args);
    const event = new Event(type);
    event.arguments = args;
    window.dispatchEvent(event);
  };
}
