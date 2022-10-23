class Player {
  constructor(canvas, ctx, lives) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.lives = lives;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.frameX = 9;
    this.frameY = 0;
    this.width = 64;
    this.height = 2000 / 30;
    this.hitboxWidth = this.width;
    this.hitboxHeight = this.height;
    this.attackWidth = 90;
    this.speedX = 7;
    this.speedY = 7;
    this.attackMode = false;
    this.image = document.getElementById("player");
  }
  update(input) {
    if (
      (input.includes("ArrowRight") || input.includes("KeyD")) &&
      this.x < this.canvas.width - this.width
    ) {
      this.x += this.speedX;
    } else if (
      (input.includes("ArrowLeft") || input.includes("KeyA")) &&
      this.x > 0
    ) {
      this.x -= this.speedX;
    } else if (
      (input.includes("ArrowUp") || input.includes("KeyW")) &&
      this.y > 0
    ) {
      this.y -= this.speedY;
    } else if (
      (input.includes("ArrowDown") || input.includes("KeyS")) &&
      this.y < this.canvas.height - this.height
    ) {
      this.y += this.speedY;
    }
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.attack();
      }
    });
    window.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        this.hitboxWidth = this.width;
        this.attackMode = false;
      }
    });
  }
  draw() {
    // this.ctx.fillStyle = "black";
    // this.ctx.strokeStyle = "red";
    // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.hitbox(this.hitboxWidth, this.hitboxHeight);
    this.ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  hitbox(width, height) {
    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(this.x, this.y, width, height);
  }
  // Attack method makes the hitbox grow bigger as the player uses his sword
  attack() {
    this.hitboxWidth = this.attackWidth;
    this.attackMode = true;
  }
  checkCollision() {}
  bottomEdge() {
    return this.y + this.hitboxHeight;
  }

  leftEdge() {
    return this.x;
  }
  rightEdge() {
    return this.x + this.hitboxWidth;
  }
  topEdge() {
    return this.y;
  }
}

export default Player;