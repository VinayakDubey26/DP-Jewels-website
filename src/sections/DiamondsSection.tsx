import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const items = ["Natural Diamonds", "Lab-Grown Diamonds", "Certified Stones", "Custom Requirements"];

export default function DiamondsSection() {
  return (
    <section id="diamonds" className="section-shell">
      <SectionHeading title="Diamond Categories" subtitle="A focused portfolio for buyers seeking consistency, certification standards, and precise requirement matching." />
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <motion.article
            key={item}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group rounded-3xl border border-white/12 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/30"
          >
            <h3 className="font-serif text-3xl">{item}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">Designed for buyers who value trust, clarity, and long-term sourcing partnerships.</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

