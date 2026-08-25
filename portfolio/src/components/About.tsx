import { motion } from "framer-motion";

const STACKS: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React ", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"] },
  { label: "Backend", items: ["Node.js", "Express", "RestAPI", "JWT"] },
  { label: "Data", items: ["PostgreSql", "Power BI", "MongoDB"] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[1fr_1.1fr] gap-14 md:gap-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal mb-4">about</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight text-balance">
            "I work at the intersection of data and full-stack development."
          </h2>
          <p className="text-mute mt-6 leading-relaxed">
            "I like owning a problem from the database up through the interface — designing the schema, building the API, and making sure what ships actually works for real users. I've done this on live client projects as well as solo builds, always with an eye for clean, maintainable code. Currently sharpening this through Melsoft's AI Full Stack Software Development programme."
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-2xl border border-edge bg-panel/60 backdrop-blur-sm p-6 md:p-8 font-mono text-sm"
        >
          <div className="flex gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-edge" />
            <span className="w-3 h-3 rounded-full bg-edge" />
            <span className="w-3 h-3 rounded-full bg-edge" />
            <span className="ml-2 text-mute text-xs">stack.json</span>
          </div>
          <div className="space-y-5">
            {STACKS.map((group) => (
              <div key={group.label}>
                <p className="text-wire mb-2">
                  <span className="text-mute">"</span>
                  {group.label}
                  <span className="text-mute">"</span>:
                </p>
                <div className="flex flex-wrap gap-2 pl-4">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md bg-panel-raised border border-edge text-ink text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
