import * as Phaser from 'phaser';
import bulletImage from '../../assets/bullet.png';
import BulletManager from '../managers/bullet_manager';
import { PlatformerScene } from '../scene';
import { DynamicSprite } from './sprite';

const BULLET_IMAGE = 'bullet_image';
const BULLET_ANIMATION = 'bullet_animation';

const SPEED = 200;
const SIZE = 12;

export default class Bullet extends DynamicSprite {

  constructor(
    scene: PlatformerScene,
    x: number,
    y: number,
    angleInRad: number,
    speed: number = SPEED,
  ) {
    super(scene, x, y, BULLET_IMAGE);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.setDisplaySize(SIZE, SIZE);
    this.setCircle(this.width / 4);   // Make the bullet body smaller than the sprite
    this.setOffset(this.width / 4, this.height / 4);
    this.setVelocity(speed * Math.cos(angleInRad), speed * Math.sin(angleInRad));

    scene.bulletManager.add(this);

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

    // Remove bullet after it leaves the screen
    this.scene.events.on('update', () => {
      if (!this.scene) {
        return;
      }
      if (
        this.x < 0 || this.x > this.scene.sys.canvas.width
        || this.y < 0 || this.y > this.scene.sys.canvas.height
      ) {
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