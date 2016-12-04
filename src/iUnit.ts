import {Characters} from "./characters";

export abstract class IUnit {
  char: string;
  pos: {x, y, dir};
  field: any[][];
  units: Characters;

  abstract next();
}