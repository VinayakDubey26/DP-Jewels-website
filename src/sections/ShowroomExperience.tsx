import { MessageCircle, Phone } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
    <div ref={ref} className="rounded-2xl bg-white/90 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
      <p className="font-serif text-4xl text-[#111827]">{count.toLocaleString()}{suffix}</p>
      <p className="mt-2 text-sm tracking-[0.08em] text-[#475569]">{label}</p>
    </div>
  );
}

export default function ShowroomExperience() {
  const [activeDiamondIndex, setActiveDiamondIndex] = useState(0);
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
              <a href="#diamonds" className="inline-flex rounded-sm border border-white/45 bg-white/10 px-6 py-3 text-sm tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-700 hover:-translate-y-[2px] hover:border-white/70 hover:bg-white/95 hover:text-[#111827] hover:shadow-[0_14px_30px_rgba(0,0,0,0.24)]">EXPLORE DIAMONDS</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section id="about" className="bg-[#FAF7F2] py-[5.75rem] md:py-[7.25rem]" {...sectionReveal}>
        <motion.div className="mx-auto grid w-[min(1220px,94%)] gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.article variants={staggerItem}>
            <motion.p className="text-xs tracking-[0.22em] text-[#475569]" variants={staggerItem}>ABOUT D.P. JEWELS</motion.p>
            <motion.h2 className="mt-5 max-w-[14ch] font-serif text-4xl leading-[1.04] md:text-[3.45rem]" variants={staggerItem}>Built on Trust, Since 1999</motion.h2>
            <motion.p className="mt-8 max-w-[62ch] text-[1.02rem] leading-[1.95] text-[#334155]" variants={staggerItem}>
              With 25+ years of experience, D.P. Jewels operates from Bharat Diamond Bourse, Mumbai, serving India and international buyers through transparent dealings, refined sourcing, and consistent export execution.
            </motion.p>
          </motion.article>
          <motion.div className="grid gap-8 sm:grid-cols-2 lg:translate-y-4" variants={staggerContainer}>
            <Counter value={25} suffix="+" label="Years of Experience" />
            <Counter value={200000} suffix="+" label="Carats Sold" />
            <Counter value={10} suffix="+" label="Markets Across India" />
            <Counter value={100} suffix="%" label="Global Export Focus" />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section id="diamonds" className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#061024_0%,#040816_48%,#030611_100%)] py-[5.5rem] md:py-[7rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(224,233,245,0.09)_0%,rgba(224,233,245,0)_44%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(rgba(255,255,255,0.26)_0.35px,transparent_0.35px)] [background-size:3px_3px]" />
        <div className="mx-auto w-[min(1320px,94%)]">
          <p className="text-xs tracking-[0.22em] text-[#aeb7c5]">DIAMONDS</p>
          <h2 className="mt-5 font-serif text-4xl text-[#f7f2e8] md:text-6xl">Diamond Shapes & Selections</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed tracking-[0.03em] text-[#c8d0dc] md:text-base">
            Natural & Lab Grown Diamonds
            <br />
            Precision sourced from Bharat Diamond Bourse
          </p>

          <div className="relative mt-[4.5rem] hidden h-[560px] overflow-hidden md:block">
            <button
              type="button"
              aria-label="Previous diamond"
              onClick={goPrevDiamond}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/24 bg-white/[0.06] px-3 py-2 text-[#dbe4f2] transition-all duration-500 hover:bg-white/[0.14]"
            >
              {"<"}
            </button>
            <button
              type="button"
              aria-label="Next diamond"
              onClick={goNextDiamond}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/24 bg-white/[0.06] px-3 py-2 text-[#dbe4f2] transition-all duration-500 hover:bg-white/[0.14]"
            >
              {">"}
            </button>
            {diamondShapes.map((shape, idx) => {
              const offset = getCircularOffset(idx, activeDiamondIndex, diamondShapes.length);
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              if (absOffset > 1) return null;
              const baseOpacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.42 : absOffset === 2 ? 0.14 : 0;
              const baseScale = absOffset === 0 ? 1 : absOffset === 1 ? 0.8 : 0.64;
              const baseY = absOffset === 0 ? -6 : absOffset === 1 ? 22 : 34;
              const shiftX = absOffset === 0 ? 0 : offset < 0 ? -290 : 290;
              return (
                <motion.article
                  key={shape}
                  className="group absolute left-1/2 top-1/2 flex w-[420px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
                  onClick={() => setActiveDiamondIndex(idx)}
                  animate={{
                    x: shiftX,
                    y: baseY,
                    scale: isActive ? 1.02 : baseScale,
                    opacity: baseOpacity,
                    filter: isActive ? "brightness(1.05)" : "brightness(0.94)",
                  }}
                  transition={{ duration: 1.05, ease: CINEMATIC_EASE }}
                >
                  <motion.div
                    className="relative mb-7 flex h-[278px] w-full items-center justify-center"
                    animate={{ y: isActive ? [-1, -7, -1] : 0 }}
                    transition={{ duration: 8.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {isActive && <div className="pointer-events-none absolute inset-x-[22%] top-[25%] h-[56%] rounded-full bg-[radial-gradient(circle,rgba(223,231,243,0.18)_0%,rgba(223,231,243,0)_74%)]" />}
                    <img
                      src={diamondShapeImageMap[shape]}
                      alt={`${shape} diamond`}
                      className={`relative h-[95%] w-[95%] object-contain object-center drop-shadow-[0_12px_26px_rgba(0,0,0,0.36)] transition-all duration-[900ms] ${isActive ? "scale-[1.03]" : "scale-[0.96]"} ${diamondOpticalClassMap[shape]}`}
                    />
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

          <div className="mt-2 flex flex-col items-center">
            <div className="mb-4 flex justify-center gap-3">
              {diamondShapes.map((shape, idx) => (
                <button
                  key={`${shape}-nav`}
                  type="button"
                  aria-label={`View ${shape}`}
                  onClick={() => setActiveDiamondIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeDiamondIndex ? "w-7 bg-[#e6edf8]" : "w-1.5 bg-[#90a1ba]/45 hover:bg-[#b8c6dc]"}`}
                />
              ))}
            </div>
            <p className="text-[0.68rem] tracking-[0.18em] text-[#aab8cd]">Swipe to view all diamond shapes</p>
            <div className="mt-3">
              <h3 className="text-center font-serif text-[1.92rem] tracking-[0.08em] text-[#f6f1e8] md:text-[2.1rem]">{activeDiamond}</h3>
              <div className="mt-4 flex justify-center">
                <a
                  href={WHATSAPP_LINK}
                  className="rounded-full border border-[#cfd8e4]/65 px-5 py-1.5 text-[0.64rem] tracking-[0.24em] text-[#f3eee5] transition-all duration-500 hover:-translate-y-[1px] hover:bg-[#f3eee5] hover:text-[#111827]"
                >
                  ENQUIRE
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="relative -mt-2 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] py-[5.75rem] md:py-[7.25rem]" {...sectionReveal}>
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

                <motion.path d={routes.mobile.indiaTop} stroke="url(#routeFlowMobile)" strokeWidth="1.4" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.8 }} transition={{ duration: 0.9, delay: 0.08 }} />
                <motion.path d={routes.mobile.indiaSouth} stroke="url(#routeFlowMobile)" strokeWidth="1.4" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.78 }} transition={{ duration: 0.9, delay: 0.2 }} />
                <motion.path d={routes.mobile.indiaNorthEast} stroke="url(#routeFlowMobile)" strokeWidth="1.36" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.76 }} transition={{ duration: 0.94, delay: 0.24 }} />
                <motion.path d={routes.mobile.indiaNorthEastShort} stroke="url(#routeFlowMobile)" strokeWidth="1.36" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.76 }} transition={{ duration: 0.92, delay: 0.26 }} />
                <motion.path d={routes.mobile.indiaNorthEastInner} stroke="url(#routeFlowMobile)" strokeWidth="1.36" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.76 }} transition={{ duration: 0.92, delay: 0.28 }} />
                <motion.path d={routes.mobile.indiaSouthEastInner} stroke="url(#routeFlowMobile)" strokeWidth="1.36" fill="none" initial={{ pathLength: 0, opacity: 0.22 }} whileInView={{ pathLength: 1, opacity: 0.76 }} transition={{ duration: 0.94, delay: 0.3 }} />

                <motion.path d={routes.mobile.dubai} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.0, delay: 0.28 }} />
                <motion.path d={routes.mobile.london} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.05, delay: 0.32 }} />
                <motion.path d={routes.mobile.canada} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.08, delay: 0.34 }} />
                <motion.path d={routes.mobile.america} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.1, delay: 0.36 }} />
                <motion.path d={routes.mobile.hongKong} stroke="url(#routeFlowIntlMobile)" strokeWidth="1.28" fill="none" initial={{ pathLength: 0, opacity: 0.16 }} whileInView={{ pathLength: 1, opacity: 0.72 }} transition={{ duration: 1.12, delay: 0.4 }} />

                <circle r="1.65" fill="#0f172a" opacity="0.44" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.42;0.36;0.08;0" keyTimes="0;0.65;0.92;1" dur="13.8s" repeatCount="indefinite" />
                  <animateMotion dur="13.8s" repeatCount="indefinite" path={routes.mobile.dubai} />
                </circle>
                <circle r="1.65" fill="#0f172a" opacity="0.44" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.42;0.36;0.08;0" keyTimes="0;0.65;0.92;1" dur="14.2s" repeatCount="indefinite" />
                  <animateMotion dur="14.2s" repeatCount="indefinite" path={routes.mobile.london} />
                </circle>
                <circle r="1.65" fill="#0f172a" opacity="0.44" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.42;0.36;0.08;0" keyTimes="0;0.65;0.92;1" dur="14.6s" repeatCount="indefinite" />
                  <animateMotion dur="14.6s" repeatCount="indefinite" path={routes.mobile.canada} />
                </circle>
                <circle r="1.65" fill="#0f172a" opacity="0.44" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.42;0.36;0.08;0" keyTimes="0;0.65;0.92;1" dur="13.9s" repeatCount="indefinite" />
                  <animateMotion dur="13.9s" repeatCount="indefinite" path={routes.mobile.america} />
                </circle>
                <circle r="1.65" fill="#0f172a" opacity="0.44" filter="url(#dotGlowMobile)">
                  <animate attributeName="opacity" values="0.42;0.36;0.08;0" keyTimes="0;0.65;0.92;1" dur="14.9s" repeatCount="indefinite" />
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

      <motion.section className="bg-[#faf7f2] py-[5.75rem] md:py-[7.25rem]" {...sectionReveal}>
        <motion.div className="mx-auto grid w-[min(1220px,94%)] gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.article className="lg:pr-8" variants={staggerItem}>
            <p className="text-xs tracking-[0.2em] text-[#475569]">TRUST & LOCATION</p>
            <h2 className="mt-5 max-w-[14ch] font-serif text-4xl leading-[1.06] md:text-5xl">Based at Bharat Diamond Bourse</h2>
            <p className="mt-7 max-w-[58ch] leading-[1.95] text-[#334155]">
              Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India’s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
            </p>
            <p className="mt-10 border-l border-[#cdd6e4] pl-5 leading-[1.9] text-[#1f2937]">
              EC-4080 B, Bharat Diamond Bourse,<br />
              Bandra Kurla Complex,<br />
              Bandra(E), Mumbai-51
            </p>
          </motion.article>
          <motion.article className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.8)_0%,rgba(248,244,236,0.84)_100%)] p-8 shadow-[0_20px_46px_rgba(15,23,42,0.09)]" variants={staggerItem}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(203,213,225,0.3),transparent_48%)]" />
            <div className="relative flex h-full min-h-[300px] items-center justify-center">
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
        </motion.div>
      </motion.section>

      <motion.section id="operations" className="bg-[linear-gradient(180deg,#091327_0%,#061024_100%)] py-[5.75rem] md:py-[7.25rem] text-[#f2ece2]" {...sectionReveal}>
        <motion.div className="mx-auto w-[min(1220px,94%)]" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <p className="text-xs tracking-[0.2em] text-[#b8c3d6]">OPERATIONS</p>
          <h2 className="mt-5 max-w-[15ch] font-serif text-4xl leading-[1.06] md:text-5xl">Sourcing & Delivery Workflow</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {operations.map((step, idx) => (
              <motion.article
                key={step}
                className={`group border-t border-white/16 pt-6 transition-all duration-700 ${idx % 2 === 0 ? "xl:translate-y-0" : "xl:translate-y-8"}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: idx * 0.08, ease: CINEMATIC_EASE }}
              >
                <p className="text-xs tracking-[0.18em] text-[#c4cfde] transition-colors duration-500 group-hover:text-[#e6edf8]">0{idx + 1}</p>
                <h3 className="mt-3 max-w-[18ch] font-serif text-[1.9rem] leading-[1.2] transition-colors duration-500 group-hover:text-[#ffffff]">{step}</h3>
                <div className="mt-6 h-px w-16 bg-white/22 transition-all duration-500 group-hover:w-24 group-hover:bg-white/45" />
              </motion.article>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section id="contact" className="bg-[#f7f2e9] py-[5.75rem] md:py-[7.25rem]" {...sectionReveal}>
        <motion.div className="mx-auto grid w-[min(1220px,94%)] gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-start" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.article className="md:pr-10" variants={staggerItem}>
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
          <motion.article className="relative rounded-[2rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.86)_0%,rgba(248,244,236,0.92)_100%)] p-7 shadow-[0_16px_34px_rgba(15,23,42,0.08)]" variants={staggerItem}>
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_78%_16%,rgba(203,213,225,0.26),transparent_52%)]" />
            <div className="relative flex flex-col gap-3">
              <a href="tel:02235963936" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cfd8e4] px-4 py-3 text-sm text-[#111827] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_10px_20px_rgba(15,23,42,0.1)]"><Phone size={16} /> Call Office</a>
              <a href={WHATSAPP_LINK} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111827] bg-[#111827] px-4 py-3 text-sm text-white transition-all duration-500 hover:-translate-y-[2px] hover:bg-[#0f172a] hover:shadow-[0_12px_22px_rgba(15,23,42,0.2)]"><MessageCircle size={16} /> WhatsApp Enquiry</a>
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

