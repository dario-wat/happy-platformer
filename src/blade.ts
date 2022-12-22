import * as Phaser from 'phaser';
import bladeImage from '../assets/blade.png';
import bladeColumnImage from '../assets/blade_column.png';
import { DynamicSprite } from './sprite';

const BLADE_IMAGE = 'blade_image';
const BLADE_COLUMN_IMAGE = 'blade_column_image';

export class Blade extends DynamicSprite {

  // TODO introduce delay
  constructor(
    scene: Phaser.Scene,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) {
    super(scene, x1, y1, BLADE_IMAGE);

    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const column = scene.physics.add.sprite(centerX, centerY, BLADE_COLUMN_IMAGE);
    column.setDisplaySize(16, Phaser.Math.Distance.Between(x1, y1, x2, y2));
    column.body.setAllowGravity(false);
    column.rotation = Phaser.Math.Angle.Between(x1, y1, x2, y2) + Math.PI / 2;

    // TODO fix rotation

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.1);
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
      duration: 2000,
      yoyo: true,
      repeat: -1,
    });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(BLADE_IMAGE, bladeImage);
    scene.load.image(BLADE_COLUMN_IMAGE, bladeColumnImage);
  }
}