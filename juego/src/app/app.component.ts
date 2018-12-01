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
        gravity: {y: 200}
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
    scene.load.image('background', 'assets/background/fondo.jpeg');
    // contexto.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // contexto.load.image('red', 'assets/particles/red.png');
  }
}

function create(componente: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any = this;
    console.log(scene);
    scene['background'] = scene.add.sprite(400, 300, 'background');
    console.log(scene)
    const platforms = scene.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');


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

}





