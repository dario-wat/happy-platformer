import * as Phaser from 'phaser';
import turretImage from '../../assets/turret.png';

const TURRET_IMAGE = 'turret_image';

const SCALE = 0.2;
const ORIGIN_X = 0.64;

export default class Turret extends Phaser.GameObjects.Sprite {

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    startAngle: number,
    endAngle: number,
  ) {
    super(scene, x, y, TURRET_IMAGE);
    scene.add.existing(this);

    this.setOrigin(ORIGIN_X, 0.5);
    this.setScale(SCALE);

    this.setAngle(startAngle);
    this.scene.tweens.add({
      targets: this,
      angle: endAngle,
      duration: 2000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(TURRET_IMAGE, turretImage);
  }
}