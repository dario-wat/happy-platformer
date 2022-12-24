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

const levels = [
  {
    level: 0,
    startGate: { x: 3, y: 0 },
    endGate: { x: 33, y: 3 },
    platforms: [
      { x: 3, y: 3, length: 5, isVertical: false },
    ],
    spikes: [
      { x: 9, y: 19, direction: SpikeDirection.UP },
      { x: 10, y: 19, direction: SpikeDirection.UP },
      { x: 11, y: 19, direction: SpikeDirection.UP },
    ],
    turrets: [
      { x: 10, y: 4, startDelay: 0 },
    ],
    blades: [
      { x1: 14, y1: 4, x2: 16, y2: 8, delay: 0 },
      { x1: 20, y1: 17, x2: 26, y2: 17, delay: 0 },
    ],
    lasers: [
      { x: 400, y: 500 }
    ],
  }
];

export default levels;