import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShatterTile from "./ShatterTile";
import { useShatterPieces } from "../hooks/useShatterPieces";

const ROWS = 7;
const COLS = 9;
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
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-signal mb-4">
            AI Full Stack Software Engineer/Developer 
          </p>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium leading-[1.05] text-balance max-w-3xl">
            I build systems that learn, reason, and ship to production.
          </h1>
          {/* <p className="font-body text-mute text-base md:text-lg mt-6 max-w-xl">
            Scroll to break the surface — every project below is a piece of
            the same picture: applied ML, reliable infrastructure, and
            products people actually use.
          </p> */}
          <div className="mt-8 flex items-center gap-3 text-mute font-mono text-xs uppercase tracking-widest">
            <span className="inline-block w-6 h-px bg-mute" />
            scroll
          </div>
        </motion.div>
      </div>
    </section>
  );
}
