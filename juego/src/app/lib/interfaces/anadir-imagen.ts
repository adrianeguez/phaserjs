import {ImagenRepeat} from './imagen-repeat';

export interface AnadirImagenInterface {
  nombre?: string;
  url?: string;
  urlNombreArchivo?: string;
  posX?: number;
  posY?: number;
  stepX?: number;
  imagenRepeat?: ImagenRepeat[];
  sizeX?: number;
  sizeY?: number;
  index?: number;
  bounce?: number;
  frameWidth?: number;
  frameHeight?: number;
  nombreLayer?: string;
  layerPositions?: LayerPosition[];
  collideWorldBounds?: boolean;
  tipo?: 'imagen' | 'tileset' | 'player' | 'repeat';
  level?: Array<number[]>;
  nombreMapa?: string;
  levelCSV?: string;
  levelJSON?: string;
  animaciones?: AnimationConfig[] | any[];
}

