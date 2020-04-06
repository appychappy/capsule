import Bacteria from "./scripts/bacteria.js";
import Display from "./scripts/display.js";
import Ticker from "./scripts/ticker.js";

const startSimulation = () => {
  const currentState = Bacteria.getLiveBacteria();
  Display.updateDisplay(currentState);

  document.querySelector("#restart").addEventListener("click", () => {
    Display.clearDisplay();
    Ticker.clear();
  });

  Ticker.play();
};

window.onload = () => {
  Bacteria.createGrid();

  document.querySelector("#restart").addEventListener("click", () => {
    Display.resetDisplay();
    Ticker.clear();
    Bacteria.reset();
  });

  const cells = document.querySelectorAll(".dish__cell");
  [...cells].forEach((cell) => {
    cell.addEventListener("click", (evt) => {
      Display.updateDisplay(Bacteria.addCell(evt.target.id));
    });
  });

  document.querySelector("#start").addEventListener("click", () => {
    startSimulation();
  });
};
