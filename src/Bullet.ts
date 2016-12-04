import {IUnit} from "./iUnit";

export class Bullet extends IUnit {
  char = '*';
  pos;
  readonly field;
  del;

  constructor(pos) {
    super();
    pos.x += pos.dir * 2;
    this.pos = pos;
  }

  next() {
    const {x, y, dir} = this.pos;
    if (this.field[y][x + dir] == 0) {
      this.pos.x += dir * 2;
    } else {
      this.del = true;
    }
  }
}
