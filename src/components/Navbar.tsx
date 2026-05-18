import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "DIAMONDS", id: "diamonds" },
  { label: "OPERATIONS", id: "operations" },
  { label: "CONTACT US", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const checkpoints = links
        .map((link) => document.getElementById(link.id))
        .filter((node): node is HTMLElement => Boolean(node));
      let current = "home";
      checkpoints.forEach((node) => {
        if (window.scrollY >= node.offsetTop - 180) current = node.id;
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "border-white/12 bg-[#040816]/82 backdrop-blur-[14px] shadow-[0_10px_26px_rgba(2,6,18,0.24)]" : "border-transparent bg-transparent"}`}
    >
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent transition-opacity duration-700 ${scrolled ? "opacity-100" : "opacity-0"}`} />
      <nav className="mx-auto flex w-[min(1220px,94%)] items-center justify-between px-2 py-2 md:px-0 md:py-2.5">
        <a href="#home" className="inline-flex items-center">
          <img src="/logo-white.png" alt="D.P. Jewels" className="h-[42px] w-auto object-contain md:h-[52px]" />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="group editorial-link text-xs tracking-[0.12em] text-[#F8F4EC]/88 transition-all duration-500 hover:text-[#f8f4ec]">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex">
          <a href="#contact" className="lux-hover-lift inline-flex h-9 items-center border border-[#E2E8F0] bg-[#F8F4EC] px-5 text-xs tracking-[0.12em] text-[#111827] transition-all duration-500 hover:bg-white hover:shadow-[0_10px_22px_rgba(15,23,42,0.16)]">
            ENQUIRE NOW
          </a>
        </div>

        <button className="text-[#F8F4EC] lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mb-3 w-[min(1220px,94%)] border border-white/12 bg-[#040816]/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="text-sm tracking-[0.1em] text-[#F8F4EC]">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex w-fit border border-[#E2E8F0] bg-[#F8F4EC] px-4 py-2 text-sm text-[#111827]">
              ENQUIRE NOW
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
