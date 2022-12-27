import * as Phaser from 'phaser';
import blood1Image from '../../assets/blood_1.png';
import blood2Image from '../../assets/blood_2.png';
import blood3Image from '../../assets/blood_3.png';

const BLOOD_1_IMAGE = 'blood_1_image';
const BLOOD_2_IMAGE = 'blood_2_image';
const BLOOD_3_IMAGE = 'blood_3_image';

const BLOOD_1_ANIMATION = 'blood_1_animation';
const BLOOD_2_ANIMATION = 'blood_2_animation';
const BLOOD_3_ANIMATION = 'blood_3_animation';
const BLOOD_4_ANIMATION = 'blood_4_animation';
const BLOOD_5_ANIMATION = 'blood_5_animation';
const BLOOD_6_ANIMATION = 'blood_6_animation';

export default class Blood extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, BLOOD_1_IMAGE);
    scene.add.existing(this);
    this.setDepth(-1);

    this.setScale(Math.random() * 0.5 + 0.5); // [0.5, 1]
    this.setAngle(Math.random() * 120 - 60);  // [-60, 60]

    this.anims.create({
      key: BLOOD_1_ANIMATION,
      frames: this.anims.generateFrameNames(BLOOD_1_IMAGE, { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: BLOOD_2_ANIMATION,
      frames: this.anims.generateFrameNames(BLOOD_1_IMAGE, { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: BLOOD_3_ANIMATION,
      frames: this.anims.generateFrameNames(BLOOD_2_IMAGE, { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: BLOOD_4_ANIMATION,
      frames: this.anims.generateFrameNames(BLOOD_2_IMAGE, { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: BLOOD_5_ANIMATION,
      frames: this.anims.generateFrameNames(BLOOD_3_IMAGE, { start: 0, end: 6 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: BLOOD_6_ANIMATION,
      frames: this.anims.generateFrameNames(BLOOD_3_IMAGE, { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0,
    });

    const animation = Math.floor(Math.random() * 6);
    switch (animation) {
      case 0:
        this.play(BLOOD_1_ANIMATION);
        break;
      case 1:
        this.play(BLOOD_2_ANIMATION);
        break;
      case 2:
        this.play(BLOOD_3_ANIMATION);
        break;
      case 3:
        this.play(BLOOD_4_ANIMATION);
        break;
      case 4:
        this.play(BLOOD_5_ANIMATION);
        break;
      case 5:
        this.play(BLOOD_6_ANIMATION);
        break;
      default:
        this.play(BLOOD_1_ANIMATION);
        break;
    }
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.spritesheet(
      BLOOD_1_IMAGE,
      blood1Image,
      { frameWidth: 128, frameHeight: 128 },
    );
    scene.load.spritesheet(
      BLOOD_2_IMAGE,
      blood2Image,
      { frameWidth: 128, frameHeight: 128 },
    );
    scene.load.spritesheet(
      BLOOD_3_IMAGE,
      blood3Image,
      { frameWidth: 128, frameHeight: 128 },
    );
  }
}