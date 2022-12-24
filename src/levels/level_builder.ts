import * as Phaser from 'phaser';
import levels from '../levels/levels';
import { CELL_SIZE } from '../consts';
import Platform from '../game_objects/platform';

const LEVEL_X = 200;
const LEVEL_Y = 100;

const X_ORIGIN = LEVEL_X + CELL_SIZE;
const Y_ORIGIN = LEVEL_Y + CELL_SIZE;

const LEVEL_WIDTH = 40;
const LEVEL_HEIGHT = 20;

export default class LevelBuilder {

  private static instance: LevelBuilder;

  public platforms: Phaser.Physics.Arcade.StaticGroup;

  private constructor(private scene: Phaser.Scene) {
    this.platforms = scene.physics.add.staticGroup();
  }

  static create(scene: Phaser.Scene): LevelBuilder {
    if (!LevelBuilder.instance) {
      LevelBuilder.instance = new LevelBuilder(scene);
    }
    return LevelBuilder.instance;
  }

  static get(): LevelBuilder {
    if (!LevelBuilder.instance) {
      throw new Error('LevelBuilder not initialized');
    }
    return LevelBuilder.instance;
  }

  buildLevel(level: number): void {
    this.buildBoundingPlatforms();
    this.buildPlatforms(level);
  }

  private buildBoundingPlatforms(): void {
    this.platforms.add(new Platform(
      this.scene,
      LEVEL_X,
      LEVEL_Y,
      LEVEL_WIDTH,
      false,
    ));
    this.platforms.add(new Platform(
      this.scene,
      LEVEL_X,
      LEVEL_Y + (LEVEL_HEIGHT - 1) * CELL_SIZE,
      LEVEL_WIDTH,
      false,
    ));
    this.platforms.add(new Platform(
      this.scene,
      LEVEL_X,
      LEVEL_Y,
      LEVEL_HEIGHT,
      true,
    ));
    this.platforms.add(new Platform(
      this.scene,
      LEVEL_X + (LEVEL_WIDTH - 1) * CELL_SIZE,
      LEVEL_Y,
      LEVEL_HEIGHT,
      true,
    ));
  }

  private buildPlatforms(level: number): void {
    for (const platform of levels[level].platforms) {
      this.platforms.add(new Platform(
        this.scene,
        X_ORIGIN + platform.x * CELL_SIZE,
        Y_ORIGIN + platform.y * CELL_SIZE,
        platform.length,
        platform.isVertical,
      ));
    }
  }
}