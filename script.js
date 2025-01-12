import Game from "./game.js";
const canvas = document.getElementById("canvas");
const buttons = document.querySelectorAll("#buttons button");
const homepage = document.querySelector(".homepage");
const controls = document.querySelector("#controls");
// const easy = document.getElementById("easy");
// const normal = document.getElementById("normal");
// const hardcore = document.getElementById("hardcore");

// Faire 1 seul eventListener, un switchCase avec les différents modes en fonction du textContent du bouton
buttons.forEach((button) => {
  let lives = null;
  let level = null;
  button.addEventListener("click", (event) => {
    level = event.target.textContent;
    switch (level) {
      case "Easy":
        lives = 15;
        break;
      case "Normal":
        lives = 10;
        break;
      case "Hardcore":
        lives = 5;
        break;
    }
    // button.classList.toggle("hide");

    canvas.classList.toggle("hide");
    homepage.classList.toggle("hide");
    controls.classList.toggle("hide");
    let lastTime = 0;
    const game = new Game(lives);
    function animate(frame) {
      const deltaTime = frame - lastTime;
      lastTime = frame;
      game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
      game.playAmbiance();
      game.frame = requestAnimationFrame(animate);
      game.update(deltaTime);
      game.draw();
    }
    animate(0);
  });
});
// button.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     console.log(btn.innerHTML);
//   });
// });

// easy.addEventListener("click", () => {
//   button.forEach((button) => {
//     button.classList.toggle("hide");
//   });

//   canvas.classList.toggle("hide");
//   homepage.classList.toggle("hide");
//   controls.classList.toggle("hide");
//   let lastTime = 0;
//   const game = new Game(15);
//   function animate(frame) {
//     const deltaTime = frame - lastTime;
//     lastTime = frame;
//     game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
//     game.playAmbiance();
//     game.frame = requestAnimationFrame(animate);
//     game.update(deltaTime);
//     game.draw();
//   }

//   animate(0);
// });

// normal.addEventListener("click", () => {
//   button.forEach((button) => {
//     button.classList.toggle("hide");
//   });
//   //   homepageMusic.pause();
//   //   homepageMusic.currentTime = 0;
//   canvas.classList.toggle("hide");
//   homepage.classList.toggle("hide");
//   controls.classList.toggle("hide");
//   let lastTime = 0;
//   const game = new Game(10);
//   function animate(frame) {
//     const deltaTime = frame - lastTime;
//     lastTime = frame;
//     game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
//     game.playAmbiance();
//     game.frame = requestAnimationFrame(animate);
//     game.update(deltaTime);
//     game.draw();
//     // console.log(deltaTime);
//     // console.log(frame);
//   }

//   animate(0);
// });

// hardcore.addEventListener("click", () => {
//   button.forEach((button) => {
//     button.classList.toggle("hide");
//   });
//   //   homepageMusic.pause();
//   //   homepageMusic.currentTime = 0;
//   canvas.classList.toggle("hide");
//   homepage.classList.toggle("hide");
//   controls.classList.toggle("hide");
//   let lastTime = 0;
//   const game = new Game(5);
//   function animate(frame) {
//     const deltaTime = frame - lastTime;
//     lastTime = frame;
//     game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
//     game.playAmbiance();
//     game.frame = requestAnimationFrame(animate);
//     game.update(deltaTime);
//     game.draw();
//     // console.log(deltaTime);
//     // console.log(frame);
//   }

//   animate(0);
// });

// button.forEach((button) => {
//   button.addEventListener("click", () => {
//     button.classList.toggle("hide");
//     console.log("bouton");
//   });
// });
