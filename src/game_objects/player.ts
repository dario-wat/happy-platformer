import * as Phaser from 'phaser';
import characterRunImage from '../../assets/character_run.png';
import characterIdleImage from '../../assets/character_idle.png';
import characterJumpImage from '../../assets/character_jump.png';
import { DynamicSprite } from './sprite';
import Gate from './gate';
import { MAKE_PLAYER_INVULNERABLE } from '../consts';
import Blood from './blood';

const CHARACTER_RUN_SS = 'character_run_ss';
const CHARACTER_IDLE_SS = 'character_idle_ss';
const CHARACTER_JUMP_SS = 'character_jump_ss';

const CHARACTER_RUN_RIGHT_AN = 'character_run_right_an';
const CHARACTER_IDLE_AN = 'character_idle_an';
const CHARACTER_JUMP_AN = 'character_jump_an';

const SPAWN_X = 400;
const SPAWN_Y = 400;

const MAX_VELOCITY = 160;
const MIN_VELOCITY = 10;
const JUMP_VELOCITY = 300;
const JUMP_HOLD_TIME = 300;
const ACCELERATION = 600;
const IDLE_DECELERATION = 400;

const SIZE_X = 12;
const SIZE_Y = 36;
const OFFSET_Y = 16 + 48 - SIZE_Y;  // Padding + sprite height - body height

export default class Player extends DynamicSprite {

  private jumpTimer: number = 0;

  constructor(
    scene: Phaser.Scene,
    x: number = SPAWN_X,
    y: number = SPAWN_Y,
  ) {
    super(scene, x, y, CHARACTER_IDLE_SS);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Game object is larger than the sprite, so we need to adjust the body size
    this.setSize(SIZE_X, SIZE_Y);
    this.setOffset((this.width - SIZE_X) / 2, OFFSET_Y);

    this.setDepth(1);
    this.setMaxVelocity(MAX_VELOCITY, Infinity);
    this.setCollideWorldBounds(true);

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
      frameRate: 10,
      repeat: 0,
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

  runRight(): void {
    this.setAccelerationX(ACCELERATION);
    this.flipX = false;

    if (this.body.onFloor()) {
      this.anims.play(CHARACTER_RUN_RIGHT_AN, true);
    }
  }

  runLeft(): void {
    this.setAccelerationX(-ACCELERATION);
    this.flipX = true;

    if (this.body.onFloor()) {
      this.anims.play(CHARACTER_RUN_RIGHT_AN, true);
    }
  }

  idle(): void {
    // Decelerate to a stop
    if (Math.abs(this.body.velocity.x) < MIN_VELOCITY) {
      this.setVelocityX(0);
      this.setAccelerationX(0);
    } else if (this.body.velocity.x > 0) {
      this.setAccelerationX(-IDLE_DECELERATION);
    } else if (this.body.velocity.x < 0) {
      this.setAccelerationX(IDLE_DECELERATION);
    }

    if (this.body.onFloor()) {
      this.anims.play(CHARACTER_IDLE_AN, true);
    }
  }

  resetJump(): void {
    this.jumpTimer = 0;
  }

  jump(): void {
    if (this.body.onFloor()) {
      this.setVelocityY(-JUMP_VELOCITY);
      this.jumpTimer = this.scene.time.now;
      this.anims.play(CHARACTER_JUMP_AN, true);
    } else if (
      this.jumpTimer > 0
      && !this.body.onCeiling()
      && this.scene.time.now - this.jumpTimer < JUMP_HOLD_TIME
    ) {
      this.setVelocityY(-JUMP_VELOCITY);
    }
  }

  respawn(x: number = SPAWN_X, y: number = SPAWN_Y): void {
    this.setVelocity(0);
    this.setAcceleration(0);
    this.setPosition(x, y);
  }

  respawnAtGate(gate: Gate): void {
    const spawnThreshold = 10;
    this.respawn(gate.x, gate.y - spawnThreshold);
  }

  killAndRespawn(gate: Gate): void {
    if (MAKE_PLAYER_INVULNERABLE) {
      return;
    }
    new Blood(this.scene, this.x, this.y);
    this.respawnAtGate(gate);
  }
}