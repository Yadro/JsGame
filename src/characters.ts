import {IUnit} from "./iUnit";

export class Characters {
  field;
  characters: IUnit[] = [];
  stack: IUnit[] = [];

  constructor(field) {
    this.field = field;
  }

  addChar(unit: IUnit) {
    unit.field = this.field;
    unit.units = this;
    this.characters.push(unit)
  }

  addStack(unit) {
    this.stack.push(unit);
  }

  pushStack() {
    this.stack.forEach(el => this.addChar(el));
    this.stack = [];
  }

  forEach(fn) {
    this.characters.forEach(fn);
  }
}