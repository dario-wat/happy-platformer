import * as Phaser from 'phaser';
import { PlatformerScene, UI_FONT } from '../scene';

export default class DeathCounterText extends Phaser.GameObjects.Text {

  constructor(
    scene: PlatformerScene,
    x: number,
    y: number,
    private deathCount: number,
  ) {
    super(scene, x, y, `Deaths: ${deathCount}`, UI_FONT);
    scene.add.existing(this);
  }

  public getDeaths(): number {
    return this.deathCount;
  }

  public add(): void {
    this.deathCount++;
    this.setText(`Deaths: ${this.deathCount}`);
  }
}