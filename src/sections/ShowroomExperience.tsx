import { motion, useInView } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import MagneticButton from "../components/MagneticButton";

type StatProps = {
  value: number;
  suffix?: string;
  label: string;
};

function CounterStat({ value, suffix = "", label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)]/70 p-5">
      <p className="font-serif text-4xl text-[var(--text-main)]">{count}{suffix}</p>
      <p className="mt-2 text-sm tracking-[0.08em] text-[var(--text-muted)]">{label}</p>
    </div>
  );
}

const journeyItems = [
  "Diamond Sourcing",
  "Natural Diamonds",
  "Lab-Grown Diamonds",
  "Certified Stones",
  "Custom Requirements",
];

const spotlight = [
  "Understanding Natural & Lab-Grown Diamonds",
  "The Importance of Trusted Diamond Sourcing",
  "25 Years of Refined Diamond Expertise",
];

export default function ShowroomExperience() {
  const placeholderVideo = useMemo(
    () => "Premium Diamond Visual / Video Placeholder",
    []
  );

  return (
    <div className="relative">
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(125,211,252,0.15),transparent_38%),linear-gradient(135deg,rgba(7,17,31,0.95),rgba(15,23,42,0.92))]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(203,213,225,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.08)_1px,transparent_1px)] bg-[size:70px_70px] opacity-30" />

        <div className="relative z-10 mx-auto grid w-[min(1220px,94%)] items-center gap-10 py-12 lg:grid-cols-[1fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-[560px]">
            <p className="mb-5 text-xs tracking-[0.24em] text-[var(--text-muted)]">D.P. JEWELS</p>
            <h1 className="font-serif text-4xl leading-tight md:text-6xl">Diamond Traders, Importers & Exporters</h1>
            <p className="mt-6 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              A refined diamond house serving buyers through carefully selected natural and lab-grown diamonds, trusted sourcing, and long-standing industry relationships.
            </p>
            <div className="mt-8">
              <MagneticButton href="#enquiry">ENQUIRE NOW</MagneticButton>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="rounded-[2rem] border border-[var(--panel-border)] bg-[var(--panel-bg)]/60 p-6">
            <div className="aspect-[16/10] rounded-[1.35rem] border border-dashed border-[var(--panel-border)] bg-[linear-gradient(135deg,rgba(147,197,253,0.12),rgba(30,58,95,0.12))] p-5">
              <div className="flex h-full items-center justify-center rounded-[1rem] border border-[var(--panel-border)] bg-[var(--bg-section)]/60 text-center">
                <p className="max-w-xs text-sm tracking-[0.08em] text-[var(--text-muted)]">{placeholderVideo}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="our-story" className="mx-auto w-[min(1220px,94%)] py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CounterStat value={25} suffix="+" label="Years in the Diamond Industry" />
          <CounterStat value={2} suffix="" label="Natural & Lab-Grown Diamonds" />
          <CounterStat value={100} suffix="%" label="Global Buyer Focus" />
          <CounterStat value={24} suffix="/7" label="Private Diamond Enquiries" />
        </div>
      </section>

      <section className="bg-[var(--bg-section)] py-14">
        <div className="mx-auto grid w-[min(1220px,94%)] gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs tracking-[0.2em] text-[var(--text-muted)]">GLOBAL PRESENCE</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Mumbai, India</h2>
            <p className="mt-5 text-[var(--text-muted)]">Bharat Diamond Bourse</p>
            <p className="mt-3 max-w-md text-[var(--text-muted)]">EC-4080 B, Bandra Kurla Complex, Bandra(E), Mumbai-51</p>
          </div>
          <div className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel-bg)]/80 p-6">
            <div className="aspect-[16/10] rounded-2xl border border-dashed border-[var(--panel-border)] bg-[linear-gradient(145deg,rgba(147,197,253,0.11),rgba(30,58,95,0.08))]" />
          </div>
        </div>
      </section>

      <section id="operations" className="mx-auto w-[min(1220px,94%)] py-14">
        <p className="text-xs tracking-[0.2em] text-[var(--text-muted)]">THE JOURNEY OF BRILLIANCE</p>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">Where trust, precision, and sourcing expertise come together.</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {journeyItems.map((item, i) => (
            <motion.article whileHover={{ y: -4 }} key={item} className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)]/75 p-5 transition-colors hover:border-[var(--accent-line)]">
              <p className="text-xs tracking-[0.14em] text-[var(--accent-soft)]">0{i + 1}</p>
              <h3 className="mt-2 font-serif text-2xl leading-tight">{item}</h3>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="media" className="bg-[var(--bg-section)] py-14">
        <div className="mx-auto w-[min(1220px,94%)]">
          <p className="text-xs tracking-[0.2em] text-[var(--text-muted)]">IN THE SPOTLIGHT</p>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {spotlight.map((item) => (
              <motion.article whileHover={{ y: -4 }} key={item} className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel-bg)]/85 p-6">
                <div className="mb-5 aspect-[16/10] rounded-2xl border border-dashed border-[var(--panel-border)] bg-[linear-gradient(145deg,rgba(147,197,253,0.09),rgba(30,58,95,0.08))]" />
                <h3 className="font-serif text-2xl leading-tight">{item}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1220px,94%)] py-14">
        <h2 className="font-serif text-4xl md:text-5xl">Cut by Experience. Refined by Trust.</h2>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-[var(--text-muted)]">
          For over 25 years, D.P. Jewels has built lasting trust in the diamond industry through consistency, precision, and transparent business relationships.
        </p>
      </section>

      <section className="bg-[var(--bg-section)] py-14">
        <div className="mx-auto w-[min(1220px,94%)]">
          <h2 className="font-serif text-4xl md:text-5xl">Trusted by Buyers</h2>
          <div className="mt-7 rounded-3xl border border-[var(--panel-border)] bg-[var(--panel-bg)]/80 p-8">
            <p className="text-[var(--text-muted)]">Certifications and affiliations can be added here once provided.</p>
          </div>
        </div>
      </section>

      <section id="sustainability" className="mx-auto w-[min(1220px,94%)] py-14">
        <h2 className="font-serif text-4xl md:text-5xl">Responsibility Beyond the Stone</h2>
        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Ethical Sourcing",
            "Transparent Dealings",
            "Long-Term Relationships",
            "Buyer Trust",
          ].map((item) => (
            <article key={item} className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)]/80 p-5">
              <h3 className="font-serif text-2xl">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="enquiry" className="bg-[var(--bg-section)] py-14">
        <div className="mx-auto grid w-[min(1220px,94%)] gap-6 rounded-[1.8rem] border border-[var(--panel-border)] bg-[var(--panel-bg)]/90 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-xs tracking-[0.2em] text-[var(--text-muted)]">PRIVATE ENQUIRY</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Share your requirement</h2>
            <p className="mt-4 text-[var(--text-muted)]">Our team will connect with a focused and confidential response.</p>
          </div>
          <form className="grid gap-3 md:grid-cols-2">
            {/* Connect backend/email service later. */}
            {["Name", "Company Name", "Phone", "Email", "Interest", "Preferred Contact"].map((field) => (
              <label key={field} className="premium-input-wrap text-sm text-[var(--text-muted)]">
                {field}
                <input className="premium-input" placeholder={field} />
              </label>
            ))}
            <label className="premium-input-wrap text-sm text-[var(--text-muted)] md:col-span-2">
              Requirement Details
              <textarea rows={3} className="premium-input" />
            </label>
            <label className="premium-input-wrap text-sm text-[var(--text-muted)] md:col-span-2">
              Message
              <textarea rows={4} className="premium-input" />
            </label>
            <MagneticButton type="button" className="md:col-span-2">Submit Enquiry</MagneticButton>
          </form>
        </div>
      </section>

      <section id="contact" className="mx-auto w-[min(1220px,94%)] py-14">
        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <article className="contact-card">
            <p className="leading-relaxed text-[var(--text-muted)]">
              EC-4080 B, Bharat Diamond Bourse,<br />
              Bandra Kurla Complex,<br />
              Bandra(E), Mumbai-51
            </p>
            <div className="mt-4 space-y-1 text-[var(--text-muted)]">
              <p>Tel: 022 3596 3936</p>
              <p>QBC: 022 3392 3961</p>
              <p>ppsonecha@gmail.com</p>
              <p>vipuldiamons55@gmail.com</p>
              <p>WhatsApp: +91 98191 56358</p>
            </div>
          </article>
          <article className="contact-card">
            <div className="flex flex-col gap-3">
              <MagneticButton href="tel:02235963936" className="flex items-center justify-center gap-2"><Phone size={16} /> Call Office</MagneticButton>
              <MagneticButton href="mailto:ppsonecha@gmail.com" className="flex items-center justify-center gap-2"><Mail size={16} /> Email Enquiry</MagneticButton>
              <MagneticButton href="https://wa.me/919819156358" className="flex items-center justify-center gap-2"><MessageCircle size={16} /> WhatsApp Enquiry</MagneticButton>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
