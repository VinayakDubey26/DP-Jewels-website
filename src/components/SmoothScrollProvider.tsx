import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type Props = {
  children: ReactNode;
};

let sharedLenis: Lenis | null = null;
let subscribers = 0;
let tickerBound = false;
let anchorsBound = false;
let removeAnchorListeners: (() => void) | null = null;

const lenisRaf = (timeSeconds: number) => {
  if (!sharedLenis) return;
  sharedLenis.raf(timeSeconds * 1000);
};

const bindAnchorNavigation = () => {
  if (anchorsBound) return;
  anchorsBound = true;

  const onAnchorClick = (event: MouseEvent) => {
    if (!sharedLenis) return;
    const target = event.target as Element | null;
    const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const element = document.querySelector<HTMLElement>(href);
    if (!element) return;

    event.preventDefault();
    sharedLenis.scrollTo(element, { duration: 1.02 });
    window.history.pushState(null, "", href);
  };

  document.addEventListener("click", onAnchorClick);
  removeAnchorListeners = () => document.removeEventListener("click", onAnchorClick);
};

const unbindAnchorNavigation = () => {
  removeAnchorListeners?.();
  removeAnchorListeners = null;
  anchorsBound = false;
};

const createLenis = () => {
  if (sharedLenis) return sharedLenis;

  gsap.registerPlugin(ScrollTrigger);
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return null;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  sharedLenis = new Lenis({
    duration: isMobile ? 0.72 : 1.02,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    syncTouch: !isMobile,
    touchMultiplier: 1,
    wheelMultiplier: 1,
  });

  sharedLenis.on("scroll", ScrollTrigger.update);

  if (!tickerBound) {
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);
    tickerBound = true;
  }

  bindAnchorNavigation();
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return sharedLenis;
};

const destroyLenis = () => {
  if (!sharedLenis) return;

  sharedLenis.off("scroll", ScrollTrigger.update);
  sharedLenis.destroy();
  sharedLenis = null;

  if (tickerBound) {
    gsap.ticker.remove(lenisRaf);
    tickerBound = false;
  }

  unbindAnchorNavigation();
};

export default function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    const prevBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    subscribers += 1;
    createLenis();

    if (window.location.hash && sharedLenis) {
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (target) {
        requestAnimationFrame(() => {
          sharedLenis?.scrollTo(target, { immediate: true });
        });
      }
    }

    return () => {
      subscribers -= 1;
      if (subscribers <= 0) {
        destroyLenis();
        subscribers = 0;
      }
      document.documentElement.style.scrollBehavior = prevBehavior;
    };
  }, []);

  return <>{children}</>;
}
