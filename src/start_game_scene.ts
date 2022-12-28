import * as Phaser from 'phaser';
import { PLATFORMER_SCENE } from './scene';
import BackgroundImage from './game_objects/background_image';
import { LEVEL_BOUNDS } from './levels/level_builder';
import { TEXT_FONT, UI_COLOR } from './consts';

export const START_GAME_SCENE = 'start_game_scene';

const BUTTON_PADDING_X = 10;
const BUTTON_PADDING_Y = 10;
const EDGE_RADIUS = 16;

const DEATH_COUNT_Y_OFFSET = -100;

export default class StartGameScene extends Phaser.Scene {

  private mouseOverButton: boolean = false;
  private graphics: Phaser.GameObjects.Graphics;
  private buttonRectangle: Phaser.Geom.Rectangle;

  constructor() {
    super({ key: START_GAME_SCENE });
  }

  preload(): void {
    BackgroundImage.preload(this);
  }

  create(data: any): void {
    new BackgroundImage(this);

    if (data.deaths !== undefined) {
      const deathText = this.add.text(
        LEVEL_BOUNDS.centerX,
        LEVEL_BOUNDS.centerY + DEATH_COUNT_Y_OFFSET,
        `You died ${data.deaths} times`,
        TEXT_FONT,
      );
      deathText.setOrigin(0.5, 0.5);
    }

    let startText = this.add.text(
      LEVEL_BOUNDS.centerX,
      LEVEL_BOUNDS.centerY,
      'Start Game',
      TEXT_FONT,
    );
    startText.setOrigin(0.5, 0.5);

    this.buttonRectangle = new Phaser.Geom.Rectangle(
      startText.x - startText.width / 2 - BUTTON_PADDING_X,
      startText.y - startText.height / 2 - BUTTON_PADDING_Y,
      startText.width + 2 * BUTTON_PADDING_X,
      startText.height + 2 * BUTTON_PADDING_Y,
    );

    this.graphics = this.add.graphics();
    this.drawButtonRectangle();

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (
        this.buttonRectangle.contains(pointer.x, pointer.y)
        && !this.mouseOverButton
      ) {
        this.graphics.clear();
        this.fillButtonRectangle();
        this.drawButtonRectangle();
        this.mouseOverButton = true;
      } else if (
        !this.buttonRectangle.contains(pointer.x, pointer.y)
        && this.mouseOverButton
      ) {
        this.graphics.clear();
        this.drawButtonRectangle();
        this.mouseOverButton = false;
      }
    });

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.buttonRectangle.contains(pointer.x, pointer.y)) {
        this.scene.start(PLATFORMER_SCENE);
      }
    });
  }

  private drawButtonRectangle(): void {
    this.graphics.lineStyle(2, UI_COLOR, 1);
    this.graphics.strokeRoundedRect(
      this.buttonRectangle.x,
      this.buttonRectangle.y,
      this.buttonRectangle.width,
      this.buttonRectangle.height,
      EDGE_RADIUS,
    );
  }

  private fillButtonRectangle(): void {
    this.graphics.fillStyle(0xe0e0e0, 0.1);
    this.graphics.fillRoundedRect(
      this.buttonRectangle.x,
      this.buttonRectangle.y,
      this.buttonRectangle.width,
      this.buttonRectangle.height,
      EDGE_RADIUS,
    );
  }
}