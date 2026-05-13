import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { RefObject } from "react";

type ScrollDiamondProps = {
  targetRef: RefObject<HTMLElement | null>;
};

function DiamondFacet({ points, fill, stroke, opacity }: { points: string; fill: string; stroke: string; opacity?: number }) {
  return <polygon points={points} fill={fill} stroke={stroke} strokeWidth="1.1" opacity={opacity ?? 1} />;
}

export default function ScrollDiamond({ targetRef }: ScrollDiamondProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.55, 0.18]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1.08, 0.86]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 1.8]);
  const idleFloat = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const filter = useMotionTemplate`brightness(${brightness}) blur(${blur}px)`;

  return (
    <motion.div
      className="scroll-diamond-wrap"
      style={{ scale, rotate, y, x, opacity, filter }}
      animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
      transition={reduceMotion ? undefined : { duration: 8.6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <motion.div className="scroll-diamond-core" style={{ y: reduceMotion ? 0 : idleFloat }}>
        <svg viewBox="0 0 420 420" className="scroll-diamond-svg" role="presentation">
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(235,241,250,0.78)" />
              <stop offset="55%" stopColor="rgba(168,185,210,0.32)" />
              <stop offset="100%" stopColor="rgba(233,238,247,0.66)" />
            </linearGradient>
            <linearGradient id="facetA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(230,238,250,0.26)" />
              <stop offset="100%" stopColor="rgba(72,96,136,0.08)" />
            </linearGradient>
            <linearGradient id="facetB" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(198,213,236,0.22)" />
              <stop offset="100%" stopColor="rgba(35,51,78,0.1)" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="rgba(238,244,252,0.28)" />
              <stop offset="100%" stopColor="rgba(16,24,39,0)" />
            </radialGradient>
          </defs>

          <polygon points="210,56 322,148 210,352 98,148" fill="url(#glow)" opacity="0.9" />
          <DiamondFacet points="210,56 98,148 210,184" fill="url(#facetA)" stroke="url(#edge)" />
          <DiamondFacet points="210,56 322,148 210,184" fill="url(#facetB)" stroke="url(#edge)" />
          <DiamondFacet points="98,148 210,184 162,274" fill="url(#facetB)" stroke="url(#edge)" opacity={0.92} />
          <DiamondFacet points="322,148 210,184 258,274" fill="url(#facetA)" stroke="url(#edge)" opacity={0.92} />
          <DiamondFacet points="162,274 210,352 210,184" fill="url(#facetA)" stroke="url(#edge)" />
          <DiamondFacet points="258,274 210,352 210,184" fill="url(#facetB)" stroke="url(#edge)" />
          <polyline points="210,56 322,148 258,274 210,352 162,274 98,148 210,56" fill="none" stroke="url(#edge)" strokeWidth="1.4" />
          <line x1="98" y1="148" x2="322" y2="148" stroke="rgba(234,241,251,0.4)" strokeWidth="1" />
          <line x1="210" y1="56" x2="210" y2="352" stroke="rgba(234,241,251,0.35)" strokeWidth="1" />
        </svg>
        <motion.span
          className="diamond-sweep"
          animate={reduceMotion ? undefined : { x: ["-120%", "130%"] }}
          transition={reduceMotion ? undefined : { duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
