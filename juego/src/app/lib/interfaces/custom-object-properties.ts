import CursorKeys = Phaser.Input.Keyboard.CursorKeys;
import {Layers} from './layers';
import {RepeatGroup} from "./repeat-group";

export interface CustomObjectsProperties {
  player?: Phaser.Physics.Arcade.Sprite;

  repeatGroups?: RepeatGroup;

  cursors?: CursorKeys;
  layer?: Layers[];
  groups?: GroupStaticGroup[];
  sounds: { nombre: string, sonido: Phaser.Sound.BaseSound }[];
}
