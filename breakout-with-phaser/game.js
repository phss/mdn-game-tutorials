const preload = () => {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#eee";
  console.log("herere");
};

const create = () => {

};

const update = () => {

};


const game = new Phaser.Game(480, 320, Phaser.AUTO, null, { preload, create, update });
