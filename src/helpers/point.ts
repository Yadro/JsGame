
export default class Point {
  constructor(public x: number, public y: number) {
  }

  equal({x, y}: Point) {
    return this.x == x && this.y == y;
  }

  getDist({x, y}: Point) {
    // return Math.round(Math.hypot(this.x - x, this.y - y));
    return Math.round(Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)) * 100) / 100;
  };

  get toString() {
    return `${this.x} ${this.y}`;
  }
}