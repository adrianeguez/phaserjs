import {CustomObjects} from '../../interfaces/custom-objects';

export function anadirImagenes(imagenes: AnadirImagenInterface[],
                               scene: Phaser.Scene | any | CustomObjects,
                               tipo: 'load' | 'add' = 'load') {
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
              configTileMap.key = imagen.nombreMapa;
            }
            if (imagen.levelJSON) {
              configTileMap.key = imagen.nombreMapa;
            }

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
