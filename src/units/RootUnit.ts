import {Characters} from "./characters";
import {Field} from "../field";
import {Bullet} from "./Bullet";


export interface IPosition {
  x;
  y;
  dirX; // -1/1 - left/right
  dirY; // -1/1 - up/down
  speedX;
  speedY;
  touch?;
}
export class RootUnit {
  char: string;
  pos: IPosition;
  size;
  dead: boolean;
  health = 5;

  field: Field;
  units: Characters;

  constructor(char, pos: IPosition, size) {
    this.char = char;
    this.pos = pos;
    this.size = size;
  }

  protected checkCollision(posObj : IPosition) {
    this.pos.touch = false;
    // this.checkBulletHit();
    return {
      x: this.checkProjectionCollision(posObj, true),
      y: this.checkProjectionCollision(posObj, false)
    }
  }

  private checkProjectionCollision(posObj : IPosition, horizont) {
    const fixPos = horizont ? posObj.y : posObj.x;
    let   pos =    horizont ? posObj.x : posObj.y;
    const dir =    horizont ? posObj.dirX : posObj.dirY;
    const speed =  horizont ? posObj.speedX : posObj.speedY;

    const isWall = (pos, offset) => {
      const query = horizont
        ? this.field.getCell(pos, fixPos + this.size * offset)
        : this.field.getCell(fixPos + this.size * offset, pos);
      return query != 0;
    };

    if (dir === 0) {
      return 0;
    }
    if (dir > 0) {
      pos += this.size;
    }

    // проверка с двух сторон: fixPos и fixPos + this.size
    let canPos = [0, 0];
    for (let j = 0; j < 2; j++) {
      for (let i = pos + dir; Math.abs(pos - i) <= speed; i += dir) {
        if (isWall(i, j)) {
          this.pos.touch = true;
          break;
        }
        canPos[j]++;
      }
    }
    return dir * Math.min(canPos[0], canPos[1]);
  }

  /**
   * Проверка на попадание пулей
   */
  checkBulletHit() {
    const bullets = this.units.characters.filter(u => u /*&& u instanceof Bullet*/);
    /*for (let bullet of bullets) {

    }*/
  }
}

const pi = 3.14;
export function getAngle(pos, mouse) {
  const {x, y} = mouse;
  let pX = pos.x - x;
  let pY = pos.y - y;

  let alpha = Math.atan(pY / pX);
  if (pX < 0 && pY < 0) {
    alpha = pi + alpha;
  }
  else if (pX > 0 && pY < 0) {
    alpha = 2 * pi + alpha;
  }
  else if (pX < 0 && pY > 0) {
    alpha = pi + alpha;
  }
  if (alpha < pi) {
    alpha = pi - alpha;
  } else {
    alpha = pi + 2*pi - alpha;
  }

  alpha = 2 * pi - alpha;
  // console.log(Math.floor((alpha) * 180 / pi));
  return alpha;
}