import { MessageCircle, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WHATSAPP_LINK = "https://wa.me/918356810826?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";

const diamondShapes = [
  "Round",
  "Oval",
  "Emerald",
  "Pear",
  "Cushion",
  "Princess",
  "Marquise",
  "Radiant",
  "Asscher",
  "Heart",
];

const operations = [
  "Requirement Understanding",
  "Diamond Selection",
  "Quality Review",
  "Assortment",
  "Confirmation",
  "Delivery Coordination",
];

function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1000;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-[#D7DEE8] bg-white p-5">
      <p className="font-serif text-4xl text-[#111827]">{count.toLocaleString()}{suffix}</p>
      <p className="mt-2 text-sm tracking-[0.08em] text-[#475569]">{label}</p>
    </div>
  );
}

export default function ShowroomExperience() {
  return (
    <div className="text-[#111827]">
      <section id="home" className="relative overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(226,232,240,0.65),transparent_38%),linear-gradient(160deg,#FAF7F2,#F8F4EC)]" />
        <div className="relative mx-auto grid w-[min(1220px,94%)] items-center gap-10 py-16 lg:grid-cols-[1fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <p className="text-xs tracking-[0.2em] text-[#475569]">SINCE 1999</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Diamond Traders, Importers & Exporters</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#334155]">
              Trusted sourcing from Bharat Diamond Bourse with 25+ years of precision, transparency, and global export focus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#diamonds" className="rounded-full border border-[#D7DEE8] bg-white px-6 py-3 text-sm tracking-[0.1em] text-[#111827]">EXPLORE DIAMONDS</a>
              <a href={WHATSAPP_LINK} className="rounded-full border border-[#111827] bg-[#111827] px-6 py-3 text-sm tracking-[0.1em] text-white">WHATSAPP ENQUIRY</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="rounded-[2rem] border border-[#D7DEE8] bg-white p-5">
            <div className="aspect-[16/10] rounded-[1.4rem] border border-dashed border-[#D7DEE8] bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(226,232,240,0.55))] p-5">
              <div className="flex h-full items-center justify-center rounded-[1rem] border border-[#D7DEE8] bg-[#FAF7F2] text-center">
                <p className="max-w-xs text-sm tracking-[0.08em] text-[#475569]">Premium Diamond Hero Composition Placeholder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-[#FAF7F2] py-14">
        <div className="mx-auto w-[min(1220px,94%)]">
          <p className="text-xs tracking-[0.2em] text-[#475569]">ABOUT D.P. JEWELS</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Built on Trust, Since 1999</h2>
          <p className="mt-5 max-w-4xl leading-relaxed text-[#334155]">
            With 25+ years of experience, D.P. Jewels operates from Bharat Diamond Bourse, Mumbai, serving India and international buyers through transparent dealings, refined sourcing, and consistent export execution.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Counter value={25} suffix="+" label="Years of Experience" />
            <Counter value={200000} suffix="+" label="Carats Sold" />
            <Counter value={10} suffix="+" label="Markets Across India" />
            <Counter value={100} suffix="%" label="Global Export Focus" />
          </div>
        </div>
      </section>

      <section id="diamonds" className="py-14">
        <div className="mx-auto w-[min(1220px,94%)]">
          <p className="text-xs tracking-[0.2em] text-[#475569]">DIAMONDS</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Diamond Shapes & Selections</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {diamondShapes.map((shape) => (
              <article key={shape} className="rounded-2xl border border-[#D7DEE8] bg-white p-4">
                <div className="mb-4 aspect-square rounded-xl border border-dashed border-[#D7DEE8] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),rgba(226,232,240,0.65))]" />
                <h3 className="font-serif text-2xl">{shape}</h3>
                <a href={WHATSAPP_LINK} className="mt-4 inline-flex rounded-full border border-[#111827] px-4 py-2 text-xs tracking-[0.1em] text-[#111827]">ENQUIRE</a>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-3xl">Gallery Preview</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl border border-dashed border-[#D7DEE8] bg-[linear-gradient(145deg,#FFFFFF,#F3F4F6)] p-4">
                  <div className="flex h-full items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#FAF7F2] text-sm text-[#475569]">
                    Diamond Gallery Placeholder {i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="operations" className="bg-[#FAF7F2] py-14">
        <div className="mx-auto w-[min(1220px,94%)]">
          <p className="text-xs tracking-[0.2em] text-[#475569]">OPERATIONS</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Sourcing & Delivery Workflow</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {operations.map((step, idx) => (
              <article key={step} className="rounded-2xl border border-[#D7DEE8] bg-white p-5">
                <p className="text-xs tracking-[0.14em] text-[#475569]">0{idx + 1}</p>
                <h3 className="mt-2 font-serif text-2xl">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid w-[min(1220px,94%)] gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-3xl border border-[#D7DEE8] bg-white p-7">
            <p className="text-xs tracking-[0.2em] text-[#475569]">PRESENCE</p>
            <h3 className="mt-3 font-serif text-3xl">India Presence & Global Reach</h3>
            <p className="mt-4 text-[#334155]">
              Serving buyers across India while managing international diamond enquiries through focused sourcing and coordinated delivery.
            </p>
          </article>
          <article className="rounded-3xl border border-[#D7DEE8] bg-white p-7">
            <p className="text-xs tracking-[0.2em] text-[#475569]">TRUST</p>
            <h3 className="mt-3 font-serif text-3xl">Private Buyer Confidence</h3>
            <p className="mt-4 text-[#334155]">
              Every enquiry is handled with professionalism, confidentiality, and transparent communication from requirement to confirmation.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="bg-[#FAF7F2] py-14">
        <div className="mx-auto grid w-[min(1220px,94%)] gap-5 md:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-[#D7DEE8] bg-white p-6">
            <h3 className="font-serif text-3xl">Contact Us</h3>
            <p className="mt-4 leading-relaxed text-[#334155]">
              EC-4080 B, Bharat Diamond Bourse,<br />
              Bandra Kurla Complex,<br />
              Bandra(E), Mumbai-51
            </p>
            <div className="mt-4 space-y-1 text-[#334155]">
              <p>Tel: 022 3596 3936</p>
              <p>QBC: 022 3392 3961</p>
              <p>Email: ppsonecha@gmail.com / vipuldiamons55@gmail.com</p>
            </div>
          </article>
          <article className="rounded-2xl border border-[#D7DEE8] bg-white p-6">
            <div className="flex flex-col gap-3">
              <a href="tel:02235963936" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D7DEE8] px-4 py-3 text-sm text-[#111827]"><Phone size={16} /> Call Office</a>
              <a href={WHATSAPP_LINK} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111827] bg-[#111827] px-4 py-3 text-sm text-white"><MessageCircle size={16} /> WhatsApp Enquiry</a>
            </div>
          </article>
        </div>
      </section>

      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp Enquiry" className="floating-wa">
        <MessageCircle size={21} />
      </a>
    </div>
  );
}
