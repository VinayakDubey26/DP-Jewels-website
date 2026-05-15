import { MessageCircle, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import bgImage from "../assets/bg.jpg";
import singleDiamond from "../assets/single-diamonds.jpg";
import randomDiamonds from "../assets/random-diamonds.jpg";

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
      <section id="home" className="relative flex min-h-screen items-end overflow-hidden">
        <img src={bgImage} alt="Premium jewellery background" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative mx-auto w-[min(1220px,94%)] pb-14 pt-32 md:pb-20 md:pt-36">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-[620px] text-white">
            <h1 className="font-serif text-4xl leading-tight md:text-6xl">Diamond Traders, Importers & Exporters</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E2E8F0] md:text-lg">
              Trusted sourcing from Bharat Diamond Bourse with 25+ years of precision, transparency, and global export focus.
            </p>
            <div className="mt-8">
              <a href="#diamonds" className="inline-flex rounded-sm border border-white/70 bg-white/10 px-6 py-3 text-sm tracking-[0.1em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#111827]">EXPLORE DIAMONDS</a>
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
              <article key={shape} className="group overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_12px_24px_rgba(15,23,42,0.1)]">
                <div className="mb-4 aspect-square overflow-hidden rounded-xl">
                  <img
                    src={singleDiamond}
                    alt={`${shape} diamond`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="font-serif text-2xl">{shape}</h3>
                <a href={WHATSAPP_LINK} className="mt-4 inline-flex rounded-full border border-[#111827] px-4 py-2 text-xs tracking-[0.1em] text-[#111827]">ENQUIRE</a>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-3xl">Gallery Preview</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="group aspect-[4/3] overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                <img src={randomDiamonds} alt="Diamond gallery image one" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="group aspect-[4/3] overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                <img src={randomDiamonds} alt="Diamond gallery image two" className="h-full w-full object-cover object-[60%_50%] transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="group aspect-[4/3] overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                <img src={randomDiamonds} alt="Diamond gallery image three" className="h-full w-full object-cover object-[35%_50%] transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
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
        <div className="mx-auto mt-6 grid w-[min(1220px,94%)] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="overflow-hidden rounded-3xl border border-[#D7DEE8] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
            <div className="group aspect-[16/9] overflow-hidden">
              <img src={randomDiamonds} alt="Premium diamond tray composition" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-[#D7DEE8] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
            <div className="group aspect-[4/3] overflow-hidden">
              <img src={singleDiamond} alt="Single diamond with precision tools" className="h-full w-full object-cover object-[62%_48%] transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
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
