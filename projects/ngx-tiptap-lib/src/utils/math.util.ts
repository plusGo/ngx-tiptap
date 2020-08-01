export function minMax(value = 0, min = 0, max = 0) {
  return Math.min(Math.max(parseInt(value as any, 10), min), max);
}
