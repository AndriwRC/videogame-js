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

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      game.fillText(emojis['X'], (elementSize * i), (elementSize * j) + 5);
    }
  }
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