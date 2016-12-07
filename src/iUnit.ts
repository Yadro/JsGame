import {Characters} from "./characters";
import {Field} from "./field";


export interface IPosition {
  x;
  y;
  dirX; // -1/1 - left/right
  dirY; // -1/1 - up/down
  speedX;
  speedY;
}
export class RootUnit {
  char: string;
  pos: IPosition;
  dead: boolean;
  field: Field;
  units: Characters;
  size;

  constructor(char, pos: IPosition, size) {
    this.char = char;
    this.pos = pos;
    this.size = size;
  }

  protected checkCollision(posObj : IPosition) {
    return {
      x: this.checkProectionCollision(posObj, true),
      y: this.checkProectionCollision(posObj, false)
    }
  }

  private checkProectionCollision(posObj : IPosition, horizont) {
    const fixPos = horizont ? posObj.y : posObj.x;
    let   pos =    horizont ? posObj.x : posObj.y;
    const dir =    horizont ? posObj.dirX : posObj.dirY;
    const speed =  horizont ? posObj.speedX : posObj.speedY;

    const isWall = (pos, offset) => {
      const query = horizont
        ? this.field.getCell(pos, fixPos + this.size * offset)
        : this.field.getCell(fixPos + this.size * offset, pos);
      return query != 0;
    };

    if (dir === 0) {
      return 0;
    }
    if (dir > 0) {
      pos += this.size;
    }

    let canPos = [0, 0];
    for (let j = 0; j < 2; j++) {
      for (let i = pos + dir; Math.abs(pos - i) <= speed; i += dir) {
        if (isWall(i, j)) {
          break;
        }
        canPos[j]++;
      }
    }
    return dir * Math.min(canPos[0], canPos[1]);
  }
}
