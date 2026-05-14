import { motion } from "framer-motion";

export default function LoadingScreen({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0d1528] ${done ? "pointer-events-none" : ""}`}
    >
      <div className="w-80 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative inline-block overflow-hidden font-serif text-4xl tracking-[0.14em] text-[#CBD5E1]"
        >
          D.P. Jewels
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(248,250,252,0.6),transparent)]"
            animate={{ x: ["-120%", "260%"] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.45 }}
          />
        </motion.p>
        <div className="mt-10 h-[1px] w-full overflow-hidden bg-white/15">
          <motion.div
            className="h-full bg-white/70"
            initial={{ x: "-100%" }}
            animate={{ x: done ? "0%" : "65%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
