import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ShatterPiece } from "../hooks/useShatterPieces";

interface ShatterTileProps {
  piece: ShatterPiece;
  rows: number;
  cols: number;
  imageSrc: string;
  progress: MotionValue<number>;
}

export default function ShatterTile({ piece, rows, cols, imageSrc, progress }: ShatterTileProps) {
  const { xPct, yPct, dx, dy, rotate, delay } = piece;

  const local = useTransform(progress, [0, Math.min(delay, 0.85), 1], [0, 0, 1]);
  const translateX = useTransform(local, [0, 1], [0, dx]);
  const translateY = useTransform(local, [0, 1], [0, dy]);
  const spin = useTransform(local, [0, 1], [0, rotate]);
  const opacity = useTransform(local, [0, 0.75, 1], [1, 1, 0]);
  const scale = useTransform(local, [0, 1], [1, 0.7]);

  return (
    <motion.div
      className="absolute overflow-hidden will-change-transform"
      style={{
        width: `calc(${100 / cols}% + 2px)`,
        height: `calc(${100 / rows}% + 2px)`,
        left: `calc(${xPct}% - 1px)`,
        top: `calc(${yPct}% - 1px)`,
        x: translateX,
        y: translateY,
        rotate: spin,
        opacity,
        scale,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${cols === 1 ? 0 : (piece.col / (cols - 1)) * 100}% ${
            rows === 1 ? 0 : (piece.row / (rows - 1)) * 100
          }%`,
        }}
      />
    </motion.div>
  );
}
