import {Characters} from "./units/characters";
import {Field} from "./field";
import {Input} from "./Input";
import {SpriteDraw, Sprite} from "./SpriteDraw";
import {AnimationUnit} from "./units/AnimationUnit";
import map = require('../sprites/desert_map.json');
import sprites = require('../sprites/desert_tileset.json');
import {arrayRemove, smap} from "./tools";
import {RootUnit} from "./units/RootUnit";
import {FirstIntelligenceBot} from "./units/FirstIntelectBot";

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
  spriteField = new SpriteDraw(map, sprites);

  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.setAttribute('height', ''+this.size.height);
    this.canvas.setAttribute('width', ''+this.size.width);
    this.ctx = canvas.getContext('2d');
    this.units = new Characters(this.field);
    this.input = new Input();

    this.image = new Image();
    this.image.src = '../sprites/desert_tileset.png';
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
    // this.drawIntelectMap();

    // this.drawFieldAndUnits();

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
      if (un instanceof AnimationUnit) {
        this.drawUnitSprite(un);
      } else {
        this.drawUnitWithoutSprite(un);
      }
    })
  }

  drawUnit(un) {
    if (un instanceof AnimationUnit) {
      this.drawUnitSprite(un);
    } else {
      this.drawUnitWithoutSprite(un);
    }
  }

  drawUnitWithoutSprite(un) {
    const pos = un.pos;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(pos.x, pos.y, un.size, un.size);
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
    if (un.health) {
      this.drawHealth(x, y, un);
    }
  }

  drawHealth(x, y, un: RootUnit) {
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(x, y, un.maxHealth * 3, 3);
    this.ctx.fillRect(x, y, un.health * 3, 3);
  }

  drawFieldSprite(x, y, sprite: Sprite) {
    if (!sprite) return;
    this.ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, x * 32, y * 32, 32, 32);
  }

  drawSprites() {
    const {width, height, layerNum} = this.spriteField;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        for (let l = 0; l < layerNum; l++) {
          const sprite = this.spriteField.getSprite(l, x, y);
          if (sprite) {
            this.drawFieldSprite(x, y, sprite);
          }
        }
      }
    }
  }

  drawFieldAndUnits() {
    let characters = this.units.characters.sort((a, b) => a.pos.x - b.pos.x).slice();
    let buf;
    const {width, height, layerNum} = this.spriteField;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.drawFieldSprite(x, y, this.spriteField.getSprite(0, x, y));

        buf = characters.filter(u => (u.pos.y / 32 < y - 1));
        buf.forEach(u => this.drawUnit(u));
        characters = arrayRemove(characters, buf);
        // buf.forEach(u => characters = characters.splice(characters.indexOf(u), 1));

        for (let l = 1; l < layerNum; l++) {
          this.drawFieldSprite(x, y, this.spriteField.getSprite(l, x, y));
        }
      }
    }
  }

  private drawIntelectMap() {
    const map = this.units.characters.filter(u => u instanceof FirstIntelligenceBot)[0].map;
    const size = this.field.size;
    const {ctx} = this;
    map.matrix.forEach((row, y) => {
      row.forEach((i, x) => {
        ctx.fillStyle = color(i);
        if (i != 0) {
          ctx.fillRect(x * size, y * size, size, size);
        }
      });
    });
  }
}

function color(val) {
  let c = Math.round(smap(val, 50, 0, 0, 255));
  return `rgb(${c},${c},${c})`;
}

function replace(str, text, pos) {
  return str.substring(0, pos) + text + str.substring(pos + text.length);
}

function covert(str) {
  str = str.replace(/ /g, '&nbsp;');
  return str.replace(/\n/g, '<br/>');
}