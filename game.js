const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
  let canvasSize = window.innerWidth * 0.75;
  const canvasMinSize = 288;
  // const canvasMaxSize = 500;

  if (canvasSize < canvasMinSize) {
    canvasSize = canvasMinSize;
  }
  if (window.innerWidth > window.innerHeight) {
    canvasSize = window.innerHeight * 0.75;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  // game.fillRect(0,0,100,100);
  // game.clearRect(25,25,75,50);
  // game.font = '20px Verdana';
  // game.textBaseline = 'top';
  // game.fillText('Platzi', 0, Math.floor(canvasSize));
}