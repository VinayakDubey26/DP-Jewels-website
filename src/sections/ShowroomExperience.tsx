import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage from "../assets/bg.jpg";
import diamondRound from "../assets/diamonds/diamond_round.webp";
import diamondOval from "../assets/diamonds/diamond_oval.webp";
import diamondPear from "../assets/diamonds/diamond_pear.webp";
import diamondAsscher from "../assets/diamonds/diamond_asscher.webp";
import diamondEmerald from "../assets/diamonds/diamond_emerald.webp";
import diamondCushion from "../assets/diamonds/diamond_cushion.webp";
import diamondPrincess from "../assets/diamonds/diamond_princess.webp";
import diamondRadiant from "../assets/diamonds/diamond_radiant.webp";
import diamondMarquise from "../assets/diamonds/diamond_marquise.webp";
import diamondHeart from "../assets/diamonds/diamond_heart.webp";
import indiaMapClean from "../assets/india_map_clean_champagne.svg";
import indiaMapCleanRaw from "../assets/india_map_clean_champagne.svg?raw";
import indiaExportStory from "../assets/dpj_india_export_story.svg";
import bdbImage from "../assets/images/bdb.png";
import giaLogo from "../assets/certifications/gia.svg";
import igiLogo from "../assets/certifications/igi.svg";
import gjepcLogo from "../assets/certifications/gjepc.svg";
import gsiLogo from "../assets/certifications/gsi.svg";

const WHATSAPP_LINK = "https://wa.me/918356810826?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";
const EASE_PRIMARY: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SECONDARY: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const CINEMATIC_EASE = EASE_PRIMARY;
const SOFT_EASE = EASE_SECONDARY;
const sectionReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 1.02, ease: SOFT_EASE },
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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.06, ease: CINEMATIC_EASE } },
};

const diamondItems = [
  { name: "Round Brilliant", image: diamondRound, normalizeClass: "scale-[0.94]" },
  { name: "Oval", image: diamondOval, normalizeClass: "scale-[0.92]" },
  { name: "Pear", image: diamondPear, normalizeClass: "scale-[0.9]" },
  { name: "Asscher", image: diamondAsscher, normalizeClass: "scale-[0.93]" },
  { name: "Emerald", image: diamondEmerald, normalizeClass: "scale-[0.91]" },
  { name: "Cushion", image: diamondCushion, normalizeClass: "scale-[0.95]" },
  { name: "Princess", image: diamondPrincess, normalizeClass: "scale-[0.94]" },
  { name: "Radiant", image: diamondRadiant, normalizeClass: "scale-[0.93]" },
  { name: "Marquise", image: diamondMarquise, normalizeClass: "scale-[0.9]" },
  { name: "Heart", image: diamondHeart, normalizeClass: "scale-[0.92]" },
] as const;

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
    description: "Internationally recognized diamond grading standards",
  },
  {
    code: "IGI",
    logo: igiLogo,
    description: "Independent diamond and jewelry certification",
  },
  {
    code: "GJEPC",
    logo: gjepcLogo,
    description: "India's leading gem and jewellery trade body",
  },
  {
    code: "GSI",
    logo: gsiLogo,
    description: "Advanced gemological verification and grading",
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
    title: "Sourced To Your Exact Requirement",
    desc: "From size and shape to quality benchmarks, sourcing is aligned to your exact ask.",
  },
  {
    num: "03",
    title: "Relationships Before Transactions",
    desc: "Long-term trust guides every deal, every recommendation, and every follow-through.",
  },
  {
    num: "04",
    title: "Always Within Reach",
    desc: "Responsive support, steady communication, and dependable availability when timing matters.",
  },
  {
    num: "",
    title: "Built on Relationships.\nTrusted for Results.",
    desc: "",
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
    title: "All-India Distribution",
    body: "A connected domestic network supports sourcing reliability before each international handoff.",
  },
  {
    title: "Dubai",
    body: "A key regional corridor for refined diamond trade across the Middle East.",
  },
  {
    title: "USA",
    body: "Supporting international buyers with transparent communication and consistent execution.",
  },
  {
    title: "London",
    body: "Serving established jewellery markets with disciplined sourcing and export reliability.",
  },
  {
    title: "Hong Kong",
    body: "Reaching major Asian trading corridors through dependable export execution and market familiarity.",
  },
  {
    title: "Singapore",
    body: "Connecting to Southeast Asia through precise coordination and trusted buyer relationships.",
  },
  {
    title: "Canada",
    body: "Extending Indian diamond expertise into mature North American markets.",
  },
];

const indiaOutlinePath = indiaMapCleanRaw.match(/<path[^>]*d="([^"]+)"/)?.[1] ?? "";

const exportDesktopLayout = {
  nodes: {
    mumbai: { x: 280, y: 605, labelX: 320, labelY: 647, label: "Mumbai" },
    dubai: { x: 20, y: 525, labelX: 4, labelY: 517, label: "Dubai", anchor: "end" },
    london: { x: -122, y: 198, labelX: -138, labelY: 190, label: "London", anchor: "end" },
    singapore: { x: 792, y: 726, labelX: 806, labelY: 718, label: "Singapore", anchor: "start" },
    hongKong: { x: 888, y: 506, labelX: 904, labelY: 500, label: "Hong Kong", anchor: "start" },
    canada: { x: -188, y: 330, labelX: -172, labelY: 322, label: "Canada", anchor: "start" },
    usa: { x: -186, y: 760, labelX: -202, labelY: 752, label: "USA", anchor: "end" },
  },
  internalNodes: [
    { key: "northHub", x: 356, y: 360, tier: "major" },
    { key: "northEnd", x: 340, y: 180, tier: "border" },
    { key: "eastHub", x: 566, y: 500, tier: "major" },
    { key: "eastAssam", x: 764, y: 390, tier: "border" },
    { key: "southHub", x: 356, y: 736, tier: "major" },
    { key: "southBorder", x: 392, y: 850, tier: "border" },
  ],
  internalRoutes: [
    { key: "mumbai-north", path: "M280 605 C318 528 340 448 356 360" },
    { key: "north-end", path: "M356 360 C351 311 346 253 340 180" },
    { key: "mumbai-east", path: "M280 605 C386 584 480 548 566 500" },
    { key: "east-assam", path: "M566 500 C640 456 700 422 764 390" },
    { key: "mumbai-south", path: "M280 605 C322 656 344 696 356 736" },
    { key: "south-border", path: "M356 736 C370 776 382 814 392 850" },
  ],
  routes: [
    { key: "dubai", scene: 3, type: "primary", path: "M280 605 C208 588 116 552 20 525" },
    { key: "usa", scene: 4, type: "secondary", path: "M280 605 C96 672 -52 736 -186 760" },
    { key: "london", scene: 5, type: "secondary", path: "M280 605 C188 476 42 286 -122 198" },
    { key: "hongKong", scene: 6, type: "primary", path: "M280 605 C458 588 676 562 888 506" },
    { key: "singapore", scene: 7, type: "primary", path: "M280 605 C444 620 634 666 792 726" },
    { key: "canada", scene: 8, type: "secondary", path: "M280 605 C104 462 -56 372 -188 330" },
  ],
} as const;

