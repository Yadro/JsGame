import {RootUnit} from "./RootUnit";
import {Unit} from "./Unit";

export class Bullet extends RootUnit {
  bullet;
  own: Unit;

  constructor(un: Unit, angle) {
    const speed = 20;
    let o = applyAngle(speed, angle);
    o.x = un.pos.x + Math.floor(un.size / 2);
    o.y = un.pos.y + Math.floor(un.size / 2);
    super('*', o, 5);
    this.bullet = true;
    this.own = un;
  }

  next() {
    const {x, y} = this.checkCollision(this.pos);
    this.pos.x += x;
    this.pos.y += y;
    if (this.pos.touch) {
      this.dead = true;
    }
  }
}


function applyAngle(speed, angle): any {
  return {
    dirX: Math.sign(Math.cos(angle)),
    dirY: Math.sign(Math.sin(angle)),
    speedX: speed * Math.abs(Math.cos(angle)),
    speedY: speed * Math.abs(Math.sin(angle)),
  }
}