
export default class SSet<T> {
  data: T[] = [];

  constructor(private _checkExist: (a: T) => boolean) {
  }

  add(e: T) {
    const {data, _checkExist} = this;
    if (!data.find(_checkExist)) {
      data.push(e);
    }
  }
}