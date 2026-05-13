import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const stats = [
  "25+ Years in Industry",
  "Global Buyer Focus",
  "Natural & Lab-Grown Expertise",
  "Trusted Diamond Sourcing",
];

export default function TrustSection() {
  return (
    <section className="section-shell">
      <SectionHeading
        title="25 Years of Refined Diamond Expertise"
        subtitle="For over 25 years, D.P. Jewels has built lasting trust in the diamond industry through consistency, precision, and transparent business relationships."
      />
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
        {stats.map((item, i) => (
          <motion.article
            key={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-3xl border border-white/12 bg-white/[0.03] p-6"
          >
            <p className="text-sm tracking-[0.08em] text-[var(--text-muted)]">{item}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

