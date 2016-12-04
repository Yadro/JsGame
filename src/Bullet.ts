import {IUnit} from "./iUnit";

export class Bullet extends IUnit {
  char = '*';
  pos;
  readonly field;
  del;

  constructor(pos) {
    super();
    pos.x += pos.dir;
    this.pos = pos;
  }

  next() {
    if (this.field[this.pos.x + this.pos.dir] == 0) {
      this.pos.x += this.pos.dir;
    } else {
      this.del = true;
    }
  }
}
