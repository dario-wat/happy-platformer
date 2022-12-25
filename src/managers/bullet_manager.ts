import * as Phaser from 'phaser';
import Bullet from '../game_objects/bullet';
import { emptyDefaults } from '../util';

export default class BulletManager {

  public bullets: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene) {
    this.bullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });
    this.bullets.defaults = emptyDefaults;
  }

  add(bullet: Bullet): void {
    this.bullets.add(bullet);
  }
}