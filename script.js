let config={
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade:{
    gravity: {y:300},
    debug: false
  }
  },
  scene: {
    init: init,
    preload: preload,
    create: create,
    update: update
  }
}

let game = new Phaser.Game(config);

function init(){
  let platforms;
  let player;
  let cursors;

}

function preload(){
  this.load.image("background", "assets/ciel.jpg");
  this.load.image('sol', "assets/platforme.png");
  this.load.spritesheet("perso","assets/eren.png",
{frameWidth: 22, frameHeight: 31});
  this.load.image('stars', "assets/star.png");
}

function create(){
  this.add.image(400, 300, "background");

  platforms = this.physics.add.staticGroup();
  platforms.create(400,568, "sol").setScale(2).refreshBody();
  platforms.create(600,400, "sol");
  platforms.create(50,250, "sol");

  player = this.physics.add.sprite(100, 350, "perso");
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);
  player.setBounce(0.5);
  player.body.setGravityY(300);

  cursors = this.input.keyboard.createCursorKeys();


  this.anims.create({
    key: 'gauche',
    frames: this.anims.generateFrameNumbers('perso',{start: 1, end:3}),
    frameRate: 10,
    repeat:-1
  });

  this.anims.create({
    key: 'stop',
    frames: [{key : 'perso', frame:0}],
    frameRate: 20

  });

  stars = this.physics.add.group({
    key: 'etoile',
    repeat : 12,
    setXY: {x: 12, y: 0, stepX:70, stepY: 10}
  });
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectstar, null, this);




}

function collectstar(player, star) {
  star.disableBody(true, true);

  });



}

function update(){
  if (cursors.left.isDown) {
    player.setVelocityX(-320);
    player.anims.play('gauche', true);
    player.setFlipX(false);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(320);
    player.anims.play('gauche', true);
    player.setFlipX(true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('stop', true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-500);
  }

}
