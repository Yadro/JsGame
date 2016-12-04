import {IUnit} from "./iUnit";

export class Bot extends IUnit {
  char = 'x';
  pos = {
    x: 1,
    y: 1
  };
  toRight = true;
  field;

  next() {
    if (this.toRight) {
      if (this.field[this.pos.y][this.pos.x + 1] != 1) {
        this.pos.x += 1;
      } else {
        this.toRight = false;
      }
    } else {
      if (this.field[this.pos.y][this.pos.x - 1] != 1) {
        this.pos.x -= 1;
      } else {
        this.toRight = true;
      }
    }
  }
}
