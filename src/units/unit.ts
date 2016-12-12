import {getAngle} from "./RootUnit";
import {Bullet} from "./Bullet";
import {Input} from "../Input";
import {AnimationUnit} from "./AnimationUnit";

export class Unit extends AnimationUnit {

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
    const pos = {
      x: this.pos.x + this.size / 2,
      y: this.pos.y + this.size / 2,
    };
    return getAngle(pos, e.mouse)
  }

  next() {
    if (this.bullets < 5) {
      this.bullets++;
    }
    this.checkBulletHit();
  }
}
