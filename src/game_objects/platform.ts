import * as Phaser from 'phaser';
import platformImage from '../../assets/platform_blank.png';
import platformScrewsImage from '../../assets/platform_screws.png';
import { CELL_SIZE } from '../consts';

const PLATFORM_IMAGE = 'platform_image';
const PLATFORM_SCREWS_IMAGE = 'platform_screws_image';

const IMAGE_SIZE = 512; // Hardcoded (image size)
const SIZE = CELL_SIZE;
const SCALE = SIZE / IMAGE_SIZE;

export default class Platform extends Phaser.GameObjects.TileSprite {

  public body: Phaser.Physics.Arcade.StaticBody;

  constructor(
    scene: Phaser.Scene,
    x: number,  // Top left X
    y: number,  // Top left Y
    length: number,
    isVertical: boolean,
  ) {
    super(
      scene,
      x,
      y,
      isVertical ? SIZE : length * SIZE,
      isVertical ? length * SIZE : SIZE,
      PLATFORM_SCREWS_IMAGE,
    );
    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.setTileScale(SCALE);

    this.setOrigin(0, 0);
    this.body.updateFromGameObject();
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(PLATFORM_IMAGE, platformImage);
    scene.load.image(PLATFORM_SCREWS_IMAGE, platformScrewsImage);
  }
}