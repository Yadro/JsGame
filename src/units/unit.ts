import {RootUnit} from "./iUnit";
import {Bullet} from "./Bullet";

export class Unit extends RootUnit {

  bullets = 5;

  constructor() {
    super('A', {
      x: 80,
      y: 35,
      dirX: 0,
      dirY: 0,
      speedX: 7,
      speedY: 7,
    }, 35);
  }

  moveTo(e) {
    if (e.checkKey('a')) {
      this.pos.dirX = -1;
    } else if (e.checkKey('d')) {
      this.pos.dirX = 1;
    } else {
      this.pos.dirX = 0;
    }
    if (e.checkKey('w')) {
      this.pos.dirY = -1;
    } else if (e.checkKey('s')) {
      this.pos.dirY = 1;
    } else {
      this.pos.dirY = 0;
    }

    const {x, y} = this.checkCollision(this.pos);
    this.pos.x += x;
    this.pos.y += y;

    if (e.checkCode('Space')) {
      if (this.bullets > 0) {
        this.units.addStack(new Bullet(this));
        this.bullets -= 5;
      }
    }
  }

  next() {
    if (this.bullets < 5) {
      this.bullets++;
    }
  }
}
