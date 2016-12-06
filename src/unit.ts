import {IUnit, IPosition, RootUnit} from "./iUnit";
import {Bullet} from "./Bullet";
import {check, clone} from "./tools";

export class Unit extends RootUnit {
  jump = 0;
  bullets = 5;
  down = false;

  constructor() {
    super('A', {
      x: 5,
      y: 1,
      dir: 1,
      speed: 2,
    });
  }

  moveTo(e) {
    const keys = e.map(el => el.key);
    const codes = e.map(el => el.code);
    let isMove = false;
    const {down} = this;

    if (check(keys, 'a')) {
      this.pos.dir = -1;
      isMove = true;
    }
    if (check(keys, 'd')) {
      this.pos.dir = 1;
      isMove = true;
    }
    if (isMove) {
      this.pos.x += this.canMove(this.pos);
    }
    if (check(keys, 'w')) {
      if (down) {
        this.jump = 2;
      }
    }
    if (check(codes, 'Space')) {
      if (this.bullets > 0) {
        this.units.addStack(new Bullet(clone(this.pos)));
        this.bullets -= 5;
      }
    }
  }

  next() {
    const {x, y} = this.pos;
    if (this.field[y + 1][x] == 0) {
      this.pos.y++;
      this.down = false;
    } else {
      this.down = true;
    }
    if (this.jump > 0) {
      if (this.field[y - 1][x] == 0) {
        this.pos.y -= 2;
        this.jump--;
      } else {
        this.jump = 0;
      }
    }
    if (this.bullets < 5) {
      this.bullets++;
    }
  }

  private canMove(posObj : IPosition, isHorizont = true) {
    const {dir, speed} = posObj;
    const fixPos = isHorizont ? posObj.y : posObj.x;
    const pos =    isHorizont ? posObj.x : posObj.y;

    const isWall = (pos) => {
      const query = isHorizont
        ? this.field[fixPos][pos]
        : this.field[pos][fixPos];
      return query != 0;
    };

    let canPos = 0;
    for (let i = pos + dir; Math.abs(pos - i) <= speed; i += dir) {
      if (isWall(i)) {
        return dir * canPos;
      }
      canPos++;
    }
    return dir * canPos;
  }
}
