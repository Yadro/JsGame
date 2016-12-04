import {IUnit} from "./iUnit";

export class Unit implements IUnit {
  char = 'A';
  pos = {
    x: 5,
    y: 1
  };
  field;
  jump = 0;

  moveTo(e) {
    const {key, code} = e;
    const {x, y} = this.pos;
    if (key == 'a') {
      if (this.field[y][x - 1] == 0) {
        this.pos.x -= 1;
      }
    } else if (key == 'd') {
      if (this.field[y][x + 1] == 0) {
        this.pos.x += 1;
      }
    } else if (code == 'Space') {
      this.jump = 2;
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