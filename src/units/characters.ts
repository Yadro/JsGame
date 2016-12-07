import {Unit} from "./unit";
import {RootUnit} from "./iUnit";

export class Characters {
  field;
  characters: RootUnit[] = [];
  stack: RootUnit[] = [];

  constructor(field) {
    this.field = field;
  }

  addChar(unit: RootUnit) {
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
}