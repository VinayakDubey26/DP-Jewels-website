import { MessageCircle, Phone } from "lucide-react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
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
import bdbImage from "../assets/images/bdb.png";
import giaLogo from "../assets/certs/gia.svg";
import igiLogo from "../assets/certs/igi.svg";
import gjepcLogo from "../assets/certs/gjepc.svg";
import gsiLogo from "../assets/certs/gsi.svg";

const WHATSAPP_LINK = "https://wa.me/918356810826?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";
const CINEMATIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SOFT_EASE: [number, number, number, number] = [0.25, 0.92, 0.34, 1];
const sectionReveal = {
  initial: { opacity: 0, y: 40, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.18, ease: CINEMATIC_EASE },
};
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};
const staggerItem = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: CINEMATIC_EASE } },
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
    desc: "A discreet brief aligns intent, quality language, and timeline precision.",
    cue: "PRIVATE BRIEF",
    image: bgImage,
  },
  {
    num: "02",
    title: "Diamond Selection",
    desc: "Curated stones are shortlisted through trusted channels and refined judgement.",
    cue: "CURATED SOURCING",
    image: diamondRound,
  },
  {
    num: "03",
    title: "Quality Review",
    desc: "Each recommendation is screened for consistency, grading, and certification alignment.",
    cue: "INSPECTION PROTOCOL",
    image: diamondEmerald,
  },
  {
    num: "04",
    title: "Buyer Confirmation",
    desc: "Final selections are validated with transparent specs and quiet confidence.",
    cue: "CONFIRMATION DESK",
    image: bdbImage,
  },
  {
    num: "05",
    title: "Export / Delivery Coordination",
    desc: "Secure routing and dispatch are coordinated for precise domestic and global handoff.",
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
    logo: giaLogo,
    name: "Gemological Institute of America",
    description: "Internationally recognized grading standards.",
  },
  {
    code: "IGI",
    logo: igiLogo,
    name: "International Gemological Institute",
    description: "Trusted global diamond certification.",
  },
  {
    code: "GJEPC",
    logo: gjepcLogo,
    name: "Gem & Jewellery Export Promotion Council",
    description: "Institutional trade credibility and export alignment.",
  },
  {
    code: "GSI",
    logo: gsiLogo,
    name: "Gemological Science International",
    description: "Independent gemological verification confidence.",
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
  const [activeOperationIndex, setActiveOperationIndex] = useState<number>(0);
  const [operationDirection, setOperationDirection] = useState<number>(1);
  const [activeCertificationIndex, setActiveCertificationIndex] = useState<number>(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const diamondsRef = useRef<HTMLElement>(null);
  const presenceRef = useRef<HTMLElement>(null);
  const bdbRef = useRef<HTMLElement>(null);
  const certRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const operationsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.06]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const heroLightX = useMotionValue(58);
  const heroLightY = useMotionValue(44);
  const heroLightXSpring = useSpring(heroLightX, { stiffness: 55, damping: 22, mass: 0.45 });
  const heroLightYSpring = useSpring(heroLightY, { stiffness: 55, damping: 22, mass: 0.45 });
  const heroLightGradient = useMotionTemplate`radial-gradient(circle at ${heroLightXSpring}% ${heroLightYSpring}%, rgba(214,196,156,0.14) 0%, rgba(214,196,156,0.06) 18%, rgba(4,8,22,0) 38%)`;
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const { scrollYProgress: diamondsProgress } = useScroll({ target: diamondsRef, offset: ["start end", "end start"] });
  const { scrollYProgress: presenceProgress } = useScroll({ target: presenceRef, offset: ["start end", "end start"] });
  const { scrollYProgress: bdbProgress } = useScroll({ target: bdbRef, offset: ["start end", "end start"] });
  const { scrollYProgress: certProgress } = useScroll({ target: certRef, offset: ["start end", "end start"] });
  const { scrollYProgress: whyProgress } = useScroll({ target: whyRef, offset: ["start end", "end start"] });
  const { scrollYProgress: operationsProgress } = useScroll({ target: operationsRef, offset: ["start end", "end start"] });
  const { scrollYProgress: contactProgress } = useScroll({ target: contactRef, offset: ["start end", "end start"] });
  const aboutDrift = useTransform(aboutProgress, [0, 1], [16, -16]);
  const diamondsDrift = useTransform(diamondsProgress, [0, 1], [18, -18]);
  const presenceDrift = useTransform(presenceProgress, [0, 1], [15, -15]);
  const bdbDrift = useTransform(bdbProgress, [0, 1], [14, -14]);
  const certDrift = useTransform(certProgress, [0, 1], [12, -12]);
  const whyDrift = useTransform(whyProgress, [0, 1], [12, -12]);
  const operationsDrift = useTransform(operationsProgress, [0, 1], [14, -14]);
  const contactDrift = useTransform(contactProgress, [0, 1], [12, -12]);
  const bdbImageParallaxY = useTransform(bdbProgress, [0, 1], [10, -10]);
  const bdbImageParallaxScale = useTransform(bdbProgress, [0, 1], [1.04, 1.02]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobileView(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.18, ease: SOFT_EASE } },
  };
  const activeDiamond = diamondShapes[activeDiamondIndex];
  const goPrevDiamond = () => setActiveDiamondIndex((prev) => (prev - 1 + diamondShapes.length) % diamondShapes.length);
  const goNextDiamond = () => setActiveDiamondIndex((prev) => (prev + 1) % diamondShapes.length);
  const setOperationStep = (nextIndex: number) => {
    if (nextIndex === activeOperationIndex) return;
    setOperationDirection(nextIndex > activeOperationIndex ? 1 : -1);
    setActiveOperationIndex(nextIndex);
  };

  return (
    <div className="atmospheric-shell text-[#111827]">
      <section
        ref={heroRef}
        id="home"
        className="relative flex h-screen h-[100svh] h-[100dvh] min-h-screen min-h-[100svh] min-h-[100dvh] items-center overflow-hidden bg-[#040816]"
        onMouseMove={(e) => {
          if (isMobileView) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          heroLightX.set(Math.min(78, Math.max(32, x)));
          heroLightY.set(Math.min(68, Math.max(26, y)));
        }}
        onMouseLeave={() => {
          heroLightX.set(58);
          heroLightY.set(44);
        }}
      >
        <motion.img src={bgImage} alt="Premium jewellery background" className="absolute inset-0 h-full w-full object-cover object-[58%_44%] saturate-[0.88] contrast-[1.08] brightness-[0.7] md:object-center" style={{ y: heroY, scale: heroScale }} loading="eager" fetchPriority="high" decoding="async" />
        <motion.div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,22,0.44)_0%,rgba(4,8,22,0.62)_38%,rgba(4,8,22,0.8)_100%)]" style={{ opacity: heroOverlayOpacity }} animate={{ opacity: [0.9, 1, 0.92] }} transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
        {!isMobileView && <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: heroLightGradient }} />}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(112,132,168,0.12)_0%,rgba(4,8,22,0)_46%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,0,0,0)_38%,rgba(0,0,0,0.26)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.34)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />
        {!isMobileView && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: [0.14, 0.2, 0.14] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={`hero-particle-${i}`}
              className="absolute h-[2px] w-[2px] rounded-full bg-[#efe5d0]/70 shadow-[0_0_7px_rgba(238,225,197,0.32)]"
              style={{ left: `${12 + i * 11}%`, top: `${16 + ((i * 9) % 52)}%` }}
              animate={{ y: [0, -8 - (i % 2) * 5, 0], x: [0, (i % 2 === 0 ? 2 : -2), 0], opacity: [0.14, 0.42, 0.14] }}
              transition={{ duration: 14 + i, delay: i * 0.45, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
        )}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_47%,rgba(232,219,188,0.1)_0%,rgba(232,219,188,0)_34%)]"
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.02, 1] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        {!isMobileView && (
        <motion.div
          className="pointer-events-none absolute -right-[20%] top-[8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(162,182,214,0.1)_0%,rgba(162,182,214,0)_72%)] blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        )}
        <div className="relative mx-auto flex h-screen h-[100svh] h-[100dvh] min-h-screen min-h-[100svh] min-h-[100dvh] w-[min(1220px,94%)] items-center py-0">
          <motion.div variants={heroContentStagger} initial="hidden" animate="show" className="max-w-[700px] text-white">
            <motion.h1 variants={heroItem} className="font-serif text-[2.6rem] leading-[1.02] md:text-[4.75rem]">Diamond Traders, Importers & Exporters</motion.h1>
            <motion.p variants={heroItem} className="mt-6 max-w-[34rem] text-[1.12rem] leading-[1.78] text-[#e2e8f0]/94 md:mt-7 md:text-[1.18rem] md:font-medium">
              Trusted sourcing from Bharat Diamond Bourse with 25+ years of precision, transparency, and global export focus.
            </motion.p>
            <motion.div variants={heroItem} className="mt-10">
              <a href="#diamonds" className="lux-hover-lift lux-interactive inline-flex rounded-sm border border-white/45 bg-white/10 px-6 py-3 text-sm tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-700 hover:border-white/70 hover:bg-white/95 hover:text-[#111827] hover:shadow-[0_14px_30px_rgba(0,0,0,0.24)]">EXPLORE DIAMONDS</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section ref={aboutRef} id="about" style={{ y: isMobileView ? 0 : aboutDrift }} className="relative -mt-3 bg-[#FAF7F2] py-[4.1rem] md:-mt-4 md:py-[5.4rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(112,132,168,0.08)_0%,rgba(112,132,168,0)_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_88%,rgba(212,190,150,0.07)_0%,rgba(212,190,150,0)_32%)]" />
        <div className="pointer-events-none absolute left-0 top-[22%] hidden h-px w-[16%] bg-[linear-gradient(90deg,rgba(148,163,184,0.4),transparent)] md:block" />
        <motion.div className="mx-auto grid w-full max-w-[1440px] px-5 md:px-8 gap-11 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:pl-4" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.article className="lg:pt-3" variants={staggerItem}>
            <motion.p className="text-[13px] tracking-[0.2em] text-[#475569] md:text-xs md:tracking-[0.22em]" variants={staggerItem}>ABOUT D.P. JEWELS</motion.p>
            <motion.h2 className="mt-4 max-w-[14ch] font-serif text-4xl leading-[1.04] md:text-[3.45rem]" variants={staggerItem}>Built on Trust, Since 1999</motion.h2>
            <motion.p className="mt-5 max-w-[62ch] text-[1.06rem] leading-[1.84] text-[#334155] md:mt-6 md:text-[1.02rem] md:leading-[1.9]" variants={staggerItem}>
              With 25+ years of experience, D.P. Jewels operates from Bharat Diamond Bourse, Mumbai, serving India and international buyers through transparent dealings, refined sourcing, and consistent export execution.
            </motion.p>
          </motion.article>
          <motion.div className="space-y-8 md:space-y-9 lg:pt-5" variants={staggerContainer}>
            {aboutMetrics.map((metric, idx) => (
              <motion.article
                key={metric.label}
                className={`${metric.offsetClass} border-t border-[#cfd8e4] pt-5 shadow-[0_8px_24px_rgba(148,163,184,0.06)]`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, delay: idx * 0.08, ease: SOFT_EASE }}
              >
                <p className="font-serif text-[2.4rem] leading-[1] text-[#111827] md:text-[3.15rem]">{metric.value}</p>
                <p className="mt-3 text-xs tracking-[0.14em] text-[#475569]">{metric.label}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section ref={diamondsRef} id="diamonds" style={{ y: isMobileView ? 0 : diamondsDrift }} className="relative -mt-2 min-h-screen overflow-hidden bg-[linear-gradient(180deg,#061024_0%,#040816_48%,#030611_100%)] py-[4rem] md:-mt-3 md:py-[6rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(224,233,245,0.09)_0%,rgba(224,233,245,0)_44%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_28%,rgba(206,218,238,0.07)_0%,rgba(206,218,238,0)_30%)]" />
        <div className="pointer-events-none absolute inset-0 hidden opacity-[0.1] [background-image:radial-gradient(rgba(255,255,255,0.26)_0.35px,transparent_0.35px)] [background-size:3px_3px] md:block" />
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:pl-8">
          <p className="text-[13px] tracking-[0.2em] text-[#aeb7c5] md:text-xs md:tracking-[0.22em]">DIAMONDS</p>
          <h2 className="mt-5 font-serif text-4xl text-[#f7f2e8] md:text-6xl">Diamond Shapes & Selections</h2>
          <p className="mt-5 max-w-2xl text-[1.04rem] leading-[1.82] tracking-[0.02em] text-[#c8d0dc] md:text-[1.1rem]">
            Natural & Lab Grown Diamonds
            <br />
            Precision sourced from Bharat Diamond Bourse
          </p>

          <div className="relative mt-[3.6rem] hidden h-[470px] overflow-hidden md:block">
            <button
              type="button"
              aria-label="Previous diamond"
              onClick={goPrevDiamond}
              className="absolute left-8 top-[52%] z-20 -translate-y-1/2 border border-white/22 bg-white/[0.04] px-2 py-1 text-xs text-[#dbe4f2] transition-all duration-700 hover:bg-white/[0.1]"
            >
              {"<"}
            </button>
            <button
              type="button"
              aria-label="Next diamond"
              onClick={goNextDiamond}
              className="absolute right-8 top-[52%] z-20 -translate-y-1/2 border border-white/22 bg-white/[0.04] px-2 py-1 text-xs text-[#dbe4f2] transition-all duration-700 hover:bg-white/[0.1]"
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
                  transition={{ duration: 1.34, ease: CINEMATIC_EASE }}
                >
                  <motion.div
                    className="relative mb-3 flex h-[260px] w-full items-center justify-center"
                    animate={isActive ? { y: [0, -3, 0], rotateZ: [0, 0.7, 0] } : { y: 0, rotateZ: 0 }}
                    transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <motion.img
                      src={diamondShapeImageMap[shape]}
                      alt={`${shape} diamond`}
                      className={`relative h-[95%] w-[95%] object-contain object-center drop-shadow-[0_15px_26px_rgba(0,0,0,0.36)] transition-all duration-[1100ms] ${isActive ? "scale-[1.05]" : "scale-[0.95]"} ${diamondOpticalClassMap[shape]}`}
                      animate={isActive ? { rotateY: [0, 1.2, 0], rotateX: [0, -0.8, 0] } : { rotateY: 0, rotateX: 0 }}
                      transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-10 flex min-h-[360px] items-center justify-center md:hidden">
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
                      loading="lazy"
                      decoding="async"
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
            <p className="text-xs tracking-[0.12em] text-[#aab8cd]">Swipe to view all diamond shapes</p>
            <div className="mt-2">
                <h3 className="text-center font-serif text-[2.05rem] tracking-[0.08em] text-[#f6f1e8] md:text-[2.35rem]">{activeDiamond}</h3>
              <div className="mt-3 flex justify-center">
                <a
                  href={WHATSAPP_LINK}
                  className="lux-hover-lift lux-interactive rounded-full border border-[#cfd8e4]/65 px-5 py-1.5 text-xs tracking-[0.12em] text-[#f3eee5] transition-all duration-500 hover:bg-[#f3eee5] hover:text-[#111827]"
                >
                  ENQUIRE
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section ref={presenceRef} style={{ y: isMobileView ? 0 : presenceDrift }} className="relative -mt-3 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] py-[4.3rem] md:py-[6.3rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute right-0 top-[14%] hidden h-px w-[14%] bg-[linear-gradient(270deg,rgba(148,163,184,0.34),transparent)] md:block" />
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:pr-6">
          <p className="text-[13px] tracking-[0.13em] text-[#334155] md:text-xs md:tracking-[0.14em]">SUPPLYING ACROSS INDIA & GLOBAL MARKETS</p>
          <h2 className="mt-3 font-serif text-[2.45rem] md:text-[3.4rem]">Global Presence, Rooted in Mumbai</h2>
          <p className="mt-5 max-w-4xl leading-relaxed text-[#334155]">
            From Bharat Diamond Bourse, Mumbai, D.P. Jewels serves buyers across India and key international markets with trusted diamond sourcing and export-focused relationships.
          </p>
          <div className="mt-10 overflow-hidden border border-[#d7dee8] bg-[radial-gradient(circle_at_38%_35%,#ffffff_0%,#f8f4ec_46%,#f1ece3_100%)] p-4 shadow-[inset_0_1px_18px_rgba(255,255,255,0.22),0_10px_26px_rgba(15,23,42,0.06)] md:mt-12 md:p-8">
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
                loading="lazy"
                decoding="async"
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

      <motion.section ref={bdbRef} style={{ y: isMobileView ? 0 : bdbDrift }} className="relative -mt-2 w-full overflow-hidden py-5 md:py-9" {...sectionReveal}>
        <div className="relative w-full bg-[#f7f3ec] md:bg-[#050913]">
          <motion.div
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
            style={{ backgroundImage: `url(${bdbImage})`, y: isMobileView ? 0 : bdbImageParallaxY, scale: isMobileView ? 1.02 : bdbImageParallaxScale }}
            aria-hidden
          />
          {!isMobileView && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden md:block bg-[radial-gradient(circle_at_68%_34%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_44%)]"
            animate={{ opacity: [0.1, 0.16, 0.1] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          )}
          <div className="relative mx-auto block w-full max-w-[2200px] md:hidden" />
          <div className="relative hidden w-full md:block md:pt-[44%] lg:pt-[40%]" />

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[72%] bg-[linear-gradient(96deg,rgba(248,244,236,0.7)_0%,rgba(248,244,236,0.48)_26%,rgba(248,244,236,0.18)_48%,rgba(248,244,236,0)_72%)] md:block md:w-[62%]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[44%] backdrop-blur-[1.6px] md:block md:w-[36%]" />

          <div className="absolute inset-0 hidden items-center md:flex">
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8">
              <motion.article
                className="w-full max-w-[620px] py-6 md:py-8"
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                <p className="text-xs tracking-[0.14em] text-[#9a7a36] [text-shadow:0_1px_2px_rgba(248,244,236,0.4)]">TRUST & LOCATION</p>
                <h2 className="mt-4 max-w-[14ch] font-serif text-[2rem] leading-[1.06] text-[#111827] [text-shadow:0_2px_12px_rgba(248,244,236,0.45)] md:text-5xl">Based at Bharat Diamond Bourse</h2>
                <p className="mt-6 max-w-[58ch] text-[1.06rem] leading-[1.8] text-[#334155] md:text-[1.12rem] [text-shadow:0_1px_8px_rgba(248,244,236,0.38)] md:text-base">
                  Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India&apos;s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
                </p>
                <p className="mt-8 border-l border-[#a9b6ca] pl-5 text-[1.06rem] leading-[1.8] text-[#1f2937] md:text-[1.12rem] [text-shadow:0_1px_8px_rgba(248,244,236,0.35)] md:mt-10 md:text-base">
                  EC-4080 B, Bharat Diamond Bourse,<br />
                  Bandra Kurla Complex,<br />
                  Bandra(E), Mumbai-51
                </p>
              </motion.article>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-2 pt-3 md:hidden">
            <article className="w-full max-w-[620px] py-3">
              <p className="text-xs tracking-[0.14em] text-[#9a7a36]">TRUST & LOCATION</p>
              <h2 className="mt-4 max-w-[14ch] font-serif text-[2rem] leading-[1.06] text-[#111827]">Based at Bharat Diamond Bourse</h2>
              <p className="mt-6 max-w-[58ch] text-[1.06rem] leading-[1.8] text-[#334155] md:text-[1.12rem]">
                Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India&apos;s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
              </p>
              <p className="mt-8 border-l border-[#a9b6ca] pl-5 text-[1.06rem] leading-[1.8] text-[#1f2937] md:text-[1.12rem]">
                EC-4080 B, Bharat Diamond Bourse,<br />
                Bandra Kurla Complex,<br />
                Bandra(E), Mumbai-51
              </p>
            </article>
            <img
              src={bdbImage}
              alt="Bharat Diamond Bourse cinematic artwork"
              width={2139}
              height={1426}
              className="mt-10 h-auto w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={certRef}
        style={{ y: isMobileView ? 0 : certDrift }}
        className="relative -mt-1 overflow-hidden bg-[linear-gradient(180deg,#f7f3ec_0%,#f5f1ea_52%,#efe9df_100%)] py-[3.8rem] text-[#2c2a27] md:py-[4.8rem]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.95, ease: SOFT_EASE }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0)_38%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_76%,rgba(202,176,122,0.16)_0%,rgba(202,176,122,0)_36%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:radial-gradient(rgba(74,66,54,0.1)_0.42px,transparent_0.42px)] [background-size:2.8px_2.8px]" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8">
          <div className="ml-auto w-full max-w-[66ch] md:mr-[8%] text-right">
          <p className="text-[13px] tracking-[0.18em] text-[#60584f] md:font-medium">INSTITUTIONAL CREDIBILITY</p>
          <p className="mt-4 ml-auto max-w-[50ch] font-serif text-[2.2rem] leading-[1.06] text-[#3c372f] md:text-[3.2rem]">
            Recognized Across International
            <br />
            Diamond Markets.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
            <span className="text-[13px] tracking-[0.1em] text-[#6f665b] md:font-medium">MUMBAI / BHARAT DIAMOND BOURSE</span>
            <span className="text-[13px] tracking-[0.1em] text-[#8a7448] md:font-medium">GLOBAL TRADE ALIGNMENT</span>
          </div>
          </div>

          <div className="relative mt-7 md:mt-8">
            <div className="mx-auto grid max-w-[1120px] gap-y-5 border-y border-[#d9cdb6]/74 py-5 md:grid-cols-4 md:gap-x-7 md:gap-y-5 md:py-7">
              {certifications.map((item, idx) => (
              <motion.button
                key={item.code}
                type="button"
                className="group lux-interactive relative block rounded-sm px-1.5 py-1.5 text-center transition-all duration-[600ms] hover:bg-white/36"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.92, delay: idx * 0.08, ease: SOFT_EASE }}
                onMouseEnter={() => setActiveCertificationIndex(idx)}
                onFocus={() => setActiveCertificationIndex(idx)}
                onClick={() => setActiveCertificationIndex(idx)}
              >
                <div className="relative">
                  <img
                    src={item.logo}
                    alt={`${item.code} certification logo`}
                    className="mx-auto h-[3.6rem] w-auto opacity-[0.99] grayscale transition-all duration-[560ms] group-hover:scale-[1.04] group-hover:opacity-100 group-hover:drop-shadow-[0_0_18px_rgba(185,154,98,0.36)] md:h-[4.1rem]"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="mt-2 text-[14px] tracking-[0.12em] text-[#5b5348] transition-colors duration-[560ms] group-hover:text-[#7c6a4b] md:font-medium">{item.code}</p>
                  <AnimatePresence>
                    {activeCertificationIndex === idx && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.48, ease: SOFT_EASE }}
                        className="pointer-events-none absolute left-1/2 top-[calc(100%+0.35rem)] z-10 hidden w-max max-w-[15rem] -translate-x-1/2 text-center text-[13px] leading-[1.45] tracking-[0.02em] text-[#685e50] md:block"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
            </div>
            <div className="mt-3 min-h-[2.25rem] md:hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={certifications[activeCertificationIndex].code}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.42, ease: SOFT_EASE }}
                  className="text-center text-[14px] leading-[1.46] tracking-[0.02em] text-[#685e50]"
                >
                  {certifications[activeCertificationIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-[13px] tracking-[0.1em] text-[#655d52] md:font-medium">VERIFIED THROUGH INDEPENDENT GLOBAL INSTITUTIONS</p>
          </div>
        </div>
      </motion.section>

      <motion.section ref={whyRef} style={{ y: isMobileView ? 0 : whyDrift }} className="relative -mt-1 overflow-hidden bg-[linear-gradient(180deg,#f7f3ec_0%,#f5f1ea_52%,#efe9df_100%)] py-8 text-[#2f2a24] md:min-h-screen md:py-0" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0)_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_70%,rgba(196,168,110,0.1)_0%,rgba(196,168,110,0)_34%)]" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8 md:min-h-screen">
          <motion.h2
            className="mx-auto max-w-[13ch] text-center font-serif text-[2.35rem] leading-[1.02] text-[#3d372f] md:absolute md:left-1/2 md:top-1/2 md:w-full md:-translate-x-1/2 md:-translate-y-1/2 md:text-[4.2rem]"
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.02, ease: CINEMATIC_EASE }}
          >
            Why Choose D.P. Jewels?
          </motion.h2>

          <div className="relative mt-8 min-h-[24rem] md:mt-0 md:min-h-screen">
            <motion.div
              className="hidden md:block"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.article variants={staggerItem} className="group lux-interactive absolute left-[8%] top-[18%] max-w-[18rem]">
                <h3 className="font-serif text-[1.72rem] leading-[1.1] text-[#352f28] transition-all duration-[560ms] group-hover:-translate-y-[2px] group-hover:text-[#9d7e45] md:font-medium">24x7 Sales Support</h3>
                <p className="mt-2 text-[0.97rem] leading-[1.56] text-[#5d554a] transition-colors duration-[560ms] group-hover:text-[#7a694e] md:font-medium">Always available for buyer coordination.</p>
              </motion.article>
              <motion.article variants={staggerItem} className="group lux-interactive absolute left-[12%] top-[62%] max-w-[18rem]">
                <h3 className="font-serif text-[1.66rem] leading-[1.1] text-[#352f28] transition-all duration-[560ms] group-hover:-translate-y-[2px] group-hover:text-[#9d7e45] md:font-medium">9+ Diamond Shapes</h3>
                <p className="mt-2 text-[0.96rem] leading-[1.56] text-[#5d554a] transition-colors duration-[560ms] group-hover:text-[#7a694e] md:font-medium">A refined selection across key diamond cuts.</p>
              </motion.article>
              <motion.article variants={staggerItem} className="group lux-interactive absolute left-[40%] top-[12%] max-w-[21rem]">
                <h3 className="font-serif text-[2.08rem] leading-[1.04] text-[#322c25] transition-all duration-[560ms] group-hover:-translate-y-[2px] group-hover:text-[#9d7e45] md:font-medium">Wide Stone Selection</h3>
                <p className="mt-2 text-[1.02rem] leading-[1.58] text-[#5d554a] transition-colors duration-[560ms] group-hover:text-[#7a694e] md:font-medium">Certified and non-certified diamond options.</p>
              </motion.article>
              <motion.article variants={staggerItem} className="group lux-interactive absolute right-[10%] top-[22%] max-w-[18rem]">
                <h3 className="font-serif text-[1.7rem] leading-[1.1] text-[#352f28] transition-all duration-[560ms] group-hover:-translate-y-[2px] group-hover:text-[#9d7e45] md:font-medium">8+ Product Categories</h3>
                <p className="mt-2 text-[0.97rem] leading-[1.56] text-[#5d554a] transition-colors duration-[560ms] group-hover:text-[#7a694e] md:font-medium">Flexible sourcing across varied requirements.</p>
              </motion.article>
              <motion.article variants={staggerItem} className="group lux-interactive absolute right-[7%] top-[56%] max-w-[20rem]">
                <h3 className="font-serif text-[2.22rem] leading-[1.02] text-[#322c25] transition-all duration-[560ms] group-hover:-translate-y-[2px] group-hover:text-[#9d7e45] md:font-medium">20+ Years of Experience</h3>
                <p className="mt-2 text-[1.02rem] leading-[1.58] text-[#5d554a] transition-colors duration-[560ms] group-hover:text-[#7a694e] md:font-medium">Built through long-standing trade relationships.</p>
              </motion.article>
              <motion.article variants={staggerItem} className="group lux-interactive absolute left-[43%] top-[72%] max-w-[18rem]">
                <h3 className="font-serif text-[1.64rem] leading-[1.1] text-[#352f28] transition-all duration-[560ms] group-hover:-translate-y-[2px] group-hover:text-[#9d7e45] md:font-medium">Customers as Family</h3>
                <p className="mt-2 text-[0.96rem] leading-[1.56] text-[#5d554a] transition-colors duration-[560ms] group-hover:text-[#7a694e] md:font-medium">Relationships shaped by trust and consistency.</p>
              </motion.article>
            </motion.div>

            <div className="mt-8 space-y-4 md:hidden">
              <article>
                <h3 className="font-serif text-[1.5rem] leading-[1.12] text-[#3b352d]">24x7 Sales Support</h3>
                <p className="mt-1 text-[1rem] leading-[1.58] text-[#665c4f]">Always available for buyer coordination.</p>
              </article>
              <article>
                <h3 className="font-serif text-[1.5rem] leading-[1.12] text-[#3b352d]">9+ Diamond Shapes</h3>
                <p className="mt-1 text-[1rem] leading-[1.58] text-[#665c4f]">A refined selection across key diamond cuts.</p>
              </article>
              <article>
                <h3 className="font-serif text-[1.5rem] leading-[1.12] text-[#3b352d]">Wide Stone Selection</h3>
                <p className="mt-1 text-[1rem] leading-[1.58] text-[#665c4f]">Certified and non-certified diamond options.</p>
              </article>
              <article>
                <h3 className="font-serif text-[1.5rem] leading-[1.12] text-[#3b352d]">8+ Product Categories</h3>
                <p className="mt-1 text-[1rem] leading-[1.58] text-[#665c4f]">Flexible sourcing across varied requirements.</p>
              </article>
              <article>
                <h3 className="font-serif text-[1.5rem] leading-[1.12] text-[#3b352d]">20+ Years of Experience</h3>
                <p className="mt-1 text-[1rem] leading-[1.58] text-[#665c4f]">Built through long-standing trade relationships.</p>
              </article>
              <article>
                <h3 className="font-serif text-[1.5rem] leading-[1.12] text-[#3b352d]">Customers as Family</h3>
                <p className="mt-1 text-[1rem] leading-[1.58] text-[#665c4f]">Relationships shaped by trust and consistency.</p>
              </article>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section ref={operationsRef} id="operations" style={{ y: isMobileView ? 0 : operationsDrift }} className="relative -mt-1 overflow-hidden bg-[linear-gradient(180deg,#f7f3ec_0%,#f5f1ea_52%,#efe9df_100%)] py-8 text-[#2f2a24] md:py-12" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0)_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_76%,rgba(196,168,110,0.1)_0%,rgba(196,168,110,0)_34%)]" />
        {!isMobileView && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_52%,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_46%)]"
          animate={{ opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        )}

        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8">
          <p className="text-[13px] tracking-[0.16em] text-[#655d52] md:font-medium">OPERATIONS</p>
          <div className="mt-6 hidden gap-8 md:grid md:grid-cols-[1.2fr_0.8fr] md:items-start md:gap-10">
            <div className="relative overflow-hidden rounded-[0.7rem] border border-[#d9cdb6]/48 bg-[linear-gradient(150deg,rgba(255,255,255,0.44),rgba(239,233,223,0.34))] shadow-[0_14px_24px_rgba(96,80,48,0.08)]">
              {!isMobileView && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_40%)]"
                animate={{ opacity: [0.1, 0.2, 0.1], x: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              )}
              <div className="relative z-[0] h-[24.5rem] w-full md:h-[30rem]">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.img
                    key={`operations-image-${activeOperationIndex}`}
                    src={operationsJourney[activeOperationIndex].image}
                    alt={operationsJourney[activeOperationIndex].title}
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.8] saturate-[0.8] brightness-[0.94]"
                    initial={{ opacity: 0, x: operationDirection > 0 ? 14 : -14, y: 8, scale: 1.01 }}
                    animate={{ opacity: 0.8, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: operationDirection > 0 ? -10 : 10, y: -6, scale: 1.005 }}
                    transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[0.7rem] border border-[#d9cdb6]/46 bg-[linear-gradient(152deg,rgba(255,255,255,0.56),rgba(239,233,223,0.4))] px-5 py-6 shadow-[0_12px_22px_rgba(96,80,48,0.08)] backdrop-blur-[1px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0)_44%)]" />
              <p className="mb-5 text-right font-serif text-[1.45rem] text-[#7d6640]">
                {operationsJourney[activeOperationIndex].num} <span className="text-[#9d8b6b]">/ 05</span>
              </p>
              <div className="absolute right-4 top-20 h-[68%] w-px bg-[#d7c8ad]/60">
                <motion.div
                  className="w-px bg-[linear-gradient(180deg,#b99a62,#d6c09a)]"
                  animate={{ height: `${((activeOperationIndex + 1) / operationsJourney.length) * 100}%` }}
                  transition={{ duration: 0.58, ease: SOFT_EASE }}
                />
              </div>

              <div className="space-y-4 pr-5">
                {operationsJourney.map((step, idx) => {
                  const isActive = activeOperationIndex === idx;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onMouseEnter={() => setOperationStep(idx)}
                      onFocus={() => setOperationStep(idx)}
                      onClick={() => setOperationStep(idx)}
                      className="lux-interactive block w-full text-left"
                    >
                      <motion.span
                        animate={{ color: isActive ? "#a2844c" : "#8c8478" }}
                        transition={{ duration: 0.56, ease: SOFT_EASE }}
                        className="text-[13px] tracking-[0.12em]"
                      >
                        {step.num}
                      </motion.span>
                      <motion.p
                        animate={{ y: isActive ? 0 : 1.5, color: isActive ? "#2f2a24" : "#7a7266", opacity: isActive ? 1 : 0.84 }}
                        transition={{ duration: 0.6, ease: SOFT_EASE }}
                        className={`mt-1 font-serif text-[1.38rem] leading-[1.18] md:text-[1.3rem] ${isActive ? "font-medium" : ""}`}
                      >
                        {step.title}
                      </motion.p>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            key={`op-desc-${step.num}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                            className="mt-2 max-w-[32ch] text-[1.08rem] leading-[1.68] text-[#4f483f] md:text-[1.06rem] md:leading-[1.72]"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <motion.span
                        animate={{ width: isActive ? 64 : 32, opacity: isActive ? 1 : 0.56, filter: isActive ? "drop-shadow(0 0 9px rgba(185,154,98,0.3))" : "none" }}
                        transition={{ duration: 0.6, ease: SOFT_EASE }}
                        className={`mt-2 block h-px ${isActive ? "bg-[linear-gradient(90deg,rgba(188,158,102,0.7),rgba(188,158,102,0))]" : "bg-[linear-gradient(90deg,rgba(155,139,116,0.35),rgba(155,139,116,0))]"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3 md:hidden">
            {operationsJourney.map((step, idx) => {
              const isActive = activeOperationIndex === idx;
              return (
                <article key={`mobile-op-${step.title}`} className="overflow-hidden rounded-[0.7rem] border border-[#d9cdb6]/48 bg-[linear-gradient(152deg,rgba(255,255,255,0.56),rgba(239,233,223,0.4))] px-4 py-4 shadow-[0_10px_18px_rgba(96,80,48,0.07)]">
                  <button
                    type="button"
                    onClick={() => setOperationStep(idx)}
                    className="w-full text-left"
                  >
                    <p className={`text-[12px] tracking-[0.12em] ${isActive ? "text-[#a2844c]" : "text-[#8c8478]"}`}>{step.num}</p>
                    <p className={`mt-1 font-serif text-[1.28rem] leading-[1.18] ${isActive ? "text-[#2f2a24]" : "text-[#7a7266]"}`}>{step.title}</p>
                    {isActive && (
                      <p className="mt-2 text-[1rem] leading-[1.62] text-[#4f483f]">{step.desc}</p>
                    )}
                  </button>
                </article>
              );
            })}
            <div className="relative h-[13.8rem] overflow-hidden rounded-[0.62rem] border border-[#d9cdb6]/48 bg-[linear-gradient(152deg,rgba(255,255,255,0.56),rgba(239,233,223,0.4))] shadow-[0_10px_18px_rgba(96,80,48,0.07)]">
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={`mobile-operations-image-${activeOperationIndex}`}
                  src={operationsJourney[activeOperationIndex].image}
                  alt={operationsJourney[activeOperationIndex].title}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, y: 10, scale: 1.008 }}
                  animate={{ opacity: 0.94, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 1.004 }}
                  transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section ref={contactRef} id="contact" style={{ y: isMobileView ? 0 : contactDrift }} className="relative -mt-1 bg-[#f7f2e9] py-[5.1rem] md:py-[6.9rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(112,132,168,0.08)_0%,rgba(112,132,168,0)_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(rgba(74,66,54,0.12)_0.42px,transparent_0.42px)] [background-size:3px_3px]" />
        <div className="pointer-events-none absolute left-0 top-[16%] hidden h-px w-[12%] bg-[linear-gradient(90deg,rgba(148,163,184,0.32),transparent)] md:block" />
        <motion.div className="mx-auto grid w-full max-w-[1440px] px-5 md:px-8 gap-12 md:grid-cols-[1.35fr_0.65fr] md:items-start lg:pr-4" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.article className="md:pr-14" variants={staggerItem}>
            <h3 className="font-serif text-3xl text-[#171b22] md:text-4xl">Contact Us</h3>
            <p className="mt-6 max-w-[54ch] leading-[1.95] text-[#2f3947] md:font-medium">
              EC-4080 B, Bharat Diamond Bourse,<br />
              Bandra Kurla Complex,<br />
              Bandra(E), Mumbai-51
            </p>
            <div className="mt-8 grid gap-2 text-[1.03rem] text-[#2f3947] md:font-medium sm:grid-cols-2">
              <p>Tel: 022 3596 3936</p>
              <p>QBC: 022 3392 3961</p>
              <p className="break-words sm:col-span-2">Email: ppsonecha@gmail.com</p>
            </div>
          </motion.article>
          <motion.article className="relative border-l border-[#cfd8e4] pl-7 md:pl-10" variants={staggerItem}>
            <div className="relative flex flex-col gap-3 md:pt-1">
              <a href="tel:02235963936" className="lux-hover-lift lux-interactive inline-flex items-center justify-center gap-2 border border-[#cfd8e4] px-4 py-3 text-sm text-[#111827] transition-all duration-500 hover:shadow-[0_10px_20px_rgba(15,23,42,0.08)]"><Phone size={16} /> Call Office</a>
              <a href={WHATSAPP_LINK} className="lux-hover-lift lux-interactive inline-flex items-center justify-center gap-2 border border-[#111827] bg-[#111827] px-4 py-3 text-sm text-white transition-all duration-500 hover:bg-[#0f172a] hover:shadow-[0_12px_22px_rgba(15,23,42,0.16)]"><MessageCircle size={16} /> WhatsApp Enquiry</a>
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








