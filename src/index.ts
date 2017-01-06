import {MyScreen} from "./screen";
import {Unit} from "./units/Unit";
import {Bot} from "./units/Bot";
import {HauntBot} from "./units/HauntBot";
import {FirstIntelligenceBot} from "./units/FirstIntelectBot";


const myScreen = new MyScreen(document.getElementById('canvas'), [
  new Unit(),
  new Bot(),
  new Bot(100, 200),
  new Bot(100, 300),
  new FirstIntelligenceBot(),
]);

window.setInterval(() => {
  myScreen.updateUnits();
  myScreen.draw();

}, 20);
