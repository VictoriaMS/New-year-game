import { Game } from './Game.js';

var game = new Game();

game.resize();
window.addEventListener("resize", game.resize());

document.querySelector('.start-game-button').addEventListener('click', function () {
  document.querySelector('.start-game').classList.add('inactive');
  document.querySelector('.game').classList.remove('inactive');
  game.resize();
  game.start();
});


document.querySelector('.retry-game-button').addEventListener('click', function () {
  document.querySelector('.game-over').classList.add('inactive');
  document.querySelector('.game').classList.remove('inactive');
  game.resize();
  document.querySelector('.score').innerHTML = 0;
  game.restart();

  const lives = document.querySelector('.lives').children;
  Array.from(lives).forEach((child) => {
    // Здесь можно работать с каждым дочерним элементом
    child.classList.remove('black')
    child.classList.add('red')
  });
  game.start();
});

