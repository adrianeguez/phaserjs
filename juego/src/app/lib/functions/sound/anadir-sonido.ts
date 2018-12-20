import {AnadirSonidos} from '../../interfaces/anadir-sonidos';
import {CustomObjects} from '../../interfaces/custom-objects';

export function anadirSonido(sonidos: AnadirSonidos[],
                             scene: Phaser.Scene | any | CustomObjects,
                             tipo: 'preload' | 'create' = 'preload') {
  console.log(sonidos);
  sonidos
    .forEach(
      (sonido) => {
        if (tipo === 'preload') {
          scene.load.audio(sonido.nombre, sonido.audios);
        }
        if (tipo === 'create') {
          console.log(sonido.nombre)
          scene.customObjects.sounds.push({
            nombre: sonido.nombre,
            sonido: scene.sound.add(sonido.nombre, {loop: sonido.loop})
          });
        }
      }
    );
}
