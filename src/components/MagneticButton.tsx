import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function MagneticButton({ children, href, className, type = "button", onClick }: Props) {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18 });
  const y = useSpring(my, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mx.set((px - rect.width / 2) * 0.09);
    my.set((py - rect.height / 2) * 0.09);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const shared = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `magnetic-btn cta-btn ${className ?? ""}`,
    style: reduceMotion ? undefined : { x, y },
  };

  if (href) {
    return (
      <motion.a href={href} {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...shared}>
      {children}
    </motion.button>
  );
}
