import {Characters} from "./characters";


export abstract class IUnit {
  char: string;
  pos: IPosition;
  field: any[][];
  units: Characters;

  abstract next();
}

export interface IPosition {
  x;
  y;
  dirX; // -1/1 - left/right
  dirY; // -1/1 - up/down
  speedX;
  speedY;
  horizont: boolean;
}
export class RootUnit {
  char: string;
  pos: IPosition;
  dead: boolean;
  field: any[][];
  units: Characters;

  constructor(char, pos: IPosition) {
    this.char = char;
    this.pos = pos;
  }

  checkCollision(posObj : IPosition) {
    return {
      x: this.checkProectionCollision(posObj, true),
      y: this.checkProectionCollision(posObj, false)
    }
  }

  private checkProectionCollision(posObj : IPosition, horizont) {
    const fixPos = horizont ? posObj.y : posObj.x;
    const pos =    horizont ? posObj.x : posObj.y;
    const dir =    horizont ? posObj.dirX : posObj.dirY;
    const speed =  horizont ? posObj.speedX : posObj.speedY;

    const isWall = (pos) => {
      const query = horizont
        ? this.field[fixPos][pos]
        : this.field[pos][fixPos];
      return query != 0;
    };

    if (dir === 0) {
      return 0;
    }

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
