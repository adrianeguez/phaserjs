# Game
## Game object

### Description

<table><thead><tr><th>Name</th><th>DefaultValue</th><th>Description</th></tr></thead><tbody><tr><td>width</td><td>1024</td><td>The width of the canvas element.</td></tr><tr><td>height</td><td>768</td><td>The height of the canvas element.</td></tr><tr><td>zoom</td><td>1</td><td>Scalar for the canvas and render size.</td></tr><tr><td>type</td><td>Phaser.AUTO</td><td>Switch render mode:Phaser.AUTO,Phaser.CANVAS,Phaser.WEBGL,Phaser.HEADLESS</td></tr><tr><td>resolution</td><td>1</td><td>Multiplier of the canvas’s size, does not increase the rendered field.</td></tr><tr><td>parent</td><td>null</td><td>Id of the containing DOM-Element.</td></tr><tr><td>canvas</td><td>null</td><td>You know it? Write a comment pls</td></tr><tr><td>canvasStyle</td><td>null</td><td>Sets the canvas context fillStyle property.</td></tr><tr><td>scene</td><td>null</td><td>A scene object or similar custom object</td></tr><tr><td>seed</td><td>Random number</td><td>Initial seed for all random calcultions</td></tr><tr><td>title</td><td>“</td><td>The game title.</td></tr><tr><td>url</td><td><a href="http://phaser.io">http://phaser.io</a></td><td>The game url.</td></tr><tr><td>version</td><td>“</td><td>The current game version.</td></tr><tr><td>input.keyboard</td><td>true</td><td>Enable or disable the keyboard input.</td></tr><tr><td>input.keyboard.target</td><td>window</td><td>Configure the keyboard input event source .</td></tr><tr><td>input.mouse</td><td>true</td><td>Enable or disable the mouse input.</td></tr><tr><td>input.mouse.target</td><td>null</td><td>Configure the mouse input event source.</td></tr><tr><td>disableContextMenu</td><td>false</td><td>Prevent default action of the mouse right click.</td></tr><tr><td>banner</td><td>null</td><td>Hides the banner.</td></tr><tr><td>banner.hidePhaser</td><td>false</td><td>?</td></tr><tr><td>banner.text</td><td>’#ffffff’</td><td>Banner text color.</td></tr><tr><td>banner.background</td><td>[‘#ff0000’,<br>’#ffff00’,<br>’#00ff00’,<br>’#00ffff’,<br>’#000000’]</td><td>Banner background color.</td></tr><tr><td>fps</td><td>null</td><td>The maximum fps.</td></tr><tr><td>pixelArt</td><td>false</td><td>Use pixel art filter, adapts point filter. Effects the scaling of textures.</td></tr><tr><td>clearBeforeRender</td><td>true</td><td>Empty the canvas before first render.</td></tr><tr><td>backgroundColor</td><td>0</td><td>Custom background color. (0x000000 - 0xFFFFFF)</td></tr><tr><td>transparent</td><td>false</td><td>Sets the background color of the canvas to transparent.</td></tr><tr><td>preserveDrawingBuffer</td><td>false</td><td>?</td></tr><tr><td>callbacks.preBoot</td><td>Phaser.utils.NOOP</td><td>Callback function before boot.</td></tr><tr><td>callbacks.postBoot</td><td>Phaser.utils.NOOP</td><td>Callback function after boot.</td></tr><tr><td>useTicker</td><td></td><td>?</td></tr><tr><td>physics</td><td></td><td>Configure the physics system. Ex: { system: ‘impact’, gravity: 0, cellSize: 64, }</td></tr><tr><td>images.default</td><td>data:image/png</td><td>base64</td></tr><tr><td>images.missing</td><td>data:image/png</td><td>base64</td></tr></tbody></table>

For more information [go to the oficial docs](https://photonstorm.github.io/phaser3-docs/Phaser.Game.html)

### Example

```typescript
 const  config = {
      type: Phaser.AUTO,
      width: 800,  // canvas width
      height: 600, // canvas height
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 300
          },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      }
    };
```