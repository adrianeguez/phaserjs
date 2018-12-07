import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'juego';
  config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 300},
        debug: false
      }
    },
    scene: {
      preload: preload(this),
      create: create(this),
      update: update(this)
    }
  };
  game = new Phaser.Game(this.config);

}

function preload(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene = this;
    // contexto.load.setBaseURL('http://labs.phaser.io');
    scene.load.image('sky', 'assets/sky.png');
    scene.load.image('ground', 'assets/platform.png');
    scene.load.image('dude', 'assets/dude.png');

    // contexto.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // contexto.load.image('red', 'assets/particles/red.png');
  }
}

function create(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any = this;
    establecerBackground(scene);
    const platforms = crearPlatform(scene);
    const player = anadirPlayer(scene);
    colisionarPlatformPlayer(scene,player,platforms);
    // const particles = scene.add.particles('red');
    //
    // const emitter = particles.createEmitter({
    //   speed: 100,
    //   scale: {start: 1, end: 0},
    //   blendMode: 'ADD'
    // });
    //
    // const logo = scene.physics.add.image(400, 100, 'background');
    //
    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);
    //
    // emitter.startFollow(logo);
  }
}

function update(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any = this;
    const cursors = this.input.keyboard.createCursorKeys();
    // if (cursors.left.isDown)
    // {
    //   player.setVelocityX(-160);
    //
    //   player.anims.play('left', true);
    // }
    // else if (cursors.right.isDown)
    // {
    //   player.setVelocityX(160);
    //
    //   player.anims.play('right', true);
    // }
    // else
    // {
    //   player.setVelocityX(0);
    //
    //   player.anims.play('turn');
    // }
    //
    // if (cursors.up.isDown && player.body.touching.down)
    // {
    //   player.setVelocityY(-330);
    // }
  }

}

function anadirPlayer(scene: Phaser.Scene | any) {
  const player = scene.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(300);
  scene.anims.create({
    key: 'left',
    frames: scene.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
  });
  scene.anims.create({
    key: 'turn',
    frames: [{key: 'dude', frame: 4}],
    frameRate: 20
  });
  scene.anims.create({
    key: 'right',
    frames: scene.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
    frameRate: 10,
    repeat: -1
  });
  return player;
}

function crearPlatform(scene: Phaser.Scene | any) {
  const platforms = scene.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // refreshbody para
  // que se actualice la imagen

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  return platforms;
}

function establecerBackground(scene: Phaser.Scene | any){
  scene.add.image(400, 300, 'sky');
}

function colisionarPlatformPlayer(scene: Phaser.Scene | any, player, platforms){
  scene.physics.add.collider(player, platforms);
}


