import * as Phaser from 'phaser';
import characterRunImage from '../assets/character_run.png';
import characterIdleImage from '../assets/character_idle.png';
import platformImage from '../assets/platform_blank.png';

const CHARACTER_RUN_SS = 'character_run_ss';
const CHARACTER_IDLE_SS = 'character_idle_ss';
const CHARACTER_RUN_RIGHT_AN = 'character_run_right_an';
const CHARACTER_IDLE_AN = 'character_idle_an';
const PLATFORMER_SCENE = 'platformer_scene';
const PLATFORM_IMAGE = 'platform_image';

const PLAYER_X = 400;
const PLAYER_Y = 400;

export class PlatformerScene extends Phaser.Scene {

  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private platforms: Phaser.Physics.Arcade.StaticGroup;

  private aKey: Phaser.Input.Keyboard.Key;
  private dKey: Phaser.Input.Keyboard.Key;
  private wKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: PLATFORMER_SCENE });
  }

  preload(): void {
    this.load.spritesheet(
      CHARACTER_RUN_SS,
      characterRunImage,
      { frameWidth: 128, frameHeight: 64 },
    );
    this.load.spritesheet(
      CHARACTER_IDLE_SS,
      characterIdleImage,
      { frameWidth: 128, frameHeight: 64 },
    );
    this.load.image(PLATFORM_IMAGE, platformImage);
  }

  create(): void {
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.player = this.physics.add.sprite(PLAYER_X, PLAYER_Y, CHARACTER_IDLE_SS);

    // Game object is larger than the sprite, so we need to adjust the body size
    this.player.setSize(32, 48);
    this.player.setOffset((128 - 32) / 2, 16);

    this.player.setCollideWorldBounds(true);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, PLATFORM_IMAGE).setScale(1 / 16).refreshBody();

    this.physics.add.collider(this.player, this.platforms);

    // Animation for running right
    this.anims.create({
      key: CHARACTER_RUN_RIGHT_AN,
      frames: this.anims.generateFrameNumbers(
        CHARACTER_RUN_SS,
        { start: 0, end: 7 }
      ),
      frameRate: 10,
      repeat: -1
    });

    // Animation for idle
    this.anims.create({
      key: CHARACTER_IDLE_AN,
      frames: this.anims.generateFrameNumbers(
        CHARACTER_IDLE_SS,
        { start: 0, end: 7 }
      ),
      frameRate: 10,
      repeat: -1
    });
  }

  update(): void {
    // TODO these inputs need to be handled better

    if (this.dKey.isDown) {
      this.player.setVelocityX(160);

      this.player.flipX = false;
      this.player.anims.play(CHARACTER_RUN_RIGHT_AN, true);
    } else if (this.aKey.isDown) {
      this.player.setVelocityX(-160);

      this.player.flipX = true;
      this.player.anims.play(CHARACTER_RUN_RIGHT_AN, true);
    } else if (this.wKey.isDown) {
      this.player.setVelocityY(-160);
    } else {
      this.player.anims.play(CHARACTER_IDLE_AN, true);
      this.player.setVelocityX(0);
    }
  }

}