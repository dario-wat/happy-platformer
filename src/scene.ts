import * as Phaser from 'phaser';

const CHARACTER_RUN_SHEET = 'character_run';
const CHARACTER_RUN_KEY = 'run';
const PLATFORMER_SCENE_KEY = 'PlatformerScene';

export class PlatformerScene extends Phaser.Scene {

  constructor() {
    super({ key: PLATFORMER_SCENE_KEY });
  }

  preload(): void {
    this.load.spritesheet(
      CHARACTER_RUN_SHEET,
      'assets/character_run.png',
      { frameWidth: 64, frameHeight: 128 },
    );
  }

  create(): void {
    // add a white square with physics
    let square = this.physics.add.sprite(100, 100, 'square');
    square.setCollideWorldBounds(true);
    console.log(this);
    // Create animation for character run
    this.anims.create({
      key: CHARACTER_RUN_KEY,
      frames: this.anims.generateFrameNumbers(
        CHARACTER_RUN_SHEET,
        { start: 0, end: 7 }
      ),
      frameRate: 10,
      repeat: -1
    });
  }

  update(): void {
    // console.log(Date.now());
  }

}