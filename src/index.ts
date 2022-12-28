import * as Phaser from 'phaser';
import { DEBUG_PHYSICS } from './consts';
import { PlatformerScene } from './scene';
import StartGameScene from './start_game_scene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: DEBUG_PHYSICS,
    }
  },
  scene: [
    new StartGameScene(),
    new PlatformerScene(),
  ]
};

let game = new Phaser.Game(config);

