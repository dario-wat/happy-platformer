import { SpikeDirection } from '../enums';

/*
  Sizing in grid terms:
    - 1 grid unit = 24 pixels
    - platform = 1x1 (x length)
    - spike = 1x1
    - turret = 2x2
    - blade = 2x2
  (x,y) coordinates indicate the top left cell of the object
*/

export const LEVEL_WIDTH = 42;
export const LEVEL_HEIGHT = 20;

const levels = [
  {
    startGate: { x: 1, y: 1 },
    endGate: { x: 38, y: 17 },
    platforms: [
      { x: 0, y: 4, length: 4, isVertical: false },
      { x: 7, y: 12, length: 4, isVertical: false },
      { x: 19, y: 17, length: 3, isVertical: false },
      { x: 26, y: 18, length: 2, isVertical: false },
    ],
    spikes: [
      { x: 12, y: 19, length: 4, isVertical: false, direction: SpikeDirection.UP },
      { x: 22, y: 19, length: 4, isVertical: false, direction: SpikeDirection.UP },
    ],
  },
  {
    startGate: { x: 1, y: 1 },
    endGate: { x: 38, y: 17 },
    platforms: [
      { x: 0, y: 4, length: 4, isVertical: false },
      { x: 7, y: 12, length: 4, isVertical: false },
      { x: 19, y: 17, length: 3, isVertical: false },
      { x: 26, y: 18, length: 2, isVertical: false },
    ],
    spikes: [
      { x: 0, y: 19, length: 26, isVertical: false, direction: SpikeDirection.UP },
    ],
    blades: [
      { x1: 12, y1: 16, x2: 18, y2: 9, delay: 0 },
    ],
  },
  {
    startGate: { x: 1, y: 1 },
    endGate: { x: 38, y: 17 },
    platforms: [
      { x: 0, y: 4, length: 4, isVertical: false },
      { x: 7, y: 12, length: 4, isVertical: false },
      { x: 19, y: 17, length: 3, isVertical: false },
      { x: 26, y: 18, length: 2, isVertical: false },
    ],
    spikes: [
      { x: 0, y: 19, length: 26, isVertical: false, direction: SpikeDirection.UP },
      { x: 7, y: 11, length: 1, isVertical: false, direction: SpikeDirection.UP },
      { x: 29, y: 19, length: 3, isVertical: false, direction: SpikeDirection.UP },
    ],
    blades: [
      { x1: 12, y1: 16, x2: 18, y2: 9, delay: 0 },
      { x1: 7, y1: 5, x2: 1, y2: 10, delay: 0 },
    ],
    turrets: [
      { x: 25, y: 1, startDelay: 2000 },
    ],
  },
  {
    startGate: { x: 1, y: 1 },
    endGate: { x: 38, y: 17 },
    platforms: [
      { x: 0, y: 4, length: 4, isVertical: false },
      { x: 7, y: 12, length: 4, isVertical: false },
      { x: 19, y: 17, length: 3, isVertical: false },
      { x: 26, y: 18, length: 2, isVertical: false },
      { x: 28, y: 14, length: 3, isVertical: false },
      { x: 30, y: 10, length: 4, isVertical: true },
      { x: 37, y: 15, length: 5, isVertical: false },
      { x: 31, y: 8, length: 5, isVertical: false },
    ],
    spikes: [
      { x: 0, y: 19, length: 26, isVertical: false, direction: SpikeDirection.UP },
      { x: 7, y: 11, length: 1, isVertical: false, direction: SpikeDirection.UP },
      { x: 29, y: 19, length: 3, isVertical: false, direction: SpikeDirection.UP },
    ],
    blades: [
      { x1: 12, y1: 16, x2: 18, y2: 9, delay: 0 },
      { x1: 7, y1: 5, x2: 1, y2: 10, delay: 0 },
    ],
    turrets: [
      { x: 25, y: 1, startDelay: 2000 },
    ],
    lasers: [
      { x: 39, y: 1, angle: -70, startDelay: 0 },
    ],
  },
  {
    startGate: { x: 1, y: 1 },
    endGate: { x: 38, y: 17 },
    platforms: [
      { x: 0, y: 4, length: 4, isVertical: false },
      { x: 7, y: 12, length: 4, isVertical: false },
      { x: 12, y: 17, length: 10, isVertical: false },
      { x: 28, y: 14, length: 3, isVertical: false },
      { x: 30, y: 10, length: 4, isVertical: true },
      { x: 37, y: 15, length: 5, isVertical: false },
      { x: 31, y: 8, length: 5, isVertical: false },
      { x: 11, y: 0, length: 7, isVertical: true },
      { x: 12, y: 6, length: 8, isVertical: false },
      { x: 20, y: 0, length: 7, isVertical: true },
      { x: 24, y: 14, length: 2, isVertical: false },
      { x: 25, y: 5, length: 7, isVertical: true },
      { x: 21, y: 0, length: 12, isVertical: true },
      { x: 22, y: 10, length: 1, isVertical: true },
    ],
    spikes: [
      { x: 0, y: 19, length: 32, isVertical: false, direction: SpikeDirection.UP },
      { x: 7, y: 11, length: 1, isVertical: false, direction: SpikeDirection.UP },
      { x: 41, y: 5, length: 10, isVertical: true, direction: SpikeDirection.LEFT },
    ],
    blades: [
      { x1: 13, y1: 15, x2: 18, y2: 9, delay: 1000 },
      { x1: 7, y1: 5, x2: 1, y2: 10, delay: 1000 },
      { x1: 32, y1: 1, x2: 32, y2: 6, delay: 0 },
    ],
    turrets: [
      { x: 25, y: 1, startDelay: 2000 },
      { x: 31, y: 10, startDelay: 2000 },
      { x: 9, y: 0, startDelay: 4000 },
    ],
    lasers: [
      { x: 39, y: 1, angle: -70, startDelay: 0 },
      { x: 23, y: 17, angle: 30, startDelay: 1000 },
    ],
  },
  {
    startGate: { x: 1, y: 1 },
    endGate: { x: 38, y: 17 },
    platforms: [
      { x: 0, y: 4, length: 4, isVertical: false },
      { x: 7, y: 12, length: 4, isVertical: false },
      { x: 12, y: 17, length: 10, isVertical: false },
      { x: 28, y: 14, length: 3, isVertical: false },
      { x: 30, y: 10, length: 4, isVertical: true },
      { x: 37, y: 15, length: 5, isVertical: false },
      { x: 31, y: 8, length: 5, isVertical: false },
      { x: 11, y: 0, length: 7, isVertical: true },
      { x: 12, y: 6, length: 8, isVertical: false },
      { x: 20, y: 0, length: 7, isVertical: true },
      { x: 24, y: 14, length: 2, isVertical: false },
      { x: 25, y: 5, length: 7, isVertical: true },
      { x: 21, y: 0, length: 12, isVertical: true },
      { x: 22, y: 10, length: 1, isVertical: true },
      { x: 34, y: 16, length: 4, isVertical: false },
    ],
    spikes: [
      { x: 0, y: 19, length: 32, isVertical: false, direction: SpikeDirection.UP },
      { x: 7, y: 11, length: 1, isVertical: false, direction: SpikeDirection.UP },
      { x: 41, y: 5, length: 10, isVertical: true, direction: SpikeDirection.LEFT },
      { x: 0, y: 0, length: 4, isVertical: true, direction: SpikeDirection.RIGHT },
    ],
    blades: [
      { x1: 13, y1: 15, x2: 18, y2: 9, delay: 1000 },
      { x1: 7, y1: 5, x2: 1, y2: 10, delay: 1000 },
      { x1: 32, y1: 1, x2: 32, y2: 6, delay: 0 },
    ],
    turrets: [
      { x: 25, y: 1, startDelay: 2000 },
      { x: 31, y: 10, startDelay: 2000 },
      { x: 9, y: 0, startDelay: 4000 },
      { x: 1, y: 14, startDelay: 3000 },
      { x: 28, y: 16, startDelay: 0 },
    ],
    lasers: [
      { x: 39, y: 1, angle: -70, startDelay: 0 },
      { x: 23, y: 17, angle: 30, startDelay: 1000 },
      { x: 26, y: 17, angle: 100, startDelay: 1000 },
    ],
  },

  // New set of levels

  {
    startGate: { x: 1, y: 17 },
    endGate: { x: 38, y: 1 },
    platforms: [
      { x: 36, y: 4, length: 6, isVertical: false },
      { x: 5, y: 19, length: 7, isVertical: false },
      { x: 5, y: 18, length: 7, isVertical: false },
      { x: 13, y: 19, length: 11, isVertical: false },
      { x: 13, y: 18, length: 11, isVertical: false },
      { x: 6, y: 15, length: 12, isVertical: false },
      { x: 20, y: 11, length: 6, isVertical: true },
      { x: 0, y: 14, length: 8, isVertical: false },
      { x: 8, y: 10, length: 13, isVertical: false },
    ],
    blades: [
      { x1: 10, y1: 11, x2: 10, y2: 13, delay: 400 },
      { x1: 12, y1: 11, x2: 12, y2: 13, delay: 200 },
      { x1: 14, y1: 11, x2: 14, y2: 13, delay: 0 },
      { x1: 0, y1: 12, x2: 6, y2: 12, delay: 0 },
    ],
    turrets: [
      { x: 0, y: 15, startDelay: 4000 },
      { x: 18, y: 11, startDelay: 1000 },
    ],
    lasers: [
      { x: 22, y: 17, angle: 0, startDelay: 1000 },
    ],
  },
  {
    startGate: { x: 3, y: 0 },
    endGate: { x: 15, y: 0 },
    platforms: [
      { x: 3, y: 3, length: 30, isVertical: false },
      { x: 33, y: 7, length: 3, isVertical: false },
      { x: 32, y: 4, length: 3, isVertical: true },
    ],
    // spikes: [
    //   { x: 9, y: 19, direction: SpikeDirection.UP },
    //   { x: 10, y: 19, direction: SpikeDirection.UP },
    //   { x: 11, y: 19, direction: SpikeDirection.UP },
    // ],
    blades: [
      { x1: 14, y1: 4, x2: 16, y2: 8, delay: 0 },
      { x1: 20, y1: 17, x2: 26, y2: 17, delay: 0 },
    ],
  },
];

export default levels;