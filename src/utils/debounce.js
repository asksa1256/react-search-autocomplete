const DEBOUNCE_DEFAULT_MS = 300;

export default function debounce(func, timeout = DEBOUNCE_DEFAULT_MS) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
