import {IUnit} from "./iUnit";

export class Characters {
  field;
  characters: IUnit[] = [];

  constructor(field) {
    this.field = field;
  }

  addChar(unit: IUnit) {
    unit.field = this.field;
    unit.units = this;
    this.characters.push(unit)
  }

  forEach(fn) {
    this.characters.forEach(fn);
  }
}