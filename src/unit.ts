import {RootUnit} from "./iUnit";
import {Bullet} from "./Bullet";
import {check, clone} from "./tools";

export class Unit extends RootUnit {

  bullets = 5;

  constructor() {
    super('A', {
      x: 55,
      y: 15,
      dirX: 0,
      dirY: 0,
      speedX: 7,
      speedY: 7,
      horizont: true
    }, 35);
  }

  moveTo(e) {
    const keys = e.map(el => el.key);
    const codes = e.map(el => el.code);

    if (check(keys, 'a')) {
      this.pos.dirX = -1;
    } else if (check(keys, 'd')) {
      this.pos.dirX = 1;
    } else {
      this.pos.dirX = 0;
    }
    if (check(keys, 'w')) {
      this.pos.dirY = -1;
    } else if (check(keys, 's')) {
      this.pos.dirY = 1;
    } else {
      this.pos.dirY = 0;
    }

    const {x, y} = this.checkCollision(this.pos);
    this.pos.x += x;
    this.pos.y += y;

    if (check(codes, 'Space')) {
      if (this.bullets > 0) {
        this.units.addStack(new Bullet(clone(this.pos)));
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
