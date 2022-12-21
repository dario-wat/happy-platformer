import * as Phaser from 'phaser';
import bladeImage from '../assets/blade.png';
import bladeColumnImage from '../assets/blade_column.png';

const BLADE_IMAGE = 'blade_image';
const BLADE_COLUMN_IMAGE = 'blade_column_image';

export class Blade {

  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  // TODO introduce delay
  constructor(
    scene: Phaser.Scene,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) {
    // TODO eucl
    const eucl = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt(
      (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2),
    );
    const angle = (x1: number, y1: number, x2: number, y2: number) => Math.atan2(y2 - y1, x2 - x1);

    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const column = scene.physics.add.sprite(centerX, centerY, BLADE_COLUMN_IMAGE);
    column.setDisplaySize(16, eucl(x1, y1, x2, y2));
    column.body.setAllowGravity(false);
    column.rotation = angle(x1, y1, x2, y2) + Math.PI / 2;
    // TODO fix rotation

    this.sprite = scene.physics.add.sprite(x1, y1, BLADE_IMAGE);
    this.sprite.setScale(0.1);
    this.sprite.setCircle(this.sprite.width / 2);
    this.sprite.body.setAllowGravity(false);

    // TODO create spinning animation

    // Make the blade move between two points
    scene.tweens.add({
      targets: this.sprite,
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