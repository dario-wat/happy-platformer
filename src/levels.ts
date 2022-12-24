const levels = {
  width: 800,
  height: 600,
  levels: [
    {
      level: 1,
      platforms: [
        { x: 3, y: 3, length: 5, isVertical: false },
      ],
      spikes: [
        { x: 400, y: 568 },
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
  ],
};

export default levels;