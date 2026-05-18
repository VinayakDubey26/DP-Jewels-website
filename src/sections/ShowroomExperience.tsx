import { MessageCircle, Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
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
import bdbImage from "../assets/images/bdb.png";

const WHATSAPP_LINK = "https://wa.me/918356810826?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";
const CINEMATIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.12, ease: CINEMATIC_EASE },
};
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: CINEMATIC_EASE } },
};

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

const operationsJourney = [
  {
    num: "01",
    title: "Requirement Understanding",
    desc: "Buyer specifications, assortment intent, and timeline constraints are aligned through discreet, detail-led consultation.",
    cue: "PRIVATE BRIEF",
    image: bgImage,
  },
  {
    num: "02",
    title: "Diamond Selection",
    desc: "Curated options are shortlisted from trusted channels with precision across shape, spread, and quality preferences.",
    cue: "CURATED SOURCING",
    image: diamondRound,
  },
  {
    num: "03",
    title: "Quality Review",
    desc: "Each recommendation undergoes careful technical screening, consistency checks, and certification alignment before presentation.",
    cue: "INSPECTION PROTOCOL",
    image: diamondEmerald,
  },
  {
    num: "04",
    title: "Buyer Confirmation",
    desc: "Final selections are validated with transparent communication, documented specifications, and confidence-led approvals.",
    cue: "CONFIRMATION DESK",
    image: bdbImage,
  },
  {
    num: "05",
    title: "Export / Delivery Coordination",
    desc: "Secure routing and dispatch readiness are coordinated for domestic and global trade movement with disciplined execution.",
    cue: "GLOBAL HANDOFF",
    image: indiaMap,
  },
];

const aboutMetrics = [
  { value: "25+", label: "Years of Experience", offsetClass: "md:ml-0" },
  { value: "200,000+", label: "Carats Sold", offsetClass: "md:ml-9" },
  { value: "10+", label: "Markets Across India", offsetClass: "md:ml-3" },
  { value: "100%", label: "Global Export Focus", offsetClass: "md:ml-14" },
];

const certifications = [
  {
    code: "GIA",
    name: "Gemological Institute of America",
    description: "Globally respected grading authority known for rigorous, consistent diamond evaluation standards.",
  },
  {
    code: "IGI",
    name: "International Gemological Institute",
    description: "Independent international certification framework supporting transparent and verifiable stone documentation.",
  },
  {
    code: "GJEPC",
    name: "Gem & Jewellery Export Promotion Council",
    description: "Premier Indian trade body reinforcing compliant export practices and trusted global industry alignment.",
  },
];

