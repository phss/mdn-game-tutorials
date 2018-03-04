const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
const ballRadius = 10;
var dx = 2;
var dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for(var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: (c * (brickWidth + brickPadding)) + brickOffsetLeft,
      y: (r * (brickHeight + brickPadding)) + brickOffsetTop
    };
  }
}

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

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const drawBricks = () => {
  for (var c = 0; c < brickColumnCount; c++) {
    for(var r = 0; r < brickRowCount; r++) {
      ctx.beginPath();
      ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
};

const draw = () => {
  clearScreen();
  drawBall();
  drawPaddle();
  drawBricks();
};

const moveBall = () => {
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (paddleX < x && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
    }
  }

  x += dx;
  y += dy;
};

const controlPaddle = () => {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
};

const update = () => {
  moveBall();
  controlPaddle();
};

const gameLoop = () => {
  draw();
  update();
};
setInterval(gameLoop, 10);

const keyDownHandler = (event) => {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  }
};
const keyUpHandler = (event) => {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
};
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
