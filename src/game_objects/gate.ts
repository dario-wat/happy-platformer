import { CELL_SIZE } from '../consts';
import { DynamicSprite } from './sprite';
import doorClosedImage from '../../assets/door_closed.png';
import doorOpenImage from '../../assets/door_open.png';
import laserDoorImage from '../../assets/laser_door.png';

const DOOR_OPEN_IMAGE = 'door_open_image';
const DOOR_CLOSED_IMAGE = 'door_closed_image';
const LASER_DOOR_IMAGE = 'laser_door_image';
const OPEN_DOOR_AN = 'open_door_an';
const CLOSE_DOOR_AN = 'close_door_an';

export const GATE_GRID_SIZE = 3;

const IMAGE_SIZE = 512;
const SIZE = GATE_GRID_SIZE * CELL_SIZE;
const SCALE = SIZE / IMAGE_SIZE;

const GATE_INITIAL_CHANGE_DELAY = 2000;

export default class Gate extends DynamicSprite {

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    isStartGate: boolean,
  ) {
    super(scene, x, y, isStartGate ? DOOR_OPEN_IMAGE : DOOR_CLOSED_IMAGE);

    const extraDoor = scene.add.sprite(x, y, DOOR_OPEN_IMAGE);
    extraDoor.setScale(SCALE);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.allowGravity = false;
    this.setScale(SCALE);

    scene.anims.create({
      key: OPEN_DOOR_AN,
      frames: scene.anims.generateFrameNumbers(
        LASER_DOOR_IMAGE,
        { start: 0, end: 4 }
      ),
      frameRate: 24,
      repeat: 0,
    });

    scene.anims.create({
      key: CLOSE_DOOR_AN,
      frames: scene.anims.generateFrameNumbers(
        LASER_DOOR_IMAGE,
        { start: 4, end: 0 }
      ),
      frameRate: 24,
      repeat: 0,
    });

    this.scene.time.delayedCall(GATE_INITIAL_CHANGE_DELAY, () => {
      if (isStartGate) {
        this.close();
      } else {
        this.open();
      }
    });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(DOOR_CLOSED_IMAGE, doorClosedImage);
    scene.load.image(DOOR_OPEN_IMAGE, doorOpenImage);
    scene.load.spritesheet(
      LASER_DOOR_IMAGE,
      laserDoorImage,
      { frameWidth: 340, frameHeight: 360, spacing: 126 },
    );
  }

  open(): void {
    this.anims.play(OPEN_DOOR_AN, true);
    this.once('animationcomplete', () => this.setTexture(DOOR_OPEN_IMAGE));
  }

  close(): void {
    this.anims.play(CLOSE_DOOR_AN, true);
    this.once('animationcomplete', () => this.setTexture(DOOR_CLOSED_IMAGE));
  }
}
