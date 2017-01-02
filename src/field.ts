const field = [
  "11111111111111111111111111111111",
  "10000000000000000000000000000001",
  "10000010000000000000000000000001",
  "10001110001111100000000000100001",
  "10000010001000000000000000000001",
  "10000010001000000000000000000001",
  "10000010001000000000000000000001",
  "10000010001000000000010000000001",
  "10000000000000000000010000000001",
  "10000000000000000000010000000001",
  "10000000000000000000000000000001",
  "10000000000000000000000000000001",
  "10000000000000000000000010000001",
  "10000000000000000000000000000001",
  "10000000000011111110000000000001",
  "10000000000000000000000000001001",
  "10000000000000000000000000000001",
  "10000000000000010000000000000001",
  "10000000000000010000000000000001",
  "10000000000000000000000000000001",
  "10000001000000000000000000000001",
  "10000000000000000000000000000001",
  "10000000000000000000000000000001",
  "10000000000000000000000000000001",
  "11111111111111111111111111111111"
];

export class Field {
  field;
  size;
  width;
  height;

  constructor(size) {
    this.field = this.readField();
    this.height = this.field.length - 1;
    this.width = this.field[0].length - 1;
    this.size = size;
  }

  readField() {
    let buf = [];
    field.forEach((row, y) => {
      buf.push([]);
      for (let x = 0; x < row.length; x++) {
        buf[y].push(+row[x]);
      }
    });
    return buf;
  }

  /**
   * Get cell from field with convert pixel coord to field coord
   * @param x in px
   * @param y in px
   */
  getCell(x, y) {
    const size = this.size;
    const fY = Math.floor(y / size);
    const fX = Math.floor(x / size);
    if (fY < 0 || fY > this.height
      ||fX < 0 || fX > this.width) {
      throw new Error;
    }
    return this.field[fY][fX];
  }

  get(x, y) {
    return this.field[y][x];
  }
}