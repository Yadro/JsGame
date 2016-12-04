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
let size = {
  height: field.length,
  width: field[0].length
};

export class MyScreen {
  private el;
  private buf = '';

  field = field;
  units: Unit[] = [];
  key: {key, code} = {};

  constructor(el) {
    this.el = el;
    document.body.addEventListener('keydown', (e) => {
      // console.log(e);
      this.key = {
        key: e.key,
        code: e.code
      }
    })
  }

  addCharachter(unit) {
    unit.field = field;
    this.units.push(unit);
  }

  updateUnits() {
    this.units.forEach(un => {
      un.next();
      if (un.moveTo) {
        un.moveTo(this.key);
      }
    });
  }

  draw() {
    this.drawField();
    this.drawUnits();
    this.el.innerHTML = covert(this.buf);
    this.key = {};
  }

  drawField() {
    let buf = '';
    this.field.forEach((row, y) => {
      row.forEach((i, x) => {
        buf += i ? '█' : ' ';
      });
      buf += '\n';
    });
    this.buf = buf;
  }

  drawUnits() {
    this.units.forEach(un => {
      const {x, y} = un.pos;
      this.buf = replace(this.buf, un.char, y * (size.width + 1) + x);
    })
  }
}


function replace(str, text, pos) {
  return str.substring(0, pos) + text + str.substring(pos + text.length);
}

function covert(str) {
  str = str.replace(/ /g, '&nbsp;');
  return str.replace(/\n/g, '<br/>');
}