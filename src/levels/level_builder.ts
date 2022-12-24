import * as Phaser from 'phaser';
import levels from '../levels/levels';
import { CELL_SIZE } from '../consts';
import Platform from '../game_objects/platform';
import Spike from '../game_objects/spike';
import { debugLine, debugPoint } from '../util';

const LEVEL_X = 200;
const LEVEL_Y = 100;

const X_ORIGIN = LEVEL_X + CELL_SIZE;
const Y_ORIGIN = LEVEL_Y + CELL_SIZE;

const LEVEL_WIDTH = 40;
const LEVEL_HEIGHT = 20;

/* 
  Level builder is built as a grid of cells. We use the following
  functions to convert between cell coordinates and pixel coordinates.
  ox and oy convert the grid coordinates into top left pixel coordinates.
  cx and cy convert the grid coordiantes into center pixel coordinates.
*/

function ox(x: number): number {
  return X_ORIGIN + x * CELL_SIZE;
}

function oy(y: number): number {
  return Y_ORIGIN + y * CELL_SIZE;
}

function cx(x: number): number {
  return ox(x) + CELL_SIZE / 2;
}

function cy(y: number): number {
  return oy(y) + CELL_SIZE / 2;
}

// TODO add cx and cy

export default class LevelBuilder {

  private static instance: LevelBuilder;

  public platforms: Phaser.Physics.Arcade.StaticGroup;
  public spikes: Phaser.Physics.Arcade.StaticGroup;

  private constructor(private scene: Phaser.Scene) {
    this.platforms = scene.physics.add.staticGroup();
    this.spikes = scene.physics.add.staticGroup();
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
    this.buildSpikes(level);
  }

  private buildBoundingPlatforms(): void {
    this.platforms.add(new Platform(
      this.scene,
      ox(-1),
      oy(-1),
      LEVEL_WIDTH + 2,
      false,
    ));
    this.platforms.add(new Platform(
      this.scene,
      ox(-1),
      oy(LEVEL_HEIGHT),
      LEVEL_WIDTH + 2,
      false,
    ));
    this.platforms.add(new Platform(
      this.scene,
      ox(-1),
      oy(-1),
      LEVEL_HEIGHT + 2,
      true,
    ));
    this.platforms.add(new Platform(
      this.scene,
      ox(LEVEL_WIDTH),
      oy(-1),
      LEVEL_HEIGHT + 2,
      true,
    ));
  }

  private buildPlatforms(level: number): void {
    for (const platform of levels[level].platforms) {
      this.platforms.add(new Platform(
        this.scene,
        ox(platform.x),
        oy(platform.y),
        platform.length,
        platform.isVertical,
      ));
    }
  }

  private buildSpikes(level: number): void {
    for (const spike of levels[level].spikes) {
      this.spikes.add(new Spike(
        this.scene,
        cx(spike.x),
        cy(spike.y),
        spike.direction,
      ));
    }
  }

  private debugGrid(): void {
    // Draw index numbers above the grid
    for (let x = 0; x < LEVEL_WIDTH; x++) {
      this.scene.add.text(
        ox(x) + 5,
        oy(-2) + 5,
        x.toString(),
        { color: '#ff0000', font: '12px Arial' },
      );
    }

    // Draw index numbers to the left of the grid
    for (let y = 0; y < LEVEL_HEIGHT; y++) {
      this.scene.add.text(
        ox(-2) + 5,
        oy(y) + 5,
        y.toString(),
        { color: '#ff0000', font: '12px Arial' },
      );
    }

    for (let x = 0; x <= LEVEL_WIDTH; x++) {
      debugLine(this.scene, ox(x), oy(0), ox(x), oy(LEVEL_HEIGHT));
    }
    for (let y = 0; y <= LEVEL_HEIGHT; y++) {
      debugLine(this.scene, ox(0), oy(y), ox(LEVEL_WIDTH), oy(y));
    }
  }
}