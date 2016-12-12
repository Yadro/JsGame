import {MyScreen} from "./screen";
import {Unit} from "./units/unit";
import {Bot} from "./units/bot";
import {HauntBot} from "./units/HauntBot";


const myScreen = new MyScreen(document.getElementById('canvas'));

const unit = new Unit();
myScreen.addCharachter(unit);
myScreen.addCharachter(new Bot());
myScreen.addCharachter(new Bot(100, 200));
myScreen.addCharachter(new Bot(100, 300));
myScreen.addCharachter(new HauntBot(100, 400, unit));
// myScreen.addCharachter(new HauntBot(100, 500, unit));



window.setInterval(() => {
  myScreen.updateUnits();
  myScreen.draw();

}, 20);
