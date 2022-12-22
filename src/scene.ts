import * as Phaser from 'phaser';
import platformImage from '../assets/platform_blank.png';
import bgBlankImage from '../assets/bg_blank.png';

import doorClosedImage from '../assets/door_closed.png';
import doorOpenImage from '../assets/door_open.png';
import laserDoorImage from '../assets/laser_door.png';
import bulletImage from '../assets/bullet.png';
import Player from './game_objects/player';
import Blade from './game_objects/blade';
import levels from './levels';
import KeyboardInput from './keyboard_input';
import Spike from './game_objects/spike';
import Turret from './game_objects/turret';

const PLATFORMER_SCENE = 'platformer_scene';
const PLATFORM_IMAGE = 'platform_image';
const BG_BLANK_IMAGE = 'bg_blank_image';

const DOOR_CLOSED_IMAGE = 'door_closed_image';
const DOOR_OPEN_IMAGE = 'door_open_image';
const LASER_DOOR_IMAGE = 'laser_door_image';
const BULLET_IMAGE = 'bullet_image';

export class PlatformerScene extends Phaser.Scene {

  private player: Player;
  private blades: Blade[];    // TODO use a group for this
  private platforms: Phaser.Physics.Arcade.StaticGroup;
  private bullet: Phaser.GameObjects.Sprite;

  private keys: KeyboardInput;

  constructor() {
    super({ key: PLATFORMER_SCENE });
  }

  preload(): void {
    Player.preload(this);
    Blade.preload(this);
    Spike.preload(this);
    Turret.preload(this);
    this.load.image(PLATFORM_IMAGE, platformImage);
    this.load.image(BG_BLANK_IMAGE, bgBlankImage);
    this.load.image(DOOR_CLOSED_IMAGE, doorClosedImage);
    this.load.image(DOOR_OPEN_IMAGE, doorOpenImage);
    this.load.spritesheet(LASER_DOOR_IMAGE, laserDoorImage, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet(BULLET_IMAGE, bulletImage, { frameWidth: 16, frameHeight: 16 });
  }

  create(): void {
    this.keys = new KeyboardInput(this);

    // this.add.image(0, 0, BG_BLANK_IMAGE).setOrigin(0, 0).setDisplaySize(
    //   this.cameras.main.width,
    //   this.cameras.main.height,
    // );
    this.player = new Player(this);

    // TODO when to use groups?
    // this.physics.add.group

    this.platforms = this.physics.add.staticGroup();

    for (const platform of levels.levels[0].platforms) {
      for (let i = 0; i < platform.count; i++) {
        const bs = this.platforms.create(
          platform.x + (platform.isVertical ? 0 : i * 32),
          platform.y + (platform.isVertical ? i * 32 : 0),
          PLATFORM_IMAGE,
        ).setScale(1 / 16).refreshBody();
      }
    }
    this.physics.add.collider(this.player, this.platforms);

    // Add spikes
    const spike = new Spike(this, 600, 400);
    console.log(spike);
    this.physics.add.overlap(
      this.player,
      spike,
      () => { this.player.respawn() },
    )

    this.blades = [
      new Blade(this, 600, 300, 400, 200, 500),
      new Blade(this, 800, 450, 1000, 450),
    ];

    // Respawn the user when they touch the blade
    this.physics.add.overlap(
      this.player,
      this.blades,
      () => { this.player.respawn() },
    );

    const turret = new Turret(this, 700, 200, 0, 90);


    const doorClosed = this.add.sprite(1000, 400, DOOR_CLOSED_IMAGE).setScale(0.1);
    const doorOpen = this.add.sprite(800, 400, DOOR_OPEN_IMAGE).setScale(0.1);

    // TODO Add bullet
    this.bullet = this.add.sprite(700, 300, BULLET_IMAGE);
    // Animate bullet
    this.anims.create({
      key: 'bullet',
      frames: this.anims.generateFrameNumbers(BULLET_IMAGE, { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update(): void {
    this.bullet.anims.play('bullet', true);

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