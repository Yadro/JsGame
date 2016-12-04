import {IUnit} from "./iUnit";
import {Bullet} from "./Bullet";

export class Unit extends IUnit {
  char = 'A';
  pos = {
    x: 5,
    y: 1,
    dir: 1,
  };
  field;
  jump = 0;
  units;

  moveTo(e) {
    const keys = e.map(el => el.key);
    const codes = e.map(el => el.code);
    const {x, y} = this.pos;
    if (check(keys, 'a')) {
      this.pos.dir = -1;
      if (this.field[y][x - 1] == 0) {
        this.pos.x += this.pos.dir;
      }
    }
    if (check(keys, 'd')) {
      this.pos.dir = 1;
      if (this.field[y][x + 1] == 0) {
        this.pos.x += this.pos.dir;
      }
    }
    if (check(keys, 'w')) {
      this.jump = 2;
    }
    if (codes.indexOf('Space') > -1) {
      this.units.push(new Bullet(this.pos))
    }
  }

  next() {
    const {x, y} = this.pos;
    if (this.field[y + 1][x] == 0) {
      this.pos.y++;
    }
    if (this.jump > 0) {
      this.pos.y -= 2;
      this.jump--;
    }
  }

}

function check(arr: any[], str) {
  return (arr.indexOf(str) > -1);
}