import {IUnit, RootUnit} from "./iUnit";

export class Bullet extends RootUnit {
  constructor(pos) {
    super('*', {
      x: pos.x + pos.dir * pos.speed,
      y: pos.y,
      dir: pos.dir,
      speed: 2
    });
  }

  next() {
    let delta = this.canMove(this.pos);
    this.pos.x += delta;
    if (!delta) {
      this.dead = true;
    }
  }
}
