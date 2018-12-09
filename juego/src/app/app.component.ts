import {Component, OnInit} from '@angular/core';


// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'juego';
  imagenes: AnadirImagenInterface[] = [
    {
      tipo: 'imagen',
      nombre: 'star',
      url: 'assets/star.png',
      posX: 150,
      posY: 200,
    },
    {
      tipo: 'tileset',
      nombre: 'tileset',
      nombreMapaCSV: 'tileset',
      url: 'assets/t1.png',
      posX: 0,
      posY: 0,
      sizeX: 16,
      sizeY: 16,
      index: 0,
      levelCSV: 'assets/mundos/01.csv',
      // level: [
      //   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 4, 5, 6, 7, 8, 9, 10, 11],
      //   [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      //   [22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      //
      // ]
    },
    {
      tipo: 'imagen',
      nombre: 'bomb',
      url: 'assets/bomb.png',
      posX: 200,
      posY: 200
    },
    {
      tipo: 'imagen',
      nombre: 'dude',
      url: 'assets/dude.png',
      posX: 0,
      posY: 100
    }
  ];
  config = {
    parent: 'juego',
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    pixelArt: true,
    zoom: 4,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 300
        },
        debug: false
      }
    },
    scene: {
      preload: preload(this),
      create: create(this),
      update: update(this)
    }
  };
  game: Phaser.Game;
  top = 10;
  bottom = 10;

  constructor() {

  }

  ngOnInit(): void {
    this.game = new Phaser.Game(this.config);
    this.escucharCambiosEnPantalla();

  }

  escucharCambiosEnPantalla() {
    setTimeout(
      () => {
        resize(this)();
        window.addEventListener("resize", resize(this), false)
      },
      1
    );
  }
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
    console.log(scene);

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
          if (imagen.levelCSV) {
            scene.load.tilemapCSV(imagen.nombreMapaCSV, imagen.levelCSV);
          }
        }
      );
  }
  if (tipo === 'add') {
    imagenes
      .forEach(
        (imagen) => {
          if (imagen.tipo === 'imagen') {
            scene.add.image(imagen.posX, imagen.posY, imagen.nombre);
          }
          if (imagen.tipo === 'tileset') {
            const configTileMap: TilemapConfig = {
              tileWidth: imagen.sizeX,
              tileHeight: imagen.sizeY,
            };
            if (imagen.level) {
              configTileMap.data = imagen.level;
            }
            if (imagen.levelCSV) {
              configTileMap.key = imagen.nombreMapaCSV
            }
            const map = scene.make.tilemap(configTileMap);
            const tiles = map.addTilesetImage(imagen.nombre);
            const layer = map.createStaticLayer(imagen.index, tiles, imagen.posX, imagen.posY);


          }
        }
      );
  }
}

interface AnadirImagenInterface {
  nombre?: string;
  url?: string;
  posX?: number;
  posY?: number;
  sizeX?: number;
  sizeY?: number;
  index?: number;
  tipo?: 'imagen' | 'tileset';
  level?: Array<number[]>;
  nombreMapaCSV?: string;
  levelCSV?: string;
}

function resize(component: AppComponent) {
  return function () {
    let canvas = document.querySelector("canvas");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let wratio = width / height;
    let ratio = component.config.width / component.config.height;
    if (wratio < ratio) {
      canvas.style.width = width + "px";
      canvas.style.height = (width / ratio) + "px";
    } else {
      canvas.style.width = (height * ratio) + "px";
      canvas.style.height = height + "px";
    }
    component.top = (height - Number((canvas.style.height).replace('px', ''))) / 2
  }
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
