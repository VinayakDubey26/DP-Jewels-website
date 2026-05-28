import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const EASE_PRIMARY: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SECONDARY: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function LoadingScreen({ done }: { done: boolean }) {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobileView(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (done) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: isMobileView ? 0.62 : 0.68, ease: EASE_SECONDARY }}
      className="fixed inset-0 z-[100] flex translate-z-0 items-center justify-center bg-white pointer-events-auto [will-change:opacity,transform]"
    >
      <motion.img
        src="/logo-black.png"
        alt="D.P. Jewels"
        className="h-auto w-[min(600px,86vw)] translate-z-0 object-contain [will-change:opacity,transform]"
        initial={{ opacity: 0, scale: isMobileView ? 0.985 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: isMobileView ? 0.66 : 0.7, ease: EASE_PRIMARY }}
      />
    </motion.div>
  );
}

