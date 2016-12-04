import {Unit} from "./unit";
import {IUnit} from "./iUnit";
import {Characters} from "./characters";

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
  units: Characters;
  key: {key, code}[] = [];

  constructor(el) {
    this.el = el;
    this.units = new Characters(this.field);

    document.body.addEventListener('keyup', (e) => {
      //console.log(e);
      let el = this.key.find(el => el.key == e.key);
      this.key.splice(this.key.indexOf(el), 1);
    });
    document.body.addEventListener('keydown', (e) => {
      if (!this.key.find(el => el.key == e.key)) {
        this.key.push({
          key: e.key,
          code: e.code
        });
        //console.log(e);
      }
    })
  }

  addCharachter(unit) {
    this.units.addChar(unit);
  }

  updateUnits() {
    this.units.characters.forEach(un => {
      un.next();
      if (un.moveTo) {
        un.moveTo(this.key);
      }
    });
    this.units.characters = this.units.characters.filter(e => !e.del);
  }

  draw() {
    this.drawField();
    this.drawUnits();
    this.el.innerHTML = covert(this.buf);
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