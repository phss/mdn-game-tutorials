var ball;
var paddle;
var bricks;
var scoreText;
var score = 0;
var lives = 3;
var livesText;
var lifeLostText;
var playing = false;
var startButton;

const preload = () => {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#eee";

  game.load.image("ball", "img/ball.png");
  game.load.spritesheet("ball", "img/wobble.png", 20, 20);
  game.load.image("paddle", "img/paddle.png");
  game.load.image("brick", "img/brick.png");
  game.load.spritesheet("button", "img/button.png", 120, 40);
};

const initBricks = () => {
  const brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 7,
      col: 3
    },
    offset: {
      top: 50,
      left: 60
    },
    padding: 10
  };

  bricks = game.add.group();
  for (var c = 0; c < brickInfo.count.col; c++) {
    for (var r = 0; r < brickInfo.count.row; r++) {
      const brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
      const brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
      const newBrick = game.add.sprite(brickX, brickY, "brick");
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(0.5);
      bricks.add(newBrick);
    }
  }
};

const ballLeaveScreen = () => {
  lives--;
  if (lives) {
    livesText.setText("Lives: "+lives);
    lifeLostText.visible = true;
    ball.reset(game.world.width*0.5, game.world.height-25);
    paddle.reset(game.world.width*0.5, game.world.height-5);
    game.input.onDown.addOnce(() => {
      lifeLostText.visible = false;
      ball.body.velocity.set(150, -150);
    }, this);
  }
  else {
    alert("You lost, game over!");
    location.reload();
  }
};

const startGame = () => {
  startButton.destroy();
  ball.body.velocity.set(150, -150);
  playing = true;
};

const create = () => {
  startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, "button", startGame, this, 1, 0, 2);
  startButton.anchor.set(0.5);

  const textStyle = { font: "18px Arial", fill: "#0095DD" };
  scoreText = game.add.text(5, 5, "Points: 0", textStyle);
  livesText = game.add.text(game.world.width-5, 5, "Lives: " + lives, textStyle);
  livesText.anchor.set(1, 0);
  lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, "Life lost, click to continue", textStyle);
  lifeLostText.anchor.set(0.5);
  lifeLostText.visible = false;

  ball = game.add.sprite(game.world.width*0.5, game.world.height-25, "ball");
  ball.animations.add("wobble", [0,1,0,2,0,1,0,2,0], 24);
  ball.anchor.set(0.5);

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;
  game.physics.enable(ball, Phaser.Physics.ARCADE);

  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(ballLeaveScreen, this);

  paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, "paddle");
  paddle.anchor.set(0.5,1);

  game.physics.enable(paddle, Phaser.Physics.ARCADE);

  paddle.body.immovable = true;

  initBricks();
};

const ballHitBrick = (ball, brick) => {
  var killTween = game.add.tween(brick.scale);
  killTween.to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
  killTween.onComplete.addOnce(brick.kill);
  killTween.start();

  score += 10;
  scoreText.setText("Points: " + score);

  var count_alive = 0;
  for (var i = 0; i < bricks.children.length; i++) {
    if (bricks.children[i].alive == true) {
      count_alive++;
    }
  }
  if (count_alive == 0) {
    alert("You won the game, congratulations!");
    location.reload();
  }
};

const update = () => {
  game.physics.arcade.collide(ball, paddle, (ball, paddle) => ball.animations.play("wobble"));
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  if (playing) {
    paddle.x = game.input.x || game.world.width*0.5;
  }
};


const game = new Phaser.Game(480, 320, Phaser.AUTO, null, { preload, create, update });
