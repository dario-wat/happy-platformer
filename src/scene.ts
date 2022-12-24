import * as Phaser from 'phaser';
import bgBlankImage from '../assets/bg_blank.png';
import Player from './game_objects/player';
import Blade from './game_objects/blade';
import KeyboardInput from './keyboard_input';
import Spike from './game_objects/spike';
import Turret from './game_objects/turret';
import Bullet from './game_objects/bullet';
import BulletManager from './bullet_manager';
import Platform from './game_objects/platform';
import LevelBuilder from './levels/level_builder';
import Gate from './game_objects/gate';
import levels from './levels/levels';
import { distanceBetween } from './util';

const PLATFORMER_SCENE = 'platformer_scene';
const BG_BLANK_IMAGE = 'bg_blank_image';

export class PlatformerScene extends Phaser.Scene {

  public player: Player;

  public bulletManager: BulletManager;
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
    Platform.preload(this);
    Gate.preload(this);
    this.load.image(BG_BLANK_IMAGE, bgBlankImage);
  }

  create(data: any): void {
    this.keys = new KeyboardInput(this);

    this.player = new Player(this);

    this.bulletManager = new BulletManager(this);

    const level = data.level || 0;
    this.levelBuilder = new LevelBuilder(this, this.player);
    this.levelBuilder.buildLevel(level);

    this.player.respawnAtGate(this.levelBuilder.startGate);

    this.physics.add.collider(this.player, this.levelBuilder.platforms);

    this.physics.add.overlap(
      this.player,
      this.bulletManager.bullets,
      (player: Player, bullet: Bullet) => {
        player.respawnAtGate(this.levelBuilder.startGate);
        bullet.destroy();
      },
    );

    this.physics.add.overlap(
      this.player,
      this.levelBuilder.blades,
      (player: Player) => player.respawnAtGate(this.levelBuilder.startGate),
    );

    this.physics.add.overlap(
      this.player,
      this.levelBuilder.spikes,
      (player: Player) => player.respawnAtGate(this.levelBuilder.startGate),
    );

    this.physics.add.overlap(
      this.bulletManager.bullets,
      this.levelBuilder.platforms,
      (bullet: Bullet) => bullet.destroy(),
    );

    // this.add.image(0, 0, BG_BLANK_IMAGE).setOrigin(0, 0).setDisplaySize(
    //   this.cameras.main.width,
    //   this.cameras.main.height,
    // );

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
          this.scene.restart({ level: 0 });
        } else {
          this.scene.restart({ level: level + 1 });
        }
      }
    );

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

}