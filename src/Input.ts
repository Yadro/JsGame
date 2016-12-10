
import {includes} from "./tools";
export class Input {

  keys = [];
  mouse = {
    x: 0,
    y: 0,
    lBtn: false,
    rBtn: false,
  };

  constructor() {
    document.body.addEventListener('keyup', (e) => {
      let el = this.keys.find(el => el.key == e.key);
      this.keys.splice(this.keys.indexOf(el), 1);
    });
    document.body.addEventListener('keydown', (e) => {
      if (!this.keys.find(el => el.key == e.key)) {
        this.keys.push({
          key: e.key,
          code: e.code
        });
      }
    });

    document.body.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    document.body.addEventListener('mousedown', (e: MouseEvent) => {
      this.mouse.lBtn = true;
    });
    document.body.addEventListener('mouseup', (e: MouseEvent) => {
      this.mouse.lBtn = false;
    });
  }

  checkKey(key) {
    const keys = this.keys.map(el => el.key);
    return includes(keys, key);
  }

  checkCode(code) {
    const codes = this.keys.map(el => el.code);
    return includes(codes, code);
  }
}