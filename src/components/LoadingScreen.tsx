import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ done }: { done: boolean }) {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobileView(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: isMobileView ? 0.62 : 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-[100] flex translate-z-0 items-center justify-center bg-white [will-change:opacity,transform] ${done ? "pointer-events-none" : ""}`}
    >
      <motion.img
        src="/logo-black.png"
        alt="D.P. Jewels"
        className="h-auto w-[min(600px,86vw)] translate-z-0 object-contain [will-change:opacity,transform]"
        initial={{ opacity: 0, scale: isMobileView ? 0.985 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: isMobileView ? 0.72 : 0.9, ease: "easeOut" }}
      />
    </motion.div>
  );
}
