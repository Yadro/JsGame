import {RootUnit, IPosition} from "./RootUnit";

export class AnimationUnit extends RootUnit{
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

  constructor(char, pos: IPosition, size) {
    super(char, pos, size);
    this.sprite = new Image();
    this.sprite.src = '../sprites/unit.png';
  }

  getSprite() {
    const getFrame = (spriteFrames: any[]) => {
      this.waitFrame++;
      if (this.waitFrame >= this.waitLong) {
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
}