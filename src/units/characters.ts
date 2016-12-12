import {Unit} from "./unit";
import {RootUnit} from "./RootUnit";
import {Bullet} from "./Bullet";
import {Bot} from "./bot";

type Un = Bullet|Unit|Bot;

export class Characters {
  field;
  characters: Un[] = [];
  stack: Un[] = [];

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