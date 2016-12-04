const { stdout, stdin } = process;
const keypress = require('keypress');
const clc = require('cli-color');
const ansi = require('node-ansi');
keypress(process.stdin);

import {Unit} from "./unit";
import {IUnit} from "./iUnit";

let field = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export class MyScreen {

  field = field;
  units: Unit[] = [];

  constructor() {

  }

  addCharachter(unit) {
    unit.field = field;
    this.units.push(unit);
  }

  addEvent(fn) {
    process.stdin.on('keypress', function (ch, key) {
      fn(ch, key);
      process.stdin.resume();
    });
  }

  updateUnits() {
    this.units.forEach(un => {
      un.next();
    });
  }

  draw() {
    ansi.gotoxy(0, 0);
    this.drawField();
    this.drawUnits();
    ansi.gotoxy(0, 0);
  }

  drawField() {
    this.field.forEach((row, y) => {
      row.forEach((i, x) => {
        stdout.write(i ? 'B' : ' ');
      });
      stdout.write('\n');
    });
  }

  drawUnits() {
    this.units.forEach(un => {
      ansi.gotoxy(un.pos.x, un.pos.y);
      stdout.write(un.char);
      stdout.write('\b');
    })
  }
}