const exportMobileLayout = {
  nodes: {
    mumbai: { x: 282, y: 632, labelX: 324, labelY: 686, label: "Mumbai" },
    dubai: { x: 28, y: 594, labelX: 8, labelY: 586, label: "Dubai", anchor: "start" },
    london: { x: -20, y: 204, labelX: 8, labelY: 196, label: "London", anchor: "start" },
    singapore: { x: 752, y: 760, labelX: 770, labelY: 786, label: "Singapore", anchor: "start" },
    hongKong: { x: 882, y: 594, labelX: 868, labelY: 582, label: "Hong Kong", anchor: "end" },
    canada: { x: -12, y: 388, labelX: 8, labelY: 380, label: "Canada", anchor: "start" },
    usa: { x: -10, y: 830, labelX: 8, labelY: 822, label: "USA", anchor: "start" },
  },
  internalNodes: [
    { key: "northHub", x: 370, y: 352, tier: "major" },
    { key: "northEnd", x: 340, y: 180, tier: "border" },
    { key: "eastHub", x: 566, y: 500, tier: "major" },
    { key: "eastAssam", x: 764, y: 390, tier: "border" },
    { key: "southHub", x: 356, y: 736, tier: "major" },
    { key: "southBorder", x: 392, y: 850, tier: "border" },
  ],
  internalRoutes: [
    { key: "mumbai-north", path: "M282 632 C326 554 350 446 370 352" },
    { key: "north-end", path: "M370 352 C362 304 352 248 340 180" },
    { key: "mumbai-east", path: "M282 632 C388 608 482 558 566 500" },
    { key: "east-assam", path: "M566 500 C640 456 700 422 764 390" },
    { key: "mumbai-south", path: "M282 632 C322 678 344 706 356 736" },
    { key: "south-border", path: "M356 736 C370 776 382 814 392 850" },
  ],
  routes: [
    { key: "dubai", scene: 3, type: "primary", path: "M282 632 C226 630 146 614 28 594" },
    { key: "usa", scene: 4, type: "secondary", path: "M282 632 C168 756 94 812 -10 830" },
    { key: "london", scene: 5, type: "secondary", path: "M282 632 C206 504 122 318 -20 204" },
    { key: "hongKong", scene: 6, type: "primary", path: "M282 632 C450 646 634 644 882 594" },
    { key: "singapore", scene: 7, type: "primary", path: "M282 632 C406 684 558 742 752 760" },
    { key: "canada", scene: 8, type: "secondary", path: "M282 632 C154 526 84 434 -12 388" },
  ],
} as const;

