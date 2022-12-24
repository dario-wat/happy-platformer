import * as Phaser from 'phaser';

export const emptyDefaults = {} as Phaser.Types.Physics.Arcade.PhysicsGroupDefaults;

export const distanceBetween = Phaser.Math.Distance.Between;
export const angleBetween = Phaser.Math.Angle.Between;

export function debugPoint(
  scene: Phaser.Scene,
  x: number,
  y: number,
  color: number = 0xff0000,
): void {
  // Draw filled circled
  const graphics = scene.add.graphics();
  graphics.fillStyle(color, 1);
  graphics.fillCircle(x, y, 5);
}

export function debugLine(
  scene: Phaser.Scene,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: number = 0xff0000,
): void {
  // Draw line
  const graphics = scene.add.graphics();
  graphics.lineStyle(1, color, 1);
  graphics.beginPath();
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
  graphics.strokePath();
}