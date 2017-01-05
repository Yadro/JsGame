

export function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

export function includes(arr: any[], str) {
  return (arr.indexOf(str) > -1);
}

/**
 * Remove elements removeEls from arr
 */
export function arrayRemove(arr: any[], removeEls: any[]) {
  removeEls.forEach(e => arr.splice(arr.indexOf(e), 1));
  return arr;
}

export function smap(x, in_min, in_max, out_min, out_max)  {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}