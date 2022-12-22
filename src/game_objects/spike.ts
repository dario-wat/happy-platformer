import * as Phaser from 'phaser';
import spikeImage from '../../assets/spike.png';
import { StaticSprite } from './sprite';

const SPIKE_IMAGE = 'spike_image';

const SIZE = 32;

export default class Spike extends StaticSprite {

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, SPIKE_IMAGE);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.setDisplaySize(SIZE, SIZE);
    this.refreshBody();
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(SPIKE_IMAGE, spikeImage);
  }
}