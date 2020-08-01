declare const process: any;

export function injectCSS(css) {
  if (process.env.NODE_ENV !== 'test') {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    const {head} = document;
    const {firstChild} = head;

    if (firstChild) {
      head.insertBefore(style, firstChild);
    } else {
      head.appendChild(style);
    }
  }
}

export function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '');
}

