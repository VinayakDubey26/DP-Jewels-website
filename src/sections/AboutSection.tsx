import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.2em] text-[var(--text-muted)]">ABOUT</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">Built on relationships, shaped by precision.</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
            D.P. Jewels serves global buyers with carefully sourced natural and lab-grown diamonds. Our approach is discreet,
            detail-led, and grounded in transparent communication from requirement to final confirmation.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="grid gap-4">
          <article className="rounded-3xl border border-white/12 bg-white/[0.03] p-6">
            <h3 className="font-serif text-2xl">Sourcing Discipline</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">Reliable supplier channels and strict quality checkpoints for confidence at every stage.</p>
          </article>
          <article className="rounded-3xl border border-white/12 bg-white/[0.03] p-6">
            <h3 className="font-serif text-2xl">International Perspective</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">We align assortments and communication standards to global buyer expectations.</p>
          </article>
        </motion.div>
      </div>
    </section>
  );
}

