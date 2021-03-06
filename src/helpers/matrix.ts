import {smap} from "../tools";
import Point from "./point";

export default class Matrix {
  matrix: any[][];
  width;
  height;

  constructor(height, width) {
    this.height = height;
    this.width = width;

    const arr = [];
    for (let i = 0; i < height; i++) {
      arr.push([]);
      for (let j = 0; j < width; j++) {
        arr[i].push(0);
      }
    }
    this.matrix = arr;
  }

  set(x, y, value) {
    return this.matrix[y][x] = value;
  }

  setP({x, y}: Point, value) {
    return this.matrix[y][x] = value;
  }

  get(x, y) {
    return this.matrix[y][x];
  }

  getMin() {
    const {matrix, height, width} = this;
    let min = matrix[0][0];
    let coord;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (matrix[y][x] && matrix[y][x] < min) {
          min = matrix[y][x];
          coord = {x, y};
        }
      }
    }
    return coord;
  }

  getMax() {
    let max = 0;
    let coord;
    const {matrix, height, width} = this;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (matrix[y][x] && matrix[y][x] > max) {
          max = matrix[y][x];
          coord = {x, y};
        }
      }
    }
    return coord;
  }

  /**
   * Print table to console
   */
  print() {
    let colors = [];
    let str = '';
    let last;
    this.matrix.forEach(row => {
      row.forEach(el => {
        let val = smap(el, 50, 0, 0, 255);
        if (last == val) {
          str += '  ';
        } else {
          colors.push(`rgb(0,${Math.round(val)},0)`);
          str += '%c  ';
        }
        last = val;
      });
      str += '\n';
    });
    console.log(str, ...colors.map(s => 'background: '+s));
  }
}