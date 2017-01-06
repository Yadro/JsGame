

export function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

export function includes<T>(arr: T[], e: T) {
  return (arr.indexOf(e) > -1);
}

/**
 * Remove elements removeEls from arr
 */
export function arrayRemove<T>(arr: T[], removeEls: T[]) {
  removeEls.forEach(e => arr.splice(arr.indexOf(e), 1));
  return arr;
}

export function smap(x, in_min, in_max, out_min, out_max)  {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function setToArray<T>(set: Set<T>): T[] {
  const arr = [];
  set.forEach(e => arr.push(e));
  return arr;
}

export function div(num, div) {
  return Math.round(num / div);
}