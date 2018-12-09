# Images

## Load images

```typescript
function preload(component: AppComponent) {
  return function () {
    const scene: Phaser.Scene = this;
    scene.load.image('imageName', 'assets/fileName.png');
  }
}

function create(component: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any = this;
     scene.add.image(
         20, // pos x -> esquina superior izquierda hacia derecha
         10, // pos x -> esquina superior izquierda hacia abajo
         'imageName' // nombre imagen cargada en preload
         )
  }
}
```

## Load tilesets Maps

```typescript
function preload(component: AppComponent) {
  return function () {
    const scene: Phaser.Scene = this;
    scene.load.image('imageName', 'assets/fileName.png');
  }
}

function create(component: AppComponent) {
  return function () {
    const scene: Phaser.Scene | any = this;
     scene.add.image(
         20, // pos x -> esquina superior izquierda hacia derecha
         10, // pos x -> esquina superior izquierda hacia abajo
         'imageName' // nombre imagen cargada en preload
         )
  }
}
```