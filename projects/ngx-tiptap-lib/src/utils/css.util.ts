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

const SIZE_PATTERN = /([\d\.]+)(px|pt)/i;
export const PX_TO_PT_RATIO = 0.7518796992481203; // 1 / 1.33.

export default function convertToCSSPTValue(styleValue: string): number {
  const matches = styleValue.match(SIZE_PATTERN);
  if (!matches) {
    return 0;
  }
  let value = parseFloat(matches[1]);
  const unit = matches[2];
  if (!value || !unit) {
    return 0;
  }
  if (unit === 'px') {
    value = PX_TO_PT_RATIO * value;
  }
  return value;
}
