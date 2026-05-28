import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage from "../assets/bg.jpg";
import mobileHeroImage from "../assets/mobile.png";
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
import bdbMobileImage from "../assets/bdb_mobile.png";
import giaLogo from "../assets/certifications/gia.svg";
import igiLogo from "../assets/certifications/igi.svg";
import gjepcLogo from "../assets/certifications/gjepc.svg";
import gsiLogo from "../assets/certifications/gsi.svg";

const WHATSAPP_NUMBER = "918356810826";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.`;
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
  { name: "Round", image: diamondRound, normalizeClass: "scale-[0.94]" },
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
    title: "Built on Relationships",
    desc: "Long-standing partnerships across the diamond trade.",
  },
  {
    num: "02",
    title: "Trusted for Results",
    desc: "Transparent execution and dependable sourcing.",
  },
  {
    num: "03",
    title: "Global Reach",
    desc: "Serving buyers across domestic and international markets.",
  },
  {
    num: "04",
    title: "Precision Sourcing",
    desc: "Selected through trusted industry networks.",
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
    body: "Reliable sourcing support for Middle East diamond demand.",
  },
  {
    title: "USA",
    body: "Consistent execution for U.S. diamond buyers.",
  },
  {
    title: "London",
    body: "Disciplined sourcing for London jewellery markets.",
  },
  {
    title: "Hong Kong",
    body: "Dependable supply for Hong Kong trading corridors.",
  },
  {
    title: "Singapore",
    body: "Precise coordination for Southeast Asian buyers.",
  },
  {
    title: "Canada",
    body: "Trusted sourcing for Canadian diamond markets.",
  },
];

const indiaOutlinePath = indiaMapCleanRaw.match(/<path[^>]*d="([^"]+)"/)?.[1] ?? "";

const exportDesktopLayout = {
  nodes: {
    mumbai: { x: 280, y: 605, labelX: 320, labelY: 647, label: "Mumbai" },
    dubai: { x: 20, y: 525, labelX: 4, labelY: 517, label: "Dubai", anchor: "end" },
    london: { x: -122, y: 198, labelX: -102, labelY: 190, label: "London", anchor: "start" },
    singapore: { x: 792, y: 726, labelX: 806, labelY: 718, label: "Singapore", anchor: "start" },
    hongKong: { x: 890, y: 506, labelX: 890, labelY: 556, label: "Hong Kong", anchor: "middle" },
    canada: { x: -188, y: 330, labelX: -172, labelY: 322, label: "Canada", anchor: "start" },
    usa: { x: -186, y: 760, labelX: -170, labelY: 792, label: "USA", anchor: "start" },
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
    { key: "canada", scene: 3, type: "secondary", path: "M280 605 C104 462 -56 372 -188 330" },
    { key: "usa", scene: 4, type: "secondary", path: "M280 605 C96 672 -52 736 -186 760" },
    { key: "dubai", scene: 5, type: "primary", path: "M280 605 C208 588 116 552 20 525" },
    { key: "hongKong", scene: 6, type: "primary", path: "M280 605 C458 588 676 562 888 506" },
    { key: "singapore", scene: 7, type: "primary", path: "M280 605 C444 620 634 666 792 726" },
    { key: "london", scene: 8, type: "secondary", path: "M280 605 C188 476 42 286 -122 198" },
  ],
} as const;

const exportMobileLayout = {
  nodes: {
    mumbai: { x: 282, y: 632, labelX: 338, labelY: 694, label: "Mumbai" },
    dubai: { x: 220, y: 644, labelX: 198, labelY: 676, label: "Dubai", anchor: "end" },
    london: { x: 306, y: 372, labelX: 338, labelY: 338, label: "London", anchor: "middle" },
    singapore: { x: 560, y: 684, labelX: 586, labelY: 706, label: "Singapore", anchor: "start" },
    hongKong: { x: 588, y: 512, labelX: 588, labelY: 566, label: "Hong Kong", anchor: "middle" },
    canada: { x: 210, y: 488, labelX: 198, labelY: 474, label: "Canada", anchor: "end" },
    usa: { x: 306, y: 744, labelX: 306, labelY: 796, label: "USA", anchor: "middle" },
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
    { key: "canada", scene: 3, type: "secondary", path: "M282 632 C256 584 230 534 210 488" },
    { key: "usa", scene: 4, type: "secondary", path: "M282 632 C286 676 296 712 306 744" },
    { key: "dubai", scene: 5, type: "primary", path: "M282 632 C262 640 240 648 220 644" },
    { key: "hongKong", scene: 6, type: "primary", path: "M282 632 C358 618 460 576 588 512" },
    { key: "singapore", scene: 7, type: "primary", path: "M282 632 C346 662 428 684 560 684" },
    { key: "london", scene: 8, type: "secondary", path: "M282 632 C288 552 300 456 306 372" },
  ],
} as const;

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function getDiamondWhatsAppLink(shapeName: string) {
  const shapeLabel = shapeName === "Heart" ? "Heart Shape" : shapeName;
  const message = `Hello DP Jewels,\n\nI am interested in ${shapeLabel} diamonds.\n\nPlease share available specifications and details.`;
  return `https://wa.me/918356810826?text=${encodeURIComponent(message)}`;
}

