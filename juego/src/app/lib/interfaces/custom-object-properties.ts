import CursorKeys = Phaser.Input.Keyboard.CursorKeys;
import {Layers} from './layers';

export interface CustomObjectsProperties {
  player?: Phaser.Physics.Arcade.Sprite;
  cursors?: CursorKeys;
  layer?: Layers[];
  groups?: GroupStaticGroup[];
  sounds: { nombre: string, sonido: Phaser.Sound.BaseSound }[];
}
