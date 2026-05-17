import { MessageCircle, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import bgImage from "../assets/bg.jpg";
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

const nodes = {
  desktop: {
    mumbai: { x: 360, y: 286, labelX: 378, labelY: 323 },
    export: {
      dubai: { x: 150, y: 136, labelX: 162, labelY: 134 },
      london: { x: 96, y: 24, labelX: 108, labelY: 28 },
      canada: { x: 54, y: 102, labelX: 64, labelY: 100 },
      america: { x: 42, y: 228, labelX: 20, labelY: 222 },
      hongKong: { x: 912, y: 248, labelX: 920, labelY: 246 },
    },
    india: {
      top: { x: 417, y: 41 },
      south: { x: 430, y: 461 },
      northEast: { x: 696, y: 176 },
      northEastShort: { x: 508, y: 191 },
      northEastInner: { x: 444, y: 142 },
      southEastInner: { x: 499, y: 353 },
    },
  },
  mobile: {
    mumbai: { x: 354, y: 286, labelX: 358, labelY: 326 },
    export: {
      dubai: { x: 166, y: 150, labelX: 174, labelY: 148 },
      london: { x: 128, y: 56, labelX: 136, labelY: 54 },
      canada: { x: 90, y: 120, labelX: 98, labelY: 118 },
      america: { x: 76, y: 228, labelX: 24, labelY: 224 },
      hongKong: { x: 826, y: 248, labelX: 834, labelY: 246 },
    },
    india: {
      top: { x: 411, y: 51 },
      south: { x: 422, y: 451 },
      northEast: { x: 680, y: 182 },
      northEastShort: { x: 496, y: 189 },
      northEastInner: { x: 447, y: 142 },
      southEastInner: { x: 471, y: 344 },
    },
  },
};

const routes = {
  desktop: {
    indiaTop: "M360 286 C362 212 430 142 417 41",
    indiaSouth: "M360 286 Q394 366 430 461",
    indiaNorthEast: "M360 286 Q500 238 696 176",
    indiaNorthEastShort: "M360 286 Q452 244 508 191",
    indiaNorthEastInner: "M360 286 L444 142",
    indiaSouthEastInner: "M360 286 Q446 300 499 353",
    dubai: "M360 286 Q270 194 150 136",
    london: "M360 286 Q224 122 96 24",
    canada: "M360 286 Q192 172 54 102",
    america: "M360 286 Q208 254 42 228",
    hongKong: "M360 286 Q620 320 912 248",
  },
  mobile: {
    indiaTop: "M354 286 C356 216 422 148 411 51",
    indiaSouth: "M354 286 Q386 362 422 451",
    indiaNorthEast: "M354 286 Q486 240 680 182",
    indiaNorthEastShort: "M354 286 Q442 246 496 189",
    indiaNorthEastInner: "M354 286 L447 142",
    indiaSouthEastInner: "M354 286 Q430 304 471 344",
    dubai: "M354 286 Q266 200 166 150",
    london: "M354 286 Q234 138 128 56",
    canada: "M354 286 Q208 182 90 120",
    america: "M354 286 Q214 252 76 228",
    hongKong: "M354 286 Q570 316 826 248",
  },
};

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
  const [hoveredDiamond, setHoveredDiamond] = useState<string | null>(null);

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

      <motion.section id="diamonds" className="relative min-h-[88vh] overflow-hidden bg-[linear-gradient(180deg,#121418_0%,#0d1014_100%)] py-16 md:py-24" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}>
        <div className="mx-auto w-[min(1240px,94%)]">
          <p className="text-xs tracking-[0.22em] text-[#aeb7c5]">DIAMONDS</p>
          <h2 className="mt-5 font-serif text-4xl text-[#f7f2e8] md:text-6xl">Diamond Shapes & Selections</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed tracking-[0.03em] text-[#c8d0dc] md:text-base">
            Natural & Lab Grown Diamonds
            <br />
            Precision sourced from Bharat Diamond Bourse
          </p>

          <div className="mt-14 hidden md:grid md:grid-cols-5 md:gap-x-8 md:gap-y-14">
            {diamondShapes.map((shape) => {
              const isHovered = hoveredDiamond === shape;
              const fadeOthers = hoveredDiamond && hoveredDiamond !== shape;
              return (
                <motion.article
                  key={shape}
                  className="group relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredDiamond(shape)}
                  onMouseLeave={() => setHoveredDiamond(null)}
                  onClick={() => setActiveDiamond((prev) => (prev === shape ? null : shape))}
                  animate={{
                    opacity: fadeOthers ? 0.38 : 1,
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="relative mb-6 flex h-[176px] w-full max-w-[186px] items-center justify-center"
                    animate={{ filter: isHovered ? "brightness(1.1)" : "brightness(1)" }}
                    transition={{ duration: 0.45 }}
                  >
                    <img
                      src={diamondShapeImageMap[shape]}
                      alt={`${shape} diamond`}
                      className={`relative h-[92%] w-[92%] object-contain object-center drop-shadow-[0_7px_12px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:scale-[1.04] ${diamondOpticalClassMap[shape]}`}
                    />
                  </motion.div>
                  <h3 className={`font-serif text-2xl tracking-[0.02em] transition-colors duration-500 ${isHovered ? "text-[#ffffff]" : "text-[#e6e0d4]"}`}>{shape}</h3>
                  <div className={`mt-3 flex flex-col items-center gap-2 transition-all duration-500 ${isHovered || activeDiamond === shape ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                    <p className="text-[0.62rem] tracking-[0.26em] text-[#d8e0ee]">{shape.toUpperCase()} CUT</p>
                    <a
                      href={WHATSAPP_LINK}
                      onClick={(event) => event.stopPropagation()}
                      className="rounded-full border border-[#cfd8e4]/60 px-4 py-1.5 text-[0.66rem] tracking-[0.2em] text-[#f3eee5] transition-colors duration-300 hover:bg-[#f3eee5] hover:text-[#121418]"
                    >
                      ENQUIRE
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 md:hidden">
            {diamondShapes.map((shape) => {
              const active = activeDiamond === shape;
              return (
                <article
                  key={shape}
                  className="group relative w-[76%] shrink-0 snap-center"
                  onClick={() => setActiveDiamond((prev) => (prev === shape ? null : shape))}
                >
                  <div className="relative flex h-[214px] items-center justify-center">
                    <img
                      src={diamondShapeImageMap[shape]}
                      alt={`${shape} diamond`}
                      className={`h-[90%] w-[90%] object-contain object-center drop-shadow-[0_7px_12px_rgba(0,0,0,0.26)] transition-all duration-500 ${active ? "scale-[1.03] brightness-105" : "scale-[0.96] brightness-90"} ${diamondOpticalClassMap[shape]}`}
                    />
                  </div>
                  <h3 className={`text-center font-serif text-3xl transition-colors duration-500 ${active ? "text-[#ffffff]" : "text-[#e5dfd4]"}`}>{shape}</h3>
                  <div className={`mt-3 flex justify-center transition-all duration-500 ${active ? "opacity-100" : "opacity-0"}`}>
                    <a
                      href={WHATSAPP_LINK}
                      onClick={(event) => event.stopPropagation()}
                      className="rounded-full border border-[#dce5f4]/70 px-4 py-1.5 text-[0.66rem] tracking-[0.2em] text-[#f8f4ec]"
                    >
                      ENQUIRE
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section className="relative -mt-2 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] py-16" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
        <div className="mx-auto w-[min(1220px,94%)]">
          <p className="text-[0.62rem] tracking-[0.28em] text-[#334155] sm:text-[0.64rem]">SUPPLYING ACROSS INDIA & GLOBAL MARKETS</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Global Presence, Rooted in Mumbai</h2>
          <p className="mt-5 max-w-4xl leading-relaxed text-[#334155]">
            From Bharat Diamond Bourse, Mumbai, D.P. Jewels serves buyers across India and key international markets with trusted diamond sourcing and export-focused relationships.
          </p>
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#d7dee8] bg-[radial-gradient(circle_at_38%_35%,#ffffff_0%,#f8f4ec_46%,#f1ece3_100%)] p-4 shadow-[inset_0_1px_18px_rgba(255,255,255,0.32),0_14px_34px_rgba(15,23,42,0.08)] md:p-8">
            <motion.div
              className="relative mx-auto aspect-[16/9.6] w-full max-w-[980px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75 }}
            >
              <motion.img
                src={indiaMap}
                alt="India map"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[138%] w-[138%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-100 md:h-[134%] md:w-[134%]"
                initial={{ opacity: 0, scale: 0.985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,252,246,0.18)_0%,rgba(255,252,246,0)_72%)]" />
              <div className="pointer-events-none absolute bottom-[17%] right-[26%] h-[13%] w-[12%] rounded-full bg-[radial-gradient(circle,#f7f3eb_0%,rgba(247,243,235,0.86)_45%,rgba(247,243,235,0)_88%)]" />
              <motion.svg
                viewBox="0 0 1000 560"
                className="absolute inset-0 h-full w-full md:hidden"
                role="img"
                aria-label="India centered export network from Mumbai mobile"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.08 }}
              >
                <defs>
                  <filter id="dotGlowMobile" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="routeFlowMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#334155" stopOpacity="0.24" />
                    <stop offset="50%" stopColor="#0f172a" stopOpacity="0.64" />
                    <stop offset="100%" stopColor="#334155" stopOpacity="0.16" />
                  </linearGradient>
                  <linearGradient id="routeFlowIntlMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0f172a" stopOpacity="0.76" />
                    <stop offset="70%" stopColor="#1e293b" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#334155" stopOpacity="0.12" />
                  </linearGradient>
                </defs>

                <motion.path d={routes.mobile.indiaTop} stroke="url(#routeFlowMobile)" strokeWidth="1.15" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.54 }} transition={{ duration: 0.82, delay: 0.08 }} />
                <motion.path d={routes.mobile.indiaSouth} stroke="url(#routeFlowMobile)" strokeWidth="1.15" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.52 }} transition={{ duration: 0.82, delay: 0.2 }} />
                <motion.path d={routes.mobile.indiaNorthEast} stroke="url(#routeFlowMobile)" strokeWidth="1.12" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.5 }} transition={{ duration: 0.86, delay: 0.24 }} />
                <motion.path d={routes.mobile.indiaNorthEastShort} stroke="url(#routeFlowMobile)" strokeWidth="1.12" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.5 }} transition={{ duration: 0.84, delay: 0.26 }} />
                <motion.path d={routes.mobile.indiaNorthEastInner} stroke="url(#routeFlowMobile)" strokeWidth="1.12" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.5 }} transition={{ duration: 0.84, delay: 0.28 }} />
                <motion.path d={routes.mobile.indiaSouthEastInner} stroke="url(#routeFlowMobile)" strokeWidth="1.12" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.5 }} transition={{ duration: 0.86, delay: 0.3 }} />

                <motion.path d={routes.mobile.dubai} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.0, delay: 0.28 }} />
                <motion.path d={routes.mobile.london} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.05, delay: 0.32 }} />
                <motion.path d={routes.mobile.canada} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.08, delay: 0.34 }} />
                <motion.path d={routes.mobile.america} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.1, delay: 0.36 }} />
                <motion.path d={routes.mobile.hongKong} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.12, delay: 0.4 }} />

                <circle r="2.2" fill="#0f172a" opacity="0.58" filter="url(#dotGlowMobile)">
                  <animateMotion dur="12.8s" repeatCount="indefinite" path={routes.mobile.dubai} />
                </circle>
                <circle r="2.2" fill="#0f172a" opacity="0.58" filter="url(#dotGlowMobile)">
                  <animateMotion dur="13.5s" repeatCount="indefinite" path={routes.mobile.london} />
                </circle>
                <circle r="2.2" fill="#0f172a" opacity="0.58" filter="url(#dotGlowMobile)">
                  <animateMotion dur="13.9s" repeatCount="indefinite" path={routes.mobile.canada} />
                </circle>
                <circle r="2.2" fill="#0f172a" opacity="0.58" filter="url(#dotGlowMobile)">
                  <animateMotion dur="13.1s" repeatCount="indefinite" path={routes.mobile.america} />
                </circle>
                <circle r="2.2" fill="#0f172a" opacity="0.58" filter="url(#dotGlowMobile)">
                  <animateMotion dur="14.2s" repeatCount="indefinite" path={routes.mobile.hongKong} />
                </circle>

                <motion.circle cx={nodes.mobile.mumbai.x} cy={nodes.mobile.mumbai.y} r="3.7" fill="#172235" filter="url(#dotGlowMobile)" initial={{ scale: 0.84, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.45 }} />
                <motion.circle cx={nodes.mobile.mumbai.x} cy={nodes.mobile.mumbai.y} r="5.8" fill="none" stroke="rgba(23,34,53,0.18)" strokeWidth="0.6" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: [0.92, 1.18, 1.45], opacity: [0.22, 0.1, 0] }} transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }} />

                <circle cx={nodes.mobile.india.top.x} cy={nodes.mobile.india.top.y} r="3.1" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.south.x} cy={nodes.mobile.india.south.y} r="3.1" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.northEast.x} cy={nodes.mobile.india.northEast.y} r="3.1" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.northEastShort.x} cy={nodes.mobile.india.northEastShort.y} r="3.1" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.northEastInner.x} cy={nodes.mobile.india.northEastInner.y} r="3.1" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.southEastInner.x} cy={nodes.mobile.india.southEastInner.y} r="3.1" fill="#1e293b" filter="url(#dotGlowMobile)" />

                <circle cx={nodes.mobile.export.dubai.x} cy={nodes.mobile.export.dubai.y} r="4.2" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.export.london.x} cy={nodes.mobile.export.london.y} r="4.2" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.export.canada.x} cy={nodes.mobile.export.canada.y} r="4.2" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.export.america.x} cy={nodes.mobile.export.america.y} r="4.2" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.export.hongKong.x} cy={nodes.mobile.export.hongKong.y} r="4.2" fill="#1e293b" filter="url(#dotGlowMobile)" />

                <text x={nodes.mobile.mumbai.labelX} y={nodes.mobile.mumbai.labelY} fontSize="13.2" fill="#0f172a">Mumbai</text>
                <text x={nodes.mobile.export.dubai.labelX} y={nodes.mobile.export.dubai.labelY} fontSize="12.5" fill="#334155">Dubai</text>
                <text x={nodes.mobile.export.london.labelX} y={nodes.mobile.export.london.labelY} fontSize="12.5" fill="#334155">London</text>
                <text x={nodes.mobile.export.canada.labelX} y={nodes.mobile.export.canada.labelY} fontSize="12.5" fill="#334155">Canada</text>
                <text x={nodes.mobile.export.america.labelX} y={nodes.mobile.export.america.labelY} fontSize="12.5" fill="#334155">America</text>
                <text x={nodes.mobile.export.hongKong.labelX} y={nodes.mobile.export.hongKong.labelY} fontSize="12.5" fill="#334155">Hong Kong</text>
              </motion.svg>

              <motion.svg
                viewBox="0 0 1000 560"
                className="absolute inset-0 hidden h-full w-full md:block"
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
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.28" />
                  <stop offset="50%" stopColor="#0f172a" stopOpacity="0.72" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="routeFlowIntl" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0f172a" stopOpacity="0.78" />
                  <stop offset="65%" stopColor="#1e293b" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="1000" height="560" fill="transparent" />
              <motion.path id="routeIndiaTop" d={routes.desktop.indiaTop} stroke="url(#routeFlow)" strokeWidth="1.3" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.66 }} viewport={{ once: true }} transition={{ duration: 0.98, delay: 0.12 }} />
              <motion.path id="routeIndiaSouth" d={routes.desktop.indiaSouth} stroke="url(#routeFlow)" strokeWidth="1.3" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.64 }} viewport={{ once: true }} transition={{ duration: 1.0, delay: 0.25 }} />
              <motion.path id="routeIndiaNorthEast" d={routes.desktop.indiaNorthEast} stroke="url(#routeFlow)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.64 }} viewport={{ once: true }} transition={{ duration: 1.04, delay: 0.3 }} />
              <motion.path id="routeIndiaNorthEastShort" d={routes.desktop.indiaNorthEastShort} stroke="url(#routeFlow)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.64 }} viewport={{ once: true }} transition={{ duration: 1.0, delay: 0.32 }} />
              <motion.path id="routeIndiaNorthEastInner" d={routes.desktop.indiaNorthEastInner} stroke="url(#routeFlow)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.64 }} viewport={{ once: true }} transition={{ duration: 1.0, delay: 0.34 }} />
              <motion.path id="routeIndiaSouthEastInner" d={routes.desktop.indiaSouthEastInner} stroke="url(#routeFlow)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.64 }} viewport={{ once: true }} transition={{ duration: 1.02, delay: 0.36 }} />
              <motion.path id="routeDubai" d={routes.desktop.dubai} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.22, delay: 0.4 }} />
              <motion.path id="routeLondon" d={routes.desktop.london} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.28, delay: 0.46 }} />
              <motion.path id="routeCanada" d={routes.desktop.canada} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.31, delay: 0.49 }} />
              <motion.path id="routeAmerica" d={routes.desktop.america} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.34, delay: 0.52 }} />
              <motion.path id="routeHongKong" d={routes.desktop.hongKong} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.34, delay: 0.56 }} />

              <circle r="2.4" fill="#0f172a" opacity="0.58" filter="url(#dotGlow)">
                <animateMotion dur="11.6s" repeatCount="indefinite" path={routes.desktop.dubai} />
              </circle>
              <circle r="2.4" fill="#0f172a" opacity="0.58" filter="url(#dotGlow)">
                <animateMotion dur="12.8s" repeatCount="indefinite" path={routes.desktop.london} />
              </circle>
              <circle r="2.4" fill="#0f172a" opacity="0.58" filter="url(#dotGlow)">
                <animateMotion dur="13.2s" repeatCount="indefinite" path={routes.desktop.canada} />
              </circle>
              <circle r="2.4" fill="#0f172a" opacity="0.58" filter="url(#dotGlow)">
                <animateMotion dur="12.1s" repeatCount="indefinite" path={routes.desktop.america} />
              </circle>
              <circle r="2.4" fill="#0f172a" opacity="0.58" filter="url(#dotGlow)">
                <animateMotion dur="13.6s" repeatCount="indefinite" path={routes.desktop.hongKong} />
              </circle>

              <motion.circle cx={nodes.desktop.mumbai.x} cy={nodes.desktop.mumbai.y} r="3.9" fill="#172235" filter="url(#dotGlow)" initial={{ scale: 0.86, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.7 }} />
              <motion.circle cx={nodes.desktop.mumbai.x} cy={nodes.desktop.mumbai.y} r="6.3" fill="none" stroke="rgba(23,34,53,0.16)" strokeWidth="0.6" initial={{ scale: 0.75, opacity: 0 }} whileInView={{ scale: [0.92, 1.16, 1.42], opacity: [0.2, 0.08, 0] }} viewport={{ once: false }} transition={{ duration: 3.3, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }} />

              <circle cx={nodes.desktop.india.top.x} cy={nodes.desktop.india.top.y} r="3.5" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.south.x} cy={nodes.desktop.india.south.y} r="3.5" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.northEast.x} cy={nodes.desktop.india.northEast.y} r="3.5" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.northEastShort.x} cy={nodes.desktop.india.northEastShort.y} r="3.5" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.northEastInner.x} cy={nodes.desktop.india.northEastInner.y} r="3.5" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.southEastInner.x} cy={nodes.desktop.india.southEastInner.y} r="3.5" fill="#1e293b" filter="url(#dotGlow)" />

              <circle cx={nodes.desktop.export.dubai.x} cy={nodes.desktop.export.dubai.y} r="4.8" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.55)]" />
              <circle cx={nodes.desktop.export.london.x} cy={nodes.desktop.export.london.y} r="4.8" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.55)]" />
              <circle cx={nodes.desktop.export.canada.x} cy={nodes.desktop.export.canada.y} r="4.8" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.55)]" />
              <circle cx={nodes.desktop.export.america.x} cy={nodes.desktop.export.america.y} r="4.8" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.55)]" />
              <circle cx={nodes.desktop.export.hongKong.x} cy={nodes.desktop.export.hongKong.y} r="4.8" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.55)]" />

              <text x={nodes.desktop.mumbai.labelX} y={nodes.desktop.mumbai.labelY} fontSize="14.1" fill="#0f172a">Mumbai</text>
              <text x={nodes.desktop.export.dubai.labelX} y={nodes.desktop.export.dubai.labelY} fontSize="13.5" fill="#334155">Dubai</text>
              <text x={nodes.desktop.export.london.labelX} y={nodes.desktop.export.london.labelY} fontSize="13.5" fill="#334155">London</text>
              <text x={nodes.desktop.export.canada.labelX} y={nodes.desktop.export.canada.labelY} fontSize="13.5" fill="#334155">Canada</text>
              <text x={nodes.desktop.export.america.labelX} y={nodes.desktop.export.america.labelY} fontSize="13.5" fill="#334155">America</text>
              <text x={nodes.desktop.export.hongKong.labelX} y={nodes.desktop.export.hongKong.labelY} fontSize="13.5" fill="#334155">Hong Kong</text>
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
