import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -90]);
  const x = useTransform(scrollYProgress, [0, 0.4], [0, 35]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 md:px-10">
      <div className="ambient-layer" aria-hidden="true" />
      <motion.div style={{ y, x }} className="facet-plane" aria-hidden="true" />
      <div className="watermark">DP</div>
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="mb-5 text-xs tracking-[0.26em] text-[var(--text-muted)]">DIAMOND TRADERS, IMPORTERS & EXPORTERS</p>
          <h1 className="font-serif text-5xl tracking-[0.12em] md:text-7xl">D.P. Jewels</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            A refined global diamond house built on trust, precision, and carefully sourced stones.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#enquiry" className="magnetic-btn rounded-full border border-white/20 px-6 py-3 text-sm tracking-[0.08em]">Send Enquiry</a>
            <a href="https://wa.me/919819156358" className="rounded-full border border-white/20 px-6 py-3 text-sm tracking-[0.08em]">WhatsApp</a>
            <a href="#about" className="rounded-full border border-white/20 px-6 py-3 text-sm tracking-[0.08em]">Explore</a>
          </div>
        </motion.div>
        <div className="relative hidden h-[560px] md:block">
          <div className="reflective-grid" />
        </div>
      </div>
    </section>
  );
}

