const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
const canvasMinSize = 288;
let elementSize;

const playerPosition = {
  x: undefined,
  y: undefined,
}

window.addEventListener('load', startGame);
window.addEventListener('resize', startGame);

function startGame() {
  setCanvasSize();

  elementSize = (Math.floor(canvasSize) / 10) - 1;

  game.font = elementSize + 'px Verdana';
  game.textBaseline = 'top';

  const mapRows = maps[2].trim().split('\n');
  const map = mapRows.map(row => row.trim().split(''));

  map.forEach((row, y) => {
    row.forEach((col, x) => {

      if (col == 'O' && playerPosition.x === undefined) {
        playerPosition.x = (elementSize * x);
        playerPosition.y = (elementSize * y) + 5; // 5: it's just a visual adjustment
      }

      game.fillText(emojis[col], (elementSize * x), (elementSize * y) + 5);
    });
  });

  movePlayer();
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
}

// Movement
function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

// Keyboard
window.addEventListener('keydown', moveByKeys);

function moveByKeys(event) {
  switch (event.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowDown':
      moveDown();
      break;
  }
}

// Buttons
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveUp() {
  playerPosition.y -= elementSize;
  startGame();
}
function moveLeft() {
  playerPosition.x -= elementSize;
  startGame();
}
function moveRight() {
  playerPosition.x += elementSize;
  startGame();
}
function moveDown() {
  playerPosition.y += elementSize;
  startGame();
}