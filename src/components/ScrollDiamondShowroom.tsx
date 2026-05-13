import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

type Props = {
  targetRef: RefObject<HTMLElement | null>;
};

export default function ScrollDiamondShowroom({ targetRef }: Props) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.62, 0.15]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [6, -16]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 14]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 1.8]);
  const bright = useTransform(scrollYProgress, [0, 1], [1.1, 0.78]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.15]);
  const facetA = useTransform(scrollYProgress, [0, 1], [0.85, 0.3]);
  const facetB = useTransform(scrollYProgress, [0, 1], [0.6, 0.95]);
  const filter = useMotionTemplate`brightness(${bright}) blur(${blur}px)`;

  return (
    <motion.div
      className="showroom-diamond"
      style={{ scale, opacity, rotateX, rotateY, rotate, y, x, filter }}
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={reduceMotion ? undefined : { duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <motion.div className="diamond-glow" style={{ opacity: glowOpacity }} />
      <svg viewBox="0 0 560 560" className="showroom-diamond-svg" role="presentation">
        <defs>
          <linearGradient id="dd-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(233,240,252,0.9)" />
            <stop offset="45%" stopColor="rgba(142,164,196,0.3)" />
            <stop offset="100%" stopColor="rgba(226,232,240,0.82)" />
          </linearGradient>
          <linearGradient id="dd-left" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(171,201,238,0.25)" />
            <stop offset="100%" stopColor="rgba(24,41,70,0.2)" />
          </linearGradient>
          <linearGradient id="dd-right" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(194,214,242,0.3)" />
            <stop offset="100%" stopColor="rgba(29,47,77,0.14)" />
          </linearGradient>
        </defs>

        <motion.polygon points="280,60 438,192 280,500 122,192" fill="rgba(147,197,253,0.08)" style={{ opacity: facetA }} />
        <motion.polygon points="280,60 122,192 280,250" fill="url(#dd-left)" stroke="url(#dd-edge)" strokeWidth="1.2" style={{ opacity: facetA }} />
        <motion.polygon points="280,60 438,192 280,250" fill="url(#dd-right)" stroke="url(#dd-edge)" strokeWidth="1.2" style={{ opacity: facetB }} />
        <motion.polygon points="122,192 280,250 208,370" fill="url(#dd-right)" stroke="url(#dd-edge)" strokeWidth="1.1" style={{ opacity: facetA }} />
        <motion.polygon points="438,192 280,250 352,370" fill="url(#dd-left)" stroke="url(#dd-edge)" strokeWidth="1.1" style={{ opacity: facetB }} />
        <motion.polygon points="208,370 280,500 280,250" fill="url(#dd-left)" stroke="url(#dd-edge)" strokeWidth="1.2" style={{ opacity: facetA }} />
        <motion.polygon points="352,370 280,500 280,250" fill="url(#dd-right)" stroke="url(#dd-edge)" strokeWidth="1.2" style={{ opacity: facetB }} />

        <polyline points="280,60 438,192 352,370 280,500 208,370 122,192 280,60" fill="none" stroke="url(#dd-edge)" strokeWidth="1.8" />
        <motion.line x1="122" y1="192" x2="438" y2="192" stroke="rgba(226,232,240,0.62)" strokeWidth="1" style={{ opacity: facetB }} />
        <motion.line x1="280" y1="60" x2="280" y2="500" stroke="rgba(226,232,240,0.48)" strokeWidth="1" style={{ opacity: facetA }} />
      </svg>
      <motion.span
        className="showroom-diamond-sweep"
        animate={reduceMotion ? undefined : { x: ["-145%", "145%"] }}
        transition={reduceMotion ? undefined : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
