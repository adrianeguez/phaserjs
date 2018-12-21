import {CustomObjects} from '../../interfaces/custom-objects';
import {AnadirTexto} from '../../interfaces/anadir-texto';

export function anadirTexto(textos: AnadirTexto[],
                            scene: Phaser.Scene | any | CustomObjects) {
  textos
    .forEach(
      (texto) => {
        const textoInstancia = scene.add.text(texto.posX, texto.posY, texto.text, {
          fontSize: texto.fontSize,
          fill: texto.color
        });
        scene.customObjects.texts.push({
          nombre: texto.name,
          texto: textoInstancia
        });
      }
    );
}
