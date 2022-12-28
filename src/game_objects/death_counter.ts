import * as Phaser from 'phaser';
import { HUD_FONT, MAKE_PLAYER_INVULNERABLE } from '../consts';
import { PlatformerScene } from '../scene';

export default class DeathCounterText extends Phaser.GameObjects.Text {

  constructor(
    scene: PlatformerScene,
    x: number,
    y: number,
    private deathCount: number,
  ) {
    super(scene, x, y, `Deaths: ${deathCount}`, HUD_FONT);
    scene.add.existing(this);
  }

  public getDeaths(): number {
    return this.deathCount;
  }

  public add(): void {
    if (MAKE_PLAYER_INVULNERABLE) {
      return;
    }
    this.deathCount++;
    this.setText(`Deaths: ${this.deathCount}`);
  }
}