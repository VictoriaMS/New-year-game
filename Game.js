import { NewYearTree } from './NewYearTree.js';
import { Snowflake } from './Snowflake.js';

export class Game {
  constructor() {
    this.snowflakeId = 0;
    this.canvas = document.getElementById("canvas");
    this.score = 0;
    this.speed = 500;
    this.snowflakeCount = 6000;
    this.catchSnowflakeSound1 = new Audio('audio/catch_snowflake_1.mp3');
    this.catchSnowflakeSound2 = new Audio('audio/catch_snowflake_1.mp3');
    this.catchSnowflakeSound3 = new Audio('audio/catch_snowflake_1.mp3');
    this.catchSnowflakeSound4 = new Audio('audio/catch_snowflake_1.mp3');
    this.catchSnowflakeSound5 = new Audio('audio/catch_snowflake_2.mp3');
    this.GameOverSound = new Audio('audio/game_over.mp3');
    this.timer = null;
    this.noteNumber = 0;
    this.sound = [this.catchSnowflakeSound1, this.catchSnowflakeSound2, this.catchSnowflakeSound3, this.catchSnowflakeSound4, this.catchSnowflakeSound5];
    this.ctx = this.canvas.getContext("2d");
    this.objects = [];
  }

  restart() {
    this.score = 0;
    this.speed = 500;
    this.snowflakeCount = 6000;
  }

  resize() {
    let canvasRect = this.canvas.getBoundingClientRect();
    this.canvas.width = canvasRect.width;
    this.canvas.height = canvasRect.height;
    this.draw();
  }

  start() {
    this.drawBackground();
    if (this.timer) clearInterval(this.timer); // Очищаем, если уже был запущен
    this.timer = setInterval(this.update.bind(this), 400); // Используем bind, чтобы сохранить контекст

    this.canvas.addEventListener('click', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      for (let i = 0; i < this.objects.length; i++) {
        if (this.objects[i].isClicked(mouseX, mouseY)) {
          this.catchSnowflake(i);
          break;
        }
      }
    });
  }

  newLevel() {
    if (this.score % 5 === 0 && this.speed > 50) {
      clearInterval(this.timer);
      this.speed -= 25;
      this.timer = setInterval(this.update.bind(this), this.speed);
    }
    if (this.score % 10 === 0 && this.snowflakeCount < 9000) {
      this.snowflakeCount += 400;
    }
  }

  stop() {
    clearInterval(this.timer);
    this.objects = [];
    this.draw();
    document.querySelector('.game-over').classList.remove('inactive');
    this.GameOverSound.play();
  }

  catchSnowflake(index) {
    let caughtSnowflake = this.objects[index];
    if (!caughtSnowflake) return;

    this.objects = this.objects.filter((object) => object.id !== caughtSnowflake.id);

    this.score += 1;
    document.querySelector('.score').innerHTML = this.score;
    this.sound[this.noteNumber].play();
    this.noteNumber = (this.noteNumber + 1) % this.sound.length;

    this.newLevel();
    this.update();
  }

  randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  update() {
    const rect = this.canvas.getBoundingClientRect();
    let random = this.randomInteger(0, 10000);
    if (random > this.snowflakeCount) {
      this.snowflakeId += 1;
      this.objects.push(new Snowflake(this.randomInteger(30, rect.width - 100), this.randomInteger(20, 500) * -1, this.snowflakeId));
    }
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    let hasDead = false;
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update();

      if (this.objects[i].dead) {
        this.objects = this.objects.filter((object) => object.id !== this.objects[i].id);
        this.snowflakeFell();
      }

      this.objects[i].draw(this.ctx); 
    }
  }

  snowflakeFell() {
    let lives = document.querySelector('.lives').querySelectorAll('.red');
    let lastLive = lives[lives.length - 1];
    lastLive.classList.remove('red');
    lastLive.classList.add('black');

    if (document.querySelectorAll('.lives .red').length === 0) {
      this.stop();
    }
  }

  drawBackground() {
    this.ctx.fillStyle = "#ADD6E8";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#D8ECF5";
    this.ctx.beginPath();
    this.ctx.bezierCurveTo(0, this.canvas.height - 50, 100, this.canvas.height - 900, this.canvas.width, this.canvas.height - 50);
    this.ctx.fill();

    new NewYearTree(60, this.canvas.height - 700, 260, 650, '#4F6B6F', '#173341').draw(this.ctx);
    new NewYearTree(120, this.canvas.height - 500, 200, 450, '#173341', '#4F6B6F').draw(this.ctx);
    new NewYearTree(this.canvas.width - 60, this.canvas.height - 700, 260, 650, '#4F6B6F', '#173341').draw(this.ctx);
    new NewYearTree(this.canvas.width - 120, this.canvas.height - 500, 200, 450, '#173341', '#4F6B6F').draw(this.ctx);
    new NewYearTree(320, this.canvas.height - 400, 100, 350, '#4F6B6F', '#173341', 3, 50, 15).draw(this.ctx);
    new NewYearTree(this.canvas.width - 320, this.canvas.height - 400, 100, 350, '#4F6B6F', '#173341', 3, 50, 15).draw(this.ctx);

    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 30;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(50, this.canvas.height - 50);
    this.ctx.lineTo(this.canvas.width - 80, this.canvas.height - 50);
    this.ctx.stroke();

    this.ctx.lineWidth = 50;
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width - 120, this.canvas.height - 650);
    this.ctx.lineTo(this.canvas.width - 320, this.canvas.height - 650);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width - 160, this.canvas.height - 625);
    this.ctx.lineTo(this.canvas.width - 420, this.canvas.height - 625);
    this.ctx.stroke();

    this.ctx.lineWidth = 45;
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width - 600, this.canvas.height - 450);
    this.ctx.lineTo(this.canvas.width - 720, this.canvas.height - 450);
    this.ctx.stroke();

    this.ctx.lineWidth = 45;
    this.ctx.beginPath();
    this.ctx.moveTo(150, this.canvas.height - 540);
    this.ctx.lineTo(280, this.canvas.height - 540);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(200, this.canvas.height - 520);
    this.ctx.lineTo(340, this.canvas.height - 520);
    this.ctx.stroke();
  }
}
