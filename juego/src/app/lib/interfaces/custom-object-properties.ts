import CursorKeys = Phaser.Input.Keyboard.CursorKeys;
import {Layers} from './layers';
import {RepeatGroup} from './repeat-group';
import {Texto} from './texto';
import {Sonido} from './sonido';
import {Score} from './score';

export interface CustomObjectsProperties {
  player?: Phaser.Physics.Arcade.Sprite;
  repeatGroups?: RepeatGroup;
  cursors?: CursorKeys;
  layer?: Layers[];
  groups?: GroupStaticGroup[];
  sounds: Sonido[];
  score: Score;
  texts: Texto[];
}
