import * as Phaser from 'phaser';

export default class LaserManager {

  public fakeLasers: Phaser.Physics.Arcade.Group[];

  constructor() {
    this.fakeLasers = [];
  }

  add(fakeLaser: Phaser.Physics.Arcade.Group): void {
    this.fakeLasers.push(fakeLaser);
  }
}