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

};

const update = () => {
  ball.x += 1;
  ball.y += 1;
};


const game = new Phaser.Game(480, 320, Phaser.AUTO, null, { preload, create, update });
