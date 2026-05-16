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

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-out ${scrolled ? "border-white/10 bg-[#050505]/92 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
      <nav className="mx-auto flex w-[min(1220px,94%)] items-center justify-between px-2 py-2 md:px-0 md:py-2.5">
        <a href="#home" className="inline-flex items-center">
          <img src="/logo-white.png" alt="D.P. Jewels" className="h-[52px] w-auto object-contain md:h-[64px]" />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="group text-xs tracking-[0.12em] text-[#F8F4EC]">
              {item.label}
              <span className={`mt-1 block h-px origin-left bg-[#CBD5E1] transition-transform ${active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex">
          <a href="#contact" className="inline-flex rounded-full border border-[#E2E8F0] bg-[#F8F4EC] px-5 py-2 text-xs tracking-[0.12em] text-[#111827] transition-colors hover:bg-white">
            ENQUIRE NOW
          </a>
        </div>

        <button className="text-[#F8F4EC] lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mb-3 w-[min(1220px,94%)] rounded-2xl border border-white/10 bg-[#0B0B0B] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.28)] lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="text-sm tracking-[0.1em] text-[#F8F4EC]">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex w-fit rounded-full border border-[#E2E8F0] bg-[#F8F4EC] px-4 py-2 text-sm text-[#111827]">
              ENQUIRE NOW
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
