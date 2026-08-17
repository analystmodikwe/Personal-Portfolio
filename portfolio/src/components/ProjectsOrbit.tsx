import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { projects } from "../data/projects";
import OrbitCard from "./OrbitCard";

function useOrbitRadius() {
  const [radius, setRadius] = useState({ x: 260, y: 120 });

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setRadius({
        x: Math.min(w * 0.3, 340),
        y: Math.min(w * 0.14, 150),
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return radius;
}

export default function ProjectsOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const radius = useOrbitRadius();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const handleFocus = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const active = projects[activeIndex];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative"
      style={{ height: `${projects.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <div className="px-6 md:px-10 pt-28 md:pt-32 max-w-6xl mx-auto w-full">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal mb-4">
            selected work
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight max-w-2xl text-balance">
            Scroll — each project orbits into focus.
          </h2>
        </div>

        {/* the orbit itself */}
        <div className="relative flex-1">
          {/* the active project's photo, centered, swaps as the front node changes */}
          <AnimatePresence mode="wait">
            {active.image && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,420px)] aspect-[4/5] rounded-2xl overflow-hidden border border-edge shadow-2xl shadow-black/50"
                style={{ zIndex: -1 }}
              >
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {projects.map((project, i) => (
            <OrbitCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              radius={radius}
              onFocus={handleFocus}
            />
          ))}
        </div>

        {/* active project detail panel, crossfades as the front node changes */}
        <div className="px-6 md:px-10 pb-10 md:pb-14 max-w-6xl mx-auto w-full">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-end justify-between gap-4 border-t border-edge pt-6"
          >
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-widest text-mute border border-edge rounded-full px-2.5 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {active.metric && (
                <p className="text-amber font-mono text-sm mt-3">{active.metric}</p>
              )}
            </div>
            <div className="flex gap-3 font-mono text-xs uppercase tracking-widest">
              {active.repo && (
                <a href={active.repo} className="text-mute hover:text-ink transition-colors">
                  repo →
                </a>
              )}
              {active.href && (
                <a href={active.href} className="text-signal hover:text-ink transition-colors">
                  live →
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}