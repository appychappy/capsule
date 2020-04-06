let liveBacteria = [];
const grid = [];

const getRadiusCount = (cellLocation) => {
  let count = 0;
  const splitLocation = cellLocation.split(",");
  const y = parseInt(splitLocation[1]);
  const x = parseInt(splitLocation[0]);

  if (y - 1 >= 0) {
    if (x - 1 >= 0 && liveBacteria.includes(`${x - 1},${y - 1}`)) count++;
    if (liveBacteria.includes(`${x},${y - 1}`)) count++;
    if (x + 1 <= 9 && liveBacteria.includes(`${x + 1},${y - 1}`)) count++;
  }

  if (x - 1 >= 0 && liveBacteria.includes(`${x - 1},${y}`)) count++;
  if (x + 1 <= 9 && liveBacteria.includes(`${x + 1},${y}`)) count++;

  if (y + 1 <= 9) {
    if (x - 1 >= 0 && liveBacteria.includes(`${x - 1},${y + 1}`)) count++;
    if (liveBacteria.includes(`${x},${y + 1}`)) count++;
    if (x + 1 <= 9 && liveBacteria.includes(`${x + 1},${y + 1}`)) count++;
  }

  return count;
};

const bacteria = {
  addCell: (cellLocation) => {
    const splitLocation = cellLocation.split("-");
    const newLiveCell = `${splitLocation[0]},${splitLocation[1]}`;
    if (!liveBacteria.includes(newLiveCell)) {
      liveBacteria.push(`${splitLocation[0]},${splitLocation[1]}`);
    }
    return liveBacteria;
  },
  getLiveBacteria: () => {
    return liveBacteria;
  },
  calculateGrowth: () => {
    let newLiveBacteria = [];
    grid.forEach((cell) => {
      const count = getRadiusCount(cell);

      if (liveBacteria.includes(cell)) {
        if (count === 2 || count === 3) newLiveBacteria.push(cell);
      } else {
        if (count === 3) newLiveBacteria.push(cell);
      }
    });
    liveBacteria = newLiveBacteria;
    return newLiveBacteria;
  },
  createGrid: () => {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        grid.push(`${x},${y}`);
      }
    }
  },
  reset: () => {
    liveBacteria = [];
  },
};

export default bacteria;
