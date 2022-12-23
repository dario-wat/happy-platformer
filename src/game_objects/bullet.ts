import * as Phaser from 'phaser';
import bulletImage from '../../assets/bullet.png';
import { DynamicSprite } from './sprite';

const BULLET_IMAGE = 'bullet_image';
const BULLET_ANIMATION = 'bullet_animation';

export default class Bullet extends DynamicSprite {

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    angle: number,
    speed: number,
  ) {
    super(scene, x, y, BULLET_IMAGE);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.setAngle(angle);
    this.setVelocity(speed * Math.cos(angle), speed * Math.sin(angle));

    this.anims.create({
      key: BULLET_ANIMATION,
      frames: this.anims.generateFrameNumbers(
        BULLET_IMAGE,
        { start: 0, end: 4 },
      ),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.play(BULLET_ANIMATION, true);

    // TODO this will need to be fixed once the levels are bounded
    // Destroy if it goes off screen
    this.scene.events.on('update', () => {
      if (this.x < 0 || this.x > this.scene.cameras.main.width ||
        this.y < 0 || this.y > this.scene.cameras.main.height) {
        this.destroy();
      }
    });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.spritesheet(
      BULLET_IMAGE,
      bulletImage,
      { frameWidth: 16, frameHeight: 16 },
    );
  }
}