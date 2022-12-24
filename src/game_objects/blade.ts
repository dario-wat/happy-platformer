import * as Phaser from 'phaser';
import bladeImage from '../../assets/blade.png';
import bladeColumnImage from '../../assets/blade_column.png';
import { DynamicSprite } from './sprite';
import { angleBetween, distanceBetween } from '../util';
import { CELL_SIZE } from '../consts';

const BLADE_IMAGE = 'blade_image';
const BLADE_COLUMN_IMAGE = 'blade_column_image';

export const BLADE_GRID_SIZE = 2;

const IMAGE_SIZE = 512; // Hardcoded (image size)
const SIZE = BLADE_GRID_SIZE * CELL_SIZE;
const BLADE_SCALE = SIZE / IMAGE_SIZE;
const BLADE_COLUMN_WIDTH = 16;
const BLADE_LOOP_DURATION = 2000;

export default class Blade extends DynamicSprite {

  constructor(
    scene: Phaser.Scene,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    delay: number = 0,
  ) {
    super(scene, x1, y1, BLADE_IMAGE);

    // Add a column to the blade
    const column = scene.add.sprite((x1 + x2) / 2, (y1 + y2) / 2, BLADE_COLUMN_IMAGE);
    column.setDisplaySize(BLADE_COLUMN_WIDTH, distanceBetween(x1, y1, x2, y2));
    column.rotation = angleBetween(x1, y1, x2, y2) + Math.PI / 2;

    // Blade config
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(BLADE_SCALE);
    this.setCircle(this.width / 2);
    this.body.setAllowGravity(false);

    // Rotate animation
    scene.tweens.add({
      targets: this,
      angle: -360,
      duration: 1000,
      ease: 'Linear',
      repeat: -1,
    });

    // Make the blade move between two points
    scene.tweens.add({
      targets: this,
      x: x2,
      y: y2,
      ease: 'Sine.easeInOut',
      duration: BLADE_LOOP_DURATION,
      yoyo: true,
      repeat: -1,
      delay,
    });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(BLADE_IMAGE, bladeImage);
    scene.load.image(BLADE_COLUMN_IMAGE, bladeColumnImage);
  }
}