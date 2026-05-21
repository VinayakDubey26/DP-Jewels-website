import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex w-[min(1220px,94%)] items-start px-2 pt-0 md:px-0 md:pt-0">
        <a href="#home" className="inline-flex items-center">
          <img src="/logo-white.png" alt="D.P. Jewels" width={166} height={52} fetchPriority="high" decoding="async" className="h-[42px] w-auto object-contain md:h-[52px]" />
        </a>
      </nav>
    </motion.header>
  );
}
