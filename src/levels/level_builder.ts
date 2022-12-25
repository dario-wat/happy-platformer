import * as Phaser from 'phaser';
import levels from '../levels/levels';
import { CELL_SIZE, DEBUG_GRID } from '../consts';
import Platform from '../game_objects/platform';
import Spike from '../game_objects/spike';
import { debugLine, emptyDefaults } from '../util';
import Turret, { TURRET_GRID_SIZE } from '../game_objects/turret';
import Blade, { BLADE_GRID_SIZE } from '../game_objects/blade';
import Gate, { GATE_GRID_SIZE } from '../game_objects/gate';
import { PlatformerScene } from '../scene';
import LaserTurret from '../game_objects/laser_turret';

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
  
  cx and cy additionally take a size parameter, which is the number of
  cells the object spans. This is used to calculate the center of the
  object.
*/

function ox(x: number): number {
  return X_ORIGIN + x * CELL_SIZE;
}

function oy(y: number): number {
  return Y_ORIGIN + y * CELL_SIZE;
}

function cx(x: number, size: number = 1): number {
  return ox(x) + CELL_SIZE * size / 2;
}

function cy(y: number, size: number = 1): number {
  return oy(y) + CELL_SIZE * size / 2;
}

export default class LevelBuilder {

  public platforms: Phaser.Physics.Arcade.StaticGroup;
  public spikes: Phaser.Physics.Arcade.StaticGroup;
  public blades: Phaser.Physics.Arcade.Group
  public startGate: Gate;
  public endGate: Gate;

  constructor(
    private scene: PlatformerScene,
  ) {
    this.platforms = scene.physics.add.staticGroup();
    this.spikes = scene.physics.add.staticGroup();
    this.blades = scene.physics.add.group({
      classType: Blade,
      runChildUpdate: true,
    });
    this.blades.defaults = emptyDefaults;
  }

  buildLevel(level: number): void {
    this.buildBoundingPlatforms();
    this.buildPlatforms(level);
    this.buildSpikes(level);
    this.buildTurrets(level);
    this.buildLaserTurrets(level);
    this.buildBlades(level);
    this.buildGates(level);
    this.drawLevel(level);

    if (DEBUG_GRID) {
      this.debugGrid();
    }
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
    if (!levels[level].platforms) {
      return;
    }

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
    if (!levels[level].spikes) {
      return;
    }

    for (const spike of levels[level].spikes) {
      this.spikes.add(new Spike(
        this.scene,
        cx(spike.x),
        cy(spike.y),
        spike.direction,
      ));
    }
  }

  private buildTurrets(level: number): void {
    if (!levels[level].turrets) {
      return;
    }

    for (const turret of levels[level].turrets) {
      new Turret(
        this.scene,
        cx(turret.x, TURRET_GRID_SIZE),
        cy(turret.y, TURRET_GRID_SIZE),
        turret.startDelay,
      );
    }
  }

  private buildLaserTurrets(level: number): void {
    if (!levels[level].lasers) {
      return;
    }

    for (const turret of levels[level].lasers) {
      new LaserTurret(
        this.scene,
        cx(turret.x, TURRET_GRID_SIZE),
        cy(turret.y, TURRET_GRID_SIZE),
        turret.angle,
        turret.startDelay,
      );
    }
  }

  private buildBlades(level: number): void {
    if (!levels[level].blades) {
      return;
    }

    for (const blade of levels[level].blades) {
      this.blades.add(new Blade(
        this.scene,
        cx(blade.x1, BLADE_GRID_SIZE),
        cy(blade.y1, BLADE_GRID_SIZE),
        cx(blade.x2, BLADE_GRID_SIZE),
        cy(blade.y2, BLADE_GRID_SIZE),
        blade.delay,
      ));
    }
  }

  private buildGates(level: number): void {
    this.startGate = new Gate(
      this.scene,
      cx(levels[level].startGate.x, GATE_GRID_SIZE),
      cy(levels[level].startGate.y, GATE_GRID_SIZE),
      true,
    );
    this.endGate = new Gate(
      this.scene,
      cx(levels[level].endGate.x, GATE_GRID_SIZE),
      cy(levels[level].endGate.y, GATE_GRID_SIZE),
      false,
    );
  }

  private drawLevel(level: number): void {
    const levelYOffset = 50;
    this.scene.add.text(
      X_ORIGIN,
      Y_ORIGIN - levelYOffset,
      'Level ' + level.toString(),
      { color: '#bababa', font: '24px Arial' },
    );
  };

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