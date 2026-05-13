import { motion } from "framer-motion";

export default function LoadingScreen({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0d1528] ${done ? "pointer-events-none" : ""}`}
    >
      <div className="w-72 text-center">
        <p className="font-serif text-4xl tracking-[0.3em] text-[var(--text-main)]">D.P.</p>
        <p className="mt-2 font-serif text-xl tracking-[0.22em] text-[var(--text-main)]">JEWELS</p>
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

