import * as Phaser from 'phaser';
import turretImage from '../../assets/turret.png';
import { PlatformerScene } from '../scene';
import { angleBetween } from '../util';
import Bullet from './bullet';
import Player from './player';

const TURRET_IMAGE = 'turret_image';

const SCALE = 0.2;
const ORIGIN_X = 0.64;
const BULLET_FIRE_DELAY = 3000;

export default class Turret extends Phaser.GameObjects.Sprite {

  constructor(
    scene: Phaser.Scene,
    private player: Player,
    x: number,
    y: number,
    startDelay: number = 0,
  ) {
    super(scene, x, y, TURRET_IMAGE);
    scene.add.existing(this);

    this.setOrigin(ORIGIN_X, 0.5);
    this.setScale(SCALE);

    // Turret should always face the player
    this.scene.events.on('update', () => {
      const angle = angleBetween(
        this.player.x,
        this.player.y,
        this.x,
        this.y,
      );
      this.setRotation(angle);
    });

    // Fire bullet every X seconds
    this.scene.time.addEvent({
      delay: BULLET_FIRE_DELAY,
      callback: this.fireBullet,
      callbackScope: this,
      loop: true,
      startAt: startDelay,
    });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(TURRET_IMAGE, turretImage);
  }

  private fireBullet(): void {
    const rotation = this.rotation + Math.PI;
    const width = this.width * SCALE * ORIGIN_X;
    new Bullet(
      this.scene,
      this.x + width * Math.cos(rotation),
      this.y + width * Math.sin(rotation),
      rotation,
    );
  }
}