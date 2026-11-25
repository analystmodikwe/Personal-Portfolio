import { motion } from "framer-motion";

// Keep the stack card limited to the requested CV technologies and casing.
const STACKS: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"] },
  { label: "Mobile", items: ["React Native", "Expo"] },
  { label: "Backend", items: ["Node.js", "Express", "REST APIs", "Supabase Auth", "JWT"] },
  { label: "Data", items: ["PostgreSQL", "Row-Level Security", "MongoDB", "Power BI"] },
  { label: "Testing", items: ["Vitest", "Jest", "Playwright", "TDD"] },
  { label: "DevOps", items: ["Git", "GitHub Actions", "Vercel", "Netlify"] },
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
          {/* Updated About copy; the nonbreaking hyphen keeps full-stack on one line. */}
          <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight text-balance">
            I work at the intersection of data and full‑stack development.
          </h2>
          <p className="text-mute mt-6 leading-relaxed">
            I'm a full-stack developer with a data analytics background, so I start with the database and work outwards. I design the schema, secure it with Row-Level Security, build the API and ship the interface, then back it with automated tests. Recent work includes Guard'Ova, a Bluetooth-connected personal safety app; ServiceFlow SA, a multi-tenant booking platform; and Straina, a public health mapping platform where I served as Tech Lead. I'm a Melsoft Academy hackathon winner, based in Johannesburg.
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
                <div className="flex min-w-0 flex-wrap gap-2 pl-4">
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
