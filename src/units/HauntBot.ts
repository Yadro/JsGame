
import {Bot} from "./bot";
import {Unit} from "./unit";

export class HauntBot extends Bot {
  target: Unit;

  constructor(x, y, un: Unit) {
    super(x, y);
    this.target = un;
  }


  next() {
    const {x: tX, y: tY} = this.target.pos;
    const {x, y} = this.pos;
    if (Math.abs(tX - x) < 0.001) {
      this.pos.dirX = 0;
    } else if (tX > x) {
      this.pos.dirX = 1;
    } else {
      this.pos.dirX = -1;
    }
    if (Math.abs(tY - y) < 0.001) {
      this.pos.dirY = 0;
    } else if (tY > y) {
      this.pos.dirY = 1;
    } else {
      this.pos.dirY = -1;
    }

    const {x: dX, y: dY} = this.checkCollision(this.pos);
    this.pos.x += dX;
    this.pos.y += dY;

    this.checkBulletHit();
  }
}
