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
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', startGame);
window.addEventListener('resize', startGame);

function startGame() {
  setCanvasSize();

  elementSize = Math.floor((canvasSize / 10) - 1);

  game.font = elementSize + 'px Verdana';
  game.textBaseline = 'top';

  const mapRows = maps[0].trim().split('\n');
  const map = mapRows.map(row => row.trim().split(''));

  enemyPositions = []; // Clear array

  map.forEach((row, y) => {
    row.forEach((col, x) => {
      posX = (elementSize * x);
      posY = (elementSize * y) + 5; // 5: it's just a visual adjustment

      // Get playerPosition value
      if (col == 'O' && playerPosition.x === undefined) {
        playerPosition.x = posX;
        playerPosition.y = posY;
      }

      // Get giftPosition value
      if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      }
      
      // Get enemyPositions
        if (col == 'X') {
          enemyPositions.push({
            x: posX,
            y: posY,
          });
        }

      game.fillText(emojis[col], posX, posY);
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
  limitMovement();

  // check collisions
  const giftCollisionX = playerPosition.x == giftPosition.x;
  const giftCollisionY = playerPosition.y == giftPosition.y;
  if (giftCollisionX && giftCollisionY) {
    console.log('Ganaste');
  }

  const enemyCollision = enemyPositions.find(enemy => {
    const collisionX = playerPosition.x == enemy.x;
    const collisionY = playerPosition.y == enemy.y;
    return (collisionX && collisionY);
  });
  if (enemyCollision) console.log('Perdiste');

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function limitMovement() {
  if (playerPosition.x < 0) {
    playerPosition.x += elementSize;
  }
  if (playerPosition.x > (canvasSize - elementSize)) {
    playerPosition.x -= elementSize;
  }
  if (playerPosition.y < 0) {
    playerPosition.y += elementSize;
  }
  if (playerPosition.y > (canvasSize - elementSize)) {
    playerPosition.y -= elementSize;
  }
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