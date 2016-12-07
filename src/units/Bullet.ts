import {RootUnit, IPosition} from "./iUnit";

export class Bullet extends RootUnit {
  constructor(pos: IPosition) {
    super('*', {
      x: pos.x,
      y: pos.y,
      dirX: 1,
      dirY: 0,
      speedX: 10,
      speedY: 10,
    }, 5);
  }

  next() {
    const {x, y} = this.checkCollision(this.pos);
    this.pos.x += x;
    this.pos.y += y;
    if (x == 0 || y == 0) {
      this.dead = true;
    }
  }
}
