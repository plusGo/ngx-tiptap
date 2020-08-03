export function minMax(value = 0, min = 0, max = 0) {
  return Math.min(Math.max(parseInt(value as any, 10), min), max);
}

export function clamp(min: number, val: number, max: number): number {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
}

