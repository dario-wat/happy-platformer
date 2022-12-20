import * as Phaser from 'phaser';
import characterRunImage from '../assets/character_run.png';
import characterIdleImage from '../assets/character_idle.png';
import characterJumpImage from '../assets/character_jump.png';

const CHARACTER_RUN_SS = 'character_run_ss';
const CHARACTER_IDLE_SS = 'character_idle_ss';
const CHARACTER_JUMP_SS = 'character_jump_ss';
const CHARACTER_RUN_RIGHT_AN = 'character_run_right_an';
const CHARACTER_IDLE_AN = 'character_idle_an';
const CHARACTER_JUMP_AN = 'character_jump_an';

const VELOCITY = 160;
const JUMP_VELOCITY = -500;

export class Player {

  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(
    scene: Phaser.Scene,
    x: number = 400,
    y: number = 400,
  ) {
    this.sprite = scene.physics.add.sprite(x, y, CHARACTER_IDLE_SS);

    // Game object is larger than the sprite, so we need to adjust the body size
    this.sprite.setSize(32, 48);    // Measured manually
    this.sprite.setOffset(48, 16);  // Offset x = (frame width - size X) / 2

    this.sprite.setCollideWorldBounds(true);

    // Animation for running right
    scene.anims.create({
      key: CHARACTER_RUN_RIGHT_AN,
      frames: scene.anims.generateFrameNumbers(
        CHARACTER_RUN_SS,
        { start: 0, end: 7 }
      ),
      frameRate: 10,
      repeat: -1
    });

    // Animation for idle
    scene.anims.create({
      key: CHARACTER_IDLE_AN,
      frames: scene.anims.generateFrameNumbers(
        CHARACTER_IDLE_SS,
        { start: 0, end: 7 }
      ),
      frameRate: 10,
      repeat: -1
    });

    // Jump animation
    scene.anims.create({
      key: CHARACTER_JUMP_AN,
      frames: scene.anims.generateFrameNumbers(
        CHARACTER_JUMP_SS,
        { start: 0, end: 3 }
      ),
      frameRate: 1200,
      repeat: 1,
    });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.spritesheet(
      CHARACTER_RUN_SS,
      characterRunImage,
      { frameWidth: 128, frameHeight: 64 },
    );
    scene.load.spritesheet(
      CHARACTER_IDLE_SS,
      characterIdleImage,
      { frameWidth: 128, frameHeight: 64 },
    );
    scene.load.spritesheet(
      CHARACTER_JUMP_SS,
      characterJumpImage,
      { frameWidth: 128, frameHeight: 64 },
    );
  }

  private isInAir(): boolean {
    return !this.sprite.body.blocked.down;
  }

  runRight(): void {
    if (this.isInAir()) {
      return;
    }
    this.sprite.setVelocityX(VELOCITY);
    this.sprite.flipX = false;
    this.sprite.anims.play(CHARACTER_RUN_RIGHT_AN, true);
  }

  runLeft(): void {
    if (this.isInAir()) {
      return;
    }
    this.sprite.setVelocityX(-VELOCITY);
    this.sprite.flipX = true;
    this.sprite.anims.play(CHARACTER_RUN_RIGHT_AN, true);
  }

  idle(): void {
    if (this.isInAir()) {
      return;
    }
    this.sprite.setVelocityX(0);
    this.sprite.anims.play(CHARACTER_IDLE_AN, true);
  }

  jump(): void {
    if (this.isInAir()) {
      return;
    }
    this.sprite.setVelocityY(JUMP_VELOCITY);
    this.sprite.anims.play(CHARACTER_JUMP_AN, true);
  }
}