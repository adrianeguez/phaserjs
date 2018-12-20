interface AnadirImagenInterface {
  nombre?: string;
  url?: string;
  urlNombreArchivo?: string;
  posX?: number;
  posY?: number;
  sizeX?: number;
  sizeY?: number;
  index?: number;
  bounce?: number;
  frameWidth?: number;
  frameHeight?: number;
  nombreLayer?: string;
  layerPositions?: LayerPosition[];
  collideWorldBounds?: boolean;
  tipo?: 'imagen' | 'tileset' | 'player';
  level?: Array<number[]>;
  nombreMapa?: string;
  levelCSV?: string;
  levelJSON?: string;
  animaciones?: AnimationConfig[] | any[];
}

