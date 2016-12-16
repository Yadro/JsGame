
export interface Sprite {
  id;
  x;
  y;
  width;
  height;
}
export class SpriteDraw {
  width: number;
  height: number;
  layerNum: number;
  field;

  spriteItems: Sprite[];

  constructor(mapJson, spriteItems) {
    console.log(mapJson, spriteItems);
    this.spriteItems = this.importSprites(spriteItems);
    this.field = mapJson.field;
    this.layerNum = this.field.length;
    this.height = mapJson.height;
    this.width = mapJson.width;
  }

  importSprites(json: any) {
    const {sprites} = json;
    return sprites.map(s => {
      const [id, x, y, width, height] = s.split(',');
      return {
        id,
        x: +x,
        y: +y,
        width: +width,
        height: +height,
      }
    });
  }

  getSprite(layer, x, y) {
    const field = this.field[layer];
    return this.spriteItems.find(el => el.id == field[y][x]);
  }

  protected static fillField(sprites) {
    let res = [];
    for (let row of sprites) {
      res.push([]);
      for (let i = 0; i < row.length; i += 2) {
        res[res.length - 1].push(row.substr(i, 2));
      }
    }
    return res;
  }
}