import mapping from './terrain_mapping'

const sprites = [
  "11111111111111111111111111111111",
  "11212121212121212121212121212111",
  "11212112121212121212121212121211",
  "11211112111111212121212121212111",
  "11212112112121212121212121212111",
  "11212112112121212121212121212111",
  "11212112112121212121212121212111",
  "11212112112121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11212121212121212121212121212111",
  "11111111111111111111111111111111"
];

export interface Sprite {
  id;
  x;
  y;
  width;
  height;
}
export class SpriteDraw {
  width;
  height;
  sprites = [];

  constructor() {
    this.height = sprites.length;
    this.width = sprites[0].length / 2;
    for (let name in mapping) {
      for (let sprite in mapping[name]) {
        let data = mapping[name][sprite].split(',');
        this.sprites.push({
          id: data[0],
          x: data[1],
          y: data[2],
          width: data[3],
          height: data[4]
        })
      }
    }
  }

  getSprite(x, y) {
    const id = sprites[y].substr(x*2, 2);
    return this.sprites.find(spr => spr.id == id);
  }
}