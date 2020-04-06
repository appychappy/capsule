import Bacteria from "./bacteria.js";
import Display from "./display.js";

let tick = 0;
const tickSpeed = 1000;
let tickInterval = null;

const ticker = {
  play: () => {
    tickInterval = setInterval(() => {
      tick++;

      const state = Bacteria.calculateGrowth();
      Display.clearDisplay();
      Display.updateDisplay(state, tick);
    }, tickSpeed);
  },

  clear: () => {
    clearInterval(tickInterval);
    tick = 0;
  },
};

export default ticker;
