import { MessageCircle, Phone } from "lucide-react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import indiaMapClean from "../assets/india_map_clean_champagne.svg";
import indiaMapCleanRaw from "../assets/india_map_clean_champagne.svg?raw";
import indiaExportStory from "../assets/dpj_india_export_story.svg";
import bdbImage from "../assets/images/bdb.png";
import giaLogo from "../assets/certs/gia.svg";
import igiLogo from "../assets/certs/igi.svg";
import gjepcLogo from "../assets/certs/gjepc.svg";
import gsiLogo from "../assets/certs/gsi.svg";

const WHATSAPP_LINK = "https://wa.me/918356810826?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";
const CINEMATIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SOFT_EASE: [number, number, number, number] = [0.25, 0.92, 0.34, 1];
const sectionReveal = {
  initial: { opacity: 0, y: 28, filter: "blur(3px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.24 },
  transition: { duration: 1.34, ease: SOFT_EASE },
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
    title: "25+ Years of Industry Trust",
    desc: "Decades of dependable relationships built across buyers, brokers, and supply partners.",
  },
  {
    num: "02",
    title: "200,000+ Carats Traded",
    desc: "Volume handled with consistency, precision, and market-led judgment over time.",
  },
  {
    num: "03",
    title: "Sourced To Your Exact Requirement",
    desc: "From size and shape to quality benchmarks, sourcing is aligned to your exact ask.",
  },
  {
    num: "04",
    title: "Global Trade Network",
    desc: "A broad and active network supports faster access to the right stones worldwide.",
  },
  {
    num: "05",
    title: "Relationships Before Transactions",
    desc: "Long-term trust guides every deal, every recommendation, and every follow-through.",
  },
  {
    num: "06",
    title: "Always Within Reach",
    desc: "Responsive support, steady communication, and dependable availability when timing matters.",
  },
  {
    num: "07",
    title: "Built On Trust Since 1999",
    desc: "D.P. Jewels remains a reliable sourcing partner shaped by continuity and credibility.",
  },
];

const exportStoryScenes = [
  {
    title: "Exporting Excellence Worldwide",
    body: "From Mumbai, D.P. Jewels presents a restrained international export network built on trust, precision, and long-standing trade relationships.",
  },
  {
    title: "Mumbai, India",
    body: "Operating from one of the world's leading diamond trading hubs.",
  },
  {
    title: "Dubai",
    body: "A key regional corridor for refined diamond trade across the Middle East.",
  },
  {
    title: "London",
    body: "Serving established jewellery markets with disciplined sourcing and export reliability.",
  },
  {
    title: "Singapore",
    body: "Connecting to Southeast Asia through precise coordination and trusted buyer relationships.",
  },
  {
    title: "Hong Kong",
    body: "Reaching major Asian trading corridors through dependable export execution and market familiarity.",
  },
  {
    title: "Canada",
    body: "Extending Indian diamond expertise into mature North American markets.",
  },
  {
    title: "USA",
    body: "Supporting international buyers with transparent communication and consistent execution.",
  },
  {
    title: "Global Markets",
    body: "Connecting India's diamond industry to global markets.",
  },
];

const indiaOutlinePath = indiaMapCleanRaw.match(/<path[^>]*d="([^"]+)"/)?.[1] ?? "";

const exportDesktopLayout = {
  nodes: {
    mumbai: { x: 280, y: 605, labelX: 299, labelY: 632, label: "Mumbai" },
    dubai: { x: 20, y: 525, labelX: 4, labelY: 517, label: "Dubai", anchor: "end" },
    london: { x: -122, y: 198, labelX: -138, labelY: 190, label: "London", anchor: "end" },
    singapore: { x: 792, y: 726, labelX: 806, labelY: 718, label: "Singapore", anchor: "start" },
    hongKong: { x: 888, y: 506, labelX: 904, labelY: 500, label: "Hong Kong", anchor: "start" },
    canada: { x: -188, y: 330, labelX: -172, labelY: 322, label: "Canada", anchor: "start" },
    usa: { x: -186, y: 760, labelX: -202, labelY: 752, label: "USA", anchor: "end" },
  },
  internalNodes: [
    { key: "kashmir", x: 335, y: 158 },
    { key: "up", x: 422, y: 350 },
    { key: "assam", x: 807, y: 372 },
    { key: "south", x: 360, y: 818 },
  ],
  internalRoutes: [
    { key: "kashmir", path: "M280 605 C298 468 316 276 335 158" },
    { key: "up", path: "M280 605 C334 520 380 434 422 350" },
    { key: "assam", path: "M280 605 C424 548 614 470 807 372" },
    { key: "south", path: "M280 605 C304 674 332 746 360 818" },
  ],
  routes: [
    { key: "dubai", scene: 2, type: "primary", path: "M280 605 C208 588 116 552 20 525" },
    { key: "london", scene: 3, type: "secondary", path: "M280 605 C188 476 42 286 -122 198" },
    { key: "singapore", scene: 4, type: "primary", path: "M280 605 C444 620 634 666 792 726" },
    { key: "hongKong", scene: 5, type: "primary", path: "M280 605 C458 588 676 562 888 506" },
    { key: "canada", scene: 6, type: "secondary", path: "M280 605 C104 462 -56 372 -188 330" },
    { key: "usa", scene: 7, type: "secondary", path: "M280 605 C96 672 -52 736 -186 760" },
  ],
} as const;

