const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
const dx = 2;
const dy = -2;


const clearScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  clearScreen();
  drawBall();
  x += dx;
  y += dy;
};
setInterval(draw, 10);
