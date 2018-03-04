var ball;

const preload = () => {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#eee";

  game.load.image("ball", "img/ball.png");
};

const create = () => {
  ball = game.add.sprite(50, 50, "ball");

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.enable(ball, Phaser.Physics.ARCADE);

  ball.body.velocity.set(150, 150);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
};

const update = () => {
};


const game = new Phaser.Game(480, 320, Phaser.AUTO, null, { preload, create, update });