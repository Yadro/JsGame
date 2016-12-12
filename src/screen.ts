import {Characters} from "./units/characters";
import {Field} from "./field";
import {Input} from "./Input";
import {SpriteDraw, Sprite} from "./SpriteDraw";
import {AnimationUnit} from "./units/AnimationUnit";

export class MyScreen {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private size = {
    height: window.innerHeight,
    width: window.innerWidth
  };
  input: Input;

  field = new Field(32);
  units: Characters;

  image: HTMLImageElement;
  spriteField = new SpriteDraw();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.setAttribute('height', ''+this.size.height);
    this.canvas.setAttribute('width', ''+this.size.width);
    this.ctx = canvas.getContext('2d');
    this.units = new Characters(this.field);
    this.input = new Input();

    this.image = new Image();
    this.image.src = '../sprites/terrain.png';
    this.image.onload = () => {

    }
  }

  addCharachter(unit) {
    this.units.addChar(unit);
  }

  updateUnits() {
    this.units.characters.forEach(un => {
      un.next();
      if (un.moveTo) {
        un.moveTo(this.input);
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

    this.drawSprites();

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
      // const {x, y} = un.pos;
      // this.ctx.fillRect(x, y, un.size, un.size);
      if (un instanceof AnimationUnit) {
        this.drawUnitSprite(un);
      } else {
        this.drawUnit(un);
      }
    })
  }

  drawUnit(un) {
    const pos = un.pos;
    this.ctx.drawImage(this.image, 96, 416, 32, 32, pos.x, pos.y, un.size, un.size);
  }

  /**
   * Отрисовка спрайта по середине (по oX) предпологаемого места
   * @param un
   */
  drawUnitSprite(un: AnimationUnit) {
    const {pos, size, sprite} = un;
    const {x, y} = pos;
    const [sx,sy,w,h] = un.getSprite();
    this.ctx.drawImage(sprite, sx, sy, w, h, x + size / 2 - w / 2, y, w, h);
  }

  drawSprite(x, y, sprite: Sprite) {
    this.ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, 32, 32);
  }

  drawSprites() {
    const {width, height} = this.spriteField;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const sprite = this.spriteField.getSprite(x, y);
        if (sprite) {
          this.drawSprite(x * 32, y * 32, sprite);
        }
      }
    }
  }
}


function replace(str, text, pos) {
  return str.substring(0, pos) + text + str.substring(pos + text.length);
}

function covert(str) {
  str = str.replace(/ /g, '&nbsp;');
  return str.replace(/\n/g, '<br/>');
}