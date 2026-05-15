import { motion } from "framer-motion";

export default function LoadingScreen({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white ${done ? "pointer-events-none" : ""}`}
    >
      <motion.img
        src="/logo-black.png"
        alt="D.P. Jewels"
        className="h-auto w-[min(600px,86vw)] object-contain"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </motion.div>
  );
}
