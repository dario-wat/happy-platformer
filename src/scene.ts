import * as Phaser from 'phaser';
import platformImage from '../assets/platform_blank.png';
import bgBlankImage from '../assets/bg_blank.png';
import bladeImage from '../assets/blade.png';
import { Player } from './player';

const PLATFORMER_SCENE = 'platformer_scene';
const PLATFORM_IMAGE = 'platform_image';
const BG_BLANK_IMAGE = 'bg_blank_image';
const BLADE_IMAGE = 'blade_image';

export class PlatformerScene extends Phaser.Scene {

  private player: Player;
  private platforms: Phaser.Physics.Arcade.StaticGroup;
  private blade: Phaser.GameObjects.Sprite;

  private aKey: Phaser.Input.Keyboard.Key;
  private dKey: Phaser.Input.Keyboard.Key;
  private wKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: PLATFORMER_SCENE });
  }

  preload(): void {
    Player.preload(this);
    this.load.image(PLATFORM_IMAGE, platformImage);
    this.load.image(BG_BLANK_IMAGE, bgBlankImage);
    this.load.image(BLADE_IMAGE, bladeImage);
  }

  create(): void {
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.add.image(0, 0, BG_BLANK_IMAGE).setOrigin(0, 0).setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height,
    );
    this.player = new Player(this);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, PLATFORM_IMAGE).setScale(1 / 16).refreshBody();

    for (let i = 0; i < 30; i++) {
      this.platforms.create(400 + (i * 32), 568, PLATFORM_IMAGE).setScale(1 / 16).refreshBody();
    }
    this.physics.add.collider(this.player.sprite, this.platforms);

    this.blade = this.add.sprite(600, 300, BLADE_IMAGE).setScale(0.1);
  }

  update(): void {
    // Rotate the blade
    this.blade.angle += 5;


    // TODO these inputs need to be handled better
    if (this.dKey.isDown && this.wKey.isDown) {
      this.player.runRight();
      this.player.jump();
    } else if (this.aKey.isDown && this.wKey.isDown) {
      this.player.runLeft();
      this.player.jump();
    } else if (this.dKey.isDown) {
      this.player.runRight();
    } else if (this.aKey.isDown) {
      this.player.runLeft();
    } else if (this.wKey.isDown) {
      this.player.jump();
    } else {
      this.player.idle();
    }
  }

}