const exportMobileLayout = {
  nodes: {
    mumbai: { x: 280, y: 607, labelX: 296, labelY: 632, label: "Mumbai" },
    dubai: { x: 116, y: 556, labelX: 26, labelY: 552, label: "Dubai", anchor: "start" },
    london: { x: 72, y: 240, labelX: 18, labelY: 234, label: "London", anchor: "start" },
    singapore: { x: 660, y: 716, labelX: 528, labelY: 712, label: "Singapore", anchor: "start" },
    hongKong: { x: 834, y: 596, labelX: 774, labelY: 588, label: "Hong Kong", anchor: "end" },
    canada: { x: 36, y: 398, labelX: 14, labelY: 392, label: "Canada", anchor: "start" },
    usa: { x: 72, y: 778, labelX: 18, labelY: 772, label: "USA", anchor: "start" },
  },
  internalNodes: [
    { key: "kashmir", x: 337, y: 176 },
    { key: "up", x: 416, y: 354 },
    { key: "assam", x: 736, y: 388 },
    { key: "south", x: 360, y: 796 },
  ],
  internalRoutes: [
    { key: "kashmir", path: "M280 607 C300 482 320 286 337 176" },
    { key: "up", path: "M280 607 C336 514 382 432 416 354" },
    { key: "assam", path: "M280 607 C414 556 568 486 736 388" },
    { key: "south", path: "M280 607 C308 676 334 738 360 796" },
  ],
  routes: [
    { key: "dubai", scene: 2, type: "primary", path: "M280 607 C234 594 176 574 116 556" },
    { key: "london", scene: 3, type: "secondary", path: "M280 607 C214 468 152 326 72 240" },
    { key: "singapore", scene: 4, type: "primary", path: "M280 607 C380 644 514 692 660 716" },
    { key: "hongKong", scene: 5, type: "primary", path: "M280 607 C434 620 622 632 834 596" },
    { key: "canada", scene: 6, type: "secondary", path: "M280 607 C170 508 108 436 36 398" },
    { key: "usa", scene: 7, type: "secondary", path: "M280 607 C190 708 138 762 72 778" },
  ],
} as const;

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function ShowroomExperience() {
  const [activeDiamondIndex, setActiveDiamondIndex] = useState(0);
  const [activeCertificationIndex, setActiveCertificationIndex] = useState<number>(0);
  const [activeExportScene, setActiveExportScene] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const diamondsRef = useRef<HTMLElement>(null);
  const presenceRef = useRef<HTMLElement>(null);
  const bdbRef = useRef<HTMLElement>(null);
  const certRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const whyPinRef = useRef<HTMLDivElement>(null);
  const whyProofRefs = useRef<Array<HTMLElement | null>>([]);
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
  const heroMouseShiftXRaw = useTransform(heroLightX, [32, 78], [-10, 10]);
  const heroMouseShiftYRaw = useTransform(heroLightY, [26, 68], [-8, 8]);
  const heroMouseShiftX = useSpring(heroMouseShiftXRaw, { stiffness: 40, damping: 24, mass: 0.8 });
  const heroMouseShiftY = useSpring(heroMouseShiftYRaw, { stiffness: 40, damping: 24, mass: 0.8 });
  const heroImageY = useTransform([heroY, heroMouseShiftY], ([scrollY, mouseY]) => Number(scrollY) + Number(mouseY));
  const heroContentX = useTransform(heroMouseShiftX, (v) => v * -0.35);
  const heroContentY = useTransform(heroMouseShiftY, (v) => v * -0.25);
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const { scrollYProgress: diamondsProgress } = useScroll({ target: diamondsRef, offset: ["start end", "end start"] });
  const { scrollYProgress: presenceProgress } = useScroll({ target: presenceRef, offset: ["start start", "end end"] });
  const { scrollYProgress: bdbProgress } = useScroll({ target: bdbRef, offset: ["start end", "end start"] });
  const { scrollYProgress: certProgress } = useScroll({ target: certRef, offset: ["start end", "end start"] });
  const { scrollYProgress: whyProgress } = useScroll({ target: whyRef, offset: ["start end", "end start"] });
  const { scrollYProgress: contactProgress } = useScroll({ target: contactRef, offset: ["start end", "end start"] });
  const aboutDrift = useTransform(aboutProgress, [0, 1], [0, -10]);
  const diamondsDrift = useTransform(diamondsProgress, [0, 1], [12, -12]);
  const bdbDrift = useTransform(bdbProgress, [0, 1], [9, -9]);
  const certDrift = useTransform(certProgress, [0, 1], [8, -8]);
  const whyDrift = useTransform(whyProgress, [0, 1], [8, -8]);
  const contactDrift = useTransform(contactProgress, [0, 1], [8, -8]);
  const bdbImageParallaxY = useTransform(bdbProgress, [0, 1], [10, -10]);
  const bdbImageParallaxScale = useTransform(bdbProgress, [0, 1], [1.04, 1.02]);
  const exportLayout = isMobileView ? exportMobileLayout : exportDesktopLayout;
  const exportNodes = exportLayout.nodes;
  const exportInternalNodes = exportLayout.internalNodes;
  const exportInternalRoutes = exportLayout.internalRoutes;
  const exportRoutes = exportLayout.routes.map((route) => ({
    ...route,
    node: exportLayout.nodes[route.key],
  }));
  const exportMapOpacity = useTransform(presenceProgress, [0, 0.04, 0.95, 1], [0, 1, 1, 0.96]);
  const exportHubOpacity = useTransform(presenceProgress, [0.06, 0.12], [0, 1]);
  const exportInternalNetworkOpacity = useTransform(presenceProgress, [0.12, 0.19], [0, 1]);
  const exportInternalLineProgress = useSpring(useTransform(presenceProgress, [0.12, 0.19], [0, 1]), { stiffness: 50, damping: 23, mass: 0.58 });
  const exportCameraXRaw = useTransform(presenceProgress, [0, 0.24, 0.46, 0.68, 1], [0, -2, 2.5, -2.25, 0]);
  const exportCameraYRaw = useTransform(presenceProgress, [0, 0.24, 0.46, 0.68, 1], [0, -1.5, 1.2, -0.8, 0]);
  const exportCameraScaleRaw = useTransform(presenceProgress, [0, 0.24, 0.52, 0.78, 1], isMobileView ? [1, 1.006, 1.008, 1.01, 1.008] : [0.94, 0.99, 1.04, 1.08, 1.05]);
  const exportCameraX = useSpring(exportCameraXRaw, { stiffness: 42, damping: 30, mass: 0.82 });
  const exportCameraY = useSpring(exportCameraYRaw, { stiffness: 42, damping: 30, mass: 0.82 });
  const exportCameraScale = useSpring(exportCameraScaleRaw, { stiffness: 40, damping: 32, mass: 0.86 });
  const routeDubaiProgress = useSpring(useTransform(presenceProgress, [0.2, 0.29], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeLondonProgress = useSpring(useTransform(presenceProgress, [0.26, 0.35], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeSingaporeProgress = useSpring(useTransform(presenceProgress, [0.32, 0.41], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeHongKongProgress = useSpring(useTransform(presenceProgress, [0.38, 0.47], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeCanadaProgress = useSpring(useTransform(presenceProgress, [0.44, 0.53], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeUsaProgress = useSpring(useTransform(presenceProgress, [0.5, 0.59], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeDubaiOpacity = useTransform(presenceProgress, [0.19, 0.24], [0, 0.9]);
  const routeLondonOpacity = useTransform(presenceProgress, [0.25, 0.3], [0, 0.82]);
  const routeSingaporeOpacity = useTransform(presenceProgress, [0.31, 0.36], [0, 0.9]);
  const routeHongKongOpacity = useTransform(presenceProgress, [0.37, 0.42], [0, 0.9]);
  const routeCanadaOpacity = useTransform(presenceProgress, [0.43, 0.48], [0, 0.8]);
  const routeUsaOpacity = useTransform(presenceProgress, [0.49, 0.54], [0, 0.8]);
  const routeMotion = {
    dubai: { progress: routeDubaiProgress, opacity: routeDubaiOpacity },
    london: { progress: routeLondonProgress, opacity: routeLondonOpacity },
    singapore: { progress: routeSingaporeProgress, opacity: routeSingaporeOpacity },
    hongKong: { progress: routeHongKongProgress, opacity: routeHongKongOpacity },
    canada: { progress: routeCanadaProgress, opacity: routeCanadaOpacity },
    usa: { progress: routeUsaProgress, opacity: routeUsaOpacity },
  };
  const activeScene = exportStoryScenes[activeExportScene];

  useMotionValueEvent(presenceProgress, "change", (latest) => {
    const acceleratedProgress = Math.min(0.98, latest * 1.72);
    const nextScene = Math.min(exportStoryScenes.length - 1, Math.max(0, Math.floor(acceleratedProgress * exportStoryScenes.length)));
    setActiveExportScene((currentScene) => (currentScene === nextScene ? currentScene : nextScene));
  });
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobileView(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isMobileView || !whyRef.current || !whyPinRef.current) {
      return;
    }

    const proofLayers = whyProofRefs.current.filter((node): node is HTMLElement => Boolean(node));
    if (!proofLayers.length) return;
    const totalSteps = proofLayers.length;
    let currentStepIndex = 0;

    gsap.set(proofLayers, { opacity: 0, willChange: "opacity" });
    gsap.set(proofLayers[0], { opacity: 1 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: whyRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * totalSteps}`,
        pin: whyPinRef.current,
        pinSpacing: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Reserve the final ~12% of progress as a hold on the last proof point.
          const normalized = Math.min(1, self.progress / 0.88);
          const nextStepIndex = Math.min(
            totalSteps - 1,
            Math.floor(normalized * totalSteps),
          );

          if (nextStepIndex === currentStepIndex) return;

          gsap.to(proofLayers[currentStepIndex], {
            opacity: 0,
            duration: 0.42,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(proofLayers[nextStepIndex], {
            opacity: 1,
            duration: 0.42,
            ease: "power2.out",
            overwrite: "auto",
          });

          currentStepIndex = nextStepIndex;
        },
      });
    }, whyRef);

    return () => ctx.revert();
  }, [isMobileView]);
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

  return (
    <div className="atmospheric-shell text-[#111827]">
      <section
        ref={heroRef}
        id="home"
        className="relative flex h-[100svh] h-[100dvh] h-screen min-h-[100svh] min-h-[100vh] items-center overflow-hidden bg-[#040816]"
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
        <motion.img src={bgImage} alt="Premium jewellery background" className="absolute inset-0 h-full w-full object-cover object-[58%_44%] saturate-[0.88] contrast-[1.08] brightness-[0.7] md:object-center" style={{ x: heroMouseShiftX, y: heroImageY, scale: heroScale }} loading="eager" fetchPriority="high" decoding="async" />
        <motion.div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,22,0.44)_0%,rgba(4,8,22,0.62)_38%,rgba(4,8,22,0.8)_100%)]" style={{ opacity: heroOverlayOpacity }} animate={{ opacity: [0.9, 1, 0.92] }} transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
        {!isMobileView && <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: heroLightGradient }} />}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(112,132,168,0.08)_0%,rgba(4,8,22,0)_46%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,0,0,0)_38%,rgba(0,0,0,0.26)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.34)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_47%,rgba(232,219,188,0.07)_0%,rgba(232,219,188,0)_36%)]"
          animate={{ opacity: [0.07, 0.11, 0.07] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="relative mx-auto flex h-[100svh] h-[100dvh] h-screen min-h-[100svh] min-h-[100vh] w-[min(1220px,94%)] items-center py-0">
          <motion.div variants={heroContentStagger} initial="hidden" animate="show" className="max-w-[700px] text-white" style={{ x: heroContentX, y: heroContentY }}>
            <motion.h1 variants={heroItem} className="font-serif text-[2.85rem] leading-[1.02] md:text-[5rem]">Diamond Traders, Importers & Exporters</motion.h1>
            <motion.p variants={heroItem} className="mt-6 max-w-[34rem] text-[1.12rem] leading-[1.78] text-[#e9edf5] md:mt-7 md:text-[1.22rem] md:font-medium">
              Trusted sourcing from Bharat Diamond Bourse with 25+ years of precision, transparency, and global export focus.
            </motion.p>
            <motion.div variants={heroItem} className="mt-10">
              <a href="#diamonds" className="lux-hover-lift lux-interactive inline-flex rounded-sm border border-white/45 bg-white/10 px-6 py-3 text-[15px] font-medium tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-700 hover:border-white/70 hover:bg-white/95 hover:text-[#111827] hover:shadow-[0_14px_30px_rgba(0,0,0,0.24)]">EXPLORE DIAMONDS</a>
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
            <motion.p className="text-[13px] tracking-[0.2em] text-[#3f4b5d] md:text-[13px] md:tracking-[0.22em]" variants={staggerItem}>ABOUT D.P. JEWELS</motion.p>
            <motion.h2 className="mt-4 max-w-[14ch] font-serif text-[2.65rem] leading-[1.04] md:text-[3.7rem]" variants={staggerItem}>Built on Trust, Since 1999</motion.h2>
            <motion.p className="mt-5 max-w-[62ch] text-[1.08rem] leading-[1.84] text-[#2c3a4c] md:mt-6 md:text-[1.08rem] md:leading-[1.9] md:font-medium" variants={staggerItem}>
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
                <p className="font-serif text-[2.65rem] leading-[1] text-[#0f1726] md:text-[3.45rem]">{metric.value}</p>
                <p className="mt-3 text-[13px] font-medium tracking-[0.14em] text-[#3f4b5d]">{metric.label}</p>
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
          <p className="text-[13px] tracking-[0.2em] text-[#c3ccda] md:text-[13px] md:tracking-[0.22em]">DIAMONDS</p>
          <h2 className="mt-5 font-serif text-[2.7rem] text-[#f7f2e8] md:text-[4.05rem]">Diamond Shapes & Selections</h2>
          <p className="mt-5 max-w-2xl text-[1.06rem] leading-[1.82] tracking-[0.02em] text-[#d4dbe6] md:text-[1.14rem] md:font-medium">
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
            <p className="text-[13px] tracking-[0.12em] text-[#b7c4d8]">Swipe to view all diamond shapes</p>
            <div className="mt-2">
                <h3 className="text-center font-serif text-[2.2rem] tracking-[0.08em] text-[#f6f1e8] md:text-[2.52rem]">{activeDiamond}</h3>
              <div className="mt-3 flex justify-center">
                <a
                  href={WHATSAPP_LINK}
                  className="lux-hover-lift lux-interactive rounded-full border border-[#cfd8e4]/65 px-5 py-1.5 text-[13px] font-medium tracking-[0.12em] text-[#f3eee5] transition-all duration-500 hover:bg-[#f3eee5] hover:text-[#111827]"
                >
                  ENQUIRE
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section ref={presenceRef} className="relative -mt-3 h-[270vh] bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_46%,#f6f1e8_100%)] md:h-[305vh]">
        <div className="sticky top-0 flex min-h-screen min-h-[100svh] items-center overflow-visible py-0">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_48%,rgba(197,164,109,0.12)_0%,rgba(197,164,109,0.045)_32%,rgba(250,247,242,0)_68%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(70,58,42,0.38)_0.45px,transparent_0.45px)] [background-size:4px_4px]" />
          <div className="pointer-events-none absolute right-0 top-[18%] hidden h-px w-[14%] bg-[linear-gradient(270deg,rgba(197,164,109,0.38),transparent)] md:block" />

          <div className="relative mx-auto grid w-full max-w-[1680px] items-center gap-3 px-3 md:gap-6 md:px-5 lg:grid-cols-[minmax(0,0.74fr)_minmax(320px,0.26fr)] lg:gap-6">
            <motion.div className="relative order-2 mx-auto h-[min(82svh,820px)] w-full max-w-[100vw] md:h-[min(96vh,1260px)] md:max-w-[1480px] lg:order-1 lg:h-[min(98vh,1320px)] lg:max-w-none" style={{ opacity: exportMapOpacity }}>
              <img src={indiaExportStory} alt="" aria-hidden className="sr-only" loading="lazy" decoding="async" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,251,243,0.82)_0%,rgba(255,251,243,0.26)_50%,rgba(255,251,243,0)_80%)]" />
              <div className="pointer-events-none absolute inset-[4%] bg-[radial-gradient(circle_at_52%_52%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.12)_56%,rgba(255,255,255,0)_100%)]" />
              <motion.svg viewBox="-250 -10 1280 1055" preserveAspectRatio="xMidYMid meet" className="absolute left-1/2 top-1/2 h-[114%] w-[114%] -translate-x-1/2 -translate-y-1/2 md:left-0 md:top-0 md:h-full md:w-full md:translate-x-0 md:translate-y-0" role="img" aria-label="DP Jewels export network from Mumbai, India">
                <defs>
                  <filter id="exportHubGlow" x="-220%" y="-220%" width="540%" height="540%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feFlood floodColor="#C5A46D" floodOpacity="0.36" />
                    <feComposite in2="blur" operator="in" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <motion.g style={{ x: isMobileView ? 12 : exportCameraX, y: exportCameraY, scale: exportCameraScale, transformOrigin: `${exportNodes.mumbai.x}px ${exportNodes.mumbai.y}px` }}>
                  <image href={indiaMapClean} x="0" y="0" width="1000" height="1000" opacity={isMobileView ? 1 : 0.94} preserveAspectRatio="xMidYMid meet" />
                  {indiaOutlinePath ? (
                    <motion.path
                      d={indiaOutlinePath}
                      fill="none"
                      stroke="#C5A46D"
                      strokeWidth={isMobileView ? 1.6 : 2.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      opacity={isMobileView ? 0.9 : 0.98}
                      initial={{ opacity: 0, pathLength: isMobileView ? 1 : 0.24 }}
                      animate={{ opacity: isMobileView ? 0.82 : 0.96, pathLength: 1 }}
                      transition={{ duration: isMobileView ? 0.5 : 1.35, ease: "easeInOut" }}
                    />
                  ) : null}

                  <motion.g style={{ opacity: exportHubOpacity }}>
                    <motion.circle cx={exportNodes.mumbai.x} cy={exportNodes.mumbai.y} r={isMobileView ? 26 : 24} fill="#C5A46D" opacity="0.18" filter={isMobileView ? undefined : "url(#exportHubGlow)"} animate={isMobileView ? { scale: [1, 1.1, 1], opacity: [0.16, 0.22, 0.16] } : { scale: [1, 1.2, 1], opacity: [0.16, 0.26, 0.16] }} transition={{ duration: isMobileView ? 3.8 : 5.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
                    {!isMobileView && <motion.circle cx={exportNodes.mumbai.x} cy={exportNodes.mumbai.y} r={18.5} fill="none" stroke="#C5A46D" strokeWidth={2.2} opacity="0.64" animate={{ scale: [1, 1.45], opacity: [0.54, 0.1] }} transition={{ duration: 4.9, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }} />}
                    <circle cx={exportNodes.mumbai.x} cy={exportNodes.mumbai.y} r={isMobileView ? 9.8 : 8.6} fill="#c4a166" filter={isMobileView ? undefined : "url(#exportHubGlow)"} />
                    <text x={exportNodes.mumbai.labelX} y={exportNodes.mumbai.labelY} textAnchor="start" fontSize={isMobileView ? 22 : 27} fontWeight={560} letterSpacing="0.035em" fill="#665a49">
                      Mumbai
                    </text>
                  </motion.g>

                  <motion.g style={{ opacity: exportInternalNetworkOpacity }}>
                    {exportInternalRoutes.map((route) => (
                      <motion.path
                        key={route.key}
                        d={route.path}
                        pathLength="1"
                        fill="none"
                        stroke="rgba(197,164,109,0.76)"
                        strokeWidth={isMobileView ? 1.1 : 1.62}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ pathLength: isMobileView ? 1 : exportInternalLineProgress, opacity: exportInternalNetworkOpacity }}
                      />
                    ))}
                  </motion.g>

                  <g>
                    {exportInternalNodes.map((node, index) => (
                      <motion.g
                        key={node.key}
                        initial={{ opacity: 0, scale: 0.84 }}
                        animate={{ opacity: activeExportScene >= 1 ? 0.82 : 0, scale: activeExportScene >= 1 ? 1 : 0.84 }}
                        transition={{ duration: 0.9, delay: 0.08 + index * 0.09, ease: "easeInOut" }}
                        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                      >
                        <circle cx={node.x} cy={node.y} r={isMobileView ? 4.2 : 4.8} fill="#C5A46D" opacity="0.88" />
                        <circle cx={node.x} cy={node.y} r={isMobileView ? 6.2 : 7.4} fill="none" stroke="rgba(197,164,109,0.24)" strokeWidth={isMobileView ? 0.58 : 0.72} />
                      </motion.g>
                    ))}
                  </g>

                  {exportRoutes.map((route) => {
                    const motionValues = routeMotion[route.key];
                    const isVisible = activeExportScene >= route.scene;
                    const isActive = activeExportScene === route.scene;

                    return (
                      <g key={route.key}>
                        <motion.path
                          d={route.path}
                          pathLength="1"
                          fill="none"
                          stroke="#C5A46D"
                          strokeWidth={route.type === "primary" ? (isMobileView ? 1.75 : 2.85) : (isMobileView ? 1.45 : 2.2)}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          style={{ pathLength: isMobileView ? 1 : motionValues.progress, opacity: isMobileView ? (isVisible ? (route.type === "primary" ? 0.92 : 0.78) : 0) : motionValues.opacity }}
                        />
                        {!isMobileView && isVisible && (
                          <motion.path
                            d={route.path}
                            fill="none"
                            stroke="rgba(234,212,157,0.42)"
                            strokeWidth={route.type === "primary" ? 1.9 : 1.45}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: route.type === "primary" ? 0.62 : 0.42 }}
                            transition={{ duration: 0.95, ease: CINEMATIC_EASE }}
                          />
                        )}
                        <motion.circle cx={route.node.x} cy={route.node.y} r={isMobileView ? 5.8 : 5.8} fill="#C5A46D" initial={false} animate={{ opacity: isVisible ? (route.type === "primary" ? 0.92 : 0.74) : 0, scale: isVisible ? 1 : 0.84 }} transition={{ duration: 0.8, ease: CINEMATIC_EASE }} />
                        <motion.text x={route.node.labelX} y={route.node.labelY} textAnchor={route.node.anchor} fontSize={isMobileView ? 26 : 24} fontWeight={isMobileView ? 580 : 500} letterSpacing="0.028em" fill={isMobileView ? "#5c5244" : "#6a5d4a"} paintOrder="stroke" stroke={isMobileView ? "rgba(255,251,243,0.56)" : "rgba(255,251,243,0.38)"} strokeWidth={isMobileView ? 0.9 : 0.7} initial={false} animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 8 }} transition={{ duration: 0.92, ease: "easeInOut" }}>
                          {route.node.label}
                        </motion.text>
                      </g>
                    );
                  })}
                </motion.g>
              </motion.svg>
            </motion.div>

            <div className="order-1 mx-auto w-full max-w-[460px] lg:order-2 lg:ml-0">
              <p className="text-[13px] tracking-[0.16em] text-[#4f5967] md:text-[13px]">EXPORT NETWORK</p>
              <div className="mt-5 h-px w-16 bg-[#C5A46D]/55" />
              <AnimatePresence mode="wait">
                <motion.div key={activeExportScene} initial={{ opacity: 0, y: 18, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, filter: "blur(4px)" }} transition={{ duration: 0.82, ease: "easeInOut" }}>
                  <h2 className="mt-6 font-serif text-[2.35rem] leading-[1.02] text-[#0f1726] md:mt-7 md:text-[3.8rem]">{activeScene.title}</h2>
                  <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-[#3e4958] md:mt-5 md:text-[1.06rem] md:font-medium">{activeScene.body}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex items-center gap-3">
                {exportStoryScenes.map((_, index) => (
                  <span key={`export-scene-${index}`} className={`h-px transition-all duration-700 ${index <= activeExportScene ? "w-8 bg-[#C5A46D]/75" : "w-4 bg-[#cbd5e1]"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <p className="text-[13px] tracking-[0.14em] text-[#9a7a36] [text-shadow:0_1px_2px_rgba(248,244,236,0.4)]">TRUST & LOCATION</p>
                <h2 className="mt-4 max-w-[14ch] font-serif text-[2rem] leading-[1.06] text-[#111827] [text-shadow:0_2px_12px_rgba(248,244,236,0.45)] md:text-5xl">Based at Bharat Diamond Bourse</h2>
                <p className="mt-6 max-w-[58ch] text-[1.06rem] leading-[1.8] text-[#27364a] md:text-[1.14rem] [text-shadow:0_1px_8px_rgba(248,244,236,0.38)] md:font-medium">
                  Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India&apos;s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
                </p>
                <p className="mt-8 border-l border-[#a9b6ca] pl-5 text-[1.06rem] leading-[1.8] text-[#162334] md:text-[1.14rem] [text-shadow:0_1px_8px_rgba(248,244,236,0.35)] md:mt-10 md:font-medium">
                  EC-4080 B, Bharat Diamond Bourse,<br />
                  Bandra Kurla Complex,<br />
                  Bandra(E), Mumbai-51
                </p>
              </motion.article>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-2 pt-3 md:hidden">
            <article className="w-full max-w-[620px] py-3">
              <p className="text-[13px] tracking-[0.14em] text-[#9a7a36]">TRUST & LOCATION</p>
              <h2 className="mt-4 max-w-[14ch] font-serif text-[2rem] leading-[1.06] text-[#111827]">Based at Bharat Diamond Bourse</h2>
              <p className="mt-6 max-w-[58ch] text-[1.06rem] leading-[1.8] text-[#27364a] md:text-[1.12rem]">
                Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India&apos;s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
              </p>
              <p className="mt-8 border-l border-[#a9b6ca] pl-5 text-[1.06rem] leading-[1.8] text-[#162334] md:text-[1.12rem]">
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
          <div className="ml-auto w-full max-w-[70ch] text-right md:w-[64%] md:mr-[6%]">
          <p className="text-[13px] tracking-[0.18em] text-[#4f473d] md:font-medium">INSTITUTIONAL CREDIBILITY</p>
          <p className="mt-4 ml-auto max-w-[58ch] font-serif text-[2.45rem] leading-[1.06] text-[#342f29] md:text-[3.65rem]">
            Recognized Across International Diamond Markets.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
            <span className="text-[13px] tracking-[0.1em] text-[#7e6941] md:font-medium">GLOBAL INSTITUTIONAL ALIGNMENT</span>
          </div>
          </div>

          <div className="relative mt-8 md:mt-10">
            <div className="mx-auto grid max-w-[1280px] gap-y-7 border-y border-[#d9cdb6]/74 py-7 md:grid-cols-4 md:gap-x-8 md:gap-y-7 md:py-9">
              {certifications.map((item, idx) => (
              <motion.button
                key={item.code}
                type="button"
                className="group lux-interactive relative block px-1 py-1 text-center transition-all duration-[600ms]"
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
                    className="mx-auto h-[5.8rem] w-auto opacity-[0.99] grayscale transition-all duration-[560ms] group-hover:scale-[1.03] group-hover:opacity-100 group-hover:drop-shadow-[0_0_18px_rgba(185,154,98,0.36)] md:h-[7.1rem]"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="mt-3 text-[14px] tracking-[0.13em] text-[#5b5348] transition-colors duration-[560ms] group-hover:text-[#7c6a4b] md:text-[15px] md:font-medium">{item.code}</p>
                  <AnimatePresence>
                    {activeCertificationIndex === idx && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.48, ease: SOFT_EASE }}
                        className="pointer-events-none absolute left-1/2 top-[calc(100%+0.25rem)] z-10 hidden w-max max-w-[15rem] -translate-x-1/2 text-center text-[12px] leading-[1.4] tracking-[0.02em] text-[#776a59] md:block"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
            </div>
            <div className="mt-2 min-h-[2.1rem] md:hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={certifications[activeCertificationIndex].code}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.42, ease: SOFT_EASE }}
                  className="text-center text-[13px] leading-[1.4] tracking-[0.02em] text-[#746957]"
                >
                  {certifications[activeCertificationIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-5 ml-auto w-full max-w-[52ch] text-right text-[13px] tracking-[0.12em] text-[#655d52] md:font-medium">VERIFIED BY LEADING GLOBAL GEM & TRADE INSTITUTIONS</p>
          </div>
        </div>
      </motion.section>

      <motion.section ref={whyRef} className="relative -mt-1 overflow-hidden bg-[linear-gradient(180deg,#f8f4ec_0%,#f5f1e8_52%,#f1ebe0_100%)] text-[#2f2a24] md:h-[200vh]">
        <div className="mx-auto w-full max-w-[1380px] px-5 py-16 md:hidden">
          <p className="text-center text-[13px] tracking-[0.16em] text-[#6f624f]">WHY CHOOSE D.P. JEWELS</p>
          <div className="mt-8 space-y-8">
            {whyChoosePoints.map((point, idx) => (
              <motion.article
                key={`why-mobile-${point.num}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.88, ease: CINEMATIC_EASE, delay: idx * 0.03 }}
                className="text-center"
              >
                <p className="mb-2 text-[13px] tracking-[0.14em] text-[#8d7a57]">{point.num}</p>
                <h3 className="font-serif text-[2.16rem] leading-[1.04] text-[#2e2822]">{point.title}</h3>
                <p className="mx-auto mt-3 max-w-[34ch] text-[1rem] leading-[1.72] text-[#564c40] md:font-medium">{point.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div ref={whyPinRef} className="relative hidden h-screen min-h-[100svh] md:block">
          <p className="pointer-events-none absolute left-1/2 top-[13%] z-[2] -translate-x-1/2 text-[13px] tracking-[0.16em] text-[#6f624f]">WHY CHOOSE D.P. JEWELS</p>
          <div className="absolute left-1/2 top-1/2 z-[1] h-[22rem] w-full max-w-[58rem] -translate-x-1/2 -translate-y-1/2 px-8">
            {whyChoosePoints.map((point, idx) => (
              <article
                key={`why-desktop-${point.num}`}
                ref={(node) => { whyProofRefs.current[idx] = node; }}
                className="absolute inset-0 flex items-center justify-center text-center"
              >
                <div className="w-full">
                  <p className="mb-4 text-[13px] tracking-[0.16em] text-[#8f7c5b]">{point.num}</p>
                  <h2 className="font-serif text-[4.6rem] leading-[1.02] text-[#29241f]">{point.title}</h2>
                  <p className="mx-auto mt-6 max-w-[42rem] text-[1.18rem] leading-[1.9] text-[#554b3f] md:font-medium">{point.desc}</p>
                </div>
              </article>
            ))}
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
            <h3 className="font-serif text-[2.2rem] text-[#121721] md:text-[2.9rem]">Contact Us</h3>
            <p className="mt-6 max-w-[54ch] text-[1.03rem] leading-[1.95] text-[#253244] md:text-[1.08rem] md:font-medium">
              EC-4080 B, Bharat Diamond Bourse,<br />
              Bandra Kurla Complex,<br />
              Bandra(E), Mumbai-51
            </p>
            <div className="mt-8 grid gap-2 text-[1.03rem] text-[#253244] md:text-[1.08rem] md:font-medium sm:grid-cols-2">
              <p>Tel: 022 3596 3936</p>
              <p>QBC: 022 3392 3961</p>
              <p className="break-words sm:col-span-2">Email: ppsonecha@gmail.com</p>
            </div>
          </motion.article>
          <motion.article className="relative border-l border-[#cfd8e4] pl-7 md:pl-10" variants={staggerItem}>
            <div className="relative flex flex-col gap-3 md:pt-1">
              <a href="tel:02235963936" className="lux-hover-lift lux-interactive inline-flex items-center justify-center gap-2 border border-[#cfd8e4] px-4 py-3 text-[15px] font-medium text-[#111827] transition-all duration-500 hover:shadow-[0_10px_20px_rgba(15,23,42,0.08)]"><Phone size={16} /> Call Office</a>
              <a href={WHATSAPP_LINK} className="lux-hover-lift lux-interactive inline-flex items-center justify-center gap-2 border border-[#111827] bg-[#111827] px-4 py-3 text-[15px] font-medium text-white transition-all duration-500 hover:bg-[#0f172a] hover:shadow-[0_12px_22px_rgba(15,23,42,0.16)]"><MessageCircle size={16} /> WhatsApp Enquiry</a>
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

