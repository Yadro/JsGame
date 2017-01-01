import {AnimationUnit} from "./AnimationUnit";

export class Bot extends AnimationUnit {
  constructor(x = 100, y = 150) {
    super('x', {
      x,
      y,
      dirX: 1,
      dirY: 0,
      speedX: 3,
      speedY: 3,
      touch: false,
    }, 32);
  }


  next() {
    const {x, y} = this.checkCollision(this.pos);
    this.pos.x += x;
    this.pos.y += y;

    if (this.pos.touch) {
      this.pos.dirX = -this.pos.dirX;
    }
    this.checkBulletHit();
  }
}
