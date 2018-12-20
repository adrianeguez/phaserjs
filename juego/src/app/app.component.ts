import {Component, OnInit} from '@angular/core';
import {resize} from './lib/functions/ui/resize';
import {CustomObjects} from './lib/interfaces/custom-objects';
import {anadirImagenes} from './lib/functions/images/anadir-imagen';
import {AnadirSonidos} from './lib/interfaces/anadir-sonidos';
import {anadirSonido} from './lib/functions/sound/anadir-sonido';
import {initCustomObjects} from './lib/functions/init';
import {AnadirImagenInterface} from "./lib/interfaces/anadir-imagen";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'juego';
  personajeSeleccionado = false;
  nombrePersonaje = 'cristian-lara';
  personajes = [
    'cristian-lara',
    'christian-chicaiza',
    'david',
    'oscar',
    'carlos',
    'ali',
    'alexander',
    'kevin',
    'cristian-jumbo',
    'choco',
    'alexander-ninio',
    'anali',
    'vinicio',
    'pao'
  ];
  imagenes: AnadirImagenInterface[] = [

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
              });
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
              });
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
    },
    {
      tipo: 'repeat',
      nombre: 'star',
      url: 'assets/star.png',
      imagenRepeat: [
        {
          posX: 300,
          posY: 550,
          stepX: 35,
          repeat: 10,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 300,
          posY: 450,
          stepX: 35,
          repeat: 10,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        }
      ]

    },
  ];

  sonidos: AnadirSonidos[] = [
    {
      nombre: 'cristian-lara',
      audios: ['assets/music/cristian-lara.mp3'],
      loop: true,
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
    },
    audio: {
      disableWebAudio: true
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
      () => {
        this.game = new Phaser.Game(this.config);
        this.escucharCambiosEnPantalla();
      }, 1
    );

  }

  seleccionarPersonaje(evento) {
    this.nombrePersonaje = evento.target.value;
  }

  establecerPersonaje(personaje) {
    const indicePlayer = this.imagenes
      .findIndex((imagen) => imagen.tipo === 'player');
    this.imagenes[indicePlayer].url = `assets/${personaje}.png`;
    this.personajeSeleccionado = true;
    this.sonidos[0].nombre = personaje;
    this.sonidos[0].audios[0] = this.sonidos[0].audios[0].replace('cristian-lara', personaje);

    this.empezarJuego();
  }

  escucharCambiosEnPantalla() {
    setTimeout(
      () => {
        resize(this)();
        window.addEventListener('resize', resize(this), false);
      },
      1
    );
  }
}


function preload(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene | CustomObjects | any = this;
    initCustomObjects(scene);
    anadirImagenes(componente.imagenes, scene);
    anadirSonido(componente.sonidos, scene);
  };
}

function create(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any | CustomObjects = this;
    anadirImagenes(componente.imagenes, scene, 'add');
    anadirSonido(componente.sonidos, scene, 'create');
    const cancionFondo = scene.customObjects.sounds.find(s => s.nombre === componente.nombrePersonaje).sonido;
    cancionFondo.play();

    // scene.physics.add.collider(player, platforms);
    // scene.physics.add.collider(stars, platforms);
    //
    // scene.physics.add.overlap(player, stars, collectStar, null, this);

    scene.customObjects.cursors = scene.input.keyboard.createCursorKeys();
    const mundo = scene.customObjects.layer.find((l) => l.nombre === 'map');
    const player = scene.customObjects.player;
    const estrellas = scene.customObjects.repeatGroups.find(n => n.nombre === 'star');

    scene.physics.add.collider(player, mundo.layer);
    estrellas.grupo.forEach(
      (unidad) => {
        scene.physics.add.collider(unidad, mundo.layer);
        scene.physics.add.overlap(player, unidad, collectStar, null, this);
      }
    );
    scene.physics.add.collider(player, mundo.layer);
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
  };
}

function collectStar(player, star) {
  star.disableBody(true, true);
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
  };

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

