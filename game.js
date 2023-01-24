const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const livesSpan = document.querySelector('#lives');

let canvasSize;
const canvasMinSize = 288;
let elementSize;
let level = 0;
let lives = 3;

const playerPosition = {
  x: undefined,
  y: undefined,
  initialX: undefined,
  initialY: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', startGame);
window.addEventListener('resize', startGame);

function startGame() {
  if (!maps[level]) {
    winGame();
    return;
  }

  setCanvasSize();

  elementSize = Math.floor((canvasSize / 10) - 1);

  game.font = elementSize + 'px Verdana';
  game.textBaseline = 'top';

  const mapRows = maps[level].trim().split('\n');
  const map = mapRows.map(row => row.trim().split(''));

  enemyPositions = []; // Clear array

  map.forEach((row, y) => {
    row.forEach((col, x) => {
      posX = (elementSize * x);
      posY = (elementSize * y) + 5; // 5: it's just a visual adjustment

      // Get playerPosition value
      if (col == 'O') {
        if (playerPosition.x === undefined) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }

        playerPosition.initialX = posX;
        playerPosition.initialY = posY;
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

  showLives();

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

function showLives() {
  const arr = Array(lives).fill(emojis['LIVE']);

  livesSpan.innerHTML = arr.join('');
}

// Movement
function movePlayer() {
  limitMovement();

  // check collisions
  const giftCollisionX = playerPosition.x == giftPosition.x;
  const giftCollisionY = playerPosition.y == giftPosition.y;
  if (giftCollisionX && giftCollisionY) beatLevel();

  const enemyCollision = enemyPositions.find(enemy => {
    const collisionX = playerPosition.x == enemy.x;
    const collisionY = playerPosition.y == enemy.y;
    return (collisionX && collisionY);
  });
  if (enemyCollision) {
    lives--;
    (lives < 0) ? restartGame() : restartLevel();
  }

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

function beatLevel() {
  level++;
  startGame();
}

function restartLevel() {
  playerPosition.x = playerPosition.initialX;
  playerPosition.y = playerPosition.initialY;
  startGame();
}

function restartGame() {
  level = 0;
  lives = 3;
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function winGame() {
  console.log('Terminaste el juego');
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