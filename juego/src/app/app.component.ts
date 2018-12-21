import {Component, OnInit} from '@angular/core';
import {resize} from './lib/functions/ui/resize';
import {CustomObjects} from './lib/interfaces/custom-objects';
import {anadirImagenes} from './lib/functions/images/anadir-imagen';
import {AnadirSonidos} from './lib/interfaces/anadir-sonidos';
import {anadirSonido} from './lib/functions/sound/anadir-sonido';
import {initCustomObjects} from './lib/functions/init';
import {AnadirImagenInterface} from './lib/interfaces/anadir-imagen';
import {AnadirTexto} from './lib/interfaces/anadir-texto';
import {anadirTexto} from './lib/functions/text/anadir-texto';

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
      tipo: 'player',
      nombre: 'dude',
      url: 'assets/dude3.png',
      posX: 120,
      posY: 560,
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
          posX: 220,
          posY: 450,
          stepX: 35,
          repeat: 15,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 45,
          posY: 360,
          stepX: 35,
          repeat: 22,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 45,
          posY: 280,
          stepX: 35,
          repeat: 4,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 200,
          posY: 260,
          stepX: 35,
          repeat: 18,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 25,
          posY: 180,
          stepX: 35,
          repeat: 22,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 25,
          posY: 35,
          stepX: 35,
          repeat: 22,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 45,
          posY: 520,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
      ]

    },
    {
      tipo: 'repeat',
      nombre: 'bomb',
      url: 'assets/bomb.png',
      imagenRepeat: [
        {
          posX: 70,
          posY: 550,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 590,
          posY: 310,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 640,
          posY: 170,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 650,
          posY: 70,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 160,
          posY: 70,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 130,
          posY: 500,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 50,
          posY: 520,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
        {
          posX: 39,
          posY: 70,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
      ]
    },
    {
      tipo: 'repeat',
      nombre: 'manti',
      url: 'assets/manti.png',
      imagenRepeat: [
        {
          posX: 10,
          posY: 10,
          stepX: 35,
          repeat: 0,
          floatBetween: {
            min: 0.4,
            max: 0.8
          }
        },
      ]
    },
  ];
  textos: AnadirTexto[] = [
    {
      name: 'score',
      fontSize: '16px',
      posX: 630,
      posY: 10,
      text: 'Puntuación : 0',
      color: '#ffffff'
    },
    {
      name: 'tiempo',
      fontSize: '16px',
      posX: 630,
      posY: 40,
      text: 'Segundos : 0',
      color: '#ffffff'
    },
    {
      name: 'hit-bomb-text',
      fontSize: '46px',
      posX: 150,
      posY: 300,
      text: 'PERDISTE TUS PUNTOS',
      color: '#ff0004'
    },
    {
      name: 'collect-manti',
      fontSize: '36px',
      posX: 150,
      posY: 100,
      text: 'Consigue el ultimo Manti',
      color: '#fff92a'
    }
  ];
  sonidos: AnadirSonidos[] = [
    {
      nombre: 'cristian-lara',
      audios: ['assets/music/cristian-lara.mp3'],
      loop: true,
    },
    {
      nombre: 'hit-bomb',
      audios: ['assets/music/hit-bomb.mp3'],
      loop: false,
    },
    {
      nombre: 'collect-star',
      audios: ['assets/music/collect-star.mp3'],
      loop: false,
    },
    {
      nombre: 'manti',
      audios: ['assets/music/manti.mp3'],
      loop: false,
    },
    {
      nombre: 'win',
      audios: ['assets/music/win.mp3'],
      loop: false,
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
  game: Phaser.Game;
  top = 10;
  bottom = 10;

  constructor() {

  }

  ngOnInit(): void {


  }

  reiniciar() {
    this.personajeSeleccionado = !this.personajeSeleccionado;

    this.nombrePersonaje = 'cristian-lara';
    const scene: Phaser.Scene | any | CustomObjects = this.game.scene.scenes[0];
    scene
      .customObjects
      .sounds
      .forEach(
        (sonido) => {
          sonido.sonido.stop();
        }
      );
    this.game.destroy(true);
    this.game = undefined;
    this.config = {
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
    }
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
    calcularTiempo(scene);
    anadirImagenes(componente.imagenes, scene, 'add');
    anadirSonido(componente.sonidos, scene, 'create');
    anadirTexto(componente.textos, scene);
    const textoHitBomb = scene.customObjects.texts.find(t => t.nombre === 'hit-bomb-text');
    textoHitBomb.texto.setVisible(false);

    const textoManti = scene.customObjects.texts.find(t => t.nombre === 'collect-manti');
    textoManti.texto.setVisible(false);


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
    const bombas = scene.customObjects.repeatGroups.find(n => n.nombre === 'bomb');
    const mantis = scene.customObjects.repeatGroups.find(n => n.nombre === 'manti');

    scene.physics.add.collider(player, mundo.layer);
    estrellas.grupo.forEach(
      (estrella) => {
        scene.physics.add.collider(estrella, mundo.layer);
        scene.physics.add.overlap(player, estrella, collectStar, null, this);
      }
    );
    bombas.grupo.forEach(
      (bomba) => {
        scene.physics.add.collider(bomba, mundo.layer);
        scene.physics.add.overlap(player, bomba, chocarBomba, null, this);
      }
    );

    mantis.grupo.forEach(
      (manti) => {
        scene.physics.add.collider(manti, mundo.layer);
        scene.physics.add.overlap(player, manti, coleccionarManti, null, this);
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
  const scene: Phaser.Scene | any | CustomObjects = this;
  const audioHitBombo = scene.customObjects.sounds.find(s => s.nombre === 'collect-star').sonido;
  audioHitBombo.play();
  star.disableBody(true, true);
  scene.customObjects.score.points += 1;
  const textoScore = scene.customObjects.texts.find(t => t.nombre === 'score');
  textoScore.texto.setText(`Puntuación : ${scene.customObjects.score.points}`);

}

function update(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any | CustomObjects = this;
    if (!scene.customObjects.score.terminoJuego) {
      const textoTiempo = scene.customObjects.texts.find(t => t.nombre === 'tiempo');
      textoTiempo.texto.setText(`Segundos : ${scene.customObjects.score.segundos}`);
    }
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

function chocarBomba(player, bomba) {
  const scene: Phaser.Scene | any | CustomObjects = this;
  const audioHitBombo = scene.customObjects.sounds.find(s => s.nombre === 'hit-bomb').sonido;
  audioHitBombo.play();
  bomba.disableBody(true, true);
  scene.customObjects.score.points = 0;

  const textoHitBomb = scene.customObjects.texts.find(t => t.nombre === 'hit-bomb-text');
  textoHitBomb.texto.setVisible(true);

  player.setTint(0xff0000);
  setTimeout(
    () => {
      player.clearTint();
      setTimeout(
        () => {
          player.setTint(0xff0000);
          setTimeout(
            () => {
              player.clearTint();
              textoHitBomb.texto.setVisible(false);
            }, 800
          );
        }, 500
      );
    }, 1000
  );
  const textoScore = scene.customObjects.texts.find(t => t.nombre === 'score');
  textoScore.texto.setText(`Puntuación : ${scene.customObjects.score.points}`);
}

function coleccionarManti(player, manti) {
  const scene: Phaser.Scene | any | CustomObjects = this;
  if (scene.customObjects.obtuvoUltimoManti) {

    manti.disableBody(true, true);
    const textoManti = scene.customObjects.texts.find(t => t.nombre === 'collect-manti');
    textoManti.texto.setText(`Puntos:${scene.customObjects.score.points}\n\nSegundos:${scene.customObjects.score.segundos}\n\nBien hecho!`);
    textoManti.texto.setVisible(true);
    scene.physics.pause();
    scene.customObjects.sounds
      .forEach(
        (sound) => {
          sound.sonido.stop();
        }
      );
    scene.customObjects.score.terminoJuego = true;

    const audioWin = scene.customObjects.sounds.find(s => s.nombre === 'win').sonido;
    audioWin.play();
  } else {
    scene.customObjects.obtuvoUltimoManti = true;

    const mundo = scene.customObjects.layer.find((l) => l.nombre === 'map');

    // anadir manti
    const grupo = scene.physics.add.group({
      key: 'manti',
      repeat: 0,
      setXY: {x: 90, y: 560}
    });
    grupo.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
    });
    scene.physics.add.collider(grupo, mundo.layer);
    scene.physics.add.overlap(player, grupo, coleccionarManti, null, this);

    // anadir bomba
    const grupoBomba = scene.physics.add.group({
      key: 'bomb',
      repeat: 0,
      setXY: {x: 120, y: 560}
    });
    grupoBomba.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
    });
    scene.physics.add.collider(grupoBomba, mundo.layer);
    scene.physics.add.overlap(player, grupoBomba, chocarBomba, null, this);


    manti.disableBody(true, true);
    const textoManti = scene.customObjects.texts.find(t => t.nombre === 'collect-manti');
    textoManti.texto.setVisible(true);
    scene.customObjects.sounds
      .forEach(
        (sound) => {
          sound.sonido.stop();
        }
      );
    const audioManti = scene.customObjects.sounds.find(s => s.nombre === 'manti').sonido;
    audioManti.play();
    setTimeout(
      () => {
        player.clearTint();
        textoManti.texto.setVisible(false);
      }, 5800
    );
  }

}

function calcularTiempo(scene: Phaser.Scene | any | CustomObjects) {
  setTimeout(() => {
      scene.customObjects.score.segundos += 1;
      calcularTiempo(scene);
    }, 1000
  );
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

