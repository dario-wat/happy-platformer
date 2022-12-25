import * as Phaser from 'phaser';
import laserTurretImage from '../../assets/laser_turret.png';
import { CELL_SIZE } from '../consts';
import { PlatformerScene } from '../scene';
import Laser from './laser';

const LASER_TURRET_IMAGE = 'laser_turret_image';

export const LASER_TURRET_GRID_SIZE = 1;

const IMAGE_SIZE = 126;
const SIZE = LASER_TURRET_GRID_SIZE * CELL_SIZE;
const SCALE = SIZE / IMAGE_SIZE;
const ORIGIN_X = 0.64;

export default class LaserTurret extends Phaser.GameObjects.Sprite {

  constructor(
    public scene: PlatformerScene,
    x: number,
    y: number,
    angle: number,
    startDelay: number = 0,
  ) {
    super(scene, x, y, LASER_TURRET_IMAGE);
    scene.add.existing(this);

    this.setOrigin(ORIGIN_X, 0.5);
    this.setScale(SCALE);

    this.setAngle(angle);

    const rotation = this.rotation + Math.PI;
    const width = this.width * SCALE * ORIGIN_X;
    new Laser(
      this.scene,
      this.x + width * Math.cos(rotation),
      this.y + width * Math.sin(rotation),
      rotation,
      startDelay,
    );
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(LASER_TURRET_IMAGE, laserTurretImage);
  }
}
