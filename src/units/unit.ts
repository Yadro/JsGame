import {RootUnit, getAngle} from "./iUnit";
import {Bullet} from "./Bullet";
import {Input} from "../Input";

export class Unit extends RootUnit {

  bullets = 5;
  sprite;

  spriteCoord = {
    idle: {
      down: ['40,6,27,43'],
      right: ['40,51,28,41'],
      left: ['40,96,28,41'],
      top: ['39,143,27,43'],
    },
    run: {
      down: ['120,6,28,42', '150,6,34,42', '186,6,28,42', '217,6,34,42'], // down
      right: ['111,51,37,42', '149,51,37,42', '185,51,37,42', '219,51,37,42'], // right
      left: ['106,94,37,44', '143,94,37,44', '180,94,37,44', '217,94,37,44'], // left
      top: ['119,141,31,43', '150,141,36,43', '186,141,31,43', '217,141,37,43'], // up
    }
  };
  private animationFrame = 0;
  private waitFrame = 0;
  private readonly waitLong = 5;

  constructor() {
    super('A', {
      x: 80,
      y: 35,
      dirX: 0,
      dirY: 0,
      speedX: 7,
      speedY: 7,
    }, 35);
    this.sprite = new Image();
    this.sprite.src = '../sprites/unit.png';
  }

  getSprite() {
    const getFrame = (spriteFrames: any[]) => {
      const {waitLong} = this;
      this.waitFrame++;
      if (this.waitFrame >= waitLong) {
        this.waitFrame = 0;
      }
      if (this.waitFrame == 0) {
        this.animationFrame++;
      }
      if (this.animationFrame >= spriteFrames.length) {
        this.animationFrame = 0;
      }
      return spriteFrames[this.animationFrame].split(',').map(e => +e);
    };
    const {dirX, dirY} = this.pos;
    const {run, idle} = this.spriteCoord;
    if (dirX > 0) {
      return getFrame(run.right);
    } else if (dirX < 0) {
      return getFrame(run.left);
    }
    if (dirY > 0) {
      return getFrame(run.down);
    } else if (dirY < 0) {
      return getFrame(run.top);
    }
    return getFrame(idle.down);
  }

  moveTo(e: Input) {
    if (e.checkKey('a')) {
      this.pos.dirX = -1;
    } else if (e.checkKey('d')) {
      this.pos.dirX = 1;
    } else {
      this.pos.dirX = 0;
    }
    if (e.checkKey('w')) {
      this.pos.dirY = -1;
    } else if (e.checkKey('s')) {
      this.pos.dirY = 1;
    } else {
      this.pos.dirY = 0;
    }

    const {x, y} = this.checkCollision(this.pos);
    this.pos.x += x;
    this.pos.y += y;


    let alpha = this.getLockAt(e);
    if (e.mouse.lBtn) {
      if (this.bullets > 0) {
        this.units.addStack(new Bullet(this, alpha));
        this.bullets -= 5;
      }
    }
  }

  getLockAt(e: Input) {
    const pos = {
      x: this.pos.x + this.size / 2,
      y: this.pos.y + this.size / 2,
    };
    return getAngle(pos, e.mouse)
  }

  next() {
    if (this.bullets < 5) {
      this.bullets++;
    }
  }
}
