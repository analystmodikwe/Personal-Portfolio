import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShatterTile from "./ShatterTile";
import { useShatterPieces } from "../hooks/useShatterPieces";
import { useIsMobile } from "../hooks/useIsMobile";

const ROWS_DESKTOP = 7;
const COLS_DESKTOP = 9;
const ROWS_MOBILE = 5;
const COLS_MOBILE = 5;
// Swap this for your own photo: drop a file into /public and update the path.
// A tall, roughly-centered portrait with a plain or dark background shatters best.
const PORTRAIT_SRC = "/snpl.png";
// Revealed behind the portrait as it shatters — replaces the grid backdrop.
// Drop any image into /public and point this at it (a wide, moody shot
// works best since it fills the whole screen, e.g. your workspace, a
// code screenshot, an abstract texture, etc).
const REVEAL_SRC = "/0J4A2308.jpg";

export default function ShatterPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const ROWS = isMobile ? ROWS_MOBILE : ROWS_DESKTOP;
  const COLS = isMobile ? COLS_MOBILE : COLS_DESKTOP;
  const pieces = useShatterPieces(ROWS, COLS);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0]);

  // the second image emerges as the shards clear out of the way, and
  // drifts/zooms slightly for a bit of parallax rather than a flat cut
  const revealOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85], [0, 1, 1]);
  const revealScale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 0]);

  return (
    <section id="top" ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-void">
        {/* the image revealed behind the portrait as it shatters */}
        <motion.div
          className="absolute inset-0 bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(${REVEAL_SRC})`,
            backgroundPosition: "center",
            opacity: revealOpacity,
            scale: revealScale,
          }}
        />

        {/* ambient grid, layered on top of the reveal image, fades out early */}
        <motion.div className="absolute inset-0 bg-grid" style={{ opacity: gridOpacity }} />

        {/* the portrait itself, sliced into tiles that fly apart on scroll */}
        <div className="absolute inset-0">
          {pieces.map((piece) => (
            <ShatterTile
              key={piece.id}
              piece={piece}
              rows={ROWS}
              cols={COLS}
              imageSrc={PORTRAIT_SRC}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* readability scrim, fades out with the same progress */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-void/10"
          style={{ opacity: scrimOpacity }}
        />

        {/* headline, pinned over the portrait, fades slightly ahead of the shards */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-24 max-w-6xl mx-auto"
        >
          {/* Scale and constrain the headline to keep it left of the portrait. */}
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-signal mb-4">
            AI FULL STACK SOFTWARE ENGINEER / DEVELOPER
          </p>
          <h1 className="font-display text-[clamp(1.5rem,5vw,1.875rem)] leading-[1] sm:text-[clamp(1.75rem,4.5vw,4rem)] md:text-[clamp(2rem,4.5vw,4rem)] md:leading-[1.05] font-medium text-balance max-w-full md:max-w-[45%]">
            Full-stack engineer who ships real products, from live-tracking safety apps to multi-tenant platforms.
          </h1>
          {/* Add subtle contrast so the subtitle remains legible over the photo. */}
          <p
            className="font-body text-mute text-sm sm:text-base md:text-lg mt-4 max-w-xl"
            style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.85)" }}
          >
            Based in Johannesburg · Open to full-stack and mobile roles.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="font-mono text-xs sm:text-sm uppercase tracking-widest bg-signal text-void px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="/Lesedi_Modikwe_NEW_CV.pdf"
              download
              className="font-mono text-xs sm:text-sm uppercase tracking-widest border border-edge px-5 py-3 rounded-full hover:border-signal hover:text-signal transition-colors"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
