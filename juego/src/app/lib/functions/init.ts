import {CustomObjects} from '../interfaces/custom-objects';

export function initCustomObjects(scene: Phaser.Scene | CustomObjects | any) {
  scene.customObjects = {};
  scene.customObjects.layer = [];
  scene.customObjects.groups = [];
  scene.customObjects.sounds = [];
  scene.customObjects.repeatGroups = [];
  scene.customObjects.texts = [];
  scene.customObjects.score = {points: 0, segundos: 0, terminoJuego: false};
}
