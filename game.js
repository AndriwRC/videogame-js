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

  // const elementSize = (canvasSize / 10) - 1;
  const elementSize = (Math.floor(canvasSize) / 10) - 1;
  
  game.font = elementSize + 'px Verdana';
  game.textBaseline = 'top';
  // game.fillText(emojis['X'], canvasSize - elementSize, 0);
  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      game.fillText(emojis['X'], (elementSize * i), (elementSize * j) + 5);
    }
  }
  // game.fillText("Platzi", -5, -2);

  console.log({canvasSize, elementSize});

  // game.fillRect(0,0,100,100);
  // game.clearRect(25,25,75,50);
  // game.font = '20px Verdana';
  // game.textBaseline = 'top';
  // game.fillText('Platzi', 0, Math.floor(canvasSize));
}