import {MyScreen} from "./screen";
import {Unit} from "./unit";
import {Bot} from "./bot";

const myScreen = new MyScreen();

myScreen.addCharachter(new Bot());


setInterval(() => {
  myScreen.updateUnits();
  myScreen.draw();

}, 100);
