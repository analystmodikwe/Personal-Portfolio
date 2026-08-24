import { motion } from "framer-motion";
import { projects } from "../data/projects";

/**
 * Mobile/narrow-screen fallback for the orbit. The circular scroll math in
 * OrbitCard needs real horizontal room to read as a "carousel" — on a phone
 * it just overlaps everything. So instead: a plain stacked list, each card
 * fading/sliding in as it enters view. Same data, same links.
 */
export default function ProjectsMobile() {
  return (
    <section id="work" className="relative py-20 px-6">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal mb-4">
        selected work
      </p>
      <h2 className="font-display text-3xl font-medium leading-tight mb-10 text-balance">
        Scroll — each project below.
      </h2>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="block rounded-2xl border border-edge bg-panel/90 overflow-hidden"
          >
            {project.image && (
              <div className="w-full aspect-[16/10] bg-void">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-signal mb-2">
                {project.year} · node {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-lg font-medium leading-snug">{project.title}</h3>
              <p className="text-mute text-sm mt-2 leading-relaxed">{project.summary}</p>

              <div className="flex items-center gap-2 flex-wrap mt-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-widest text-mute border border-edge rounded-full px-2.5 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                {project.metric ? (
                  <p className="text-amber font-mono text-xs">{project.metric}</p>
                ) : (
                  <span />
                )}
                <div className="flex gap-3 font-mono text-xs uppercase tracking-widest">
                  {project.repo && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(project.repo, "_blank", "noopener,noreferrer");
                      }}
                      className="text-mute"
                    >
                      repo →
                    </span>
                  )}
                  {project.href && <span className="text-signal">live →</span>}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}