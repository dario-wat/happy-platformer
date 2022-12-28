import * as Phaser from 'phaser';
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
import levels from './levels/levels';
import { distanceBetween } from './util';
import LaserTurret from './game_objects/laser_turret';
import Laser from './game_objects/laser';
import LaserManager from './managers/laser_manager';
import { HUD_FONT, START_LEVEL } from './consts';
import Blood from './game_objects/blood';
import DeathCounterText from './game_objects/death_counter';
import BackgroundImage from './game_objects/background_image';
import { START_GAME_SCENE } from './start_game_scene';

export const PLATFORMER_SCENE = 'platformer_scene';

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
    BackgroundImage.preload(this);
  }

  create(data: any): void {
    console.log(data);
    this.keys = new KeyboardInput(this);

    new BackgroundImage(this);

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

        if (level === levels.length - 1) {
          this.scene.start(START_GAME_SCENE, { deaths: this.deathCounter.getDeaths() });
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
    this.add.text(UI_X, UI_Y, 'Level ' + (level + 1).toString(), HUD_FONT);
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