import {IUnit} from "./iUnit";
import {Bullet} from "./Bullet";
import {check, clone} from "./tools";

export class Unit extends IUnit {
  char = 'A';
  pos = {
    x: 5,
    y: 1,
    dir: 1,
    down: false
  };
  jump = 0;
  bullets = 5;

  moveTo(e) {
    const keys = e.map(el => el.key);
    const codes = e.map(el => el.code);
    const {x, y, down, dir} = this.pos;
    if (check(keys, 'a')) {
      this.pos.dir = -1;
      if (this.field[y][x - 1] == 0) {
        this.pos.x += dir;
      }
    }
    if (check(keys, 'd')) {
      this.pos.dir = 1;
      if (this.field[y][x + 1] == 0) {
        this.pos.x += dir;
      }
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
      this.pos.down = false;
    } else {
      this.pos.down = true;
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
}
