

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