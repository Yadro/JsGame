import {Bot} from "./Bot";
import {Matrix} from "../tools";
import {Unit} from "./Unit";


export class FirstIntelligenceBot extends Bot {
  map: Matrix;

  constructor() {
    super();
    this.map = new Matrix(32,32);
  }

  next() {
    const {map, field, units} = this;
    const characters = units.characters;
    const un = characters.filter(u => u instanceof Unit);
    const {pos} = un[0];

    /*for (let y = 0; y <= field.height; y++) {
      for (let x = 0; x <= field.width; x++) {
        map.set(x, y, (field.get(x, y) == 1 ? -1 : 0));
      }
    }
    map.set(Math.round(pos.x / 32), Math.round(pos.y / 32), -1); */

    /*
    for (let j = Math.round(pos.y / 32); j > 0; j--) {
      for (let i = Math.round(pos.x / 32); i >= 0; i--) {
        if (field.get(i, j) == 1 && field.get(i - 1, j) != 1) {
          map.set(i - 1, j, 1);
        }
        if (field.get(i, j) == 1 && field.get(i, j - 1) != 1) {
          map.set(i, j - 1, 1);
        }
      }
    }*/

    //this.searchWalls();

    this.map = this.algA(Math.round(this.pos.x / 32), Math.round(this.pos.y / 32), Math.round(pos.x / 32), Math.round(pos.y / 32));
  }


  private algA(aX, aY, eX, eY) {
    const map = new Matrix(32, 32);
    const localMap = new Matrix(3, 3);
    const {field} = this;
    let curX = aX, curY = aY,
      wX, wY, val;

    let i = 0;
    map.set(aX, aY, 50);
    map.set(eX, eY, 50);

    while (i < 1000) {
      for (let dY = -1; dY < 2; dY++) {
        for (let dX = -1; dX < 2; dX++) {
          if (!dY && !dX) continue;
          wX = curX + dX;
          wY = curY + dY;
          let wall = field.get(wX, wY);
          if (wall) {
            val = 50;
          } else {
            val = Math.round(Math.sqrt(Math.pow(eX - wX, 2) + Math.pow(eY - wY, 2)) * 100) / 100;
          }
          map.set(wX, wY, val + 1);
          localMap.set(dX + 1, dY + 1, val);
        }
      }
      let nextPos = localMap.getMin();
      if (!nextPos || nextPos.x == 1 && nextPos.y == 1) {
        break;
      }
      curX += nextPos.x - 1;
      curY += nextPos.y - 1;

      i++;
    }
    // map.print();
    window.mmmap = map;
    return map;
  }

  states = {
    wall: false,
    notw: false,
    notwup: false,
  };

  private searchWalls() {
    const {map, field, units, states} = this;
    const un = units.characters.filter(u => u instanceof Unit);
    const {pos} = un[0];

    for (let y = Math.round(pos.y / 32); y > 0; y--) {
      for (let x = Math.round(pos.x / 32); x >= 0; x--) {
        states.wall = field.get(x, y) == 1;
        states.notw = field.get(x - 1, y) == 1;
        states.notwup = field.get(x, y - 1) == 1;

        if (states.wall && states.notw) {
          map.set(x - 1, y, 1);
        }
        if (states.wall && states.notwup) {
          map.set(x, y - 1, 1);
        }

      }
    }
  }
}