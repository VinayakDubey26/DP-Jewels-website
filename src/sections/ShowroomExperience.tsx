import { MessageCircle, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import bgImage from "../assets/bg.jpg";
import singleDiamond from "../assets/single-diamonds.jpg";
import randomDiamonds from "../assets/random-diamonds.jpg";
import diamondRound from "../assets/shaped/diamond_round.png";
import diamondOval from "../assets/shaped/diamond_oval.png";
import diamondPear from "../assets/shaped/diamond_pear.png";
import diamondCushion from "../assets/shaped/diamond_cushion.png";
import diamondPrincess from "../assets/shaped/diamond_princess.png";
import diamondMarquise from "../assets/shaped/diamond_marquise.png";
import diamondEmerald from "../assets/shaped/diamond_emerald.png";
import diamondRadiant from "../assets/shaped/diamond_radiant.png";
import diamondAsscher from "../assets/shaped/diamond_asscher.png";
import diamondHeart from "../assets/shaped/diamond_heart.png";
import indiaMap from "../assets/india.png";

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

const diamondShapeImageMap: Record<string, string> = {
  Round: diamondRound,
  Oval: diamondOval,
  Emerald: diamondEmerald,
  Pear: diamondPear,
  Cushion: diamondCushion,
  Princess: diamondPrincess,
  Marquise: diamondMarquise,
  Radiant: diamondRadiant,
  Asscher: diamondAsscher,
  Heart: diamondHeart,
};

const diamondOpticalClassMap: Record<string, string> = {
  Round: "scale-[0.95]",
  Oval: "scale-[1]",
  Emerald: "scale-[0.98]",
  Pear: "scale-[0.92]",
  Cushion: "scale-[0.98]",
  Princess: "scale-[0.98]",
  Marquise: "scale-x-[1.08] scale-y-[0.97]",
  Radiant: "scale-[0.97] -translate-y-[4%]",
  Asscher: "scale-[0.93]",
  Heart: "scale-[0.98] translate-y-[4%]",
};

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
  const [activeDiamond, setActiveDiamond] = useState<string | null>(null);

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

      <motion.section id="about" className="bg-[#FAF7F2] py-14" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}>
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
      </motion.section>

      <motion.section id="diamonds" className="relative py-14" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}>
        <div className="mx-auto w-[min(1220px,94%)]">
          <p className="text-xs tracking-[0.2em] text-[#475569]">DIAMONDS</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Diamond Shapes & Selections</h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {diamondShapes.map((shape) => (
              <article
                key={shape}
                className="group relative flex flex-col items-center rounded-2xl px-2 py-2"
                onClick={() => setActiveDiamond((prev) => (prev === shape ? null : shape))}
              >
                <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-white/55 opacity-0 blur-xl transition-all duration-300 ${activeDiamond === shape ? "scale-100 opacity-100" : "scale-95 group-hover:scale-100 group-hover:opacity-100"}`} />
                <div className="mb-5 flex h-[168px] w-full max-w-[178px] items-center justify-center md:h-[182px]">
                  <img
                    src={diamondShapeImageMap[shape]}
                    alt={`${shape} diamond`}
                    className={`relative h-[92%] w-[92%] object-contain object-center transition-transform duration-300 group-hover:scale-[1.05] ${diamondOpticalClassMap[shape]}`}
                  />
                </div>
                <h3 className="relative font-serif text-2xl text-[#111827]">{shape}</h3>
                <div className={`relative mt-2 transition-all duration-300 ${activeDiamond === shape ? "max-h-14 opacity-100" : "max-h-0 opacity-0 group-hover:max-h-14 group-hover:opacity-100"}`}>
                  <a
                    href={WHATSAPP_LINK}
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex rounded-full border border-[#111827]/35 bg-white/70 px-4 py-1.5 text-xs tracking-[0.12em] text-[#111827] backdrop-blur-sm transition-colors duration-300 hover:border-[#111827] hover:bg-white"
                  >
                    Enquire
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="relative -mt-2 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] py-16" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
        <div className="mx-auto w-[min(1220px,94%)]">
          <p className="text-xs tracking-[0.2em] text-[#475569]">GLOBAL PRESENCE</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Global Presence, Rooted in Mumbai</h2>
          <p className="mt-5 max-w-4xl leading-relaxed text-[#334155]">
            From Bharat Diamond Bourse, Mumbai, D.P. Jewels serves buyers across India and key international markets with trusted diamond sourcing and export-focused relationships.
          </p>
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#d7dee8] bg-[radial-gradient(circle_at_38%_35%,#ffffff_0%,#f8f4ec_46%,#f1ece3_100%)] p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] md:p-8">
            <motion.div
              className="relative mx-auto aspect-[16/10] w-full max-w-[980px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75 }}
            >
              <motion.img
                src={indiaMap}
                alt="India map"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[124%] w-[124%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-100 md:h-[134%] md:w-[134%]"
                initial={{ opacity: 0, scale: 0.985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              />
              <div className="pointer-events-none absolute bottom-[17%] right-[26%] h-[13%] w-[12%] rounded-full bg-[radial-gradient(circle,#f7f3eb_0%,rgba(247,243,235,0.86)_45%,rgba(247,243,235,0)_88%)]" />
              <motion.svg
                viewBox="0 0 1000 560"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="India centered export network from Mumbai"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
              <defs>
                <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="routeFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.36" />
                  <stop offset="50%" stopColor="#0f172a" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.28" />
                </linearGradient>
                <linearGradient id="routeFlowIntl" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
                  <stop offset="65%" stopColor="#1e293b" stopOpacity="0.62" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="1000" height="560" fill="transparent" />
              <motion.path id="routeIndiaNorth" d="M366 292 Q374 236 414 174" stroke="url(#routeFlow)" strokeWidth="1.56" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.84 }} viewport={{ once: true }} transition={{ duration: 1.02, delay: 0.12 }} />
              <motion.path id="routeIndiaJammu" d="M366 292 Q368 206 366 126" stroke="url(#routeFlow)" strokeWidth="1.58" fill="none" initial={{ pathLength: 0, opacity: 0.32 }} whileInView={{ pathLength: 1, opacity: 0.86 }} viewport={{ once: true }} transition={{ duration: 1.05, delay: 0.16 }} />
              <motion.path id="routeIndiaEast" d="M366 292 Q456 278 570 230" stroke="url(#routeFlow)" strokeWidth="1.56" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.82 }} viewport={{ once: true }} transition={{ duration: 1.06, delay: 0.22 }} />
              <motion.path id="routeIndiaSouth" d="M366 292 Q362 364 416 452" stroke="url(#routeFlow)" strokeWidth="1.56" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.82 }} viewport={{ once: true }} transition={{ duration: 1.05, delay: 0.27 }} />
              <motion.path id="routeIndiaWest" d="M366 292 Q334 286 312 262" stroke="url(#routeFlow)" strokeWidth="1.56" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.82 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
              <motion.path id="routeIndiaNorthEast" d="M366 292 Q494 240 640 176" stroke="url(#routeFlow)" strokeWidth="1.54" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.82 }} viewport={{ once: true }} transition={{ duration: 1.08, delay: 0.34 }} />
              <motion.path id="routeIndiaCentral" d="M366 292 Q430 282 502 262" stroke="url(#routeFlow)" strokeWidth="1.52" fill="none" initial={{ pathLength: 0, opacity: 0.28 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.02, delay: 0.25 }} />
              <motion.path id="routeDubai" d="M366 292 Q248 214 136 134" stroke="url(#routeFlowIntl)" strokeWidth="1.62" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 1.22, delay: 0.4 }} />
              <motion.path id="routeLondon" d="M366 292 Q230 150 96 22" stroke="url(#routeFlowIntl)" strokeWidth="1.62" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 1.28, delay: 0.46 }} />
              <motion.path id="routeAmerica" d="M366 292 Q202 236 36 214" stroke="url(#routeFlowIntl)" strokeWidth="1.62" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 1.34, delay: 0.52 }} />
              <motion.path id="routeHongKong" d="M366 292 Q632 270 932 238" stroke="url(#routeFlowIntl)" strokeWidth="1.62" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 1.34, delay: 0.56 }} />

              <circle r="2.9" fill="#0f172a" opacity="0.72" filter="url(#dotGlow)">
                <animateMotion dur="8.6s" repeatCount="indefinite" path="M366 292 Q248 214 136 134" />
              </circle>
              <circle r="2.8" fill="#0f172a" opacity="0.72" filter="url(#dotGlow)">
                <animateMotion dur="9.4s" repeatCount="indefinite" path="M366 292 Q230 150 96 22" />
              </circle>
              <circle r="2.8" fill="#0f172a" opacity="0.72" filter="url(#dotGlow)">
                <animateMotion dur="8.9s" repeatCount="indefinite" path="M366 292 Q202 236 36 214" />
              </circle>
              <circle r="2.9" fill="#0f172a" opacity="0.72" filter="url(#dotGlow)">
                <animateMotion dur="9.8s" repeatCount="indefinite" path="M366 292 Q632 270 932 238" />
              </circle>

              <motion.circle cx="366" cy="292" r="5.4" fill="#0f172a" filter="url(#dotGlow)" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.7 }} />
              <motion.circle cx="366" cy="292" r="9.5" fill="none" stroke="rgba(15,23,42,0.32)" strokeWidth="0.9" initial={{ scale: 0.7, opacity: 0 }} whileInView={{ scale: [0.9, 1.35, 1.7], opacity: [0.35, 0.2, 0] }} viewport={{ once: false }} transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }} />
              <motion.circle cx="366" cy="292" r="13.2" fill="none" stroke="rgba(15,23,42,0.22)" strokeWidth="0.8" initial={{ scale: 0.65, opacity: 0 }} whileInView={{ scale: [0.85, 1.25, 1.65], opacity: [0.28, 0.15, 0] }} viewport={{ once: false }} transition={{ duration: 2.8, delay: 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }} />

              <circle cx="414" cy="174" r="3.6" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="366" cy="126" r="3.7" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="570" cy="230" r="3.6" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="416" cy="452" r="3.6" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="312" cy="262" r="3.6" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="640" cy="176" r="3.6" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="502" cy="262" r="3.5" fill="#1e293b" filter="url(#dotGlow)" />

              <circle cx="136" cy="134" r="4.8" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="96" cy="22" r="4.8" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="36" cy="214" r="4.8" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx="932" cy="238" r="4.8" fill="#1e293b" filter="url(#dotGlow)" />

              <text x="342" y="320" fontSize="15.5" fill="#0f172a">Mumbai</text>
              <text x="146" y="130" fontSize="13.5" fill="#334155">Dubai</text>
              <text x="108" y="26" fontSize="13.5" fill="#334155">London</text>
              <text x="18" y="208" fontSize="13.5" fill="#334155">America</text>
              <text x="942" y="236" fontSize="13.5" fill="#334155">Hong Kong</text>
              </motion.svg>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="bg-[#faf7f2] py-14" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}>
        <div className="mx-auto grid w-[min(1220px,94%)] gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <article>
            <p className="text-xs tracking-[0.2em] text-[#475569]">TRUST & LOCATION</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Based at Bharat Diamond Bourse</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-[#334155]">
              Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India’s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
            </p>
            <p className="mt-6 leading-relaxed text-[#1f2937]">
              EC-4080 B, Bharat Diamond Bourse,<br />
              Bandra Kurla Complex,<br />
              Bandra(E), Mumbai-51
            </p>
          </article>
          <motion.article className="relative overflow-hidden rounded-3xl border border-[#d7dee8] bg-white/80 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.08)]" initial={{ scale: 0.96, opacity: 0.6 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(203,213,225,0.45),transparent_45%)]" />
            <div className="relative flex h-full min-h-[280px] items-center justify-center">
              <svg viewBox="0 0 340 260" className="h-full w-full max-w-[320px]" role="img" aria-label="Diamond architecture illustration">
                <path d="M55 105 L95 58 L245 58 L285 105 L170 206 Z" fill="rgba(255,255,255,0.8)" stroke="#334155" strokeWidth="1.5" />
                <path d="M95 58 L170 105 L245 58" fill="none" stroke="#334155" strokeWidth="1.2" />
                <path d="M55 105 L170 105 L285 105" fill="none" stroke="#334155" strokeWidth="1.2" />
                <path d="M95 58 L55 105 L112 105 Z" fill="rgba(203,213,225,0.35)" />
                <path d="M245 58 L285 105 L228 105 Z" fill="rgba(203,213,225,0.35)" />
                <circle cx="170" cy="132" r="46" fill="none" stroke="#1e293b" strokeDasharray="3 5" />
                <circle cx="170" cy="132" r="4.2" fill="#0f172a" />
              </svg>
            </div>
          </motion.article>
        </div>
      </motion.section>

      <motion.section id="operations" className="bg-[#FAF7F2] py-14" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}>
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
      </motion.section>

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

      <motion.section id="contact" className="bg-[#FAF7F2] py-14" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}>
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
      </motion.section>

      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp Enquiry" className="floating-wa">
        <MessageCircle size={21} />
      </a>
    </div>
  );
}
