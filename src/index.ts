import {MyScreen} from "./screen";
import {Unit} from "./unit";
import {Bot} from "./bot";


const myScreen = new MyScreen(document.getElementById('game'));

myScreen.addCharachter(new Bot());
myScreen.addCharachter(new Unit());

window.setInterval(() => {
  myScreen.updateUnits();
  myScreen.draw();

}, 100);
