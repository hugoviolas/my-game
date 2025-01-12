import Player from "./player.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";
import BigEnemy from "./bigEnemy.js";
import UI from "./UI.js";

class Game {
  constructor(lives) {
    this.canvas = null;
    this.ctx = null;
    this.init();
    this.player = new Player(this.canvas, this.ctx, lives);
    this.input = new InputHandler(this.player);
    this.ui = new UI(this.canvas, this.ctx);
    this.frame = 0;
    this.time = null;
    this.enemies = [];
    this.waves = [3, 7, 10, 12, 14];
    this.waveNumber = 0;
    this.finishedWave = false;
    this.gameover = false;
    this.messageTimer = 0;
    this.maxMessageTimer = 5000;
    this.counter = 0;
    // Music and ambiance setup
    this.gameAmbiance = new Audio();
    this.gameAmbiance.src = "./audios/Ambiance/GatheringDarknessOK.mp3";
    this.losingMusic = new Audio();
    this.losingMusic.src = "./audios/Ambiance/HiddenPastOK.mp3";
    this.winningSong = new Audio();
    this.winningSong.src = "./audios/Ambiance/AchaidhCheideOK.mp3";
    //this.gameAmbiance.addEventListener('canplaythrough', () => this.gameAmbiance.play())
  }
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1000;
    this.canvas.height = 800;
  }

  // Runed on every animation frame
  update(deltaTime) {
    // Plays footstep sound if the input array is not empty
    if (this.input.keys.length === 0) {
      this.player.stopFootstepsSound();
    } else {
      this.player.footstepsSound();
    }
    this.player.update(this.input.keys, this.input.space);
    if (
      this.messageTimer < this.maxMessageTimer &&
      !this.gameover &&
      this.waveNumber !== 0
    ) {
      // Shows a wave message during 5 seconds
      this.messageTimer += deltaTime;
      this.ui.nextWave(this.waveNumber);
    } else {
      if (!this.enemies.length) {
        if (this.waveNumber === 5) {
          this.gameOver = true;
          this.gameAmbiance.pause();
          this.gameAmbiance.currentTime = 0;
          this.winningSong.play();
          this.gameover = true;
          cancelAnimationFrame(this.frame);
          this.reloadGame();
          this.ui.win(this.waveNumber);
          return;
        }
        this.waveGenerator();
      }
    }
    this.enemies.forEach((enemy) => {
      enemy.update(this.player);
      enemy.move();

      if (this.checkCollision(enemy, this.player) && this.player.attackMode) {
        // Decreased enemies lives by 0.5 because the decrement was too fast otherwise for big enemies...
        enemy.lives -= 0.5;
        if (enemy.lives === 0) {
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
          enemy.screamToDeath();
        }
      }

      if (enemy.type !== "bigEnemy") {
        enemy.attack();
        enemy.arrows.forEach((arrow) => {
          if (arrow.checkCollision(this.player)) {
            this.player.hurtScream();
            this.player.lives -= 1;
            arrow.markedForDeletion = true;
          }
        });
        enemy.arrows = enemy.arrows.filter((arrow) => !arrow.markedForDeletion);
        enemy.isOutOfBound(this.player);
      } else {
        if (this.checkCollision(enemy, this.player)) {
          enemy.attackMode = true;
        }
        enemy.followPlayer(this.player);
      }
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    if (this.player.lives < 1) {
      this.gameAmbiance.pause();
      this.gameAmbiance.currentTime = 0;
      this.losingMusic.play();
      this.player.screamToDeath();
      this.reloadGame();
      cancelAnimationFrame(this.frame);
      return;
    }
  }
  // Draw all images
  draw() {
    this.ui.draw(this.player, this);
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }
  waveGenerator() {
    if (this.frame % 99) {
      return;
    }
    for (let i = 0; i < this.waves[this.waveNumber]; i++) {
      if (Math.random() < 0.8) {
        this.enemies.push(new Enemy(this.canvas, this.ctx, this));
      } else {
        this.enemies.push(new BigEnemy(this.canvas, this.ctx, this));
      }
    }
    this.waveNumber += 1;
    this.messageTimer = 0;
  }
  playAmbiance() {
    this.gameAmbiance.play();
  }
  checkCollision(enemy, player) {
    const isInX =
      (enemy.rightEdge() >= player.leftEdge() &&
        enemy.leftEdge() <= player.leftEdge()) ||
      (enemy.rightEdge() >= player.rightEdge() &&
        enemy.leftEdge() <= player.rightEdge()) ||
      (enemy.rightEdge() >= player.rightEdge() &&
        enemy.leftEdge() <= player.leftEdge());
    const isInY =
      (enemy.topEdge() <= player.topEdge() &&
        enemy.bottomEdge() >= player.topEdge()) ||
      (enemy.topEdge() <= player.bottomEdge() &&
        enemy.bottomEdge() >= player.bottomEdge()) ||
      (enemy.topEdge() <= player.topEdge() &&
        enemy.bottomEdge() >= player.bottomEdge());
    return isInX && isInY;
  }
  reloadGame() {
    const reloadButton = document.querySelector(".reload");
    const canvas = document.getElementById("canvas");
    const homepage = document.querySelector(".homepage");
    const button = document.querySelectorAll("#buttons button");
    const controls = document.querySelector("#controls");
    reloadButton.classList.toggle("hide");
    reloadButton.addEventListener(
      "click",
      () => {
        this.winningSong.pause();
        this.winningSong.currentTime = 0;
        this.losingMusic.pause();
        this.losingMusic.currentTime = 0;
        canvas.classList.toggle("hide");
        homepage.classList.toggle("hide");
        controls.classList.toggle("hide");
        button.forEach((btn) => {
          // btn.classList.toggle("hide");
        });
        reloadButton.classList.toggle("hide");
      },
      { once: true }
    );
  }
}
export default Game;
