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
    const key = e.map(el => el.key);
    const code = e.map(el => el.code);
    const {x, y} = this.pos;
    if (key.indexOf('a') > -1) {
      if (this.field[y][x - 1] == 0) {
        this.pos.x -= 1;
      }
    }
    if (key.indexOf('d') > -1) {
      if (this.field[y][x + 1] == 0) {
        this.pos.x += 1;
      }
    }
    if (code.indexOf('Space') > -1) {
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