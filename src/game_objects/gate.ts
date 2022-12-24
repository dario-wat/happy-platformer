import { CELL_SIZE } from '../consts';
import { StaticSprite } from './sprite';
import doorClosedImage from '../../assets/door_closed.png';
import doorOpenImage from '../../assets/door_open.png';
import laserDoorImage from '../../assets/laser_door.png';

const DOOR_OPEN_IMAGE = 'door_open_image';
const DOOR_CLOSED_IMAGE = 'door_closed_image';
const LASER_DOOR_IMAGE = 'laser_door_image';

export const GATE_GRID_SIZE = 2;

const IMAGE_SIZE = 512;
const SIZE = GATE_GRID_SIZE * CELL_SIZE;
const SCALE = SIZE / IMAGE_SIZE;

export default class Gate extends StaticSprite {

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, DOOR_CLOSED_IMAGE);
    scene.add.existing(this);

    this.setScale(SCALE);
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(DOOR_CLOSED_IMAGE, doorClosedImage);
    scene.load.image(DOOR_OPEN_IMAGE, doorOpenImage);
    scene.load.spritesheet(
      LASER_DOOR_IMAGE,
      laserDoorImage,
      { frameWidth: 32, frameHeight: 32 },
    );
  }
}