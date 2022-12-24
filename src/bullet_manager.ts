import * as Phaser from 'phaser';
import Bullet from './game_objects/bullet';
import { emptyDefaults } from './util';

export default class BulletManager {

  private static instance: BulletManager;

  public bullets: Phaser.Physics.Arcade.Group;

  private constructor(scene: Phaser.Scene) {
    this.bullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });
    this.bullets.defaults = emptyDefaults;
  }

  static create(scene: Phaser.Scene): BulletManager {
    if (!BulletManager.instance) {
      BulletManager.instance = new BulletManager(scene);
    }
    return BulletManager.instance;
  }

  static get(): BulletManager {
    if (!BulletManager.instance) {
      throw new Error('BulletManager not initialized');
    }
    return BulletManager.instance;
  }

  add(bullet: Bullet): void {
    this.bullets.add(bullet);
  }
}