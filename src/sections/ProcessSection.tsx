import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const steps = ["Requirement", "Selection", "Assortment", "Quality Review", "Confirmation", "Delivery Coordination"];

export default function ProcessSection() {
  return (
    <section id="process" className="section-shell">
      <SectionHeading title="Process" subtitle="A refined and transparent workflow built for professional buyer communication." />
      <div className="mx-auto max-w-6xl overflow-x-auto pb-4">
        <div className="min-w-[780px]">
          <div className="mb-6 h-px bg-white/15" />
          <div className="grid grid-cols-6 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="rounded-2xl border border-white/12 bg-white/[0.03] p-4"
              >
                <p className="text-xs tracking-[0.2em] text-[var(--text-muted)]">0{i + 1}</p>
                <p className="mt-3 font-serif text-xl">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

