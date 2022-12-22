import * as Phaser from 'phaser';
import platformImage from '../assets/platform_blank.png';
import bgBlankImage from '../assets/bg_blank.png';
import turretImage from '../assets/turret.png';
import { Player } from './player';
import { Blade } from './blade';
import levels from './levels';
import { KeyboardInput } from './keyboard_input';

const PLATFORMER_SCENE = 'platformer_scene';
const PLATFORM_IMAGE = 'platform_image';
const BG_BLANK_IMAGE = 'bg_blank_image';
const TURRET_IMAGE = 'turret_image';

export class PlatformerScene extends Phaser.Scene {

  private player: Player;
  private blades: Blade[];    // TODO use a group for this
  private platforms: Phaser.Physics.Arcade.StaticGroup;

  private keys: KeyboardInput;

  constructor() {
    super({ key: PLATFORMER_SCENE });
  }

  preload(): void {
    Player.preload(this);
    Blade.preload(this);
    this.load.image(PLATFORM_IMAGE, platformImage);
    this.load.image(BG_BLANK_IMAGE, bgBlankImage);
    this.load.image(TURRET_IMAGE, turretImage);
  }

  create(): void {
    this.keys = new KeyboardInput(this);

    this.add.image(0, 0, BG_BLANK_IMAGE).setOrigin(0, 0).setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height,
    );
    this.player = new Player(this);
    // this.physics.add.existing(this.player);

    // TODO when to use groups?
    // this.physics.add.group

    this.platforms = this.physics.add.staticGroup();

    for (const platform of levels.levels[0].platforms) {
      for (let i = 0; i < platform.count; i++) {
        this.platforms.create(
          platform.x + (platform.isVertical ? 0 : i * 32),
          platform.y + (platform.isVertical ? i * 32 : 0),
          PLATFORM_IMAGE,
        ).setScale(1 / 16).refreshBody();
      }
    }
    this.physics.add.collider(this.player, this.platforms);

    this.blades = [
      new Blade(this, 600, 300, 400, 200),
      new Blade(this, 800, 450, 1000, 450),
    ];

    // Respawn the user when they touch the blade
    this.physics.add.overlap(
      this.player,
      this.blades.map(b => b.sprite),
      () => { this.player.respawn() },
    );

    const turret = this.add.sprite(700, 200, TURRET_IMAGE);
    turret.setScale(0.2);
    turret.setAngle(45);

    // TODO Add bullet
  }

  update(): void {
    // TODO
    // Rotate the blade (maybe us tweens instead?)
    // this.blade.angle -= 8;


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