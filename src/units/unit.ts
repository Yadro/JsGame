import {RootUnit} from "./iUnit";
import {Bullet} from "./Bullet";
import {Input} from "../Input";

export class Unit extends RootUnit {

  lockAt = 0;
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

  moveTo(e: Input) {
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


    let alpha = this.getLockAt(e);
    if (e.mouse.lBtn) {
      if (this.bullets > 0) {
        this.units.addStack(new Bullet(this, alpha));
        this.bullets -= 5;
      }
    }
  }

  getLockAt(e: Input) {
    const pi = 3.14;

    const {x, y} = e.mouse;
    let pX = this.pos.x - x;
    let pY = this.pos.y - y;

    let alpha = Math.atan(pY / pX);
    if (pX < 0 && pY < 0) {
      alpha = pi + alpha;
    }
    else if (pX > 0 && pY < 0) {
      alpha = 2 * pi + alpha;
    }
    else if (pX < 0 && pY > 0) {
      alpha = pi + alpha;
    }
    if (alpha < pi) {
      alpha = pi - alpha;
    } else {
      alpha = pi + 2*pi - alpha;
    }

    alpha = 2 * pi - alpha;

    // console.log(Math.floor((alpha) * 180 / pi));
    return alpha;
  }

  next() {
    if (this.bullets < 5) {
      this.bullets++;
    }
  }
}
