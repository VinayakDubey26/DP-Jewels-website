import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "OUR STORY", id: "our-story" },
  { label: "OPERATIONS", id: "operations" },
  { label: "SUSTAINABILITY", id: "sustainability" },
  { label: "MEDIA", id: "media" },
  { label: "CONTACT US", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("our-story");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const checkpoints = links
        .map((link) => document.getElementById(link.id))
        .filter((node): node is HTMLElement => Boolean(node));
      let current = "our-story";
      checkpoints.forEach((node) => {
        if (window.scrollY >= node.offsetTop - 180) current = node.id;
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <nav
        className={`mx-auto flex w-[min(1220px,94%)] items-center justify-between rounded-full border px-5 py-3 transition-all md:px-7 ${
          scrolled ? "border-white/15 bg-[var(--surface-nav)] backdrop-blur-xl" : "border-white/10 bg-transparent"
        }`}
      >
        <a href="#home" className="font-serif text-base tracking-[0.2em] md:text-lg">D.P. JEWELS</a>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="group text-xs tracking-[0.12em] text-[var(--text-muted)]">
              {item.label}
              <span className={`mt-1 block h-px origin-left bg-[var(--text-main)] transition-transform ${active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={toggleTheme} className="rounded-full border border-white/20 p-2" aria-label="theme toggle">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <MagneticButton href="#enquiry" className="px-5 py-2 text-xs tracking-[0.12em]">ENQUIRE NOW</MagneticButton>
        </div>
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 w-[min(1220px,94%)] rounded-3xl border border-white/15 bg-[var(--surface-nav)] p-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="text-sm tracking-[0.1em] text-[var(--text-muted)]">{item.label}</a>
            ))}
            <div className="mt-2 flex gap-3">
              <button onClick={toggleTheme} className="rounded-full border border-white/20 p-2">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
              <a href="#enquiry" onClick={() => setOpen(false)} className="rounded-full border border-white/20 px-4 py-2 text-sm">ENQUIRE NOW</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
