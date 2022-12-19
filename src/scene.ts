import * as Phaser from 'phaser';
import characterRunImage from '../assets/character_run.png';

const CHARACTER_KEY = 'character';
const CHARACTER_RUN_RIGHT_KEY = 'right';
const PLATFORMER_SCENE_KEY = 'platformer_scene';

const PLAYER_X = 400;
const PLAYER_Y = 600;

export class PlatformerScene extends Phaser.Scene {

  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private aKey: Phaser.Input.Keyboard.Key;
  private dKey: Phaser.Input.Keyboard.Key;
  private wKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: PLATFORMER_SCENE_KEY });
  }

  preload(): void {
    this.load.spritesheet(
      CHARACTER_KEY,
      characterRunImage,
      { frameWidth: 128, frameHeight: 64 },
    );
  }

  create(): void {
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.player = this.physics.add.sprite(PLAYER_X, PLAYER_Y, CHARACTER_KEY);
    this.player.setCollideWorldBounds(true);

    // Animation for running right
    this.anims.create({
      key: CHARACTER_RUN_RIGHT_KEY,
      frames: this.anims.generateFrameNumbers(
        CHARACTER_KEY,
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
      this.player.anims.play(CHARACTER_RUN_RIGHT_KEY, true);
    } else if (this.aKey.isDown) {
      this.player.setVelocityX(-160);

      this.player.flipX = true;
      this.player.anims.play(CHARACTER_RUN_RIGHT_KEY, true);
    } else if (this.wKey.isDown) {
      this.player.setVelocityY(-160);
    } else {
      this.player.anims.stop();
      this.player.setVelocityX(0);
    }
  }

}