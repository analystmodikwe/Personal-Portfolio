import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal mb-4">contact</p>
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight text-balance max-w-3xl">
            Have something worth building? Let's talk.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:you@example.com"
              className="font-mono text-sm uppercase tracking-widest bg-signal text-void px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              you@example.com
            </a>
            <a
              href="#"
              className="font-mono text-sm uppercase tracking-widest border border-edge px-6 py-3 rounded-full hover:border-signal hover:text-signal transition-colors"
            >
              github
            </a>
            <a
              href="#"
              className="font-mono text-sm uppercase tracking-widest border border-edge px-6 py-3 rounded-full hover:border-signal hover:text-signal transition-colors"
            >
              linkedin
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
