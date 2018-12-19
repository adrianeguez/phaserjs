import {Component, OnInit} from '@angular/core';
import CursorKeys = Phaser.Input.Keyboard.CursorKeys;


// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'juego';
  personajeSeleccionado = false;
  nombrePersonaje = 'cristianlara';
  personajes = [
    'cristianlara',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ];
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
      nombreLayer: 'map',
      nombreMapa: 'map',
      url: 'assets/mundos/t1.png',
      urlNombreArchivo: 't1',
      posX: 0,
      posY: 0,
      sizeX: 16,
      sizeY: 16,
      index: 0,
      // levelCSV: 'assets/mundos/01.csv',
      levelJSON: 'assets/mundos/02.json',
      layerPositions: [
        // {
        //   nombre: 'Frente',
        //   posX: 0,
        //   posY: 0,
        // },
        {
          nombre: 'map',
          posX: 0,
          posY: 0,
        }
        // , {
        //   nombre: 'Fondo',
        //   posX: 0,
        //   posY: 0,
        // },

      ]

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
      tipo: 'player',
      nombre: 'dude',
      url: 'assets/dude3.png',
      posX: 100,
      posY: 550,
      frameWidth: 32,
      frameHeight: 48,
      bounce: 0.2,
      collideWorldBounds: true,
      animaciones: [
        {
          key: 'right',
          frames: (scene: Phaser.Game, imagen: AnadirImagenInterface) => {
            return scene.anims.generateFrameNumbers(imagen.nombre,
              {
                start: 5,
                end: 8
              })
          },
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'left',
          frames: (scene: Phaser.Game, imagen: AnadirImagenInterface) => {
            return scene.anims.generateFrameNumbers(imagen.nombre,
              {
                start: 0,
                end: 3
              })
          },
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'turn',
          frames: () => [{key: 'dude', frame: 4}],
          frameRate: 20,
        },

      ]
    }
  ];
  config = {
    backgroundColor: '#422835',
    parent: 'juego',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    // zoom: 4,
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
  game: Phaser.Game | any;
  top = 10;
  bottom = 10;

  constructor() {

  }

  ngOnInit(): void {


  }

  empezarJuego() {
    setTimeout(
      ()=>{
        this.game = new Phaser.Game(this.config);
        this.escucharCambiosEnPantalla();
      },1
    );

  }

  seleccionarPersonaje(evento) {
    this.nombrePersonaje = evento.target.value;
  }

  establecerPersonaje(personaje) {
    const indicePlayer = this.imagenes
      .findIndex((imagen) => imagen.tipo === 'player');
    console.log(indicePlayer);
    this.imagenes[indicePlayer].url = `assets/${personaje}.png`;
    this.personajeSeleccionado = true;
    console.log(this.imagenes[indicePlayer]);

    this.empezarJuego();
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
    const scene: Phaser.Scene | CustomObjects | any = this;
    anadirImagenes(componente.imagenes, scene);
    scene.customObjects = {};
    scene.customObjects.layer = [];
    scene.customObjects.groups = [];

    // // contexto.load.setBaseURL('http://labs.phaser.io');

    // Anadir imagenes en memoria

    // scene.load.image('tileset', 'assets/t1.png');
    // scene.load.image('ground', 'assets/platform.png');
    // scene.add.a('flecha', 'https://image.flaticon.com/icons/svg/31/31931.svg').set;
    // scene.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    // // contexto.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // // contexto.load.image('red', 'assets/particles/red.png');
  }
}


function create(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any | CustomObjects = this;
    anadirImagenes(componente.imagenes, scene, 'add');
    scene.customObjects.cursors = scene.input.keyboard.createCursorKeys();
    const mundo = scene.customObjects.layer.find((l) => l.nombre === 'map');
    scene.physics.add.collider(scene.customObjects.player, mundo.layer);
    scene.customObjects.groups.push(
      {
        group: scene.physics.add.staticGroup(),
        nombre: 'spike',
      }
    );
    const spikeGroup = scene.customObjects.groups.find((g) => g.nombre === 'spike').group;
    mundo.layer
      .forEachTile(
        (tile) => {

        }
      );
    // scene.physics.add.collider(scene.customObjects.player, scene.customObjects.layer.find((l) => l.name === 'mapa'));
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
  return function () {
    const scene: Phaser.Scene | any | CustomObjects = this;

    if (scene.customObjects.cursors.left.isDown) {
      scene.customObjects.player.setVelocityX(-70);
      scene.customObjects.player.anims.play('left', true);
    } else if (scene.customObjects.cursors.right.isDown) {
      scene.customObjects.player.setVelocityX(70);

      scene.customObjects.player.anims.play('right', true);
    } else {
      scene.customObjects.player.setVelocityX(0);
      scene.customObjects.player.anims.play('turn');
    }
    if (scene.customObjects.cursors.up.isDown && scene.customObjects.player.body.blocked.down) {
      scene.customObjects.player.setVelocityY(-150);
    }
    // const p = scene.customObjects.player
    // const pene = scene.customObjects.groups.find(f => f.nombre === 'spike').group
    // if (
    //
    //   scene.physics.world.overlap(, )
    // ) {
    // }
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
  }

}

