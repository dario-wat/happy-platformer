import { SpikeDirection } from "../enums";

const levels = [
  {
    level: 1,
    platforms: [
      { x: 3, y: 3, length: 5, isVertical: false },
    ],
    spikes: [
      { x: 9, y: 19, direction: SpikeDirection.UP },
      { x: 10, y: 19, direction: SpikeDirection.UP },
      { x: 11, y: 19, direction: SpikeDirection.UP },
      { x: 12, y: 19, direction: SpikeDirection.UP },
    ],
    turrets: [
      { x: 700, y: 200 }
    ],
    blades: [
      { x1: 600, y1: 300, x2: 400, y2: 200 }
    ],
    lasers: [
      { x: 400, y: 500 }
    ],
  }
];

export default levels;