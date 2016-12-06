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
  dir;
  speed;
}
export class RootUnit {
  char: string;
  pos: IPosition;
  field: any[][];
  units: Characters;

  constructor(char, pos) {
    this.char = char;
    this.pos = pos;
  }
}
