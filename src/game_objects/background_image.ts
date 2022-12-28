import * as Phaser from 'phaser';
import bgBlankImage from '../../assets/bg_blank.png';
import { LEVEL_BOUNDS, X_ORIGIN, Y_ORIGIN } from '../levels/level_builder';

const BG_BLANK_IMAGE = 'bg_blank_image';

export default class BackgroundImage extends Phaser.GameObjects.Image {

  constructor(scene: Phaser.Scene) {
    super(scene, X_ORIGIN, Y_ORIGIN, BG_BLANK_IMAGE);
    scene.add.existing(this);

    this.setOrigin(0, 0);
    this.setDisplaySize(LEVEL_BOUNDS.width, LEVEL_BOUNDS.height);
    this.setAlpha(0.6);
    this.setDepth(-1000);
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(BG_BLANK_IMAGE, bgBlankImage);
  }
}