import {RootUnit, IPosition} from "./iUnit";
import {Unit} from "./unit";

export class Bullet extends RootUnit {
  constructor(un: Unit) {
    super('*', {
      x: un.pos.x + Math.floor(un.size / 2),
      y: un.pos.y + Math.floor(un.size / 2),
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
    if (x == 0 && y == 0) {
      this.dead = true;
    }
  }
}
