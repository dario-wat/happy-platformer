import { CELL_SIZE } from '../consts';
import { DynamicSprite } from './sprite';
import doorClosedImage from '../../assets/door_closed.png';
import doorOpenImage from '../../assets/door_open.png';
import laserDoorImage from '../../assets/laser_door.png';
import Player from './player';
import { distanceBetween } from '../util';

const DOOR_OPEN_IMAGE = 'door_open_image';
const DOOR_CLOSED_IMAGE = 'door_closed_image';
const LASER_DOOR_IMAGE = 'laser_door_image';
const OPEN_DOOR_AN = 'open_door_an';
const CLOSE_DOOR_AN = 'close_door_an';

export const GATE_GRID_SIZE = 3;

const IMAGE_SIZE = 512;
const SIZE = GATE_GRID_SIZE * CELL_SIZE;
const SCALE = SIZE / IMAGE_SIZE;

const DISTANCE_THRESHOLD = 100;

export default class Gate extends DynamicSprite {

  private isOpen: boolean = false;

  constructor(
    scene: Phaser.Scene,
    private player: Player,
    x: number,
    y: number,
  ) {
    super(scene, x, y, DOOR_CLOSED_IMAGE);

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
      frameRate: 30,
      repeat: 0,
    });

    scene.anims.create({
      key: CLOSE_DOOR_AN,
      frames: scene.anims.generateFrameNumbers(
        LASER_DOOR_IMAGE,
        { start: 4, end: 0 }
      ),
      frameRate: 30,
      repeat: 0,
    });

    scene.events.on('update', () => {
      const distance = distanceBetween(
        this.player.x,
        this.player.y,
        this.x,
        this.y,
      );
      if (distance < DISTANCE_THRESHOLD) {
        this.open();
      } else {
        this.close();
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
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    this.anims.play(OPEN_DOOR_AN);
    this.once('animationcomplete', () => this.setTexture(DOOR_OPEN_IMAGE));
  }

  close(): void {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.anims.play(CLOSE_DOOR_AN);
    this.once('animationcomplete', () => this.setTexture(DOOR_CLOSED_IMAGE));
  }
}