const heroGlitters = [
  { left: "12%", top: "22%", size: 2, duration: 8.2, delay: 0.2, driftX: 6, driftY: -10, maxOpacity: 0.26 },
  { left: "19%", top: "36%", size: 1.5, duration: 9.1, delay: 1.1, driftX: -5, driftY: -8, maxOpacity: 0.2 },
  { left: "28%", top: "18%", size: 1.5, duration: 10.4, delay: 0.6, driftX: 4, driftY: -7, maxOpacity: 0.18 },
  { left: "34%", top: "30%", size: 2, duration: 9.8, delay: 1.8, driftX: -6, driftY: -9, maxOpacity: 0.24 },
  { left: "44%", top: "16%", size: 1.5, duration: 11.1, delay: 0.4, driftX: 5, driftY: -8, maxOpacity: 0.18 },
  { left: "52%", top: "28%", size: 2, duration: 8.7, delay: 2.1, driftX: -4, driftY: -10, maxOpacity: 0.22 },
  { left: "62%", top: "20%", size: 1.5, duration: 10.8, delay: 1.5, driftX: 6, driftY: -7, maxOpacity: 0.16 },
  { left: "72%", top: "34%", size: 2, duration: 9.4, delay: 0.9, driftX: -5, driftY: -9, maxOpacity: 0.2 },
  { left: "81%", top: "24%", size: 1.5, duration: 11.6, delay: 2.4, driftX: 4, driftY: -8, maxOpacity: 0.16 },
  { left: "88%", top: "38%", size: 2, duration: 8.9, delay: 1.2, driftX: -4, driftY: -10, maxOpacity: 0.22 },
] as const;

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function ShowroomExperience() {
  const [activeDiamondIndex, setActiveDiamondIndex] = useState(0);
  const [activeExportScene, setActiveExportScene] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [dotsCanRun, setDotsCanRun] = useState(false);
  const exportSceneRef = useRef(0);
  const externalDotAnimRefs = useRef<Array<SVGAnimationElement | null>>([]);
  const internalDotAnimRefs = useRef<Array<SVGAnimationElement | null>>([]);
  const dotStartTimersRef = useRef<number[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const diamondsRef = useRef<HTMLElement>(null);
  const presenceRef = useRef<HTMLElement>(null);
  const bdbRef = useRef<HTMLElement>(null);
  const certRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const whyPinRef = useRef<HTMLDivElement>(null);
  const whyProofRefs = useRef<Array<HTMLElement | null>>([]);
  const whyMobilePinRef = useRef<HTMLDivElement>(null);
  const whyMobileProofRefs = useRef<Array<HTMLElement | null>>([]);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.06]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const { scrollYProgress: diamondsProgress } = useScroll({ target: diamondsRef, offset: ["start end", "end start"] });
  const { scrollYProgress: presenceProgress } = useScroll({ target: presenceRef, offset: ["start start", "end end"] });
  const { scrollYProgress: bdbProgress } = useScroll({ target: bdbRef, offset: ["start end", "end start"] });
  const { scrollYProgress: certProgress } = useScroll({ target: certRef, offset: ["start end", "end start"] });
  const aboutDrift = useTransform(aboutProgress, [0, 1], [0, -10]);
  const diamondsDrift = useTransform(diamondsProgress, [0, 1], [12, -12]);
  const bdbDrift = useTransform(bdbProgress, [0, 1], [9, -9]);
  const certDrift = useTransform(certProgress, [0, 1], [8, -8]);
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
  const externalDotTravelDuration = isMobileView ? 14 : 12;
  const externalDotPauseDuration = 1.4;
  const externalDotCycleDuration = externalDotTravelDuration + externalDotPauseDuration;
  const externalDotTravelRatio = externalDotTravelDuration / externalDotCycleDuration;
  const exportMapOpacity = useTransform(presenceProgress, isMobileView ? [0, 0.04, 0.95, 1] : [0, 0.01, 0.95, 1], isMobileView ? [0, 1, 1, 0.96] : [1, 1, 1, 0.96]);
  const exportHubOpacity = useTransform(presenceProgress, [0.06, 0.12], [0, 1]);
  const exportInternalNetworkOpacity = useTransform(presenceProgress, isMobileView ? [0.58, 0.68] : [0.14, 0.22], [0, 1]);
  const exportInternalLineProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.58, 0.68] : [0.14, 0.22], [0, 1]), { stiffness: 50, damping: 23, mass: 0.58 });
  const exportInternalNetworkSafeOpacity = useTransform(exportInternalNetworkOpacity, [0, 1], [0.34, 1]);
  const exportInternalLineSafeProgress = useTransform(exportInternalLineProgress, [0, 1], [0.34, 1]);
  const exportCameraXRaw = useTransform(presenceProgress, [0, 0.24, 0.46, 0.68, 1], [0, -2, 2.5, -2.25, 0]);
  const exportCameraYRaw = useTransform(presenceProgress, [0, 0.24, 0.46, 0.68, 1], [0, -1.5, 1.2, -0.8, 0]);
  const exportCameraScaleRaw = useTransform(presenceProgress, [0, 0.24, 0.52, 0.78, 1], isMobileView ? [1, 1.006, 1.008, 1.01, 1.008] : [0.94, 0.99, 1.04, 1.08, 1.05]);
  const exportCameraX = useSpring(exportCameraXRaw, { stiffness: 42, damping: 30, mass: 0.82 });
  const exportCameraY = useSpring(exportCameraYRaw, { stiffness: 42, damping: 30, mass: 0.82 });
  const exportCameraScale = useSpring(exportCameraScaleRaw, { stiffness: 40, damping: 32, mass: 0.86 });
  const routeDubaiProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.2, 0.29] : [0.24, 0.32], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeUsaProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.5, 0.59] : [0.34, 0.42], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeLondonProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.26, 0.35] : [0.44, 0.52], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeHongKongProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.38, 0.47] : [0.54, 0.62], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeSingaporeProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.32, 0.41] : [0.64, 0.72], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeCanadaProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.44, 0.53] : [0.74, 0.82], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeDubaiOpacity = useTransform(presenceProgress, isMobileView ? [0.19, 0.24] : [0.23, 0.28], [0, 0.9]);
  const routeUsaOpacity = useTransform(presenceProgress, isMobileView ? [0.49, 0.54] : [0.33, 0.38], [0, 0.8]);
  const routeLondonOpacity = useTransform(presenceProgress, isMobileView ? [0.25, 0.3] : [0.43, 0.48], [0, 0.82]);
  const routeHongKongOpacity = useTransform(presenceProgress, isMobileView ? [0.37, 0.42] : [0.53, 0.58], [0, 0.9]);
  const routeSingaporeOpacity = useTransform(presenceProgress, isMobileView ? [0.31, 0.36] : [0.63, 0.68], [0, 0.9]);
  const routeCanadaOpacity = useTransform(presenceProgress, isMobileView ? [0.43, 0.48] : [0.73, 0.78], [0, 0.8]);
  const routeMotion = {
    dubai: { progress: routeDubaiProgress, opacity: routeDubaiOpacity },
    london: { progress: routeLondonProgress, opacity: routeLondonOpacity },
    singapore: { progress: routeSingaporeProgress, opacity: routeSingaporeOpacity },
    hongKong: { progress: routeHongKongProgress, opacity: routeHongKongOpacity },
    canada: { progress: routeCanadaProgress, opacity: routeCanadaOpacity },
    usa: { progress: routeUsaProgress, opacity: routeUsaOpacity },
  };
  const effectiveExportScene = isMobileView ? exportStoryScenes.length - 1 : activeExportScene;
  const activeScene = exportStoryScenes[effectiveExportScene];
  const mobilePresenceScene = {
    title: "Global Presence",
    body: "Connecting India's diamond industry to global markets.",
  };

  useMotionValueEvent(presenceProgress, "change", (latest) => {
    if (isMobileView) return;
    const nextScene = Math.max(0, Math.min(8, Math.floor(latest * 10)));
    if (nextScene === exportSceneRef.current) return;
    exportSceneRef.current = nextScene;
    setActiveExportScene(nextScene);
  });
  useMotionValueEvent(presenceProgress, "change", (latest) => {
    const threshold = isMobileView ? 0.9 : 0.86;
    const sequenceReady = exportSceneRef.current >= 8;
    const shouldRun = latest >= threshold && sequenceReady;
    setDotsCanRun((prev) => (prev === shouldRun ? prev : shouldRun));
  });
  useEffect(() => {
    if (isMobileView) {
      setActiveExportScene(exportStoryScenes.length - 1);
      exportSceneRef.current = exportStoryScenes.length - 1;
    }
  }, [isMobileView]);
  useEffect(() => {
    dotStartTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    dotStartTimersRef.current = [];
    if (!dotsCanRun) return;

    internalDotAnimRefs.current.forEach((anim) => {
      if (!anim) return;
      const timerId = window.setTimeout(() => {
        try {
          anim.beginElement();
        } catch {
          // no-op
        }
      }, 420);
      dotStartTimersRef.current.push(timerId);
    });

    externalDotAnimRefs.current.forEach((anim) => {
      if (!anim) return;
      const timerId = window.setTimeout(() => {
        try {
          anim.beginElement();
        } catch {
          // no-op
        }
      }, 420);
      dotStartTimersRef.current.push(timerId);
    });

    return () => {
      dotStartTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      dotStartTimersRef.current = [];
    };
  }, [dotsCanRun, isMobileView]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobileView(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!whyRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const pinTarget = isMobileView ? whyMobilePinRef.current : whyPinRef.current;
      const proofPool = isMobileView ? whyMobileProofRefs.current : whyProofRefs.current;
      if (!pinTarget) return;
      const proofLayers = proofPool.filter((node): node is HTMLElement => Boolean(node));
      if (!proofLayers.length) return;

      gsap.set(proofLayers, {
        opacity: 0,
        scale: 1.02,
        transformOrigin: "50% 50%",
        willChange: "transform,opacity",
        pointerEvents: "none",
      });
      gsap.set(proofLayers[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: isMobileView ? pinTarget : whyRef.current,
          start: "top top",
          end: isMobileView ? "+=760" : "+=560",
          scrub: isMobileView ? 0.35 : 0.8,
          pin: pinTarget,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const holdDuration = isMobileView ? 0.52 : 0.8;
      const swapDuration = isMobileView ? 0.22 : 0.35;
      const finalHoldDuration = isMobileView ? 0.9 : 0.8;

      tl.to(proofLayers[0], { opacity: 1, scale: 1, duration: holdDuration })
        .to(proofLayers[0], { opacity: 0, scale: 0.98, duration: swapDuration })
        .to(proofLayers[1], { opacity: 1, scale: 1, duration: swapDuration }, "<")
        .to(proofLayers[1], { opacity: 1, scale: 1, duration: holdDuration })
        .to(proofLayers[1], { opacity: 0, scale: 0.98, duration: swapDuration })
        .to(proofLayers[2], { opacity: 1, scale: 1, duration: swapDuration }, "<")
        .to(proofLayers[2], { opacity: 1, scale: 1, duration: holdDuration })
        .to(proofLayers[2], { opacity: 0, scale: 0.98, duration: swapDuration })
        .to(proofLayers[3], { opacity: 1, scale: 1, duration: swapDuration }, "<")
        .to(proofLayers[3], { opacity: 1, scale: 1, duration: holdDuration })
        .to(proofLayers[3], { opacity: 0, scale: 0.98, duration: swapDuration })
        .to(proofLayers[4], { opacity: 1, scale: 1, duration: swapDuration }, "<")
        .to(proofLayers[4], { opacity: 1, scale: 1, duration: finalHoldDuration });

      ScrollTrigger.refresh();
    }, whyRef);

    const onLoadRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoadRefresh);

    return () => {
      ctx.revert();
      window.removeEventListener("load", onLoadRefresh);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === whyRef.current || trigger.vars.pin === whyPinRef.current || trigger.vars.pin === whyMobilePinRef.current) {
          trigger.kill();
        }
      });
    };
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
  const activeDiamond = diamondItems[activeDiamondIndex];
  const goPrevDiamond = () => setActiveDiamondIndex((prev) => (prev - 1 + diamondItems.length) % diamondItems.length);
  const goNextDiamond = () => setActiveDiamondIndex((prev) => (prev + 1) % diamondItems.length);

  return (
    <div className="atmospheric-shell text-[#111827]">
      <section
        ref={heroRef}
        id="home"
        data-theme="dark"
        className="relative flex h-[100svh] h-[100dvh] h-screen min-h-[100svh] min-h-[100vh] items-center overflow-hidden bg-[#040816]"
      >
        <motion.img src={bgImage} alt="Premium jewellery background" className="absolute inset-0 h-full w-full object-cover object-[58%_44%] saturate-[0.88] contrast-[1.08] brightness-[0.7] md:object-center" style={{ y: heroY, scale: heroScale }} loading="eager" fetchPriority="high" decoding="async" />
        <motion.div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,22,0.44)_0%,rgba(4,8,22,0.62)_38%,rgba(4,8,22,0.8)_100%)]" style={{ opacity: heroOverlayOpacity }} animate={{ opacity: [0.9, 1, 0.92] }} transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: EASE_SECONDARY }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(112,132,168,0.08)_0%,rgba(4,8,22,0)_46%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,0,0,0)_38%,rgba(0,0,0,0.26)_100%)]" />
        <div className="pointer-events-none absolute inset-0">
          {heroGlitters.map((glitter, idx) => (
            <motion.span
              key={`hero-glitter-${idx}`}
              className="absolute rounded-full bg-white"
              style={{
                left: glitter.left,
                top: glitter.top,
                width: glitter.size,
                height: glitter.size,
                opacity: 0,
              }}
              animate={{
                x: [0, glitter.driftX, 0],
                y: [0, glitter.driftY, 0],
                opacity: [0, glitter.maxOpacity, 0],
              }}
              transition={{
                duration: glitter.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: EASE_SECONDARY,
                delay: glitter.delay,
              }}
            />
          ))}
        </div>
        <div className="relative mx-auto flex h-[100svh] h-[100dvh] h-screen min-h-[100svh] min-h-[100vh] w-[min(1220px,94%)] items-center py-0">
          <motion.div variants={heroContentStagger} initial="hidden" animate="show" className="max-w-[700px] text-white">
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

      <motion.section ref={aboutRef} id="about" data-theme="light" style={{ y: isMobileView ? 0 : aboutDrift }} className="relative -mt-3 bg-[#FAF7F2] py-[4.1rem] md:-mt-4 md:py-[5.4rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(112,132,168,0.08)_0%,rgba(112,132,168,0)_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_88%,rgba(212,190,150,0.07)_0%,rgba(212,190,150,0)_32%)]" />
        <div className="pointer-events-none absolute left-0 top-[22%] hidden h-px w-[16%] bg-[linear-gradient(90deg,rgba(148,163,184,0.4),transparent)] md:block" />
        <motion.div className="mx-auto grid w-full max-w-[1440px] gap-11 px-5 md:px-8 md:pl-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:pl-24" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
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

      <motion.section ref={diamondsRef} id="diamonds" data-theme="dark" style={{ y: isMobileView ? 0 : diamondsDrift }} className="relative -mt-2 min-h-[88svh] overflow-hidden bg-[linear-gradient(180deg,#061024_0%,#040816_48%,#030611_100%)] py-[2.4rem] md:-mt-3 md:min-h-[90vh] md:py-[2.8rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(224,233,245,0.09)_0%,rgba(224,233,245,0)_44%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_28%,rgba(206,218,238,0.07)_0%,rgba(206,218,238,0)_30%)]" />
        <div className="pointer-events-none absolute inset-0 hidden opacity-[0.1] [background-image:radial-gradient(rgba(255,255,255,0.26)_0.35px,transparent_0.35px)] [background-size:3px_3px] md:block" />
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:pl-8">
          <p className="text-[13px] tracking-[0.2em] text-[#c3ccda] md:text-[13px] md:tracking-[0.22em]">DIAMONDS</p>
          <h2 className="mt-4 font-serif text-[2.6rem] text-[#f7f2e8] md:mt-3 md:text-[3.75rem]">Diamond Shapes & Selections</h2>
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-[1.75] tracking-[0.02em] text-[#d4dbe6] md:mt-3 md:text-[1.08rem] md:font-medium">
            Natural & Lab Grown Diamonds
            <br />
            Precision sourced from Bharat Diamond Bourse
          </p>

          <div className="relative mt-[2.1rem] hidden h-[410px] overflow-hidden md:block">
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
            {diamondItems.map((shape, idx) => {
              const offset = getCircularOffset(idx, activeDiamondIndex, diamondItems.length);
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              if (absOffset > 1) return null;
              const baseOpacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.42 : absOffset === 2 ? 0.14 : 0;
              const baseScale = absOffset === 0 ? 1.14 : absOffset === 1 ? 0.78 : 0.62;
              const baseY = absOffset === 0 ? -6 : absOffset === 1 ? 18 : 26;
              const shiftX = absOffset === 0 ? 0 : offset < 0 ? -248 : 248;
              return (
                <motion.article
                  key={shape.name}
                  className="group absolute left-1/2 top-1/2 flex w-[440px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
                  onClick={() => setActiveDiamondIndex(idx)}
                  animate={{
                    x: shiftX,
                    y: baseY,
                    scale: isActive ? 1.12 : baseScale,
                    opacity: baseOpacity,
                  }}
                  transition={{ duration: 1.34, ease: CINEMATIC_EASE }}
                >
                  <motion.div
                    className="relative mb-1 flex h-[280px] w-[280px] items-center justify-center lg:h-[340px] lg:w-[340px]"
                    animate={isActive ? { y: [0, -3, 0], rotateZ: [0, 0.7, 0] } : { y: 0, rotateZ: 0 }}
                    transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: EASE_SECONDARY }}
                  >
                    <motion.img
                      src={shape.image}
                      alt={`${shape.name} diamond`}
                      className={`relative h-full w-full object-contain object-center transition-all duration-[1100ms] ${isActive ? "scale-[1.12]" : "scale-[0.95]"} ${shape.normalizeClass}`}
                      animate={isActive ? { rotateY: [0, 1.2, 0], rotateX: [0, -0.8, 0] } : { rotateY: 0, rotateX: 0 }}
                      transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: EASE_SECONDARY }}
                      loading={isActive ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </motion.div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 flex min-h-[300px] items-center justify-center md:hidden">
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
            {diamondItems.map((shape, idx) => {
              const offset = getCircularOffset(idx, activeDiamondIndex, diamondItems.length);
              const isActive = offset === 0;
              if (!isActive) return null;
              return (
                <article
                  key={shape.name}
                  className="group relative mx-auto flex w-[86%] max-w-[372px] snap-center flex-col items-center justify-center"
                >
                  <div className="relative flex h-[220px] w-[220px] items-center justify-center md:h-[280px] md:w-[280px]">
                    <img
                      src={shape.image}
                      alt={`${shape.name} diamond`}
                      className={`h-full w-full object-contain object-center transition-all duration-700 scale-[1.08] ${shape.normalizeClass}`}
                      loading="eager"
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
              {diamondItems.map((shape, idx) => (
                <button
                  key={`${shape.name}-nav`}
                  type="button"
                  aria-label={`View ${shape.name}`}
                  onClick={() => setActiveDiamondIndex(idx)}
                  className={`h-[3px] transition-all duration-700 ${idx === activeDiamondIndex ? "w-6 bg-[#e6edf8]" : "w-3 bg-[#90a1ba]/36 hover:bg-[#b8c6dc]/72"}`}
                />
              ))}
            </div>
            <div className="mt-1">
                <h3 className="text-center font-serif text-[2.2rem] tracking-[0.08em] text-[#f6f1e8] md:text-[2.52rem]">{activeDiamond.name}</h3>
              <div className="mt-2 flex justify-center">
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

      <motion.section ref={presenceRef} data-theme="light" className="relative -mt-3 h-auto bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_46%,#f6f1e8_100%)] md:h-[305vh]" {...sectionReveal}>
        <div className="relative flex items-center overflow-visible py-0 md:sticky md:top-0 md:min-h-screen md:min-h-[100svh] md:py-0">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_48%,rgba(197,164,109,0.12)_0%,rgba(197,164,109,0.045)_32%,rgba(250,247,242,0)_68%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(70,58,42,0.38)_0.45px,transparent_0.45px)] [background-size:4px_4px]" />
          <div className="pointer-events-none absolute right-0 top-[18%] hidden h-px w-[14%] bg-[linear-gradient(270deg,rgba(197,164,109,0.38),transparent)] md:block" />

          <div className="relative mx-auto grid w-full max-w-[1680px] items-center gap-1 px-1 md:gap-6 md:px-5 lg:grid-cols-[minmax(0,0.74fr)_minmax(320px,0.26fr)] lg:gap-6">
            <motion.div className="relative order-2 mx-auto h-[min(86svh,900px)] w-[96vw] max-w-[96vw] overflow-hidden md:h-[min(96vh,1260px)] md:w-full md:max-w-[1480px] md:overflow-visible lg:order-1 lg:h-[min(98vh,1320px)] lg:max-w-none" style={{ opacity: isMobileView ? 1 : exportMapOpacity }}>
              <img src={indiaExportStory} alt="" aria-hidden className="sr-only" loading="lazy" decoding="async" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,251,243,0.82)_0%,rgba(255,251,243,0.26)_50%,rgba(255,251,243,0)_80%)]" />
              <div className="pointer-events-none absolute inset-[4%] bg-[radial-gradient(circle_at_52%_52%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.12)_56%,rgba(255,255,255,0)_100%)]" />
              <motion.svg viewBox="-250 -10 1280 1055" preserveAspectRatio="xMidYMid meet" className="absolute left-1/2 top-1/2 h-[132%] w-[132%] -translate-x-1/2 -translate-y-1/2 md:left-0 md:top-0 md:h-full md:w-full md:translate-x-0 md:translate-y-0" role="img" aria-label="DP Jewels export network from Mumbai, India">
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

                <motion.g
                  style={
                    isMobileView
                      ? { x: -34, y: -28, scale: 1, transformOrigin: `${exportNodes.mumbai.x}px ${exportNodes.mumbai.y}px` }
                      : { x: exportCameraX, y: exportCameraY, scale: exportCameraScale, transformOrigin: `${exportNodes.mumbai.x}px ${exportNodes.mumbai.y}px` }
                  }
                >
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
                      opacity={isMobileView ? 0.66 : 0.98}
                      initial={{ opacity: 0, pathLength: isMobileView ? 1 : 0.24 }}
                      animate={{ opacity: isMobileView ? 0.66 : 0.96, pathLength: 1 }}
                      transition={{ duration: isMobileView ? 0.5 : 1.35, ease: EASE_SECONDARY }}
                    />
                  ) : null}

                  <motion.g style={{ opacity: isMobileView ? 1 : exportHubOpacity }}>
                    <motion.circle cx={exportNodes.mumbai.x} cy={exportNodes.mumbai.y} r={isMobileView ? 26 : 25} fill="#C5A46D" opacity="0.18" filter={isMobileView ? undefined : "url(#exportHubGlow)"} animate={isMobileView ? { scale: [1, 1.08, 1], opacity: [0.16, 0.23, 0.16] } : { scale: [1, 1.2, 1], opacity: [0.18, 0.3, 0.18] }} transition={{ duration: isMobileView ? 4.2 : 5.6, repeat: Number.POSITIVE_INFINITY, ease: EASE_SECONDARY }} />
                    {isMobileView && <motion.circle cx={exportNodes.mumbai.x} cy={exportNodes.mumbai.y} r={18.8} fill="none" stroke="rgba(197,164,109,0.55)" strokeWidth={1.4} animate={{ scale: [1, 1.38], opacity: [0.48, 0.06] }} transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: EASE_PRIMARY }} />}
                    {!isMobileView && <motion.circle cx={exportNodes.mumbai.x} cy={exportNodes.mumbai.y} r={19.4} fill="none" stroke="#C5A46D" strokeWidth={2.3} opacity="0.68" animate={{ scale: [1, 1.42], opacity: [0.56, 0.12] }} transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: EASE_PRIMARY }} />}
                    <circle cx={exportNodes.mumbai.x} cy={exportNodes.mumbai.y} r={isMobileView ? 9.8 : 9.4} fill="#c4a166" filter={isMobileView ? undefined : "url(#exportHubGlow)"} />
                    <text x={exportNodes.mumbai.labelX} y={exportNodes.mumbai.labelY} textAnchor="start" fontSize={isMobileView ? 24 : 27} fontWeight={isMobileView ? 580 : 610} letterSpacing="0.032em" fill="#5b4f3f">
                      Mumbai
                    </text>
                    {!isMobileView && (
                      <>
                        <motion.text
                          x={exportNodes.mumbai.labelX}
                          y={exportNodes.mumbai.labelY + 28}
                          textAnchor="start"
                          fontSize={14}
                          fontWeight={500}
                          letterSpacing="0.08em"
                          fill="#7b6a53"
                          initial={false}
                          animate={{ opacity: effectiveExportScene === 1 ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: EASE_PRIMARY }}
                        >
                          Based in Mumbai
                        </motion.text>
                      </>
                    )}
                  </motion.g>

                  <motion.g style={{ opacity: isMobileView ? 1 : exportInternalNetworkSafeOpacity }}>
                    {exportInternalRoutes.map((route) => (
                      <motion.path
                        key={route.key}
                        d={route.path}
                        pathLength="1"
                        fill="none"
                        stroke={isMobileView ? "rgba(197,164,109,0.66)" : "rgba(197,164,109,0.74)"}
                        strokeWidth={isMobileView ? 1.25 : 1.44}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ pathLength: isMobileView ? 1 : exportInternalLineSafeProgress, opacity: isMobileView ? 0.82 : exportInternalNetworkSafeOpacity }}
                        animate={isMobileView ? { opacity: [0.82, 1, 0.82] } : undefined}
                        transition={isMobileView ? { duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: EASE_SECONDARY } : undefined}
                      />
                    ))}
                    {isMobileView &&
                      exportInternalRoutes.map((route) => (
                        <motion.path
                          key={`${route.key}-mobile-glow`}
                          d={route.path}
                          pathLength="1"
                          fill="none"
                          stroke="rgba(244,231,200,0.36)"
                          strokeWidth={0.72}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          animate={{ opacity: [0.24, 0.46, 0.24] }}
                          transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: EASE_SECONDARY }}
                        />
                      ))}
                    {!isMobileView &&
                      exportInternalRoutes.map((route) => (
                        <motion.path
                          key={`${route.key}-glow`}
                          d={route.path}
                          pathLength="1"
                          fill="none"
                          stroke="rgba(241,226,189,0.28)"
                          strokeWidth={0.9}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          style={{ pathLength: exportInternalLineProgress, opacity: exportInternalNetworkOpacity }}
                        />
                      ))}
                    {dotsCanRun &&
                      exportInternalRoutes.map((route, index) => (
                        <motion.circle
                          key={`${route.key}-internal-dot`}
                          r={isMobileView ? 2.3 : 3.1}
                          fill="#8F6A36"
                          stroke="rgba(233,214,178,0.34)"
                          strokeWidth={isMobileView ? 0.38 : 0.46}
                          style={{ opacity: isMobileView ? 0.84 : exportInternalNetworkSafeOpacity }}
                        >
                          <animateMotion
                            ref={(el) => {
                              internalDotAnimRefs.current[index] = el as SVGAnimationElement | null;
                            }}
                            begin="indefinite"
                            restart="always"
                            dur={`${externalDotCycleDuration}s`}
                            calcMode="spline"
                            keyTimes={`0;${externalDotTravelRatio.toFixed(4)};1`}
                            keyPoints="0;1;1"
                            keySplines="0.42 0 0.58 1;0 0 1 1"
                            repeatCount="indefinite"
                            path={route.path}
                          />
                        </motion.circle>
                      ))}
                  </motion.g>

                  <g>
                    {exportInternalNodes.map((node, index) => (
                      (() => {
                        const nodeTier = "tier" in node ? node.tier : "major";
                        return (
                      <motion.g
                        key={node.key}
                        initial={{ opacity: 0, scale: 0.84 }}
                        animate={undefined}
                        transition={undefined}
                        style={{ transformOrigin: `${node.x}px ${node.y}px`, opacity: isMobileView ? 0.98 : exportInternalNetworkSafeOpacity }}
                      >
                        <circle cx={node.x} cy={node.y} r={isMobileView ? 4.8 : nodeTier === "major" ? 8.6 : 6.6} fill="#C5A46D" opacity={isMobileView ? 1 : 0.92} />
                        <circle cx={node.x} cy={node.y} r={isMobileView ? 7.6 : nodeTier === "major" ? 12.8 : 9.9} fill="none" stroke={isMobileView ? "rgba(244,231,200,0.62)" : "rgba(241,226,189,0.36)"} strokeWidth={isMobileView ? 0.94 : 0.84} />
                      </motion.g>
                        );
                      })()
                    ))}
                  </g>

                  {exportRoutes.map((route, routeIndex) => {
                    const motionValues = routeMotion[route.key];
                    const isVisible = effectiveExportScene >= route.scene;
                    const routeIsReady = (isMobileView ? effectiveExportScene >= route.scene : isVisible) && dotsCanRun;

                    return (
                      <g key={route.key}>
                        <motion.path
                          d={route.path}
                          pathLength="1"
                          fill="none"
                          stroke="#C5A46D"
                          strokeWidth={route.type === "primary" ? (isMobileView ? 1.3 : 2.85) : (isMobileView ? 1.04 : 2.2)}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          style={{ pathLength: isMobileView ? 1 : motionValues.progress, opacity: isMobileView ? (route.type === "primary" ? 0.7 : 0.62) : motionValues.opacity }}
                          animate={undefined}
                          transition={undefined}
                        />
                        {routeIsReady && (
                          <motion.circle
                            r={isMobileView ? (route.type === "primary" ? 2.6 : 2.3) : (route.type === "primary" ? 3.6 : 3.2)}
                            fill="#9B7540"
                            stroke="rgba(233,214,178,0.42)"
                            strokeWidth={isMobileView ? 0.45 : 0.55}
                            style={{ opacity: isMobileView ? 0.97 : motionValues.opacity }}
                          >
                            <animateMotion
                              ref={(el) => {
                                externalDotAnimRefs.current[routeIndex] = el as SVGAnimationElement | null;
                              }}
                              begin="indefinite"
                              restart="always"
                              dur={`${externalDotCycleDuration}s`}
                              calcMode="spline"
                              keyTimes={`0;${externalDotTravelRatio.toFixed(4)};1`}
                              keyPoints="0;1;1"
                              keySplines="0.42 0 0.58 1;0 0 1 1"
                              repeatCount="indefinite"
                              path={route.path}
                            />
                          </motion.circle>
                        )}
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
                        <motion.circle cx={route.node.x} cy={route.node.y} r={isMobileView ? 4 : 5.8} fill="#C5A46D" initial={false} animate={{ opacity: isVisible ? (route.type === "primary" ? 0.92 : 0.74) : 0, scale: isVisible ? 1 : 0.84 }} transition={{ duration: 0.68, ease: CINEMATIC_EASE }} />
                        {isMobileView ? (
                          <text
                            x={route.node.labelX}
                            y={route.node.labelY}
                            textAnchor={route.node.anchor}
                            fontSize={28}
                            fontWeight={600}
                            letterSpacing="0.026em"
                            fill="#584d3f"
                            paintOrder="stroke"
                            stroke="rgba(255,251,243,0.8)"
                            strokeWidth={1.1}
                            opacity={0.75}
                          >
                            {route.node.label}
                          </text>
                        ) : (
                          <motion.text
                            x={route.node.labelX}
                            y={route.node.labelY}
                            textAnchor={route.node.anchor}
                            fontSize={24}
                            fontWeight={500}
                            letterSpacing="0.026em"
                            fill="#6a5d4a"
                            paintOrder="stroke"
                            stroke="rgba(255,251,243,0.38)"
                            strokeWidth={0.7}
                            initial={false}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 8 }}
                            transition={{ duration: 0.92, ease: EASE_SECONDARY }}
                          >
                            {route.node.label}
                          </motion.text>
                        )}
                      </g>
                    );
                  })}
                </motion.g>
              </motion.svg>
            </motion.div>

            <div className="order-1 mx-auto w-full max-w-[460px] px-5 pt-14 sm:px-6 md:px-0 md:pt-0 lg:order-2 lg:ml-0">
              <p className="text-[13px] tracking-[0.16em] text-[#4f5967] md:text-[13px]">EXPORT NETWORK</p>
              <div className="mt-5 h-px w-16 bg-[#C5A46D]/55" />
              {isMobileView ? (
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9, ease: EASE_PRIMARY }}>
                  <motion.h2 className="mt-6 font-serif text-[2.35rem] leading-[1.02] text-[#0f1726] md:mt-7 md:text-[3.8rem]" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE_PRIMARY }}>
                    {mobilePresenceScene.title}
                  </motion.h2>
                  <motion.p className="mt-4 max-w-md text-[1rem] leading-relaxed text-[#3e4958] md:mt-5 md:text-[1.06rem] md:font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.16, ease: EASE_PRIMARY }}>
                    {mobilePresenceScene.body}
                  </motion.p>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div key={effectiveExportScene} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 1.02, ease: EASE_SECONDARY }}>
                    <motion.h2 className="mt-6 font-serif text-[2.35rem] leading-[1.02] text-[#0f1726] md:mt-7 md:text-[3.8rem]">{activeScene.title}</motion.h2>
                    <motion.p className="mt-4 max-w-md text-[1rem] leading-relaxed text-[#3e4958] md:mt-5 md:text-[1.06rem] md:font-medium">{activeScene.body}</motion.p>
                  </motion.div>
                </AnimatePresence>
              )}
              <div className="mt-8 flex items-center gap-3">
                {exportStoryScenes.map((_, index) => (
                  <span key={`export-scene-${index}`} className={`h-px transition-all duration-700 ${index <= effectiveExportScene ? "w-8 bg-[#C5A46D]/75" : "w-4 bg-[#cbd5e1]"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section ref={bdbRef} data-theme="light" style={{ y: isMobileView ? 0 : bdbDrift }} className="relative -mt-2 w-full overflow-hidden py-5 md:py-9" {...sectionReveal}>
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
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: EASE_SECONDARY }}
          />
          )}
          <div className="relative mx-auto block w-full max-w-[2200px] md:hidden" />
          <div className="relative hidden w-full md:block md:pt-[44%] lg:pt-[40%]" />

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[72%] bg-[linear-gradient(96deg,rgba(248,244,236,0.7)_0%,rgba(248,244,236,0.48)_26%,rgba(248,244,236,0.18)_48%,rgba(248,244,236,0)_72%)] md:block md:w-[62%]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[44%] bg-[linear-gradient(96deg,rgba(248,244,236,0.24)_0%,rgba(248,244,236,0.12)_42%,rgba(248,244,236,0)_100%)] md:block md:w-[36%]" />

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
              </motion.article>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1440px] px-0 pb-0 pt-2 md:hidden">
            <article className="w-full max-w-[620px] px-5 py-3 sm:px-6">
              <p className="text-[13px] tracking-[0.14em] text-[#9a7a36]">TRUST & LOCATION</p>
              <h2 className="mt-4 max-w-[14ch] font-serif text-[2rem] leading-[1.06] text-[#111827]">Based at Bharat Diamond Bourse</h2>
              <p className="mt-6 max-w-[58ch] text-[1.06rem] leading-[1.8] text-[#27364a] md:text-[1.12rem]">
                Operating from Bharat Diamond Bourse, Bandra Kurla Complex, D.P. Jewels is positioned at the heart of India&apos;s diamond trade, serving buyers with trust, precision, and long-standing industry experience.
              </p>
            </article>
            <div className="mt-5 flex justify-center overflow-hidden">
              <img
                src={bdbImage}
                alt="Bharat Diamond Bourse cinematic artwork"
                width={2139}
                height={1426}
                className="h-auto w-[100vw] max-w-[100vw] object-contain object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={certRef}
        data-theme="light"
        style={{ y: isMobileView ? 0 : certDrift }}
        className="relative -mt-1 overflow-hidden bg-[linear-gradient(180deg,#f7f3ec_0%,#f5f1ea_52%,#efe9df_100%)] py-[3.8rem] text-[#2c2a27] md:py-[4.8rem]"
        {...sectionReveal}
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
            <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 border-y border-[#d9cdb6]/62 py-7 md:grid-cols-4 md:gap-6 md:py-9">
              {certifications.map((item, idx) => (
              <motion.article
                key={item.code}
                className="group relative flex h-full flex-col rounded-[1.2rem] border border-[#ddcfb5]/58 bg-[linear-gradient(180deg,rgba(255,252,246,0.7)_0%,rgba(247,241,232,0.56)_100%)] px-3 py-5 text-center shadow-[0_10px_24px_rgba(136,113,73,0.06)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(136,113,73,0.1)] md:px-5 md:py-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.68, delay: idx * 0.1, ease: SOFT_EASE }}
              >
                <div className="flex min-h-[72px] items-center justify-center md:min-h-[88px]">
                  <img
                    src={item.logo}
                    alt={`${item.code} certification logo`}
                    className="h-[4.5rem] w-auto max-w-[82%] object-contain opacity-[0.99] transition-opacity duration-500 group-hover:opacity-100 md:h-[5.3rem]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="mt-4 text-[12px] leading-[1.5] text-[#6e6356] md:text-[13px]">{item.description}</p>
              </motion.article>
            ))}
            </div>
            <p className="mt-5 ml-auto w-full max-w-[52ch] text-right text-[13px] tracking-[0.12em] text-[#655d52] md:font-medium">VERIFIED BY LEADING GLOBAL GEM & TRADE INSTITUTIONS</p>
          </div>
        </div>
      </motion.section>

      <motion.section ref={whyRef} data-theme="light" className="relative -mt-1 overflow-visible bg-[linear-gradient(180deg,#f8f4ec_0%,#f5f1e8_52%,#f1ebe0_100%)] text-[#2f2a24] md:h-auto" {...sectionReveal}>
        <div ref={whyMobilePinRef} className="relative h-[100svh] min-h-[100svh] md:hidden">
          <p className="pointer-events-none absolute left-1/2 top-[12%] z-[2] -translate-x-1/2 whitespace-nowrap text-[13px] tracking-[0.12em] text-[#6f624f]">WHY CHOOSE D.P. JEWELS</p>
          <div className="absolute inset-0 z-[1] flex items-center justify-center px-4">
            {whyChoosePoints.map((point, idx) => (
              <article
                key={`why-mobile-${point.num}`}
                ref={(node) => { whyMobileProofRefs.current[idx] = node; }}
                className="absolute inset-0 flex items-center justify-center text-center"
              >
                <div className="w-full max-w-[25rem]">
                  {point.num ? <p className="mb-1 text-[13px] tracking-[0.14em] text-[#8d7a57]">{point.num}</p> : null}
                  <h3 className="font-serif text-[2.5rem] font-medium leading-[1.05] text-[#2e2822]">{point.title}</h3>
                  {point.desc ? <p className="mx-auto mt-2 max-w-[33ch] text-[1.08rem] leading-[1.74] text-[#564c40]">{point.desc}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div ref={whyPinRef} className="relative hidden h-screen min-h-[100svh] md:block">
          <p className="pointer-events-none absolute left-1/2 top-[13%] z-[2] -translate-x-1/2 text-[14px] tracking-[0.16em] text-[#6f624f]">WHY CHOOSE D.P. JEWELS</p>
          <div className="absolute left-1/2 top-1/2 z-[1] h-[22rem] w-full max-w-[58rem] -translate-x-1/2 -translate-y-1/2 px-8">
            {whyChoosePoints.map((point, idx) => (
              <article
                key={`why-desktop-${point.num}`}
                ref={(node) => { whyProofRefs.current[idx] = node; }}
                className="absolute inset-0 flex items-center justify-center text-center"
              >
                <div className="w-full">
                  {point.num ? <p className="mb-4 text-[13px] tracking-[0.16em] text-[#8f7c5b]">{point.num}</p> : null}
                  <h2 className="font-serif text-[4.6rem] leading-[1.02] text-[#29241f]">{point.title}</h2>
                  {point.desc ? <p className="mx-auto mt-6 max-w-[42rem] text-[1.18rem] leading-[1.9] text-[#554b3f] md:font-medium">{point.desc}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(241,235,224,0)_0%,rgba(7,16,36,0.18)_100%)]" />
      </motion.section>

      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp Enquiry" className="floating-wa">
        <MessageCircle size={21} />
      </a>
    </div>
  );
}




