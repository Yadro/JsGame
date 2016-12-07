import {MyScreen} from "./screen";
import {Unit} from "./units/unit";
import {Bot} from "./units/bot";


const myScreen = new MyScreen(document.getElementById('canvas'));

// myScreen.addCharachter(new Bot());
myScreen.addCharachter(new Unit());

window.setInterval(() => {
  myScreen.updateUnits();
  myScreen.draw();

}, 20);
