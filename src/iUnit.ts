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
  dir; // -1/1 - left/right; -1/1 - up/down
  speed;
}
export class RootUnit {
  char: string;
  pos: IPosition;
  field: any[][];
  units: Characters;
  G = 1;

  constructor(char, pos: IPosition) {
    this.char = char;
    this.pos = pos;
  }

  canMove(posObj : IPosition, isHorizont = true) {
    const {dir, speed} = posObj;
    const fixPos = isHorizont ? posObj.y : posObj.x;
    const pos =    isHorizont ? posObj.x : posObj.y;

    const isWall = (pos) => {
      const query = isHorizont
        ? this.field[fixPos][pos]
        : this.field[pos][fixPos];
      return query != 0;
    };

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
