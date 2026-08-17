import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "../data/projects";

interface OrbitCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  radius: { x: number; y: number };
  onFocus: (index: number) => void;
}

const TWO_PI = Math.PI * 2;

export default function OrbitCard({ project, index, total, progress, radius, onFocus }: OrbitCardProps) {
  // Each card's phase around the ring, evenly spaced, then the whole ring
  // rotates forward one full turn as scroll progress goes 0 -> 1.
  const basePhase = (index / total) * TWO_PI;

  const angle = useTransform(progress, (p) => basePhase - p * TWO_PI);
  const depth = useTransform(angle, (a) => Math.cos(a)); // 1 = front/closest, -1 = back/farthest

  const x = useTransform(angle, (a) => Math.sin(a) * radius.x);
  const y = useTransform(angle, (a) => Math.cos(a) * radius.y);
  const scale = useTransform(depth, [-1, 1], [0.55, 1.12]);
  const opacity = useTransform(depth, [-1, -0.2, 1], [0.15, 0.55, 1]);
  const blur = useTransform(depth, [-1, 0.4, 1], [3, 0.5, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const zIndex = useTransform(depth, (d) => Math.round(d * 100) + 100);

  // report focus to the parent when this card crosses the front of the ring
  useMotionValueEvent(depth, "change", (d) => {
    if (d > 0.985) onFocus(index);
  });

  return (
    <motion.a
      href={project.href ?? "#"}
      style={{ x, y, scale, opacity, filter, zIndex }}
      className="absolute top-1/2 left-1/2 -mt-20 -ml-28 w-56 md:w-64 rounded-2xl border border-edge overflow-hidden shadow-2xl shadow-black/40 pointer-events-auto"
    >
      {/* background image, falls back to the plain panel color if none is set */}
      <div
        className="absolute inset-0 bg-panel-raised bg-cover bg-center"
        style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
      />
      {/* gradient scrim so text stays legible over any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/35 to-transparent" />

      <div className="relative p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
          {project.year} · node {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="font-display text-lg font-medium leading-snug text-ink drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          {project.title}
        </h3>
        <p className="text-ink/80 text-xs mt-2 leading-relaxed line-clamp-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {project.summary}
        </p>
      </div>
    </motion.a>
  );
}