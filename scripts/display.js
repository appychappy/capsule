const display = {
  updateDisplay: (liveCells = [], day) => {
    liveCells.map((cell) => {
      const splitCell = cell.split(",");
      const whichCell = `${splitCell[0]}-${splitCell[1]}`;
      const cellEl = document.getElementById(whichCell);
      cellEl.classList.add("dish__cell--active");
    });
    if (day) {
      document.getElementById("day").innerHTML = day;
    }
    document.getElementById("live-count").innerHTML = liveCells.length;
  },
  clearDisplay: function () {
    const activeCells = document.querySelectorAll(".dish__cell--active");
    if (activeCells) {
      [...activeCells].forEach((cell) => {
        cell.classList.remove("dish__cell--active");
      });
    }
  },
  resetDisplay: function () {
    this.clearDisplay();
    document.getElementById("day").innerHTML = 0;
    document.getElementById("live-count").innerHTML = 0;
  },
};

export default display;
