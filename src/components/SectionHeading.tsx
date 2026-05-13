import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <h2 className="font-serif text-3xl tracking-[0.08em] md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{subtitle}</p>}
    </motion.div>
  );
}

