const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const livesSpan = document.querySelector('#lives');
const timeSpan = document.querySelector('#time');
const recordSpan = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;
const canvasMinSize = 288;
let elementSize;
let level = 0;
let lives = 3;
let timeStart;
let timeInterval;
let totalTime;

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

  if (timeStart === undefined) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
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
          playerPosition.x = x;
          playerPosition.y = y;
        }

        playerPosition.initialX = x;
        playerPosition.initialY = y;
      }

      // Get giftPosition value
      if (col == 'I') {
        giftPosition.x = x;
        giftPosition.y = y;
      }

      // Get enemyPositions
        if (col == 'X') {
          enemyPositions.push({
            x: x,
            y: y,
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

function showTime() {
  totalTime = Date.now() - timeStart;
  timeSpan.innerHTML = (totalTime/1000) + 's';
}

function showRecord() {
  recordSpan.innerHTML = (localStorage.getItem('record') / 1000) + 's'; 
}

function showResult() {
  if (!localStorage.getItem('record')) {
    localStorage.setItem('record', totalTime);
    pResult.innerHTML = 'Primera vez? Muy Bien! Ahora trata de superar tu tiempo.'
    return ;
  } 
  if (totalTime < localStorage.getItem('record')) {
    localStorage.setItem('record', totalTime);
    pResult.innerHTML = 'Felicitaciones! Has superado tu record.'
    return ;
  } 
    pResult.innerHTML = 'Terminaste el juego! Ahora trata de superar tu tiempo.'
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

  const posX = playerPosition.x * elementSize;
  const posY = (playerPosition.y * elementSize) + 5;
  game.fillText(emojis['PLAYER'], posX, posY);
}

function limitMovement() {
  if (playerPosition.x < 0) {
    playerPosition.x++;
  }
  if (playerPosition.x > (canvasSize - elementSize)) {
    playerPosition.x--;
  }
  if (playerPosition.y < 0) {
    playerPosition.y++;
  }
  if (playerPosition.y > (canvasSize - elementSize)) {
    playerPosition.y--;
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
  timeStart = undefined;
  clearInterval(timeInterval);
  startGame();
}

function winGame() {
  showResult();
  clearInterval(timeInterval);
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
  playerPosition.y--;
  startGame();
}
function moveLeft() {
  playerPosition.x--;
  startGame();
}
function moveRight() {
  playerPosition.x++;
  startGame();
}
function moveDown() {
  playerPosition.y++;
  startGame();
}