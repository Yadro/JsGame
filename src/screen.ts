import {Characters} from "./units/characters";
import {Field} from "./field";

export class MyScreen {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private size = {
    height: window.innerHeight,
    width: window.innerWidth
  };

  field = new Field(35);
  units: Characters;
  keys: ({key, code})[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.setAttribute('height', ''+this.size.height);
    this.canvas.setAttribute('width', ''+this.size.width);
    this.ctx = canvas.getContext('2d');
    this.units = new Characters(this.field);

    document.body.addEventListener('keyup', (e) => {
      //console.log(e);
      let el = this.keys.find(el => el.key == e.key);
      this.keys.splice(this.keys.indexOf(el), 1);
    });
    document.body.addEventListener('keydown', (e) => {
      if (!this.keys.find(el => el.key == e.key)) {
        this.keys.push({
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
        un.moveTo(this.keys);
      }
    });
    this.units.pushStack();
    this.units.characters = this.units.characters.filter(e => !e.dead);
  }

  draw() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.size.height, this.size.width);
    this.ctx.fillStyle = '#000';
    this.drawField();
    this.drawUnits();
  }

  drawField() {
    const size = this.field.size;
    this.field.field.forEach((row, y) => {
      row.forEach((i, x) => {
        if (i) {
          this.ctx.fillRect(x * size, y * size, size, size);
        }
      });
    });
  }

  drawUnits() {
    this.units.characters.forEach(un => {
      const {x, y} = un.pos;
      this.ctx.fillRect(x, y, un.size, un.size);
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