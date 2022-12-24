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

const PLATFORMER_SCENE = 'platformer_scene';
const BG_BLANK_IMAGE = 'bg_blank_image';

export class PlatformerScene extends Phaser.Scene {

  private player: Player;

  private bulletManager: BulletManager;
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

  create(): void {
    this.keys = new KeyboardInput(this);

    this.player = new Player(this);

    this.bulletManager = BulletManager.create(this);

    this.levelBuilder = LevelBuilder.create(this, this.player);
    this.levelBuilder.buildLevel(0);

    this.physics.add.collider(this.player, this.levelBuilder.platforms);

    this.physics.add.overlap(
      this.player,
      this.bulletManager.bullets,
      (player: Player, bullet: Bullet) => {
        player.respawn();
        bullet.destroy();
      },
    );

    this.physics.add.overlap(
      this.player,
      this.levelBuilder.blades,
      (player: Player) => player.respawn(),
    );

    this.physics.add.overlap(
      this.player,
      this.levelBuilder.spikes,
      (player: Player) => player.respawn(),
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

    // const doorClosed = this.add.sprite(1000, 400, DOOR_CLOSED_IMAGE).setScale(0.1);
    // const doorOpen = this.add.sprite(800, 400, DOOR_OPEN_IMAGE).setScale(0.1);
    new Gate(this, 1000, 400);
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
      this.player.jump();
      this.player.idle();
    } else {
      this.player.idle();
    }
  }

}