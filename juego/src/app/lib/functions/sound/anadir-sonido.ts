import {AnadirSonidos} from '../../interfaces/anadir-sonidos';
import {CustomObjects} from '../../interfaces/custom-objects';

export function anadirSonido(sonidos: AnadirSonidos[],
                             scene: Phaser.Scene | any | CustomObjects,
                             tipo: 'preload' | 'create' = 'preload') {
  sonidos
    .forEach(
      (sonido) => {
        if (tipo === 'preload') {
          scene.load.audio(sonido.nombre, sonido.audios);
        }
        if (tipo === 'create') {
          scene.customObjects.sounds.push({
            nombre: sonido.nombre,
            sonido: scene.sound.add(sonido.nombre, {loop: sonido.loop})
          });
        }
      }
    );
}
