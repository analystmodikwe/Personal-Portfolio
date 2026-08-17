import { motion } from "framer-motion";

interface Role {
  period: string;
  title: string;
  org: string;
  detail: string;
}

const ROLES: Role[] = [
  {
    period: "2024 — now",
    title: "AI Engineer",
    org: "Independent / contract",
    detail: "Design and ship applied ML features end to end: data pipeline, model, API, and the UI that ships it.",
  },
  {
    period: "2022 — 2024",
    title: "Software Engineer",
    org: "Product team",
    detail: "Owned backend services powering search and recommendations; moved the team onto a shared eval framework.",
  },
  {
    period: "2020 — 2022",
    title: "Software Engineer, Junior",
    org: "Product team",
    detail: "Built internal tooling and shipped customer-facing features across the stack.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal mb-4">experience</p>
        <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight mb-14 max-w-2xl text-balance">
          Where the last few years went.
        </h2>

        <div className="space-y-0">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.title + role.period}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-[100px_1fr] gap-4 md:gap-10 py-8 border-t border-edge first:border-t-0 md:first:border-t"
            >
              <p className="font-mono text-xs text-mute uppercase tracking-widest pt-1">
                {role.period}
              </p>
              <div>
                <h3 className="font-display text-xl font-medium">
                  {role.title} <span className="text-mute font-body font-normal">— {role.org}</span>
                </h3>
                <p className="text-mute mt-2 max-w-2xl leading-relaxed">{role.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
