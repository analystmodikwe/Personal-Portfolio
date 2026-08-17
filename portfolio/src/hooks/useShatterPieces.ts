export interface ShatterPiece {
  id: string;
  row: number;
  col: number;
  /** 0–1 position of this tile within the grid, used to size the background-image slice */
  xPct: number;
  yPct: number;
  /** direction + distance (in px, at full progress) this shard flies outward */
  dx: number;
  dy: number;
  rotate: number;
  /** stagger so shards near the edges break a beat later than the center */
  delay: number;
}

// Small deterministic PRNG (mulberry32) so the shatter pattern is stable
// across renders instead of re-randomizing on every re-render.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function useShatterPieces(rows: number, cols: number, seed = 7): ShatterPiece[] {
  const rand = mulberry32(seed);
  const pieces: ShatterPiece[] = [];
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const maxDist = Math.hypot(cx, cy) || 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // outward vector from grid center through this tile, so the image
      // reads as "exploding outward" rather than drifting randomly
      const vx = c - cx;
      const vy = r - cy;
      const dist = Math.hypot(vx, vy) || 0.001;
      const spread = 260 + rand() * 340; // px travelled at full shatter
      const jitter = (rand() - 0.5) * 40;

      pieces.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        xPct: (c / cols) * 100,
        yPct: (r / rows) * 100,
        dx: (vx / dist) * spread + jitter,
        dy: (vy / dist) * spread + jitter * 0.6,
        rotate: (rand() - 0.5) * 140,
        delay: (dist / maxDist) * 0.15,
      });
    }
  }
  return pieces;
}
