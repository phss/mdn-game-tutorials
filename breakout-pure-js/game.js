const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
const ballRadius = 10;
var dx = 2;
var dy = -2;


const clearScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  clearScreen();
  drawBall();

  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
    dy = -dy;
  }
  x += dx;
  y += dy;
};
setInterval(draw, 10);
