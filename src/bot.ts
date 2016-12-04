import {IUnit} from "./iUnit";

export class Bot extends IUnit {
  char = 'x';
  pos = {
    x: 1,
    y: 1,
    dir: 1
  };
  field;
  units;

  next() {
    if (this.field[this.pos.y][this.pos.x + this.pos.dir] == 1) {
      this.pos.dir = -this.pos.dir;
    }
    this.pos.x += this.pos.dir;
  }
}
