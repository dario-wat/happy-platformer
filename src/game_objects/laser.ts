import { PlatformerScene } from '../scene';
import { DynamicSprite } from './sprite';
import laserImage from '../../assets/laser.png';
import laserSheetImage from '../../assets/laser_sheet.png';

const LASER_IMAGE = 'laser_image';
const LASER_SPRITESHEET = 'laser_spritesheet';
const LASER_FIRE_ANIMATION = 'laser_fire_animation';
const LASER_UNFIRE_ANIMATION = 'laser_unfire_animation';

const WIDTH_OFFSET = 60;
const SCALE_WIDTH = 0.5;   // Laser length  TODO maybe longer
const SCALE_HEIGHT = 0.1;   // Laser width

const LASER_SPRITESHEET_LENGTH = 1464;
const ANIMATION_LENGTH_PADDING = 100;

const LASER_DURATION = 2000;
const LASER_DELAY = 3000;

export default class Laser extends DynamicSprite {

  public fakeLaser: Phaser.Physics.Arcade.Group;

  constructor(
    scene: PlatformerScene,
    x: number,
    y: number,
    rotation: number,
    startDelay: number = 0,
  ) {
    super(scene, x, y, LASER_IMAGE);
    scene.add.existing(this);
    this.setVisible(false);

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
      enable: false,
    });
    this.fakeLaser.children.iterate(
      (body: Phaser.Physics.Arcade.Sprite) => body.setCircle(circleSize),
    );

    this.setScale(SCALE_WIDTH, SCALE_HEIGHT);
    this.setRotation(rotation + Math.PI);

    scene.laserManager.add(this.fakeLaser);

    this.anims.create({
      key: LASER_FIRE_ANIMATION,
      frames: this.anims.generateFrameNumbers(
        LASER_SPRITESHEET,
        { start: 0, end: 5 },
      ),
      frameRate: 10,
      repeat: 0,
    });

    // Scale down the animation
    this.anims.get(LASER_FIRE_ANIMATION).frames.forEach(
      (frame: Phaser.Animations.AnimationFrame) => {
        frame.frame.cutWidth =
          (LASER_SPRITESHEET_LENGTH + ANIMATION_LENGTH_PADDING) / 2;
      }
    );

    this.anims.create({
      key: LASER_UNFIRE_ANIMATION,
      frames: this.anims.generateFrameNumbers(
        LASER_SPRITESHEET,
        { start: 5, end: 0 },
      ),
      frameRate: 10,
      repeat: 0,
    });

    // Scale down the animation
    this.anims.get(LASER_UNFIRE_ANIMATION).frames.forEach(
      (frame: Phaser.Animations.AnimationFrame) => {
        frame.frame.cutWidth =
          (LASER_SPRITESHEET_LENGTH + ANIMATION_LENGTH_PADDING) / 2;
      }
    );

    // Laser firing loop
    const fireDelay = LASER_DELAY + LASER_DURATION;
    this.scene.time.addEvent({
      delay: fireDelay,
      callback: this.laserFiringStateMachine,
      callbackScope: this,
      loop: true,
      startAt: fireDelay - startDelay,
    });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.image(LASER_IMAGE, laserImage);
    scene.load.spritesheet(
      LASER_SPRITESHEET,
      laserSheetImage,
      { frameWidth: LASER_SPRITESHEET_LENGTH, frameHeight: 130 },
    );
  }

  private laserFiringStateMachine = this.powerUp;

  // Step 1: Turn on the laser
  private powerUp(): void {
    this.setVisible(true);
    this.anims.play(LASER_FIRE_ANIMATION, true);
    this.once('animationcomplete', this.fire, this);
  }

  // Step 2: Fire the laser
  private fire(): void {
    this.enableFakeLaser();
    this.scene.time.delayedCall(LASER_DURATION, this.powerDown, [], this);
  }

  // Step 3: Turn off the laser
  private powerDown(): void {
    this.disableFakeLaser();
    this.anims.play(LASER_UNFIRE_ANIMATION, true);
  }

  private enableFakeLaser(): void {
    this.fakeLaser.children.iterate((body: Phaser.Physics.Arcade.Sprite) =>
      body.enableBody(true, body.x, body.y, true, true),
    );
  }

  private disableFakeLaser(): void {
    this.fakeLaser.children.iterate((body: Phaser.Physics.Arcade.Sprite) =>
      body.disableBody(true, true),
    );
  }
}