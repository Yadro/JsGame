

export function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

export function check(arr: any[], str) {
  return (arr.indexOf(str) > -1);
}