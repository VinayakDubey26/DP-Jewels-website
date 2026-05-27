import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import smallLogoWhite from "../assets/logo/small_logo-white.svg";
import smallLogoBlack from "../assets/logo/small_logo-black.svg";

type LogoTheme = "white" | "black";

const SMALL_LOGO_BY_THEME: Record<LogoTheme, string> = {
  white: smallLogoWhite,
  black: smallLogoBlack,
};
const FULL_HERO_LOGO_SRC = "/logo-white.png";
const EASE_PRIMARY: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SECONDARY: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function Navbar() {
  const [logoTheme, setLogoTheme] = useState<LogoTheme>("black");
  const [isHeroActive, setIsHeroActive] = useState(true);
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

    const updateHeroVisibility = () => {
      const heroSection = document.getElementById("home");
      if (!heroSection) return;
      const heroRect = heroSection.getBoundingClientRect();
      const headerRect = headerRef.current?.getBoundingClientRect();
      const headerBottom = headerRect?.bottom ?? 72;
      const heroVisible = heroRect.bottom > headerBottom;
      setIsHeroActive((prev) => (prev === heroVisible ? prev : heroVisible));
    };

    let rafId = 0;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        applyThemeWithBuffer();
        updateHeroVisibility();
      });
    };

    applyThemeWithBuffer();
    updateHeroVisibility();
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
    <>
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.02, ease: EASE_PRIMARY, delay: 0.04 }}
        className="fixed inset-x-0 top-[18px] z-[110] md:top-[-10px]"
      >
        <nav className="mx-auto flex h-[52px] w-full max-w-[1440px] items-center px-4 md:h-[104px] md:max-w-none md:px-2 lg:px-3">
          <motion.div
            className="flex w-full items-center justify-end md:hidden"
            initial={false}
            animate={{ opacity: isHeroActive ? 0 : 1 }}
            transition={{ duration: 0.36, ease: EASE_SECONDARY }}
            aria-hidden={isHeroActive}
          >
            <motion.img
              key={`mobile-${logoTheme}`}
              src={SMALL_LOGO_BY_THEME[logoTheme]}
              alt="DP Jewels Logo"
              fetchPriority="high"
              decoding="async"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.56, ease: EASE_SECONDARY }}
              className="navbar-logo h-[46px] w-auto max-w-none object-contain"
            />
          </motion.div>

          <motion.div
            className="hidden h-full w-[220px] items-center justify-start md:flex md:pl-0.5"
            initial={false}
            animate={{ opacity: isHeroActive ? 0 : 1 }}
            transition={{ duration: 0.36, ease: EASE_SECONDARY }}
            aria-hidden={isHeroActive}
          >
            <motion.img
              key={logoTheme}
              src={SMALL_LOGO_BY_THEME[logoTheme]}
              alt="DP Jewels Logo"
              fetchPriority="high"
              decoding="async"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.56, ease: EASE_SECONDARY }}
              className="navbar-logo h-[48px] w-auto max-w-none object-contain lg:h-[53px]"
            />
          </motion.div>
          <div className="hidden flex-1 md:block" aria-hidden />
        </nav>
      </motion.header>

      <motion.a
        href="#home"
        className="pointer-events-auto fixed inset-x-0 top-[14px] z-[109] flex justify-start pl-4 md:top-[10px] md:pl-8 lg:pl-12"
        initial={false}
        animate={{ opacity: isHeroActive ? 1 : 0 }}
        transition={{ duration: 0.42, ease: EASE_SECONDARY }}
        style={{ pointerEvents: isHeroActive ? "auto" : "none" }}
        aria-hidden={!isHeroActive}
      >
        <img
          src={FULL_HERO_LOGO_SRC}
          alt="DP Jewels Logo"
          fetchPriority="high"
          decoding="async"
          className="w-[136px] object-contain sm:w-[142px] md:w-[166px] lg:w-[188px]"
        />
      </motion.a>
    </>
  );
}

