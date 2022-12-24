import * as Phaser from 'phaser';
import bgBlankImage from '../assets/bg_blank.png';
import doorClosedImage from '../assets/door_closed.png';
import doorOpenImage from '../assets/door_open.png';
import laserDoorImage from '../assets/laser_door.png';
import Player from './game_objects/player';
import Blade from './game_objects/blade';
import levels from './levels';
import KeyboardInput from './keyboard_input';
import Spike from './game_objects/spike';
import Turret from './game_objects/turret';
import Bullet from './game_objects/bullet';
import BulletManager from './bullet_manager';
import Platform from './game_objects/platform';
import { CELL_SIZE } from './consts';

const LEVEL_X = 200;
const LEVEL_Y = 100;

const X_ORIGIN = LEVEL_X + CELL_SIZE;
const Y_ORIGIN = LEVEL_Y + CELL_SIZE;

const PLATFORMER_SCENE = 'platformer_scene';
const BG_BLANK_IMAGE = 'bg_blank_image';
const DOOR_CLOSED_IMAGE = 'door_closed_image';
const DOOR_OPEN_IMAGE = 'door_open_image';
const LASER_DOOR_IMAGE = 'laser_door_image';

const LEVEL_WIDTH = 40;
const LEVEL_HEIGHT = 20;

export class PlatformerScene extends Phaser.Scene {

  private player: Player;
  private blades: Blade[];    // TODO use a group for this
  private platforms: Phaser.Physics.Arcade.StaticGroup;

  private bulletManager: BulletManager;

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
    this.load.image(BG_BLANK_IMAGE, bgBlankImage);
    this.load.image(DOOR_CLOSED_IMAGE, doorClosedImage);
    this.load.image(DOOR_OPEN_IMAGE, doorOpenImage);
    this.load.spritesheet(LASER_DOOR_IMAGE, laserDoorImage, { frameWidth: 32, frameHeight: 32 });
  }

  create(): void {
    this.keys = new KeyboardInput(this);

    // this.add.image(0, 0, BG_BLANK_IMAGE).setOrigin(0, 0).setDisplaySize(
    //   this.cameras.main.width,
    //   this.cameras.main.height,
    // );
    this.player = new Player(this);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(new Platform(
      this,
      LEVEL_X,
      LEVEL_Y,
      LEVEL_WIDTH,
      false,
    ));
    this.platforms.add(new Platform(
      this,
      LEVEL_X,
      LEVEL_Y + (LEVEL_HEIGHT - 1) * CELL_SIZE,
      LEVEL_WIDTH,
      false,
    ));
    this.platforms.add(new Platform(
      this,
      LEVEL_X,
      LEVEL_Y,
      LEVEL_HEIGHT,
      true,
    ));
    this.platforms.add(new Platform(
      this,
      LEVEL_X + (LEVEL_WIDTH - 1) * CELL_SIZE,
      LEVEL_Y,
      LEVEL_HEIGHT,
      true,
    ));

    for (const platform of levels.levels[0].platforms) {
      this.platforms.add(new Platform(
        this,
        X_ORIGIN + platform.x * CELL_SIZE,
        Y_ORIGIN + platform.y * CELL_SIZE,
        platform.length,
        platform.isVertical,
      ));
    }

    this.physics.add.collider(this.player, this.platforms);

    // Add spikes
    // const spike = new Spike(this, 600, 400);
    // this.physics.add.overlap(
    //   this.player,
    //   spike,
    //   () => { this.player.respawn() },
    // )

    this.blades = [
      // new Blade(this, 600, 300, 400, 200, 500),
      // new Blade(this, 800, 450, 1000, 450),
    ];

    // Respawn the user when they touch the blade
    this.physics.add.overlap(
      this.player,
      this.blades,
      () => this.player.respawn(),
    );

    this.bulletManager = BulletManager.create(this);

    // for (let i = 0; i < 10; i++) {
    //   new Turret(this, this.player, 100 + i * 100, 200, 100 + i * 200);
    // }

    this.physics.add.overlap(
      this.player,
      this.bulletManager.bullets,
      (player: Player, bullet: Bullet) => {
        player.respawn();
        bullet.destroy();
      },
    );

    this.physics.add.overlap(
      this.bulletManager.bullets,
      this.platforms,
      (bullet: Bullet) => {
        bullet.destroy();
      },
    );



    // const doorClosed = this.add.sprite(1000, 400, DOOR_CLOSED_IMAGE).setScale(0.1);
    // const doorOpen = this.add.sprite(800, 400, DOOR_OPEN_IMAGE).setScale(0.1);

  }

  update(): void {

    // TODO these inputs need to be handled better
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