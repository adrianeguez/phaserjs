import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'juego';
  imagenes: AnadirImagenInterface[] = [
    {
      nombre: 'star',
      url: 'assets/star.png',
      posX: 150,
      posY: 200
    },
    {

      nombre: 'tileset',
      url: 'assets/t1.png',
      posX: 300,
      posY: 400
    },
    {

      nombre: 'bomb',
      url: 'assets/bomb.png',
      posX: 0,
      posY: 0
    },
    {

      nombre: 'dude',
      url: 'assets/dude.png',
      posX: 0,
      posY: 100
    }
  ];
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
    anadirImagenes(componente.imagenes, scene);


    // // contexto.load.setBaseURL('http://labs.phaser.io');

    // Anadir imagenes en memoria

    scene.load.image('tileset', 'assets/t1.png');
    // scene.load.image('ground', 'assets/platform.png');
    // scene.add.a('flecha', 'https://image.flaticon.com/icons/svg/31/31931.svg').set;
    // scene.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    // // contexto.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // // contexto.load.image('red', 'assets/particles/red.png');
  }
}

function create(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any = this;
    anadirImagenes(componente.imagenes, scene, 'add');

    // establecerBackground(scene);
    // const platforms = crearPlatform(scene);
    // const player: Phaser.Physics.Arcade.Sprite = anadirPlayer(scene);
    // scene.player = player;
    // colisionarPlatformPlayer(scene, player, platforms);
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
  // return function () {
  //   const scene: Phaser.Scene | any = this;
  //   const cursors = this.input.keyboard.createCursorKeys();
  //   const player: Phaser.Physics.Arcade.Sprite = scene.player;
  //   scene.input.on(
  //     'pointerdown',
  //     function () {
  //       player.setVelocityX(-160);
  //       player.anims.play('left', true);
  //       console.log('down')
  //     }, this
  //   );
  //   scene.player.on('pointerdown', function(pointer, localX, localY, event){
  //     console.log('abajo')
  //   });

  // gameObject.on('pointerup', function(pointer, localX, localY, event){
  //   console.log('up')
  // });
  // gameObject.on('pointermove', function(pointer, localX, localY, event){
  //   console.log('move')
  // });
  // gameObject.on('pointerover', function(pointer, localX, localY, event){
  //   console.log('over')
  // });
  // scene.input.on(
  //   'pointerup',
  //   function () {
  //     player.setVelocityX(-160);
  //     player.anims.play('left', true);
  //     console.log('up')
  //   }, this
  // );
  //
  //
  // if (cursors.left.isDown) {
  //   player.setVelocityX(-160);
  //
  //   player.anims.play('left', true);
  // }
  // else if (cursors.right.isDown) {
  //   player.setVelocityX(160);
  //
  //   player.anims.play('right', true);
  // }
  // else {
  //   player.setVelocityX(0);
  //
  //   player.anims.play('turn');
  // }
  //
  // if (cursors.up.isDown && player.body.touching.down) {
  //   player.setVelocityY(-330);
  // }
  // }

}

function anadirImagenes(imagenes: AnadirImagenInterface[], scene: Phaser.Scene, tipo: 'load' | 'add' = 'load') {
  if (tipo === 'load') {
    imagenes
      .forEach(
        (imagen) => {
          scene.load.image(imagen.nombre, imagen.url);
        }
      );
  }

  if (tipo === 'add') {
    imagenes
      .forEach(
        (imagen) => {
          scene.add.image(imagen.posX, imagen.posY, imagen.nombre);
        }
      );
  }
}

interface AnadirImagenInterface {
  nombre: string;
  url: string;
  posX: number;
  posY: number;
}


// function anadirPlayer(scene: Phaser.Scene | any) {
//   const player = scene.physics.add.sprite(100, 450, 'dude');
//   player.setBounce(0.2);
//   player.setCollideWorldBounds(true);
//   player.body.setGravityY(300);
//   scene.anims.create({
//     key: 'left',
//     frames: scene.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
//     frameRate: 10,
//     repeat: -1
//   });
//   scene.anims.create({
//     key: 'turn',
//     frames: [{key: 'dude', frame: 4}],
//     frameRate: 20
//   });
//   scene.anims.create({
//     key: 'right',
//     frames: scene.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
//     frameRate: 10,
//     repeat: -1
//   });
//   return player;
// }
//
//
// function crearPlatform(scene: Phaser.Scene | any) {
//   const platforms = scene.physics.add.staticGroup();
//
//   platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // refreshbody para
//   // que se actualice la imagen
//
//   platforms.create(600, 400, 'ground');
//   platforms.create(50, 250, 'ground');
//   platforms.create(750, 220, 'ground');
//   return platforms;
// }
//
// function establecerBackground(scene: Phaser.Scene | any) {
//   scene.add.image(400, 300, 'sky');
//   scene.add.image(400, 300, 'flecha');
// }
//
// function colisionarPlatformPlayer(scene: Phaser.Scene | any, player, platforms) {
//   scene.physics.add.collider(player, platforms);
// }
//
//
