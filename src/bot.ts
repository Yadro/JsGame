import {RootUnit} from "./iUnit";

export class Bot extends RootUnit {
  constructor() {
    super('x', {
      x: 1,
      y: 1,
      dir: 1,
      speed: 3
    });
  }


  next() {
    let delta = this.canMove(this.pos);
    this.pos.x += delta;
    if (!delta) {
      this.pos.dir = -this.pos.dir;
    }
  }
}
