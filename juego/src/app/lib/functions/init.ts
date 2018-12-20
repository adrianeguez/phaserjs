import {CustomObjects} from '../interfaces/custom-objects';

export function initCustomObjects(scene: Phaser.Scene | CustomObjects | any) {
  scene.customObjects = {};
  scene.customObjects.layer = [];
  scene.customObjects.groups = [];
  scene.customObjects.sounds = [];
}