export default function ShowroomExperience() {
  const [activeDiamondIndex, setActiveDiamondIndex] = useState(0);
  const [activeExportScene, setActiveExportScene] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [dotsCanRun, setDotsCanRun] = useState(false);
  const [loadedDiamondImages, setLoadedDiamondImages] = useState<Record<string, boolean>>({});
  const [showFinalNetworkStatement, setShowFinalNetworkStatement] = useState(false);
  const [hideExportLabel, setHideExportLabel] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    shape: "Round",
    diamondType: "Any",
    carat: "1-2 ct",
    color: "Any",
    clarity: "Any",
    certificate: "Any",
    name: "",
  });
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
  const diamondEnquiryRef = useRef<HTMLElement>(null);
  const whyPinRef = useRef<HTMLDivElement>(null);
  const whyProofRefs = useRef<Array<HTMLElement | null>>([]);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.06]);
  const { scrollYProgress: diamondsProgress } = useScroll({ target: diamondsRef, offset: ["start end", "end start"] });
  const { scrollYProgress: presenceProgress } = useScroll({ target: presenceRef, offset: ["start start", "end end"] });
  const { scrollYProgress: bdbProgress } = useScroll({ target: bdbRef, offset: ["start end", "end start"] });
  const { scrollYProgress: certProgress } = useScroll({ target: certRef, offset: ["start end", "end start"] });
  const diamondsDrift = useTransform(diamondsProgress, [0, 1], [12, -12]);
  const bdbDrift = useTransform(bdbProgress, [0, 1], [9, -9]);
  const certDrift = useTransform(certProgress, [0, 1], [8, -8]);
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
  const routeCanadaProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.2, 0.29] : [0.24, 0.32], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeUsaProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.5, 0.59] : [0.34, 0.42], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeDubaiProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.26, 0.35] : [0.44, 0.52], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeHongKongProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.38, 0.47] : [0.54, 0.62], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeSingaporeProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.32, 0.41] : [0.64, 0.72], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeLondonProgress = useSpring(useTransform(presenceProgress, isMobileView ? [0.44, 0.53] : [0.74, 0.82], [0, 1]), { stiffness: 54, damping: 24, mass: 0.6 });
  const routeCanadaOpacity = useTransform(presenceProgress, isMobileView ? [0.19, 0.24] : [0.23, 0.28], [0, 0.9]);
  const routeUsaOpacity = useTransform(presenceProgress, isMobileView ? [0.49, 0.54] : [0.33, 0.38], [0, 0.8]);
  const routeDubaiOpacity = useTransform(presenceProgress, isMobileView ? [0.25, 0.3] : [0.43, 0.48], [0, 0.82]);
  const routeHongKongOpacity = useTransform(presenceProgress, isMobileView ? [0.37, 0.42] : [0.53, 0.58], [0, 0.9]);
  const routeSingaporeOpacity = useTransform(presenceProgress, isMobileView ? [0.31, 0.36] : [0.63, 0.68], [0, 0.9]);
  const routeLondonOpacity = useTransform(presenceProgress, isMobileView ? [0.43, 0.48] : [0.73, 0.78], [0, 0.8]);
  const routeMotion = {
    canada: { progress: routeCanadaProgress, opacity: routeCanadaOpacity },
    singapore: { progress: routeSingaporeProgress, opacity: routeSingaporeOpacity },
    hongKong: { progress: routeHongKongProgress, opacity: routeHongKongOpacity },
    dubai: { progress: routeDubaiProgress, opacity: routeDubaiOpacity },
    usa: { progress: routeUsaProgress, opacity: routeUsaOpacity },
    london: { progress: routeLondonProgress, opacity: routeLondonOpacity },
  };
  const effectiveExportScene = activeExportScene;
  const panelCountries = [
    { key: "canada", label: "CANADA" },
    { key: "usa", label: "USA" },
    { key: "dubai", label: "DUBAI" },
    { key: "hongKong", label: "HONG KONG" },
    { key: "singapore", label: "SINGAPORE" },
    { key: "london", label: "LONDON" },
  ] as const;
  const panelDisplayLabel: Record<(typeof panelCountries)[number]["key"], string> = {
    canada: "Canada",
    usa: "USA",
    dubai: "Dubai",
    hongKong: "Hong Kong",
    singapore: "Singapore",
    london: "London",
  };
  const panelSequenceEnabled = effectiveExportScene >= 3;
  const revealedPanelCountries = panelSequenceEnabled
    ? panelCountries.slice(0, Math.min(panelCountries.length, Math.max(0, effectiveExportScene - 2)))
    : [];

  useMotionValueEvent(presenceProgress, "change", (latest) => {
    const thresholds = isMobileView
      ? { canada: 0.2, usa: 0.5, dubai: 0.26, hongKong: 0.38, singapore: 0.32, london: 0.4 }
      : { canada: 0.24, usa: 0.34, dubai: 0.44, hongKong: 0.54, singapore: 0.64, london: 0.66 };
    const nextScene =
      latest >= thresholds.london ? 8 :
        latest >= thresholds.singapore ? 7 :
          latest >= thresholds.hongKong ? 6 :
            latest >= thresholds.dubai ? 5 :
              latest >= thresholds.usa ? 4 :
                latest >= thresholds.canada ? 3 : 0;
    if (nextScene === exportSceneRef.current) return;
    exportSceneRef.current = nextScene;
    setActiveExportScene(nextScene);
  });
  useMotionValueEvent(presenceProgress, "change", (latest) => {
    const sequenceReady = exportSceneRef.current >= 8;
    const shouldRun = sequenceReady;
    setDotsCanRun((prev) => (prev === shouldRun ? prev : shouldRun));
  });
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
    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const pinTarget = whyPinRef.current;
      const proofPool = whyProofRefs.current;
      if (!pinTarget) return;
      const proofLayers = proofPool.filter((node): node is HTMLElement => Boolean(node));
      if (!proofLayers.length) return;

      gsap.set(proofLayers, {
        opacity: 0,
        y: 26,
        scale: 1,
        transformOrigin: "50% 50%",
        willChange: "transform,opacity",
        pointerEvents: "none",
      });
      gsap.set(proofLayers[0], { opacity: 1, y: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top top",
          end: "+=860",
          scrub: 1.2,
          pin: pinTarget,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const holdDuration = 0.94;
      const swapDuration = 0.8;
      const finalHoldDuration = 0.94;

      tl.to(proofLayers[0], { opacity: 1, y: 0, duration: holdDuration })
        .to(proofLayers[0], { opacity: 0, y: -30, duration: swapDuration })
        .to(proofLayers[1], { opacity: 1, y: 0, duration: swapDuration }, "<")
        .to(proofLayers[1], { opacity: 1, y: 0, duration: holdDuration })
        .to(proofLayers[1], { opacity: 0, y: -30, duration: swapDuration })
        .to(proofLayers[2], { opacity: 1, y: 0, duration: swapDuration }, "<")
        .to(proofLayers[2], { opacity: 1, y: 0, duration: holdDuration })
        .to(proofLayers[2], { opacity: 0, y: -30, duration: swapDuration })
        .to(proofLayers[3], { opacity: 1, y: 0, duration: swapDuration }, "<")
        .to(proofLayers[3], { opacity: 1, y: 0, duration: finalHoldDuration });

      ScrollTrigger.refresh();
    }, whyRef);

    const onLoadRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoadRefresh);

      return () => {
        ctx.revert();
        window.removeEventListener("load", onLoadRefresh);
        ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === whyRef.current || trigger.vars.pin === whyPinRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  useEffect(() => {
    const resetState = () => {
      setShowFinalNetworkStatement(false);
      setHideExportLabel(false);
    };

    if (!panelSequenceEnabled) {
      resetState();
      return;
    }

    if (effectiveExportScene <= 7) {
      resetState();
      return;
    }

    // Scene 8 (London): extended hold, then clear country + label, then show final statement.
    setShowFinalNetworkStatement(false);
    setHideExportLabel(false);
    const timers: number[] = [];
    timers.push(window.setTimeout(() => {
      setHideExportLabel(true);
    }, 2800));
    timers.push(window.setTimeout(() => {
      setShowFinalNetworkStatement(true);
    }, 3420));

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [panelSequenceEnabled, effectiveExportScene]);
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
  const scrollToDiamonds = () => {
    const section = document.querySelector("#diamonds");
    if (!section) {
      console.error("Diamond section #diamonds not found");
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleEnquire = () => {
    setEnquiryForm((prev) => ({ ...prev, shape: activeDiamond.name }));
    document.getElementById("diamond-enquiry")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleEnquiryFormChange = (field: "shape" | "diamondType" | "carat" | "color" | "clarity" | "certificate" | "name", value: string) => {
    setEnquiryForm((prev) => ({ ...prev, [field]: value }));
  };
  const submitEnquiryToWhatsApp = () => {
    const message = `Hello D.P. Jewels,

I am interested in a diamond with the following requirements:

Shape: ${enquiryForm.shape}
Type: ${enquiryForm.diamondType}
Carat: ${enquiryForm.carat}
Color: ${enquiryForm.color}
Clarity: ${enquiryForm.clarity}
Certificate: ${enquiryForm.certificate}
Name: ${enquiryForm.name.trim() || "Not provided"}

Please share available options.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const selectedEnquiryDiamond = diamondItems.find((item) => item.name === enquiryForm.shape) ?? activeDiamond;
  const markDiamondLoaded = (src: string) => {
    setLoadedDiamondImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  };
  const isDiamondLoaded = (src: string) => Boolean(loadedDiamondImages[src]);

  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.onload = () => markDiamondLoaded(src);
      img.onerror = () => {
        // Avoid retry loops; keep state stable if a preload fails.
      };
      img.src = src;
    };

    const total = diamondItems.length;
    const prevIndex = (activeDiamondIndex - 1 + total) % total;
    const nextIndex = (activeDiamondIndex + 1) % total;
    const prioritySources = [diamondItems[activeDiamondIndex].image, diamondItems[prevIndex].image, diamondItems[nextIndex].image];
    const prioritySet = new Set(prioritySources);

    prioritySources.forEach(preloadImage);

    const remainingSources = diamondItems.map((item) => item.image).filter((src) => !prioritySet.has(src));
    const idleRunner = () => {
      remainingSources.forEach(preloadImage);
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    let idleId: number | null = null;
    let timeoutId: number | null = null;

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(() => idleRunner());
    } else {
      timeoutId = window.setTimeout(idleRunner, 240);
    }

    return () => {
      if (idleId !== null && idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idleId);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
    // Run once on mount for section lifecycle preloading.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="atmospheric-shell text-[#111827]">
      <section
        ref={heroRef}
        id="home"
        data-theme="dark"
        className="hero relative flex h-[100svh] h-[100dvh] h-screen min-h-[100svh] min-h-[100vh] items-center overflow-hidden bg-[#040816]"
      >
        <motion.img
          src={isMobileView ? mobileHeroImage : bgImage}
          alt="Premium jewellery background"
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[62%_38%]"
          style={isMobileView ? undefined : { y: heroY, scale: heroScale }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {!isMobileView && <div className="pointer-events-none absolute bottom-[15%] right-[13%] h-[88px] w-[210px] rounded-[999px] bg-[rgba(0,0,0,0.22)] blur-[18px] md:bottom-[14%] md:right-[15%] md:h-[112px] md:w-[280px]" />}
        <div className="relative mx-auto flex h-[100svh] h-[100dvh] h-screen min-h-[100svh] min-h-[100vh] w-[min(1220px,94%)] items-start py-[27svh] md:items-center md:py-0">
          <motion.div variants={heroItem} className="hero-cta absolute right-1 top-6 z-[50] md:right-0 md:top-10">
            <button type="button" onClick={scrollToDiamonds} className="lux-hover-lift lux-interactive relative z-[50] pointer-events-auto inline-flex rounded-sm border border-white/45 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f3e8d2] hover:bg-white/95 hover:text-[#111827] hover:shadow-[0_0_20px_rgba(243,232,210,0.28)] md:px-[1.28rem] md:py-[0.64rem] md:text-[13px]">EXPLORE DIAMONDS</button>
          </motion.div>
          <motion.div variants={heroContentStagger} initial="hidden" animate="show" className="max-w-[700px] text-white">
            <motion.h1 variants={heroItem} className="font-serif text-[2.85rem] leading-[1.02] md:text-[5rem]">
              Diamond Traders,
              <br />
              Importers &
              <br />
              Exporters
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <motion.section ref={aboutRef} id="about" data-theme="light" className="about-section relative -mt-2 bg-[#F7F4EE] py-[3.2rem] pt-[2rem] md:-mt-3 md:py-[3.4rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(112,132,168,0.08)_0%,rgba(112,132,168,0)_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_88%,rgba(212,190,150,0.07)_0%,rgba(212,190,150,0)_32%)]" />
        <div className="pointer-events-none absolute left-0 top-[22%] hidden h-px w-[16%] bg-[linear-gradient(90deg,rgba(148,163,184,0.4),transparent)] md:block" />
        <motion.div
          className="mx-auto w-full max-w-[1320px] px-5 text-center md:px-8"
          variants={isMobileView ? undefined : staggerContainer}
          initial={isMobileView ? undefined : "hidden"}
          whileInView={isMobileView ? undefined : "show"}
          viewport={{ once: true, amount: isMobileView ? 0.12 : 0.2 }}
          transition={isMobileView ? undefined : undefined}
        >
          {isMobileView ? (
            <article className="about-mobile-content">
              <p className="about-eyebrow text-[13px] tracking-[0.18em] text-[#3f4b5d]" data-about-eyebrow>ABOUT D.P. JEWELS</p>
              <h2 className="font-serif text-[#111827]">
                Built on trust,
                <br />
                since 1999.
              </h2>
              <p>Operating from Bharat Diamond Bourse, Mumbai.</p>
              <p>25+ years serving domestic and international diamond markets.</p>
            </article>
          ) : (
            <motion.article className="about-content mx-auto mb-12 w-full max-w-[820px] lg:pt-2" variants={staggerItem}>
              <motion.p className="about-eyebrow text-[13px] tracking-[0.18em] text-[#3f4b5d]" data-about-eyebrow variants={staggerItem}>ABOUT D.P. JEWELS</motion.p>
              <motion.h2 className="mt-4 mx-auto max-w-[14ch] font-serif text-[2.4rem] leading-[1.04] md:text-[3.3rem]" variants={staggerItem}>Built on trust, since 1999.</motion.h2>
              <motion.p className="mt-6 mx-auto max-w-[62ch] text-[1.08rem] leading-[1.9] text-[#2c3a4c] md:mt-7 md:text-[1.08rem] md:leading-[1.95] md:font-medium" variants={staggerItem}>
                Operating from Bharat Diamond Bourse, Mumbai.
                <br />
                25+ years serving domestic and international diamond markets.
              </motion.p>
            </motion.article>
          )}
          <motion.div className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-4 md:gap-5 lg:gap-6" variants={staggerContainer}>
            {aboutMetrics.map((metric, idx) => (
              <motion.article
                key={metric.label}
                className={`p-3 text-center md:flex md:min-h-[132px] md:flex-col md:justify-between md:p-4 ${idx > 0 ? "md:border-l md:border-[#d4dce8]/72" : ""}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.58, delay: idx * 0.05, ease: SOFT_EASE }}
              >
                <p className="font-serif text-[2rem] leading-[1] text-[#0f1726] md:text-[2.52rem]">{metric.value}</p>
                <p className="mt-2 text-[11px] font-medium tracking-[0.1em] text-[#3f4b5d] md:mt-4 md:text-[12px] md:tracking-[0.12em]">{metric.label}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section ref={diamondsRef} id="diamonds" data-theme="dark" style={{ y: isMobileView ? 0 : diamondsDrift }} className="relative -mt-2 min-h-[100svh] overflow-hidden bg-[linear-gradient(180deg,#061024_0%,#040816_48%,#030611_100%)] py-[1.9rem] md:-mt-3 md:min-h-[100vh] md:py-[2.2rem]" {...sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(224,233,245,0.09)_0%,rgba(224,233,245,0)_44%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_28%,rgba(206,218,238,0.07)_0%,rgba(206,218,238,0)_30%)]" />
        <div className="pointer-events-none absolute inset-0 hidden opacity-[0.1] [background-image:radial-gradient(rgba(255,255,255,0.26)_0.35px,transparent_0.35px)] [background-size:3px_3px] md:block" />
        <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8">
          <h2 className="mt-2 text-center font-serif text-[2.6rem] text-[#f7f2e8] md:mt-2 md:text-[3.75rem]">Diamond Shapes & Selections</h2>

          <div className="relative mt-[1.3rem] hidden h-[410px] overflow-hidden md:block">
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
                      className={`relative h-full w-full object-contain object-center transition-all duration-[1100ms] ${isActive ? "scale-[1.12] brightness-[1.05]" : "scale-[0.95] brightness-100"} ${shape.normalizeClass} ${isDiamondLoaded(shape.image) ? "opacity-100" : "opacity-0"}`}
                      animate={isActive ? { rotateY: [0, 1.2, 0], rotateX: [0, -0.8, 0] } : { rotateY: 0, rotateX: 0 }}
                      transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: EASE_SECONDARY }}
                      loading="eager"
                      onLoad={() => markDiamondLoaded(shape.image)}
                      decoding="async"
                    />
                  </motion.div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-4 flex min-h-[300px] items-center justify-center md:hidden">
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
                      className={`h-full w-full object-contain object-center transition-all duration-700 scale-[1.08] ${shape.normalizeClass} ${isDiamondLoaded(shape.image) ? "opacity-100" : "opacity-0"}`}
                      loading="eager"
                      onLoad={() => markDiamondLoaded(shape.image)}
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
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeDiamond.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.23, ease: EASE_SECONDARY }}
                  className="text-center font-serif text-[2.2rem] tracking-[0.08em] text-[#f6f1e8] md:text-[2.52rem]"
                >
                  {activeDiamond.name}
                </motion.h3>
              </AnimatePresence>
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleEnquire}
                  className="lux-hover-lift lux-interactive rounded-full border border-[#cfd8e4]/65 px-5 py-1.5 text-[13px] font-medium tracking-[0.12em] text-[#f3eee5] transition-all duration-500 hover:bg-[#f3eee5] hover:text-[#111827]"
                >
                  ENQUIRE
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section ref={presenceRef} data-theme="light" className="relative -mt-3 h-auto min-h-[90svh] bg-[linear-gradient(180deg,#F7F4EE_0%,#F5F2EB_46%,#F3EFE7_100%)] md:h-[340vh] md:min-h-0" {...sectionReveal}>
        <div className="relative flex items-center overflow-visible py-0 md:sticky md:top-0 md:min-h-screen md:min-h-[100svh] md:py-0">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_48%,rgba(197,164,109,0.12)_0%,rgba(197,164,109,0.045)_32%,rgba(250,247,242,0)_68%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(70,58,42,0.38)_0.45px,transparent_0.45px)] [background-size:4px_4px]" />
          <div className="pointer-events-none absolute right-0 top-[18%] hidden h-px w-[14%] bg-[linear-gradient(270deg,rgba(197,164,109,0.38),transparent)] md:block" />

          {isMobileView ? (
            <div className="relative mx-auto w-full max-w-[430px] px-4 pt-14 pb-8">
              <div className="mb-9 flex justify-center">
                <p className="text-center font-serif text-[1.42rem] leading-[1.24] tracking-[1.4px] font-medium text-[#463621]">
                  EXPORTING
                  <br />
                  EXCELLENCE
                  <br />
                  WORLDWIDE
                </p>
              </div>
              <div className="relative mx-auto h-[64svh] w-full overflow-visible">
                <div
                  className="absolute left-1/2 top-[42%] h-[64svh] w-[90vw] max-w-[392px]"
                  style={{ transform: "translate(-50%, -50%) translateY(34px) scaleX(1.12) scaleY(1.28)" }}
                >
                  <svg viewBox="0 0 1000 1000" className="h-full w-full" role="img" aria-label="India export routes">
                    <image href={indiaMapClean} x="0" y="0" width="1000" height="1000" preserveAspectRatio="xMidYMid meet" />
                    {(() => {
                      // Single shared coordinate space for map, routes, nodes, hub, and label.
                    const mumbai = { x: 250, y: 610 };
                    const destinations = {
                      london: { x: 520, y: 100 },
                      usa: { x: 72, y: 270 },
                      dubai: { x: 90, y: 700 },
                      hongKong: { x: 760, y: 300 },
                      singapore: { x: 760, y: 690 },
                    } as const;
                    const routes = [
                        { key: "london", d: "M250 610 Q420 330 520 100", begin: "0s", end: destinations.london },
                        { key: "usa", d: "M250 610 Q120 470 72 270", begin: "0s", end: destinations.usa },
                        { key: "dubai", d: "M250 610 Q160 650 90 700", begin: "0s", end: destinations.dubai },
                        { key: "hongKong", d: "M250 610 Q520 300 760 300", begin: "0s", end: destinations.hongKong },
                        { key: "singapore", d: "M250 610 Q500 720 760 690", begin: "0s", end: destinations.singapore },
                      ] as const;

                      return (
                        <>
                          {routes.map((route) => (
                            <g key={route.key}>
                              <path d={route.d} fill="none" stroke="rgba(209,175,109,0.9)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.25))" }} />
                              <circle cx={route.end.x} cy={route.end.y} r="6.5" fill="#d1af6d" />
                              <circle r="5.5" fill="#c89a3c" opacity="1">
                                <animateMotion begin={route.begin} dur="3.2s" repeatCount="indefinite" path={route.d} />
                              </circle>
                            </g>
                          ))}
                          <circle cx={mumbai.x} cy={mumbai.y} r="8" fill="#d1af6d">
                            <animate attributeName="r" values="8;8.64;8" dur="2.5s" repeatCount="indefinite" />
                          </circle>
                          <text x="270" y="655" textAnchor="start" fontSize="24" fill="#6f604f" fontWeight="650" letterSpacing="0.2px" opacity="1" fontFamily="serif">
                            Mumbai
                          </text>
                          <text x="545" y="108" textAnchor="start" fontSize="28" fill="#6f604f" fontWeight="650" letterSpacing="0.2px" opacity="1" fontFamily="serif">London</text>
                          <text x="96" y="278" textAnchor="start" fontSize="28" fill="#6f604f" fontWeight="650" letterSpacing="0.2px" opacity="1" fontFamily="serif">USA</text>
                          <text x="115" y="708" textAnchor="start" fontSize="28" fill="#6f604f" fontWeight="650" letterSpacing="0.2px" opacity="1" fontFamily="serif">Dubai</text>
                          <text x="785" y="288" textAnchor="start" fontSize="28" fill="#6f604f" fontWeight="650" letterSpacing="0.2px" opacity="1" fontFamily="serif">Hong Kong</text>
                          <text x="785" y="698" textAnchor="start" fontSize="28" fill="#6f604f" fontWeight="650" letterSpacing="0.2px" opacity="1" fontFamily="serif">Singapore</text>
                        </>
                      );
                    })()}
                  </svg>
                </div>
              </div>
            </div>
          ) : (
          <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-0 px-1 md:gap-2 md:px-5 lg:grid-cols-[minmax(0,0.74fr)_minmax(320px,0.26fr)] lg:gap-2">
            <div className="order-2 mx-auto w-[96vw] max-w-[96vw] px-2 lg:order-1 md:w-full md:max-w-none md:px-3 lg:max-w-none">
              <motion.div className="relative h-[min(64svh,620px)] overflow-visible md:h-[min(98vh,1320px)] md:overflow-visible lg:h-[min(98vh,1320px)]" style={{ opacity: isMobileView ? 1 : exportMapOpacity }}>
                <img src={indiaExportStory} alt="" aria-hidden className="sr-only" loading="lazy" decoding="async" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,251,243,0.82)_0%,rgba(255,251,243,0.26)_50%,rgba(255,251,243,0)_80%)]" />
                <div className="pointer-events-none absolute inset-[4%] bg-[radial-gradient(circle_at_52%_52%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.12)_56%,rgba(255,255,255,0)_100%)]" />
                <motion.svg viewBox="-250 -10 1280 1055" preserveAspectRatio="xMidYMid meet" className="absolute left-1/2 top-1/2 h-[142%] w-[142%] -translate-x-1/2 -translate-y-1/2 md:left-0 md:top-0 md:h-full md:w-full md:translate-x-0 md:translate-y-0" role="img" aria-label="DP Jewels export network from Mumbai, India">
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
                      ? { x: -20, y: -8, scale: 1.34, transformOrigin: `${exportNodes.mumbai.x}px ${exportNodes.mumbai.y}px` }
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
                          <motion.text
                            x={route.node.labelX}
                            y={route.node.labelY}
                            textAnchor={route.node.anchor}
                            fontSize={21}
                            fontWeight={560}
                            letterSpacing="0.018em"
                            fill="#5a4934"
                            paintOrder="stroke"
                            stroke="rgba(255,251,243,0.66)"
                            strokeWidth={0.84}
                            initial={false}
                            animate={{ opacity: isVisible ? 0.9 : 0, y: isVisible ? 0 : 6 }}
                            transition={{ duration: 0.78, ease: EASE_SECONDARY }}
                          >
                            {route.node.label}
                          </motion.text>
                        ) : (
                          <motion.text
                            x={route.node.labelX}
                            y={route.node.labelY}
                            textAnchor={route.node.anchor}
                            fontSize={22}
                            fontWeight={560}
                            letterSpacing="0.02em"
                            fill="#5a4934"
                            paintOrder="stroke"
                            stroke="rgba(255,251,243,0.4)"
                            strokeWidth={0.66}
                            initial={false}
                            animate={{ y: isVisible ? 0 : 8 }}
                            style={{ opacity: motionValues.opacity }}
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
            </div>

            <div className="order-1 mx-auto w-full max-w-[440px] px-5 pb-1 pt-4 text-right sm:px-6 md:px-0 md:pb-0 md:pt-0 lg:order-2 lg:ml-auto lg:pl-5">
              <motion.p
                className="relative -top-2 text-[13px] tracking-[0.18em] text-[#4f5967]"
                animate={{ opacity: hideExportLabel ? 0 : 1 }}
                transition={{ duration: 0.52, ease: EASE_SECONDARY }}
              >
                EXPORT NETWORK
              </motion.p>
              <motion.div
                className="relative -top-2 ml-auto mt-2 h-px w-16 bg-[#C5A46D]/55"
                animate={{ opacity: hideExportLabel ? 0 : 1 }}
                transition={{ duration: 0.52, ease: EASE_SECONDARY }}
              />
              <div className="relative mt-6 min-h-[248px] md:mt-4">
                <motion.div
                  className="absolute inset-0 flex flex-col items-end justify-start gap-3 pt-4 text-right md:gap-3.5 md:pt-0"
                  animate={{ opacity: showFinalNetworkStatement || hideExportLabel ? 0 : 1 }}
                  transition={{ duration: 0.58, ease: EASE_SECONDARY }}
                >
                  {revealedPanelCountries.map((country) => (
                    <p
                      key={country.key}
                      className="font-serif text-[1.34rem] font-bold tracking-[0.05em] text-[#4a3823] md:text-[1.7rem]"
                    >
                      {panelDisplayLabel[country.key]}
                    </p>
                  ))}
                </motion.div>
                <motion.p
                  className="absolute inset-0 flex items-center justify-center text-center font-serif text-[1.7rem] font-bold tracking-[0.068em] text-[#463621] md:text-[2.28rem]"
                  animate={{ opacity: showFinalNetworkStatement ? 1 : 0, y: showFinalNetworkStatement ? 0 : 10 }}
                  transition={{ duration: 0.5, ease: EASE_SECONDARY }}
                >
                  EXPORTING EXCELLENCE WORLDWIDE
                </motion.p>
              </div>
            </div>
          </div>
          )}
        </div>
      </motion.section>

      <motion.section ref={bdbRef} data-theme="light" style={{ y: isMobileView ? 0 : bdbDrift }} className="relative -mt-4 w-full overflow-hidden bg-[#f7f4ee] py-12 md:py-14" {...sectionReveal}>
        <div className="relative mx-auto w-full max-w-[1660px] px-3 md:px-6">
          <motion.div
            className="relative min-h-[88vh] overflow-hidden md:min-h-[96vh]"
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 1.08, ease: EASE_SECONDARY }}
          >
            <img
              src={isMobileView ? bdbMobileImage : bdbImage}
              alt="Bharat Diamond Bourse building"
              width={2139}
              height={1426}
              className="absolute inset-0 h-full w-full scale-100 object-cover object-center md:scale-[1.05] md:object-[72%_50%]"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[56%] bg-[linear-gradient(90deg,rgba(247,244,238,0.34)_0%,rgba(247,244,238,0.16)_56%,rgba(247,244,238,0)_100%)] md:block md:w-[52%]" />

            <div className="relative z-[1] flex h-full items-end justify-center pb-20 md:items-center md:justify-start md:pb-0">
              <motion.article
                className="max-w-[700px] px-5 text-center md:ml-36 md:px-10 md:text-left lg:ml-40"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.38 }}
                transition={{ duration: 0.82, ease: EASE_SECONDARY }}
              >
                <div className="mx-auto w-full max-w-[280px] md:mx-0 md:max-w-none">
                <p className="text-[12px] font-medium tracking-[3px] text-[#9a7a36]">TRUST & LOCATION</p>
                <h2 className="mt-4 font-serif text-[clamp(28px,5vw,38px)] leading-[1.08] font-medium text-[#1f2430] md:mt-7 md:max-w-[17ch] md:text-[3.35rem]">
                  {isMobileView ? "Based at Bharat Diamond Bourse" : (
                    <>
                      Based at Bharat
                      <br />
                      Diamond Bourse
                    </>
                  )}
                </h2>
                <motion.p
                  className="mt-4 max-w-[280px] text-[16px] leading-[1.7] text-[#384250] mx-auto md:mt-9 md:mx-0 md:max-w-[40ch] md:text-[1.16rem]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.82, delay: 0.1, ease: EASE_SECONDARY }}
                >
                  Operating from India&apos;s premier diamond trading hub.
                </motion.p>
                </div>
              </motion.article>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={certRef}
        data-theme="light"
        style={{ y: isMobileView ? 0 : certDrift }}
        className="relative -mt-1 overflow-hidden bg-[linear-gradient(180deg,#f7f3ec_0%,#f5f1ea_52%,#efe9df_100%)] py-[2.6rem] text-[#2c2a27] md:py-[3rem]"
        {...sectionReveal}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0)_38%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_76%,rgba(202,176,122,0.16)_0%,rgba(202,176,122,0)_36%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:radial-gradient(rgba(74,66,54,0.1)_0.42px,transparent_0.42px)] [background-size:2.8px_2.8px]" />

        <div className="relative mx-auto w-full max-w-[1320px] px-5 md:px-8">
          <div className="mx-auto w-full max-w-[70ch] text-center">
          <p className="text-[13px] tracking-[0.18em] text-[#4f473d] md:font-medium">INSTITUTIONAL CREDIBILITY</p>
          <p className="mt-4 mx-auto max-w-[58ch] font-serif text-[2.45rem] leading-[1.06] text-[#342f29] md:text-[3.65rem]">
            Recognized Across International Diamond Markets.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="text-[13px] tracking-[0.1em] text-[#7e6941] md:font-medium">GLOBAL INSTITUTIONAL ALIGNMENT</span>
          </div>
          </div>

          <div className="relative mt-6 md:mt-8">
            <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 border-y border-[#d9cdb6]/62 py-7 md:grid-cols-4 md:gap-6 md:py-9">
              {certifications.map((item, idx) => (
              <motion.article
                key={item.code}
                className="group relative flex h-full flex-col rounded-[1.2rem] border border-[#ddcfb5]/58 bg-[linear-gradient(180deg,rgba(255,252,246,0.7)_0%,rgba(247,241,232,0.56)_100%)] px-3 py-5 text-center shadow-[0_10px_24px_rgba(136,113,73,0.06)] transition-all duration-500 hover:scale-[1.045] hover:border-[#e8d6b6] hover:shadow-[0_14px_32px_rgba(136,113,73,0.11)] md:px-5 md:py-6"
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
            <p className="mx-auto mt-5 w-full max-w-[52ch] text-center text-[13px] tracking-[0.12em] text-[#655d52] md:font-medium">VERIFIED BY LEADING GLOBAL GEM & TRADE INSTITUTIONS</p>
          </div>
        </div>
      </motion.section>

      <motion.section ref={whyRef} data-theme="light" className="relative -mt-1 overflow-visible bg-[linear-gradient(180deg,#F7F4EE_0%,#F5F2EB_52%,#F3EFE7_100%)] text-[#2f2a24] md:h-auto" {...sectionReveal}>
        {isMobileView ? (
          <div className="relative mx-auto w-full max-w-[840px] px-5 py-12">
            <p className="text-center text-[13px] tracking-[0.14em] text-[#6f624f]">WHY CHOOSE D.P. JEWELS</p>
            <div className="mt-8 space-y-9">
              {whyChoosePoints.map((point, idx) => (
                <motion.article
                  key={`why-mobile-${point.num}`}
                  className="text-center"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: SOFT_EASE }}
                >
                  <p className="mb-2 text-[13px] tracking-[0.16em] text-[#8f7c5b]">{point.num}</p>
                  <h2 className="font-serif text-[2.1rem] leading-[1.05] text-[#29241f]">{point.title}</h2>
                  <p className="mx-auto mt-3 max-w-[30ch] text-[0.98rem] leading-[1.72] text-[#554b3f]">{point.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        ) : (
        <div ref={whyPinRef} className="relative h-[100svh] min-h-[100svh]">
          <p className="pointer-events-none absolute left-1/2 top-[12%] z-[2] -translate-x-1/2 whitespace-nowrap text-[13px] tracking-[0.14em] text-[#6f624f]">WHY CHOOSE D.P. JEWELS</p>
          <div className="absolute inset-0 z-[1] flex items-center justify-center px-5 md:px-8">
            {whyChoosePoints.map((point, idx) => (
              <article
                key={`why-slide-${point.num}`}
                ref={(node) => { whyProofRefs.current[idx] = node; }}
                className="absolute inset-0 flex items-center justify-center text-center"
              >
                <div className="w-full max-w-[52rem]">
                  <p className="mb-2 text-[13px] tracking-[0.16em] text-[#8f7c5b]">{point.num}</p>
                  <h2 className="font-serif text-[2.8rem] leading-[1.04] text-[#29241f] md:text-[4.4rem]">{point.title}</h2>
                  <p className="mx-auto mt-4 max-w-[34ch] text-[1.02rem] leading-[1.72] text-[#554b3f] md:text-[1.18rem] md:leading-[1.86]">{point.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(241,235,224,0)_0%,rgba(7,16,36,0.18)_100%)]" />
      </motion.section>

      <motion.section
        id="diamond-enquiry"
        ref={diamondEnquiryRef}
        data-theme="light"
        className="relative -mt-1 overflow-hidden bg-[linear-gradient(180deg,#F7F4EE_0%,#F5F2EB_56%,#F3EFE7_100%)] py-[2.8rem] md:py-[3.2rem]"
        {...sectionReveal}
      >
        <div className="relative mx-auto w-full max-w-[1320px] px-5 md:px-8">
          <div className="mx-auto w-full max-w-[720px] rounded-[18px] border border-[rgba(184,148,77,0.35)] bg-[#F7F4EE] p-5 text-[#07101f] shadow-[0_24px_60px_rgba(4,8,22,0.16)] md:p-7">
            <p className="text-[11px] tracking-[0.2em] text-[#b8944d] md:text-[12px]">DIAMOND ENQUIRY</p>
            <h3 className="mt-2 font-serif text-[2rem] leading-[1.05] text-[#07101f] md:text-[2.35rem]">Share Your Requirements</h3>

            <div className="mt-5 flex items-center gap-3 border-y border-[#d9c8a4]/70 py-3">
              <img
                src={selectedEnquiryDiamond.image}
                alt={`${selectedEnquiryDiamond.name} diamond preview`}
                className={`h-14 w-14 object-contain ${selectedEnquiryDiamond.normalizeClass}`}
                loading="eager"
                decoding="async"
              />
              <div>
                <p className="text-[11px] tracking-[0.14em] text-[#b8944d]">SELECTED DIAMOND</p>
                <p className="font-serif text-[1.3rem] leading-[1.05] text-[#07101f]">{selectedEnquiryDiamond.name}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="text-[12px] font-medium tracking-[0.08em] text-[#3b4656]">
                Diamond Shape
                <select value={enquiryForm.shape} onChange={(e) => handleEnquiryFormChange("shape", e.target.value)} className="mt-2 w-full rounded-md border border-[#d2c5ad] bg-white px-3 py-2 text-[14px] text-[#1f2937] focus:border-[#b8944d] focus:outline-none">
                  {diamondItems.map((item) => (
                    <option key={`shape-option-${item.name}`} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-[12px] font-medium tracking-[0.08em] text-[#3b4656]">
                Diamond Type
                <select value={enquiryForm.diamondType} onChange={(e) => handleEnquiryFormChange("diamondType", e.target.value)} className="mt-2 w-full rounded-md border border-[#d2c5ad] bg-white px-3 py-2 text-[14px] text-[#1f2937] focus:border-[#b8944d] focus:outline-none">
                  <option>Natural Diamond</option>
                  <option>Lab Grown Diamond</option>
                  <option>Any</option>
                </select>
              </label>
              <label className="text-[12px] font-medium tracking-[0.08em] text-[#3b4656]">
                Carat
                <select value={enquiryForm.carat} onChange={(e) => handleEnquiryFormChange("carat", e.target.value)} className="mt-2 w-full rounded-md border border-[#d2c5ad] bg-white px-3 py-2 text-[14px] text-[#1f2937] focus:border-[#b8944d] focus:outline-none">
                  <option>Below 1 ct</option>
                  <option>1–2 ct</option>
                  <option>2–3 ct</option>
                  <option>3 ct+</option>
                </select>
              </label>
              <label className="text-[12px] font-medium tracking-[0.08em] text-[#3b4656]">
                Color
                <select value={enquiryForm.color} onChange={(e) => handleEnquiryFormChange("color", e.target.value)} className="mt-2 w-full rounded-md border border-[#d2c5ad] bg-white px-3 py-2 text-[14px] text-[#1f2937] focus:border-[#b8944d] focus:outline-none">
                  <option>D–F</option>
                  <option>G–H</option>
                  <option>I+</option>
                  <option>Any</option>
                </select>
              </label>
              <label className="text-[12px] font-medium tracking-[0.08em] text-[#3b4656]">
                Clarity
                <select value={enquiryForm.clarity} onChange={(e) => handleEnquiryFormChange("clarity", e.target.value)} className="mt-2 w-full rounded-md border border-[#d2c5ad] bg-white px-3 py-2 text-[14px] text-[#1f2937] focus:border-[#b8944d] focus:outline-none">
                  <option>IF/VVS</option>
                  <option>VS</option>
                  <option>SI</option>
                  <option>Any</option>
                </select>
              </label>
              <label className="text-[12px] font-medium tracking-[0.08em] text-[#3b4656]">
                Certificate
                <select value={enquiryForm.certificate} onChange={(e) => handleEnquiryFormChange("certificate", e.target.value)} className="mt-2 w-full rounded-md border border-[#d2c5ad] bg-white px-3 py-2 text-[14px] text-[#1f2937] focus:border-[#b8944d] focus:outline-none">
                  <option>GIA</option>
                  <option>IGI</option>
                  <option>Any</option>
                </select>
              </label>
              <label className="text-[12px] font-medium tracking-[0.08em] text-[#3b4656] md:col-span-2">
                Name
                <input value={enquiryForm.name} onChange={(e) => handleEnquiryFormChange("name", e.target.value)} placeholder="Enter your name" className="mt-2 w-full rounded-md border border-[#d2c5ad] bg-white px-3 py-2 text-[14px] text-[#1f2937] focus:border-[#b8944d] focus:outline-none" />
              </label>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                submitEnquiryToWhatsApp();
              }}
              className="mt-6 w-full rounded-full border border-[#b8944d]/25 bg-[#07101f] px-5 py-3 text-[12px] font-medium tracking-[0.14em] text-[#F7F4EE] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#10203b] hover:text-[#f6ead2]"
            >
              SEND ENQUIRY ON WHATSAPP
            </button>
          </div>
        </div>
      </motion.section>

      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp Enquiry" className="floating-wa">
        <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" fill="currentColor">
          <path d="M19.11 4.89A9.86 9.86 0 0 0 12.06 2C6.64 2 2.22 6.42 2.22 11.84c0 1.74.45 3.44 1.31 4.95L2 22l5.36-1.49a9.8 9.8 0 0 0 4.69 1.2h.01c5.42 0 9.84-4.42 9.84-9.84a9.78 9.78 0 0 0-2.79-6.98Zm-7.05 15.2h-.01a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.18.88.85-3.1-.2-.32a8.13 8.13 0 0 1-1.24-4.4c0-4.48 3.64-8.13 8.12-8.13 2.17 0 4.2.84 5.73 2.38a8.05 8.05 0 0 1 2.39 5.74c0 4.48-3.65 8.13-8.14 8.13Zm4.46-6.1c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.17-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.08 3.6.57.25 1.02.4 1.37.52.58.18 1.1.15 1.51.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>
    </div>
  );
}




