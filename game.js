const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
const canvasMinSize = 288;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function startGame() {
  elementSize = (Math.floor(canvasSize) / 10) - 1;

  game.font = elementSize + 'px Verdana';
  game.textBaseline = 'top';

  const mapRows = maps[1].trim().split('\n');
  const map = mapRows.map(row => row.trim().split(''));

  map.forEach((row, y) => {
    row.forEach((col, x) => {
      game.fillText(emojis[col], (elementSize * x), (elementSize * y) + 5);
    });
  });
}

function setCanvasSize() {
  canvasSize = window.innerWidth * 0.75;

  if (canvasSize < canvasMinSize) {
    canvasSize = canvasMinSize;
  }
  if (window.innerWidth > window.innerHeight) {
    canvasSize = window.innerHeight * 0.75;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  startGame();
}