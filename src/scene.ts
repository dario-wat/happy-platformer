import * as Phaser from 'phaser';
import bgBlankImage from '../assets/bg_blank.png';
import Player from './game_objects/player';
import Blade from './game_objects/blade';
import KeyboardInput from './keyboard_input';
import Spike from './game_objects/spike';
import Turret from './game_objects/turret';
import Bullet from './game_objects/bullet';
import BulletManager from './managers/bullet_manager';
import Platform from './game_objects/platform';
import LevelBuilder, { X_ORIGIN, Y_ORIGIN } from './levels/level_builder';
import Gate from './game_objects/gate';
import levels, { LEVEL_HEIGHT, LEVEL_WIDTH } from './levels/levels';
import { distanceBetween } from './util';
import LaserTurret from './game_objects/laser_turret';
import Laser from './game_objects/laser';
import LaserManager from './managers/laser_manager';
import { CELL_SIZE, START_LEVEL } from './consts';
import Blood from './game_objects/blood';
import DeathCounterText from './game_objects/death_counter';

const PLATFORMER_SCENE = 'platformer_scene';
const BG_BLANK_IMAGE = 'bg_blank_image';

export const UI_FONT = { color: '#bababa', font: '24px Arial' };
const UI_X = X_ORIGIN;
const UI_Y = Y_ORIGIN - 50;

export class PlatformerScene extends Phaser.Scene {

  public player: Player;
  private deathCounter: DeathCounterText;

  public bulletManager: BulletManager;
  public laserManager: LaserManager;
  private levelBuilder: LevelBuilder;

  private keys: KeyboardInput;

  constructor() {
    super({ key: PLATFORMER_SCENE });
  }

  preload(): void {
    Player.preload(this);
    Blade.preload(this);
    Spike.preload(this);
    Turret.preload(this);
    Bullet.preload(this);
    LaserTurret.preload(this);
    Laser.preload(this);
    Platform.preload(this);
    Gate.preload(this);
    Blood.preload(this);
    this.load.image(BG_BLANK_IMAGE, bgBlankImage);
  }

  create(data: any): void {
    this.keys = new KeyboardInput(this);

    const background = this.add.image(X_ORIGIN, Y_ORIGIN, BG_BLANK_IMAGE)
    background.setOrigin(0, 0);
    background.setDisplaySize(LEVEL_WIDTH * CELL_SIZE, LEVEL_HEIGHT * CELL_SIZE);
    background.setAlpha(0.6);
    background.setDepth(-1000);

    this.player = new Player(this);

    this.bulletManager = new BulletManager(this);
    this.laserManager = new LaserManager();

    const level = data.level || START_LEVEL;
    this.levelBuilder = new LevelBuilder(this);
    this.levelBuilder.buildLevel(level);

    this.player.respawnAtGate(this.levelBuilder.startGate);

    this.physics.add.collider(this.player, this.levelBuilder.platforms);

    this.physics.add.overlap(
      this.player,
      this.bulletManager.bullets,
      (_player: Player, bullet: Bullet) => {
        this.killPlayer();
        bullet.destroy();
      },
    );

    this.physics.add.overlap(
      this.player,
      this.levelBuilder.blades,
      () => this.killPlayer(),
    );

    this.physics.add.overlap(
      this.player,
      this.levelBuilder.spikes,
      () => this.killPlayer(),
    );

    this.physics.add.overlap(
      this.player,
      this.laserManager.fakeLasers,
      () => this.killPlayer(),
    );

    this.physics.add.overlap(
      this.bulletManager.bullets,
      this.levelBuilder.platforms,
      (bullet: Bullet) => bullet.destroy(),
    );

    this.physics.add.overlap(
      this.player,
      this.levelBuilder.endGate,
      () => {
        const distance = distanceBetween(
          this.player.x,
          this.player.y,
          this.levelBuilder.endGate.x,
          this.levelBuilder.endGate.y,
        );

        const distanceTrigger = 10;
        if (distance > distanceTrigger) {
          return;
        }

        // Destroy this scene and start a new one with the next level
        if (level === levels.length - 1) {
          // TODO
          // this.scene.start('game_over_scene');
          this.scene.restart({ level: 0, deaths: 0 });
        } else {
          this.scene.restart({ level: level + 1, deaths: this.deathCounter.getDeaths() });
        }
      }
    );

    const xOffset = 150;
    this.deathCounter = new DeathCounterText(
      this,
      UI_X + xOffset,
      UI_Y,
      data.deaths || 0,
    );
    this.add.text(UI_X, UI_Y, 'Level ' + level.toString(), UI_FONT);
  }

  update(): void {
    if (this.keys.d.isDown && this.keys.w.isDown) {
      this.player.runRight();
      this.player.jump();
    } else if (this.keys.a.isDown && this.keys.w.isDown) {
      this.player.runLeft();
      this.player.jump();
    } else if (this.keys.d.isDown) {
      this.player.runRight();
    } else if (this.keys.a.isDown) {
      this.player.runLeft();
    } else if (this.keys.w.isDown) {
      this.player.idle();
      this.player.jump();
    } else {
      this.player.idle();
    }
  }

  private killPlayer(): void {
    this.deathCounter.add();
    this.player.killAndRespawn(this.levelBuilder.startGate);
  }
}