const whyChoosePoints = [
  {
    num: "01",
    title: "Since 1999",
    desc: "Built through long-horizon relationships, disciplined execution, and credibility across diamond trade cycles.",
  },
  {
    num: "02",
    title: "Bharat Diamond Bourse Presence",
    desc: "Positioned within India’s core diamond ecosystem for institutional access, trust, and seamless sourcing flow.",
  },
  {
    num: "03",
    title: "Global Export Reach",
    desc: "Structured to serve domestic and international buyers with consistent communication and export-oriented reliability.",
  },
  {
    num: "04",
    title: "Precision Sourcing",
    desc: "Selection discipline, grading alignment, and curated assortments designed for serious trade requirements.",
  },
  {
    num: "05",
    title: "GIA / IGI Standards",
    desc: "Internationally recognized certification frameworks that support authenticity, traceability, and buyer confidence.",
  },
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
    indiaTop: "M360 286 C364 216 428 150 417 41",
    indiaSouth: "M360 286 Q392 368 430 461",
    indiaNorthEast: "M360 286 Q498 236 696 176",
    indiaNorthEastShort: "M360 286 Q448 242 508 191",
    indiaNorthEastInner: "M360 286 Q406 218 444 142",
    indiaSouthEastInner: "M360 286 Q438 304 499 353",
    dubai: "M360 286 Q270 194 150 136",
    london: "M360 286 Q224 122 96 24",
    canada: "M360 286 Q192 172 54 102",
    america: "M360 286 Q208 254 42 228",
    hongKong: "M360 286 Q620 320 912 248",
  },
  mobile: {
    indiaTop: "M354 286 C358 220 420 154 411 51",
    indiaSouth: "M354 286 Q384 362 422 451",
    indiaNorthEast: "M354 286 Q484 238 680 182",
    indiaNorthEastShort: "M354 286 Q438 244 496 189",
    indiaNorthEastInner: "M354 286 Q398 220 447 142",
    indiaSouthEastInner: "M354 286 Q424 304 471 344",
    dubai: "M354 286 Q266 200 166 150",
    london: "M354 286 Q234 138 128 56",
    canada: "M354 286 Q208 182 90 120",
    america: "M354 286 Q214 252 76 228",
    hongKong: "M354 286 Q570 316 826 248",
  },
};

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function ShowroomExperience() {
  const [activeDiamondIndex, setActiveDiamondIndex] = useState(0);
  const [activeOperationIndex, setActiveOperationIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.06]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const heroContentStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.14,
      },
    },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: CINEMATIC_EASE } },
  };
  const activeDiamond = diamondShapes[activeDiamondIndex];
  const goPrevDiamond = () => setActiveDiamondIndex((prev) => (prev - 1 + diamondShapes.length) % diamondShapes.length);
  const goNextDiamond = () => setActiveDiamondIndex((prev) => (prev + 1) % diamondShapes.length);

  return (
    <div className="text-[#111827]">
      <section ref={heroRef} id="home" className="relative flex min-h-screen items-end overflow-hidden bg-[#040816]">
        <motion.img src={bgImage} alt="Premium jewellery background" className="absolute inset-0 h-full w-full object-cover saturate-[0.86] contrast-[1.08] brightness-[0.68]" style={{ y: heroY, scale: heroScale }} />
        <motion.div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,22,0.48)_0%,rgba(4,8,22,0.66)_38%,rgba(4,8,22,0.84)_100%)]" style={{ opacity: heroOverlayOpacity }} animate={{ opacity: [0.9, 1, 0.92] }} transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(112,132,168,0.12)_0%,rgba(4,8,22,0)_46%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,0,0,0)_34%,rgba(0,0,0,0.36)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.34)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />
        <motion.div
          className="pointer-events-none absolute -right-[20%] top-[8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(162,182,214,0.1)_0%,rgba(162,182,214,0)_72%)] blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="relative mx-auto w-[min(1220px,94%)] pb-20 pt-36 md:pb-28 md:pt-44">
          <motion.div variants={heroContentStagger} initial="hidden" animate="show" className="max-w-[700px] text-white">
            <motion.h1 variants={heroItem} className="font-serif text-[2.6rem] leading-[1.02] md:text-[4.75rem]">Diamond Traders, Importers & Exporters</motion.h1>
            <motion.p variants={heroItem} className="mt-7 max-w-[34rem] text-base leading-relaxed text-[#e2e8f0]/88 md:text-lg">
              Trusted sourcing from Bharat Diamond Bourse with 25+ years of precision, transparency, and global export focus.
            </motion.p>
            <motion.div variants={heroItem} className="mt-10">
              <a href="#diamonds" className="lux-hover-lift inline-flex rounded-sm border border-white/45 bg-white/10 px-6 py-3 text-sm tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-700 hover:border-white/70 hover:bg-white/95 hover:text-[#111827] hover:shadow-[0_14px_30px_rgba(0,0,0,0.24)]">EXPLORE DIAMONDS</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section id="about" className="relative bg-[#FAF7F2] py-[6.1rem] md:py-[8.6rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute left-0 top-[22%] hidden h-px w-[16%] bg-[linear-gradient(90deg,rgba(148,163,184,0.4),transparent)] md:block" />
        <motion.div className="mx-auto grid w-full max-w-[1240px] px-5 md:px-8 gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:pl-4" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.article className="lg:pt-3" variants={staggerItem}>
            <motion.p className="text-xs tracking-[0.22em] text-[#475569]" variants={staggerItem}>ABOUT D.P. JEWELS</motion.p>
            <motion.h2 className="mt-5 max-w-[14ch] font-serif text-4xl leading-[1.04] md:text-[3.45rem]" variants={staggerItem}>Built on Trust, Since 1999</motion.h2>
            <motion.p className="mt-8 max-w-[62ch] text-[1.02rem] leading-[1.95] text-[#334155]" variants={staggerItem}>
              With 25+ years of experience, D.P. Jewels operates from Bharat Diamond Bourse, Mumbai, serving India and international buyers through transparent dealings, refined sourcing, and consistent export execution.
            </motion.p>
          </motion.article>
          <motion.div className="space-y-10 md:space-y-12 lg:pt-10" variants={staggerContainer}>
            {aboutMetrics.map((metric, idx) => (
              <motion.article
                key={metric.label}
                className={`${metric.offsetClass} border-t border-[#cfd8e4] pt-6`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: idx * 0.08, ease: CINEMATIC_EASE }}
              >
                <p className="font-serif text-[2.4rem] leading-[1] text-[#111827] md:text-[3.15rem]">{metric.value}</p>
                <p className="mt-3 text-[0.72rem] tracking-[0.17em] text-[#475569] md:text-[0.78rem]">{metric.label}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section id="diamonds" className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#061024_0%,#040816_48%,#030611_100%)] py-[5.1rem] md:py-[7.2rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(224,233,245,0.09)_0%,rgba(224,233,245,0)_44%)]" />
        <div className="pointer-events-none absolute inset-0 hidden opacity-[0.1] [background-image:radial-gradient(rgba(255,255,255,0.26)_0.35px,transparent_0.35px)] [background-size:3px_3px] md:block" />
        <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8 lg:pl-8">
          <p className="text-xs tracking-[0.22em] text-[#aeb7c5]">DIAMONDS</p>
          <h2 className="mt-5 font-serif text-4xl text-[#f7f2e8] md:text-6xl">Diamond Shapes & Selections</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed tracking-[0.03em] text-[#c8d0dc] md:text-base">
            Natural & Lab Grown Diamonds
            <br />
            Precision sourced from Bharat Diamond Bourse
          </p>

          <div className="relative mt-[3.6rem] hidden h-[470px] overflow-hidden md:block">
            <div className="pointer-events-none absolute inset-x-[24%] top-[56%] h-[34%] rounded-[100%] bg-[radial-gradient(circle,rgba(226,235,247,0.2)_0%,rgba(226,235,247,0.08)_42%,rgba(226,235,247,0)_78%)] blur-[0.4px]" />
            <div className="pointer-events-none absolute inset-x-[38%] top-[64%] h-[20%] rounded-[100%] bg-[radial-gradient(circle,rgba(244,249,255,0.24)_0%,rgba(244,249,255,0.06)_55%,rgba(244,249,255,0)_92%)]" />
            <button
              type="button"
              aria-label="Previous diamond"
              onClick={goPrevDiamond}
              className="absolute left-8 top-[52%] z-20 -translate-y-1/2 border border-white/22 bg-white/[0.04] px-2 py-1 text-[0.78rem] text-[#dbe4f2] transition-all duration-700 hover:bg-white/[0.1]"
            >
              {"<"}
            </button>
            <button
              type="button"
              aria-label="Next diamond"
              onClick={goNextDiamond}
              className="absolute right-8 top-[52%] z-20 -translate-y-1/2 border border-white/22 bg-white/[0.04] px-2 py-1 text-[0.78rem] text-[#dbe4f2] transition-all duration-700 hover:bg-white/[0.1]"
            >
              {">"}
            </button>
            {diamondShapes.map((shape, idx) => {
              const offset = getCircularOffset(idx, activeDiamondIndex, diamondShapes.length);
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              if (absOffset > 1) return null;
              const baseOpacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.42 : absOffset === 2 ? 0.14 : 0;
              const baseScale = absOffset === 0 ? 1.03 : absOffset === 1 ? 0.8 : 0.64;
              const baseY = absOffset === 0 ? -2 : absOffset === 1 ? 24 : 34;
              const shiftX = absOffset === 0 ? 0 : offset < 0 ? -290 : 290;
              return (
                <motion.article
                  key={shape}
                  className="group absolute left-1/2 top-1/2 flex w-[420px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
                  onClick={() => setActiveDiamondIndex(idx)}
                  animate={{
                    x: shiftX,
                    y: baseY,
                    scale: isActive ? 1.04 : baseScale,
                    opacity: baseOpacity,
                    filter: isActive ? "brightness(1.08) blur(0px)" : "brightness(0.9) blur(1.3px)",
                  }}
                  transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
                >
                  <motion.div
                    className="relative mb-3 flex h-[260px] w-full items-center justify-center"
                    animate={{ y: isActive ? [-1, -7, -1] : 0 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {isActive && (
                      <>
                        <div className="pointer-events-none absolute inset-x-[22%] top-[25%] h-[56%] rounded-full bg-[radial-gradient(circle,rgba(223,231,243,0.2)_0%,rgba(223,231,243,0)_74%)]" />
                        <div className="pointer-events-none absolute inset-x-[28%] top-[72%] h-[16%] rounded-full bg-[radial-gradient(circle,rgba(236,242,250,0.2)_0%,rgba(236,242,250,0)_80%)]" />
                      </>
                    )}
                    <img
                      src={diamondShapeImageMap[shape]}
                      alt={`${shape} diamond`}
                      className={`relative h-[95%] w-[95%] object-contain object-center drop-shadow-[0_15px_26px_rgba(0,0,0,0.36)] transition-all duration-[1100ms] ${isActive ? "scale-[1.05]" : "scale-[0.95]"} ${diamondOpticalClassMap[shape]}`}
                    />
                    <div className={`pointer-events-none absolute inset-x-[32%] top-[83%] h-[10%] rounded-full transition-all duration-1000 ${isActive ? "bg-[radial-gradient(circle,rgba(8,15,30,0.34)_0%,rgba(8,15,30,0)_80%)]" : "bg-[radial-gradient(circle,rgba(8,15,30,0.2)_0%,rgba(8,15,30,0)_82%)]"}`} />
                  </motion.div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-12 flex min-h-[350px] items-center justify-center md:hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) goNextDiamond();
                if (info.offset.x > 50) goPrevDiamond();
              }}
              className="w-full touch-pan-y"
            >
            {diamondShapes.map((shape, idx) => {
              const offset = getCircularOffset(idx, activeDiamondIndex, diamondShapes.length);
              const isActive = offset === 0;
              if (!isActive) return null;
              return (
                <article
                  key={shape}
                  className="group relative mx-auto flex w-[84%] max-w-[360px] snap-center flex-col items-center justify-center"
                >
                  <div className="relative flex h-[276px] w-full items-center justify-center">
                    <div className="pointer-events-none absolute inset-x-[21%] top-[24%] h-[54%] rounded-full bg-[radial-gradient(circle,rgba(223,231,243,0.16)_0%,rgba(223,231,243,0)_74%)]" />
                    <img
                      src={diamondShapeImageMap[shape]}
                      alt={`${shape} diamond`}
                      className={`h-[94%] w-[94%] object-contain object-center drop-shadow-[0_11px_22px_rgba(0,0,0,0.3)] transition-all duration-700 scale-[1.02] brightness-[1.05] ${diamondOpticalClassMap[shape]}`}
                    />
                  </div>
                </article>
              );
            })}
            </motion.div>
          </div>

          <div className="mt-0 flex flex-col items-center">
            <div className="mb-3 flex justify-center gap-2">
              {diamondShapes.map((shape, idx) => (
                <button
                  key={`${shape}-nav`}
                  type="button"
                  aria-label={`View ${shape}`}
                  onClick={() => setActiveDiamondIndex(idx)}
                  className={`h-[3px] transition-all duration-700 ${idx === activeDiamondIndex ? "w-6 bg-[#e6edf8]" : "w-3 bg-[#90a1ba]/36 hover:bg-[#b8c6dc]/72"}`}
                />
              ))}
            </div>
            <p className="text-[0.68rem] tracking-[0.18em] text-[#aab8cd]">Swipe to view all diamond shapes</p>
            <div className="mt-2">
              <h3 className="text-center font-serif text-[1.92rem] tracking-[0.08em] text-[#f6f1e8] md:text-[2.1rem]">{activeDiamond}</h3>
              <div className="mt-3 flex justify-center">
                <a
                  href={WHATSAPP_LINK}
                  className="lux-hover-lift rounded-full border border-[#cfd8e4]/65 px-5 py-1.5 text-[0.64rem] tracking-[0.24em] text-[#f3eee5] transition-all duration-500 hover:bg-[#f3eee5] hover:text-[#111827]"
                >
                  ENQUIRE
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="relative -mt-5 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] py-[5.9rem] md:py-[7.5rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute right-0 top-[14%] hidden h-px w-[14%] bg-[linear-gradient(270deg,rgba(148,163,184,0.34),transparent)] md:block" />
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 lg:pr-6">
          <p className="text-[0.62rem] tracking-[0.28em] text-[#334155] sm:text-[0.64rem]">SUPPLYING ACROSS INDIA & GLOBAL MARKETS</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Global Presence, Rooted in Mumbai</h2>
          <p className="mt-5 max-w-4xl leading-relaxed text-[#334155]">
            From Bharat Diamond Bourse, Mumbai, D.P. Jewels serves buyers across India and key international markets with trusted diamond sourcing and export-focused relationships.
          </p>
          <div className="mt-14 overflow-hidden border border-[#d7dee8] bg-[radial-gradient(circle_at_38%_35%,#ffffff_0%,#f8f4ec_46%,#f1ece3_100%)] p-4 shadow-[inset_0_1px_18px_rgba(255,255,255,0.22),0_10px_26px_rgba(15,23,42,0.06)] md:p-8">
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
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,252,246,0.2)_0%,rgba(255,252,246,0)_74%)]" />
              <div className="pointer-events-none absolute bottom-[17%] right-[26%] h-[13%] w-[12%] rounded-full bg-[radial-gradient(circle,#f7f3eb_0%,rgba(247,243,235,0.74)_45%,rgba(247,243,235,0)_90%)]" />
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
                    <feGaussianBlur stdDeviation="1.9" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <motion.path d={routes.mobile.indiaTop} stroke="rgba(10,18,36,0.82)" strokeWidth="1.8" fill="none" initial={{ pathLength: 0, opacity: 0.4 }} whileInView={{ pathLength: 1, opacity: 0.9 }} transition={{ duration: 0.9, delay: 0.08 }} />
                <motion.path d={routes.mobile.indiaSouth} stroke="rgba(10,18,36,0.82)" strokeWidth="1.8" fill="none" initial={{ pathLength: 0, opacity: 0.4 }} whileInView={{ pathLength: 1, opacity: 0.88 }} transition={{ duration: 0.9, delay: 0.2 }} />
                <motion.path d={routes.mobile.indiaNorthEast} stroke="rgba(10,18,36,0.8)" strokeWidth="1.72" fill="none" initial={{ pathLength: 0, opacity: 0.4 }} whileInView={{ pathLength: 1, opacity: 0.86 }} transition={{ duration: 0.94, delay: 0.24 }} />
                <motion.path d={routes.mobile.indiaNorthEastShort} stroke="rgba(10,18,36,0.8)" strokeWidth="1.72" fill="none" initial={{ pathLength: 0, opacity: 0.4 }} whileInView={{ pathLength: 1, opacity: 0.86 }} transition={{ duration: 0.92, delay: 0.26 }} />
                <motion.path d={routes.mobile.indiaNorthEastInner} stroke="rgba(10,18,36,0.8)" strokeWidth="1.72" fill="none" initial={{ pathLength: 0, opacity: 0.4 }} whileInView={{ pathLength: 1, opacity: 0.86 }} transition={{ duration: 0.92, delay: 0.28 }} />
                <motion.path d={routes.mobile.indiaSouthEastInner} stroke="rgba(10,18,36,0.8)" strokeWidth="1.72" fill="none" initial={{ pathLength: 0, opacity: 0.4 }} whileInView={{ pathLength: 1, opacity: 0.86 }} transition={{ duration: 0.94, delay: 0.3 }} />

                <motion.path d={routes.mobile.dubai} stroke="rgba(15,28,52,0.78)" strokeWidth="1.6" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.84 }} transition={{ duration: 1.0, delay: 0.28 }} />
                <motion.path d={routes.mobile.london} stroke="rgba(15,28,52,0.78)" strokeWidth="1.6" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.84 }} transition={{ duration: 1.05, delay: 0.32 }} />
                <motion.path d={routes.mobile.canada} stroke="rgba(15,28,52,0.78)" strokeWidth="1.6" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.84 }} transition={{ duration: 1.08, delay: 0.34 }} />
                <motion.path d={routes.mobile.america} stroke="rgba(15,28,52,0.78)" strokeWidth="1.6" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.84 }} transition={{ duration: 1.1, delay: 0.36 }} />
                <motion.path d={routes.mobile.hongKong} stroke="rgba(15,28,52,0.78)" strokeWidth="1.6" fill="none" initial={{ pathLength: 0, opacity: 0.3 }} whileInView={{ pathLength: 1, opacity: 0.84 }} transition={{ duration: 1.12, delay: 0.4 }} />

                <circle r="1.95" fill="rgba(10,18,36,0.88)" opacity="0.72" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.68;0.6;0.16;0" keyTimes="0;0.65;0.92;1" dur="13.8s" repeatCount="indefinite" />
                  <animateMotion dur="13.8s" repeatCount="indefinite" path={routes.mobile.dubai} />
                </circle>
                <circle r="1.95" fill="rgba(10,18,36,0.88)" opacity="0.72" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.68;0.6;0.16;0" keyTimes="0;0.65;0.92;1" dur="14.2s" repeatCount="indefinite" />
                  <animateMotion dur="14.2s" repeatCount="indefinite" path={routes.mobile.london} />
                </circle>
                <circle r="1.95" fill="rgba(10,18,36,0.88)" opacity="0.72" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.68;0.6;0.16;0" keyTimes="0;0.65;0.92;1" dur="14.6s" repeatCount="indefinite" />
                  <animateMotion dur="14.6s" repeatCount="indefinite" path={routes.mobile.canada} />
                </circle>
                <circle r="1.95" fill="rgba(10,18,36,0.88)" opacity="0.72" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.68;0.6;0.16;0" keyTimes="0;0.65;0.92;1" dur="13.9s" repeatCount="indefinite" />
                  <animateMotion dur="13.9s" repeatCount="indefinite" path={routes.mobile.america} />
                </circle>
                <circle r="1.95" fill="rgba(10,18,36,0.88)" opacity="0.72" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.68;0.6;0.16;0" keyTimes="0;0.65;0.92;1" dur="14.9s" repeatCount="indefinite" />
                  <animateMotion dur="14.9s" repeatCount="indefinite" path={routes.mobile.hongKong} />
                </circle>
                <circle r="2" fill="#1e293b" opacity="0.48" filter="url(#dotGlowMobile)">
                  <animateMotion dur="14.6s" repeatCount="indefinite" path={routes.mobile.indiaTop} />
                </circle>
                <circle r="2" fill="#1e293b" opacity="0.46" filter="url(#dotGlowMobile)">
                  <animateMotion dur="15.1s" repeatCount="indefinite" path={routes.mobile.indiaSouth} />
                </circle>
                <circle r="2" fill="#1e293b" opacity="0.46" filter="url(#dotGlowMobile)">
                  <animateMotion dur="15.4s" repeatCount="indefinite" path={routes.mobile.indiaNorthEast} />
                </circle>
                <circle r="2" fill="#1e293b" opacity="0.44" filter="url(#dotGlowMobile)">
                  <animateMotion dur="15.8s" repeatCount="indefinite" path={routes.mobile.indiaNorthEastShort} />
                </circle>
                <circle r="2" fill="#1e293b" opacity="0.44" filter="url(#dotGlowMobile)">
                  <animateMotion dur="16.2s" repeatCount="indefinite" path={routes.mobile.indiaNorthEastInner} />
                </circle>
                <circle r="2" fill="#1e293b" opacity="0.44" filter="url(#dotGlowMobile)">
                  <animateMotion dur="16.4s" repeatCount="indefinite" path={routes.mobile.indiaSouthEastInner} />
                </circle>

                <motion.circle cx={nodes.mobile.mumbai.x} cy={nodes.mobile.mumbai.y} r="3.2" fill="#172235" filter="url(#dotGlowMobile)" initial={{ scale: 0.88, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.55, delay: 0.45 }} />
                <motion.circle cx={nodes.mobile.mumbai.x} cy={nodes.mobile.mumbai.y} r="5.2" fill="none" stroke="rgba(23,34,53,0.14)" strokeWidth="0.56" initial={{ scale: 0.84, opacity: 0 }} whileInView={{ scale: [0.94, 1.16, 1.36], opacity: [0.16, 0.07, 0] }} transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }} />

                <circle cx={nodes.mobile.india.top.x} cy={nodes.mobile.india.top.y} r="2.9" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.south.x} cy={nodes.mobile.india.south.y} r="2.9" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.northEast.x} cy={nodes.mobile.india.northEast.y} r="2.9" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.northEastShort.x} cy={nodes.mobile.india.northEastShort.y} r="2.9" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.northEastInner.x} cy={nodes.mobile.india.northEastInner.y} r="2.9" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.india.southEastInner.x} cy={nodes.mobile.india.southEastInner.y} r="2.9" fill="#1e293b" filter="url(#dotGlowMobile)" />

                <circle cx={nodes.mobile.export.dubai.x} cy={nodes.mobile.export.dubai.y} r="3.7" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.export.london.x} cy={nodes.mobile.export.london.y} r="3.7" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.export.canada.x} cy={nodes.mobile.export.canada.y} r="3.7" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.export.america.x} cy={nodes.mobile.export.america.y} r="3.7" fill="#1e293b" filter="url(#dotGlowMobile)" />
                <circle cx={nodes.mobile.export.hongKong.x} cy={nodes.mobile.export.hongKong.y} r="3.7" fill="#1e293b" filter="url(#dotGlowMobile)" />

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
                  <feGaussianBlur stdDeviation="2.2" result="blur" />
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
              <motion.path id="routeIndiaTop" d={routes.desktop.indiaTop} stroke="url(#routeFlow)" strokeWidth="1.24" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.62 }} viewport={{ once: true }} transition={{ duration: 1.04, delay: 0.12 }} />
              <motion.path id="routeIndiaSouth" d={routes.desktop.indiaSouth} stroke="url(#routeFlow)" strokeWidth="1.24" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.6 }} viewport={{ once: true }} transition={{ duration: 1.04, delay: 0.25 }} />
              <motion.path id="routeIndiaNorthEast" d={routes.desktop.indiaNorthEast} stroke="url(#routeFlow)" strokeWidth="1.2" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.6 }} viewport={{ once: true }} transition={{ duration: 1.08, delay: 0.3 }} />
              <motion.path id="routeIndiaNorthEastShort" d={routes.desktop.indiaNorthEastShort} stroke="url(#routeFlow)" strokeWidth="1.2" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.6 }} viewport={{ once: true }} transition={{ duration: 1.04, delay: 0.32 }} />
              <motion.path id="routeIndiaNorthEastInner" d={routes.desktop.indiaNorthEastInner} stroke="url(#routeFlow)" strokeWidth="1.2" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.6 }} viewport={{ once: true }} transition={{ duration: 1.04, delay: 0.34 }} />
              <motion.path id="routeIndiaSouthEastInner" d={routes.desktop.indiaSouthEastInner} stroke="url(#routeFlow)" strokeWidth="1.2" fill="none" initial={{ pathLength: 0, opacity: 0.2 }} whileInView={{ pathLength: 1, opacity: 0.6 }} viewport={{ once: true }} transition={{ duration: 1.06, delay: 0.36 }} />
              <motion.path id="routeDubai" d={routes.desktop.dubai} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.22, delay: 0.4 }} />
              <motion.path id="routeLondon" d={routes.desktop.london} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.28, delay: 0.46 }} />
              <motion.path id="routeCanada" d={routes.desktop.canada} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.31, delay: 0.49 }} />
              <motion.path id="routeAmerica" d={routes.desktop.america} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.34, delay: 0.52 }} />
              <motion.path id="routeHongKong" d={routes.desktop.hongKong} stroke="url(#routeFlowIntl)" strokeWidth="1.42" fill="none" initial={{ pathLength: 0, opacity: 0.18 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 1.34, delay: 0.56 }} />

              <circle r="1.8" fill="#0f172a" opacity="0.46" filter="url(#dotGlow)">
                <animate attributeName="opacity" values="0.44;0.38;0.1;0" keyTimes="0;0.64;0.9;1" dur="12.8s" repeatCount="indefinite" />
                <animateMotion dur="12.8s" repeatCount="indefinite" path={routes.desktop.dubai} />
              </circle>
              <circle r="1.8" fill="#0f172a" opacity="0.46" filter="url(#dotGlow)">
                <animate attributeName="opacity" values="0.44;0.38;0.1;0" keyTimes="0;0.64;0.9;1" dur="13.4s" repeatCount="indefinite" />
                <animateMotion dur="13.4s" repeatCount="indefinite" path={routes.desktop.london} />
              </circle>
              <circle r="1.8" fill="#0f172a" opacity="0.46" filter="url(#dotGlow)">
                <animate attributeName="opacity" values="0.44;0.38;0.1;0" keyTimes="0;0.64;0.9;1" dur="13.9s" repeatCount="indefinite" />
                <animateMotion dur="13.9s" repeatCount="indefinite" path={routes.desktop.canada} />
              </circle>
              <circle r="1.8" fill="#0f172a" opacity="0.46" filter="url(#dotGlow)">
                <animate attributeName="opacity" values="0.44;0.38;0.1;0" keyTimes="0;0.64;0.9;1" dur="13.1s" repeatCount="indefinite" />
                <animateMotion dur="13.1s" repeatCount="indefinite" path={routes.desktop.america} />
              </circle>
              <circle r="1.8" fill="#0f172a" opacity="0.46" filter="url(#dotGlow)">
                <animate attributeName="opacity" values="0.44;0.38;0.1;0" keyTimes="0;0.64;0.9;1" dur="14.1s" repeatCount="indefinite" />
                <animateMotion dur="14.1s" repeatCount="indefinite" path={routes.desktop.hongKong} />
              </circle>
              <circle r="2.1" fill="#1e293b" opacity="0.46" filter="url(#dotGlow)">
                <animateMotion dur="14.8s" repeatCount="indefinite" path={routes.desktop.indiaTop} />
              </circle>
              <circle r="2.1" fill="#1e293b" opacity="0.44" filter="url(#dotGlow)">
                <animateMotion dur="15.2s" repeatCount="indefinite" path={routes.desktop.indiaSouth} />
              </circle>
              <circle r="2.1" fill="#1e293b" opacity="0.44" filter="url(#dotGlow)">
                <animateMotion dur="15.6s" repeatCount="indefinite" path={routes.desktop.indiaNorthEast} />
              </circle>
              <circle r="2.1" fill="#1e293b" opacity="0.42" filter="url(#dotGlow)">
                <animateMotion dur="16s" repeatCount="indefinite" path={routes.desktop.indiaNorthEastShort} />
              </circle>
              <circle r="2.1" fill="#1e293b" opacity="0.42" filter="url(#dotGlow)">
                <animateMotion dur="16.4s" repeatCount="indefinite" path={routes.desktop.indiaNorthEastInner} />
              </circle>
              <circle r="2.1" fill="#1e293b" opacity="0.42" filter="url(#dotGlow)">
                <animateMotion dur="16.8s" repeatCount="indefinite" path={routes.desktop.indiaSouthEastInner} />
              </circle>

              <motion.circle cx={nodes.desktop.mumbai.x} cy={nodes.desktop.mumbai.y} r="3.4" fill="#172235" filter="url(#dotGlow)" initial={{ scale: 0.88, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 }} />
              <motion.circle cx={nodes.desktop.mumbai.x} cy={nodes.desktop.mumbai.y} r="5.6" fill="none" stroke="rgba(23,34,53,0.14)" strokeWidth="0.56" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: [0.94, 1.16, 1.38], opacity: [0.16, 0.07, 0] }} viewport={{ once: false }} transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }} />

              <circle cx={nodes.desktop.india.top.x} cy={nodes.desktop.india.top.y} r="3.2" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.south.x} cy={nodes.desktop.india.south.y} r="3.2" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.northEast.x} cy={nodes.desktop.india.northEast.y} r="3.2" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.northEastShort.x} cy={nodes.desktop.india.northEastShort.y} r="3.2" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.northEastInner.x} cy={nodes.desktop.india.northEastInner.y} r="3.2" fill="#1e293b" filter="url(#dotGlow)" />
              <circle cx={nodes.desktop.india.southEastInner.x} cy={nodes.desktop.india.southEastInner.y} r="3.2" fill="#1e293b" filter="url(#dotGlow)" />

              <circle cx={nodes.desktop.export.dubai.x} cy={nodes.desktop.export.dubai.y} r="4.1" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.45)]" />
              <circle cx={nodes.desktop.export.london.x} cy={nodes.desktop.export.london.y} r="4.1" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.45)]" />
              <circle cx={nodes.desktop.export.canada.x} cy={nodes.desktop.export.canada.y} r="4.1" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.45)]" />
              <circle cx={nodes.desktop.export.america.x} cy={nodes.desktop.export.america.y} r="4.1" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.45)]" />
              <circle cx={nodes.desktop.export.hongKong.x} cy={nodes.desktop.export.hongKong.y} r="4.1" fill="#1e293b" filter="url(#dotGlow)" className="transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(148,163,184,0.45)]" />

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

      <motion.section className="relative w-full overflow-hidden py-7 md:py-11" {...sectionReveal}>
        <div className="relative w-full bg-[#f7f3ec] md:bg-[#050913]">
          <motion.div
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
            style={{ backgroundImage: `url(${bdbImage})` }}
            aria-hidden
          />
          <div className="relative mx-auto block w-full max-w-[2200px] md:hidden" />
          <div className="relative hidden w-full md:block md:pt-[44%] lg:pt-[40%]" />

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[72%] bg-[linear-gradient(96deg,rgba(248,244,236,0.7)_0%,rgba(248,244,236,0.48)_26%,rgba(248,244,236,0.18)_48%,rgba(248,244,236,0)_72%)] md:block md:w-[62%]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[44%] backdrop-blur-[1.6px] md:block md:w-[36%]" />

          <div className="absolute inset-0 hidden items-center md:flex">
            <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
              <motion.article
                className="w-full max-w-[620px] py-6 md:py-8"
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                <p className="text-[0.62rem] tracking-[0.22em] text-[#9a7a36] [text-shadow:0_1px_2px_rgba(248,244,236,0.4)]">TRUST & LOCATION</p>
                <h2 className="mt-4 max-w-[14ch] font-serif text-[2rem] leading-[1.06] text-[#111827] [text-shadow:0_2px_12px_rgba(248,244,236,0.45)] md:text-5xl">Based at Bharat Diamond Bourse</h2>
                <p className="mt-6 max-w-[58ch] text-[0.96rem] leading-[1.9] text-[#334155] [text-shadow:0_1px_8px_rgba(248,244,236,0.38)] md:text-base">
                  Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India&apos;s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
                </p>
                <p className="mt-8 border-l border-[#a9b6ca] pl-5 text-[0.96rem] leading-[1.9] text-[#1f2937] [text-shadow:0_1px_8px_rgba(248,244,236,0.35)] md:mt-10 md:text-base">
                  EC-4080 B, Bharat Diamond Bourse,<br />
                  Bandra Kurla Complex,<br />
                  Bandra(E), Mumbai-51
                </p>
              </motion.article>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1240px] px-5 pb-2 pt-3 md:hidden">
            <article className="w-full max-w-[620px] py-3">
              <p className="text-[0.62rem] tracking-[0.22em] text-[#9a7a36]">TRUST & LOCATION</p>
              <h2 className="mt-4 max-w-[14ch] font-serif text-[2rem] leading-[1.06] text-[#111827]">Based at Bharat Diamond Bourse</h2>
              <p className="mt-6 max-w-[58ch] text-[0.96rem] leading-[1.9] text-[#334155]">
                Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India&apos;s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
              </p>
              <p className="mt-8 border-l border-[#a9b6ca] pl-5 text-[0.96rem] leading-[1.9] text-[#1f2937]">
                EC-4080 B, Bharat Diamond Bourse,<br />
                Bandra Kurla Complex,<br />
                Bandra(E), Mumbai-51
              </p>
            </article>
            <img
              src={bdbImage}
              alt="Bharat Diamond Bourse cinematic artwork"
              className="mt-10 h-auto w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        className="relative overflow-hidden bg-[linear-gradient(180deg,#060d1c_0%,#050913_100%)] py-[6.1rem] text-[#ece5d8] md:py-[7.8rem]"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.14 }}
        transition={{ duration: 1, ease: CINEMATIC_EASE }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.75)_0.45px,transparent_0.45px)] [background-size:3.2px_3.2px] md:block"
          animate={{ backgroundPosition: ["0px 0px", "42px 38px"] }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(207,218,235,0.09)_0%,rgba(5,9,19,0)_44%)]" />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <p className="text-[0.64rem] tracking-[0.24em] text-[#b6c1d4]">CERTIFICATIONS & ASSOCIATIONS</p>
          <h2 className="mt-5 max-w-[12ch] font-serif text-4xl leading-[1.06] text-[#f3ede2] md:text-5xl">Certified Standards. Trusted Globally.</h2>
          <p className="mt-7 max-w-[72ch] text-[0.97rem] leading-[1.95] text-[#c4cedf] md:text-base">
            D.P. Jewels operates with internationally recognized grading standards and trusted industry affiliations, ensuring transparency, authenticity, and confidence across every transaction.
          </p>

          <div className="relative mt-16">
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(132,149,175,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(132,149,175,0.2)_1px,transparent_1px)] [background-size:88px_88px]" />
            <div className="pointer-events-none absolute left-[8%] top-[12%] hidden h-[76%] w-px bg-[linear-gradient(180deg,rgba(187,153,88,0.36)_0%,rgba(187,153,88,0.12)_100%)] md:block" />
            <div className="pointer-events-none absolute left-[8%] top-[24%] hidden h-px w-[34%] bg-[linear-gradient(90deg,rgba(187,153,88,0.4)_0%,rgba(187,153,88,0)_100%)] md:block" />
            <div className="pointer-events-none absolute left-[8%] top-[54%] hidden h-px w-[42%] bg-[linear-gradient(90deg,rgba(187,153,88,0.36)_0%,rgba(187,153,88,0)_100%)] md:block" />
            <div className="pointer-events-none absolute left-[8%] top-[84%] hidden h-px w-[30%] bg-[linear-gradient(90deg,rgba(187,153,88,0.34)_0%,rgba(187,153,88,0)_100%)] md:block" />

            <div className="grid gap-7 md:gap-10">
              {certifications.map((item, idx) => (
                <motion.article
                  key={item.code}
                  className={`group relative border border-[#d6deeb]/16 bg-[linear-gradient(150deg,rgba(9,17,34,0.52)_0%,rgba(6,12,24,0.48)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-all duration-700 hover:border-[#dcc48d]/36 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_22px_rgba(214,199,164,0.12)] md:p-8 ${
                    idx === 0 ? "md:mr-10" : idx === 1 ? "md:ml-10 md:mr-4" : "md:ml-14"
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.9, delay: idx * 0.1, ease: CINEMATIC_EASE }}
                >
                  <a href="#contact" className="grid items-start gap-6 md:grid-cols-[88px_minmax(180px,240px)_minmax(220px,1fr)_20px] md:gap-7">
                    <div className="relative mx-auto h-[86px] w-[86px] md:mx-0">
                      <div className="absolute inset-0 border border-[#ecf2fd]/34 bg-[linear-gradient(160deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.11)] transition-all duration-700 group-hover:border-[#f1dfb7]/52" />
                      <svg viewBox="0 0 90 90" className="absolute inset-[8px] opacity-85 transition-all duration-700 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(214,199,164,0.24)]" aria-hidden>
                        <circle cx="45" cy="45" r="37" fill="none" stroke="rgba(242,236,223,0.28)" strokeWidth="0.9" />
                        <circle cx="45" cy="45" r="29" fill="none" stroke="rgba(242,236,223,0.2)" strokeWidth="0.8" strokeDasharray="2.6 3.4" />
                        <path d="M17 45 H73" stroke="rgba(201,168,102,0.32)" strokeWidth="0.72" />
                        <path d="M45 17 V73" stroke="rgba(242,236,223,0.12)" strokeWidth="0.62" />
                      </svg>
                      <span className="relative flex h-full items-center justify-center text-[0.7rem] tracking-[0.22em] text-[#f2ecdf]">{item.code}</span>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[0.62rem] tracking-[0.2em] text-[#bca06b]">GLOBAL COMPLIANCE</p>
                      <h3 className="mt-3 font-serif text-[1.54rem] leading-[1.18] text-[#eee8dc] transition-all duration-700 group-hover:translate-x-[3px] group-hover:text-[#f8f2e8] md:text-[1.78rem]">
                        {item.name}
                      </h3>
                      <span className="mt-3 block h-px w-10 bg-[#d9c08a]/55 transition-all duration-700 group-hover:w-20" />
                    </div>
                    <p className="min-w-0 mt-1 max-w-[52ch] text-sm leading-[1.86] text-[#bcc7da] transition-colors duration-700 group-hover:text-[#d7dfec] md:text-[0.96rem]">
                      {item.description}
                    </p>

                    <span className="lux-arrow mt-1 inline-flex justify-center text-[1.05rem] text-[#c5d1e4] transition-all duration-700 group-hover:text-[#ebf1fc] group-hover:drop-shadow-[0_0_8px_rgba(226,214,186,0.24)]">
                      -&gt;
                    </span>
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f4ec_0%,#f2ece2_100%)] py-[6.4rem] md:py-[8.7rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 hidden opacity-[0.17] [background-image:linear-gradient(rgba(121,138,163,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(121,138,163,0.13)_1px,transparent_1px)] [background-size:74px_74px] md:block" />
        <div className="pointer-events-none absolute inset-x-0 top-[18%] h-px bg-[linear-gradient(90deg,transparent,rgba(155,124,54,0.42),transparent)]" />

        <motion.div className="relative mx-auto grid w-full max-w-[1240px] px-5 md:px-8 gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:pr-8" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.article className="relative lg:pt-4" variants={staggerItem}>
            <span className="pointer-events-none absolute -left-2 top-10 font-serif text-[7.2rem] leading-none text-[#cbbda4]/24 md:text-[9.5rem]">W</span>
            <p className="relative text-[0.64rem] tracking-[0.24em] text-[#6b7484]">WHY CHOOSE D.P. JEWELS</p>
            <h2 className="relative mt-5 max-w-[11ch] font-serif text-4xl leading-[1.05] text-[#111827] md:text-[3.5rem]">Built on Trust, Precision &amp; Global Reach</h2>
            <p className="relative mt-8 max-w-[52ch] text-[0.98rem] leading-[1.96] text-[#334155] md:text-base">
              With decades of experience in diamond sourcing and export-focused relationships, D.P. Jewels serves buyers with transparency, consistency, and refined selection.
            </p>
          </motion.article>

          <div className="relative">
            <div className="pointer-events-none absolute bottom-2 left-[14%] top-4 w-px bg-[linear-gradient(180deg,rgba(155,124,54,0.26)_0%,rgba(155,124,54,0.09)_100%)] md:left-[18%]" />
            <div className="space-y-8 md:space-y-12">
              {whyChoosePoints.map((point, idx) => (
                <motion.article
                  key={point.title}
                  className={`group relative max-w-[580px] border-t border-[#d8cdb4]/58 pt-6 ${
                    idx % 2 === 0 ? "md:ml-0" : "md:ml-10"
                  } ${idx === 1 ? "md:mt-7" : ""} ${idx === 3 ? "md:mt-10" : ""}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.38 }}
                  transition={{ duration: 0.86, delay: idx * 0.08, ease: CINEMATIC_EASE }}
                >
                  <span className="pointer-events-none absolute left-0 top-1 font-serif text-[2.85rem] leading-none text-[#cbbda4]/24 md:-left-1 md:text-[4rem]">{point.num}</span>
                  <div className="relative pl-7 md:pl-10">
                    <p className="text-[0.66rem] tracking-[0.22em] text-[#7e6a3e]">{point.num}</p>
                    <h3 className="mt-2 font-serif text-[1.65rem] leading-[1.18] text-[#1a2433] transition-all duration-700 group-hover:translate-x-[3px]">{point.title}</h3>
                    <p className="mt-4 max-w-[48ch] text-[0.93rem] leading-[1.88] text-[#445164] transition-opacity duration-700 group-hover:opacity-95">{point.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] text-[#9a7a36]/86">
                      TRUST STANDARD
                      <span className="lux-arrow text-[0.9rem]">-&gt;</span>
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section id="operations" className="relative -mt-2 overflow-hidden bg-[linear-gradient(180deg,#060d1c_0%,#050913_100%)] py-[6.35rem] text-[#ece5d8] md:py-[8.2rem]" {...sectionReveal}>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 hidden opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.64)_0.45px,transparent_0.45px)] [background-size:3.2px_3.2px] md:block" />
        <div className="pointer-events-none absolute inset-0 hidden opacity-[0.16] [background-image:linear-gradient(rgba(124,145,173,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(124,145,173,0.22)_1px,transparent_1px)] [background-size:84px_84px] md:block" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(207,218,235,0.08)_0%,rgba(5,9,19,0)_46%)]" />

        <motion.div className="relative mx-auto w-full max-w-[1240px] px-5 md:px-8 lg:pl-6" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <p className="text-[0.64rem] tracking-[0.24em] text-[#b6c1d4]">OPERATIONS</p>
          <h2 className="mt-5 max-w-[13ch] font-serif text-4xl leading-[1.06] text-[#f3ede2] md:text-5xl">Private Sourcing. Precise Execution.</h2>

          <div className="mt-14 border-y border-[#d6deeb]/20">
            {operationsJourney.map((step, idx) => (
              <motion.article
                key={step.title}
                className={`group relative py-8 transition-all duration-700 md:py-10 ${idx % 2 === 0 ? "md:pl-0" : "md:pl-7"} ${
                  idx !== operationsJourney.length - 1 ? "border-b border-[#d6deeb]/18" : ""
                }`}
                onClick={() => setActiveOperationIndex(activeOperationIndex === idx ? null : idx)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.32 }}
                transition={{ duration: 0.9, delay: idx * 0.08, ease: CINEMATIC_EASE }}
              >
                <div className="grid items-start gap-6 md:grid-cols-[74px_1fr_26px] md:gap-8">
                  <p className="pt-1 text-[0.66rem] tracking-[0.18em] text-[#c4cfde] transition-colors duration-700 group-hover:text-[#e4ebf7]">{step.num}</p>
                  <div>
                    <h3 className="font-serif text-[1.52rem] leading-[1.2] text-[#eee8dc] transition-all duration-700 group-hover:translate-x-[4px] group-hover:text-[#f8f2e8] md:text-[1.86rem]">{step.title}</h3>
                    <div className="mt-4 h-px w-12 bg-[#d8b872]/45 transition-all duration-700 group-hover:w-20 group-hover:bg-[#e2c88f]/72" />

                    <div className={`${activeOperationIndex === idx ? "mt-5 max-h-[260px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-[900ms] md:mt-0 md:max-h-0 md:opacity-0 md:group-hover:max-h-[220px] md:group-hover:opacity-100`}>
                      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_230px] md:items-start">
                        <div>
                          <p className="text-[0.66rem] tracking-[0.19em] text-[#bda77a]">{step.cue}</p>
                          <p className="mt-3 max-w-[58ch] text-sm leading-[1.9] text-[#c5cfde] md:text-[0.95rem]">{step.desc}</p>
                        </div>
                        <div className="relative overflow-hidden border border-[#d8c8a6]/30 bg-[#0a1327]/56">
                          <img src={step.image} alt={`${step.title} visual`} className="h-[110px] w-full object-cover opacity-72 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-86 md:h-[128px]" />
                          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(226,200,143,0.16)_0%,rgba(226,200,143,0)_40%,rgba(8,15,28,0.36)_100%)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="lux-arrow inline-flex justify-center pt-1 text-[1.05rem] text-[#c5d1e4] transition-all duration-700 group-hover:text-[#ebf1fc]">-&gt;</span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section id="contact" className="relative bg-[#f7f2e9] py-[6.6rem] md:py-[8.4rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute left-0 top-[16%] hidden h-px w-[12%] bg-[linear-gradient(90deg,rgba(148,163,184,0.32),transparent)] md:block" />
        <motion.div className="mx-auto grid w-full max-w-[1240px] px-5 md:px-8 gap-12 md:grid-cols-[1.35fr_0.65fr] md:items-start lg:pr-4" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.article className="md:pr-14" variants={staggerItem}>
            <h3 className="font-serif text-3xl md:text-4xl">Contact Us</h3>
            <p className="mt-6 max-w-[54ch] leading-[1.95] text-[#334155]">
              EC-4080 B, Bharat Diamond Bourse,<br />
              Bandra Kurla Complex,<br />
              Bandra(E), Mumbai-51
            </p>
            <div className="mt-8 grid gap-2 text-[#334155] sm:grid-cols-2">
              <p>Tel: 022 3596 3936</p>
              <p>QBC: 022 3392 3961</p>
              <p className="break-words sm:col-span-2">Email: ppsonecha@gmail.com / vipuldiamons55@gmail.com</p>
            </div>
          </motion.article>
          <motion.article className="relative border-l border-[#cfd8e4] pl-7 md:pl-10" variants={staggerItem}>
            <div className="relative flex flex-col gap-3 md:pt-1">
              <a href="tel:02235963936" className="lux-hover-lift inline-flex items-center justify-center gap-2 border border-[#cfd8e4] px-4 py-3 text-sm text-[#111827] transition-all duration-500 hover:shadow-[0_10px_20px_rgba(15,23,42,0.08)]"><Phone size={16} /> Call Office</a>
              <a href={WHATSAPP_LINK} className="lux-hover-lift inline-flex items-center justify-center gap-2 border border-[#111827] bg-[#111827] px-4 py-3 text-sm text-white transition-all duration-500 hover:bg-[#0f172a] hover:shadow-[0_12px_22px_rgba(15,23,42,0.16)]"><MessageCircle size={16} /> WhatsApp Enquiry</a>
            </div>
          </motion.article>
        </motion.div>
      </motion.section>

      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp Enquiry" className="floating-wa">
        <MessageCircle size={21} />
      </a>
    </div>
  );
}




