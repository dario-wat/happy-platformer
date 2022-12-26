import * as Phaser from 'phaser';
import spikeImage from '../../assets/spike.png';
import { CELL_SIZE } from '../consts';
import { SpikeDirection } from '../enums';
import { StaticSprite } from './sprite';

const SPIKE_IMAGE = 'spike_image';

const SIZE = CELL_SIZE;
const BODY_SIZE = SIZE / 2;

export default class Spike extends StaticSprite {

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    direction: SpikeDirection,
  ) {
    super(scene, x, y, SPIKE_IMAGE);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.setDisplaySize(SIZE, SIZE);
    this.setSize(BODY_SIZE, BODY_SIZE);

    // This part is after refresh body because it was incorrectly
    // rotating the object
    if (direction === SpikeDirection.UP) {
      this.setAngle(0);
      this.setOffset((this.width - BODY_SIZE) / 2, this.height / 2);
    } else if (direction === SpikeDirection.RIGHT) {
      this.setAngle(90);
      this.setOffset(this.width / 2 - BODY_SIZE, (this.height - BODY_SIZE) / 2);
    } else if (direction === SpikeDirection.LEFT) {
      this.setAngle(270);
      this.setOffset(this.width / 2, (this.height - BODY_SIZE) / 2);
    } else if (direction === SpikeDirection.DOWN) {
      this.setAngle(180);
      this.setOffset((this.width - BODY_SIZE) / 2, this.height / 2 - BODY_SIZE);
    }
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(SPIKE_IMAGE, spikeImage);
  }
}