function anadirImagenes(imagenes: AnadirImagenInterface[], scene: Phaser.Scene | any | CustomObjects, tipo: 'load' | 'add' = 'load') {

  if (tipo === 'load') {
    imagenes
      .forEach(
        (imagen) => {
          if (imagen.tipo === 'imagen' || imagen.tipo === 'tileset') {
            scene.load.image(imagen.nombre, imagen.url);
            if (imagen.levelCSV) {
              scene.load.tilemapCSV(imagen.nombreMapa, imagen.levelJSON);
            }
            if (imagen.levelJSON) {
              scene.load.tilemapTiledJSON(imagen.nombreMapa, imagen.levelJSON);
            }
          }
          if (imagen.tipo === 'player') {
            scene.load.spritesheet(imagen.nombre, imagen.url, {
              frameWidth: imagen.frameWidth,
              frameHeight: imagen.frameHeight
            });
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
            const configTileMap: TilemapConfig = {};
            if (imagen.level) {
              configTileMap.data = imagen.level;
              configTileMap.tileWidth = imagen.sizeX;
              configTileMap.tileHeight = imagen.sizeY;
            }
            if (imagen.levelCSV) {
              configTileMap.tileWidth = imagen.sizeX;
              configTileMap.tileHeight = imagen.sizeY;
              configTileMap.key = imagen.nombreMapa
            }
            if (imagen.levelJSON) {
              configTileMap.key = imagen.nombreMapa;
            }
            // const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
            //
            // // Parameters: layer name (or index) from Tiled, tileset, x, y
            // const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
            // const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
            // const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

            const map = scene.make.tilemap(configTileMap);
            if (imagen.levelJSON) {
              const tileset = map.addTilesetImage(imagen.urlNombreArchivo, imagen.nombre);
              imagen.layerPositions
                .forEach(
                  (layer) => {
                    const layerObjeto = map.createStaticLayer(layer.nombre, tileset, layer.posX, layer.posY);
                    layerObjeto.setCollisionByProperty({collides: true});
                    scene.customObjects.layer.push({
                      nombre: layer.nombre,
                      layer: layerObjeto
                    });
                  }
                );
            } else {
              const tiles = map.addTilesetImage(imagen.nombre);
              const layer = map.createStaticLayer(imagen.index, tiles, imagen.posX, imagen.posY);
              scene.customObjects.layer.push({
                nombre: imagen.nombreLayer,
                layer: layer
              });
            }

          }
          if (imagen.tipo === 'player') {
            scene.customObjects.player = scene.physics.add.sprite(imagen.posX, imagen.posY, imagen.nombre);
            scene.customObjects.player.setBounce(0.2);
            scene.customObjects.player.setCollideWorldBounds(true);
            // @ts-ignore
            imagen.animaciones
              .forEach(
                (animacion: AnimationConfig | any) => {
                  scene.anims.create({
                    key: animacion.key,
                    frames: animacion.frames(scene, imagen),
                    frameRate: animacion.frameRate,
                    repeat: animacion.repeat
                  });
                });

          }
        }
      );
  }
}

interface AnadirImagenInterface {
  nombre?: string;
  url?: string;
  urlNombreArchivo?: string;
  posX?: number;
  posY?: number;
  sizeX?: number;
  sizeY?: number;
  index?: number;
  bounce?: number;
  frameWidth?: number;
  frameHeight?: number;
  nombreLayer?: string;
  layerPositions?: LayerPosition[];
  collideWorldBounds?: boolean;
  tipo?: 'imagen' | 'tileset' | 'player';
  level?: Array<number[]>;
  nombreMapa?: string;
  levelCSV?: string;
  levelJSON?: string;
  animaciones?: AnimationConfig[] | any[];
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

interface CustomObjects {
  customObjects: CustomObjectsProperties
}

interface CustomObjectsProperties {
  player?: Phaser.Physics.Arcade.Sprite;
  cursors?: CursorKeys;
  layer?: Layers[];
  groups?: GroupStaticGroup[];
}

interface Layers {
  nombre: string;
  layer: Phaser.Tilemaps.StaticTilemapLayer[]
}

interface GroupStaticGroup {
  group: Phaser.Physics.Arcade.StaticGroup;
  nombre: string;
}

interface LayerPosition {
  nombre: string;
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

