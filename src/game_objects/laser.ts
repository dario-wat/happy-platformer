import { PlatformerScene } from '../scene';
import { DynamicSprite } from './sprite';
import laserImage from '../../assets/laser.png';
import { DEBUG_LASER_PHYSICS } from '../consts';

const LASER_IMAGE = 'laser_image';

const WIDTH_OFFSET = 60;
const SCALE_WIDTH = 0.75;   // Laser length
const SCALE_HEIGHT = 0.1;   // Laser width

export default class Laser extends DynamicSprite {

  public fakeLaser: Phaser.Physics.Arcade.Group;

  constructor(
    scene: PlatformerScene,
    x: number,
    y: number,
    rotation: number,
  ) {
    super(scene, x, y, LASER_IMAGE);
    scene.add.existing(this);

    if (DEBUG_LASER_PHYSICS) {
      this.setVisible(false);
    }

    const length = (this.width - WIDTH_OFFSET) * SCALE_WIDTH;

    // Since I can't rotate the body with arcade physics I decided
    // to use a group of bodies instead. This is a hacky solution
    // but it works.
    const step = 10;
    const scale = 0.1;
    const circleSize = 3;
    this.fakeLaser = this.scene.physics.add.group({
      key: 'fake_laser',
      repeat: length / step,
      setXY: { x, y, stepX: Math.cos(rotation) * step, stepY: Math.sin(rotation) * step },
      setScale: { x: scale, y: scale },
      allowGravity: false,
      visible: false,
    });
    this.fakeLaser.children.iterate(
      (body: Phaser.Physics.Arcade.Sprite) => body.setCircle(circleSize),
    );

    this.setScale(SCALE_WIDTH, SCALE_HEIGHT);
    this.setPosition(
      x + Math.cos(rotation) * length / 2,
      y + Math.sin(rotation) * length / 2,
    );
    this.setRotation(rotation);

    scene.laserManager.add(this.fakeLaser);
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(LASER_IMAGE, laserImage);
  }
}