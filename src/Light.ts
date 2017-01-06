import {RootUnit} from "./units/RootUnit";
import {Field} from "./field";
import Point from "./helpers/point";
import {setToArray, div} from "./tools";

export default class Light {
  size = 32;
  constructor(private ctx, private field: Field, private un: RootUnit) {
  }

  draw() {
    const {ctx, field, un, size} = this;
    let {x, y} = un.pos;
    const p = new Point(x, y);
    let w = this.getWallsAround(p);
    w.checked.forEach(p => {
      ctx.fillStyle = 'rgba(0,255,0,.2)';
      ctx.fillRect(p.x * size, p.y * size, size, size);
    });
  }

  private getWallsAround(p: Point) {
    const {field} = this;
    const checked = [];
    const points = [];
    for (let alpha = 0; alpha < 361; alpha++) {
      let x, y, lastX, lastY, i = 0;
      while (i < 1000) {
        x = div(p.x + Math.cos(alpha) * i, 32);
        y = div(p.y + Math.sin(alpha) * i, 32);
        i++;
        if (x == lastX && y == lastY) continue;
        lastX = x;
        lastY = y;
        if (x < 0 || x > 31 || y < 0 || y > 24) break;

        if (!checked.find(p => x == p.x && y == p.y)) {
          checked.push(new Point(x, y));
          // break;
        }

        if (field.get(x, y, false)) {
          if (!points.find(p => x == p.x && y == p.y)) {
            points.push(new Point(x, y));
          } else {
            break;
          }
        }
      }
    }
    return {
      checked,
      find: points
    };
  }
}