import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logoWhite from "../assets/logo-white.svg";
import logoBlack from "../assets/logo-black.svg";

type LogoTheme = "white" | "black";

const LOGO_BY_THEME: Record<LogoTheme, string> = {
  white: logoWhite,
  black: logoBlack,
};
const EASE_PRIMARY: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SECONDARY: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function Navbar() {
  const [logoTheme, setLogoTheme] = useState<LogoTheme>("black");
  const headerRef = useRef<HTMLElement>(null);
  const currentThemeRef = useRef<LogoTheme>("black");
  const pendingThemeRef = useRef<LogoTheme | null>(null);
  const pendingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const clearPendingTimer = () => {
      if (pendingTimerRef.current !== null) {
        window.clearTimeout(pendingTimerRef.current);
        pendingTimerRef.current = null;
      }
    };

    const getThemeFromSection = () => {
      const headerRect = headerRef.current?.getBoundingClientRect();
      const headerBottom = headerRect?.bottom ?? 68;
      const probeX = Math.round(window.innerWidth * 0.5);
      const probeYPrimary = Math.min(window.innerHeight - 1, Math.max(0, Math.round(headerBottom + 10)));
      const probeYSecondary = Math.min(window.innerHeight - 1, Math.max(0, Math.round(headerBottom + 24)));
      const primary = document.elementFromPoint(probeX, probeYPrimary)?.closest<HTMLElement>("[data-theme]");
      const secondary = document.elementFromPoint(probeX, probeYSecondary)?.closest<HTMLElement>("[data-theme]");
      const primaryTheme = primary?.dataset.theme === "dark" ? "white" : "black";
      const secondaryTheme = secondary?.dataset.theme === "dark" ? "white" : primaryTheme;
      return primaryTheme === secondaryTheme ? primaryTheme : currentThemeRef.current;
    };

    const applyThemeWithBuffer = () => {
      const nextTheme = getThemeFromSection();
      if (nextTheme === currentThemeRef.current) {
        pendingThemeRef.current = null;
        clearPendingTimer();
        return;
      }
      if (pendingThemeRef.current === nextTheme) return;
      pendingThemeRef.current = nextTheme;
      clearPendingTimer();
      pendingTimerRef.current = window.setTimeout(() => {
        currentThemeRef.current = nextTheme;
        setLogoTheme(nextTheme);
        pendingThemeRef.current = null;
      }, 140);
    };

    let rafId = 0;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        applyThemeWithBuffer();
      });
    };

    applyThemeWithBuffer();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("orientationchange", onScrollOrResize, { passive: true });

    return () => {
      clearPendingTimer();
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("orientationchange", onScrollOrResize);
    };
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.02, ease: EASE_PRIMARY, delay: 0.04 }}
      className="fixed right-5 top-[18px] z-[110] md:inset-x-0 md:top-[-4px]"
    >
      <nav className="flex h-[52px] w-auto items-center justify-end px-0 md:h-[104px] md:w-full md:justify-start md:px-5 lg:px-6">
        <div className="flex h-full w-[128px] items-center justify-end md:w-[220px] md:justify-start">
          <a href="#home" className="inline-flex items-center">
            <motion.img
              key={logoTheme}
              src={logoTheme === "white" ? logoWhite : logoBlack}
              alt="DP Jewels Logo"
              fetchPriority="high"
              decoding="async"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.56, ease: EASE_SECONDARY }}
              className="navbar-logo h-[42px] w-auto max-w-none object-contain md:h-[64px] lg:h-[72px]"
            />
          </a>
        </div>
        <div className="flex-1" aria-hidden />
      </nav>
    </motion.header>
  );
}

