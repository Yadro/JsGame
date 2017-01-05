import {Bot} from "./Bot";
import {Unit} from "./Unit";
import Matrix from "../helpers/matrix";
import Point from "../helpers/point";

interface Node {
  p: Point
  g; /** вес шага */
  f; /** g + h */
  h; /** прямое расстояние */
}

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

    // this.map = this.algA(Math.round(this.pos.x / 32), Math.round(this.pos.y / 32), Math.round(pos.x / 32), Math.round(pos.y / 32));
    // this.map = this.findPath(Math.round(this.pos.x / 32), Math.round(this.pos.y / 32), Math.round(pos.x / 32), Math.round(pos.y / 32));
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

  private findPath(sX, sY, tX, tY) {
    const mtx = new Matrix(32, 32);
    window.fmap = mtx;

    const start = new Point(sX, sY);
    const target = new Point(tX, tY);
    let openList: Node[] = [];
    let closedList: Node[] = [];
    let cameFrom: Set<Node> = new Set();
    openList.push({
      p: start,
      f: 0,
      g: start.getDist(target),
      h: start.getDist(target)
    });

    let current: Node;
    while (openList.length) {
      current = openList.sort((a, b) => a.f - b.f).shift();
      closedList.push(current);
      if (current.p.equal(target)) {
        // return this.genPath(cameFrom, current);
        cameFrom.forEach(n => mtx.setP(n.p, 25));
        mtx.setP(target, 0);
        return mtx;
      }
      const neighbors = this.getNeighbor(current.p, target);
      for (let neighbor of neighbors) {
        if (closedList.filter(n => neighbor.p.equal(n.p)).length) {
          continue;
        }
        const gDistance = current.g + current.p.getDist(neighbor.p);
        if (!openList.filter(n => neighbor.p.equal(n.p)).length) {
          openList.push(neighbor);
        } else if (gDistance >= neighbor.g) {
          continue;
        }
        cameFrom.add(current);
        neighbor.g = gDistance;
        neighbor.f = neighbor.g + neighbor.h;
      }
      closedList.forEach(n => mtx.setP(n.p, n.h));
      openList.forEach(n => mtx.setP(n.p, n.h));
    }
  }

  getNeighbor(current: Point, target: Point) {
    const {field} = this;
    const neighbor: Node[] = [];
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        if (x == 0 && y == 0) continue;
        const p = new Point(current.x + x, current.y + y);
        if (field.get(p.x, p.y)) {
          continue;
        }
        let n = {
          p,
          h: p.getDist(target),
          g: x == 0 || y == 0 ? 10 : 14,
          f: 0
        };
        n.f = n.h + n.g;
        neighbor.push(n);
      }
    }
    return neighbor;
  }

  genPath(cameFrom: Set<Node>, current: Node) {
    let totalPath = [current];
    for (let current of cameFrom) {
      totalPath.push(current);
    }
    return totalPath;
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