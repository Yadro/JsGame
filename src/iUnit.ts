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

  constructor(char, pos) {
    this.char = char;
    this.pos = pos;
  }
}
