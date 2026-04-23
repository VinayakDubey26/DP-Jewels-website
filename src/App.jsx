import { useState, useEffect, useRef, useCallback } from "react";

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:      #040507;
    --deep:       #080c12;
    --charcoal:   #0d1117;
    --surface:    #111520;
    --glass:      rgba(255,255,255,0.035);
    --glass-b:    rgba(255,255,255,0.08);
    --silver:     #c8cdd6;
    --platinum:   #e8eaf0;
    --dim:        #6b7280;
    --glow-b:     #5b8fff;
    --glow-w:     rgba(200,210,255,0.15);
    --gold:       #c9a96e;
    --serif:      'Cormorant Garamond', Georgia, serif;
    --sans:       'Jost', system-ui, sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--silver);
    font-family: var(--sans);
    font-weight: 300;
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom cursor */
  .cursor {
    position: fixed; width: 8px; height: 8px;
    background: var(--platinum); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    transition: transform 0.1s, width 0.3s, height 0.3s, background 0.3s;
  }
  .cursor-ring {
    position: fixed; width: 36px; height: 36px;
    border: 1px solid rgba(200,210,255,0.4); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%);
    transition: transform 0.18s ease-out, width 0.3s, height 0.3s, border-color 0.3s;
  }
  body:has(a:hover) .cursor, body:has(button:hover) .cursor { width: 14px; height: 14px; background: var(--glow-b); }
  body:has(a:hover) .cursor-ring, body:has(button:hover) .cursor-ring { width: 50px; height: 50px; border-color: var(--glow-b); }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--dim); border-radius: 2px; }

  /* ── Diamond geometry ── */
  .diamond-svg { filter: drop-shadow(0 0 40px rgba(91,143,255,0.5)) drop-shadow(0 0 80px rgba(91,143,255,0.2)); }

  @keyframes diamondFloat {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    33%      { transform: translateY(-18px) rotate(1.5deg); }
    66%      { transform: translateY(-8px) rotate(-1deg); }
  }
  @keyframes diamondPulse {
    0%,100% { filter: drop-shadow(0 0 40px rgba(91,143,255,0.5)) drop-shadow(0 0 80px rgba(91,143,255,0.2)); }
    50%      { filter: drop-shadow(0 0 60px rgba(91,143,255,0.8)) drop-shadow(0 0 120px rgba(91,143,255,0.35)); }
  }
  .diamond-animate { animation: diamondFloat 7s ease-in-out infinite, diamondPulse 4s ease-in-out infinite; }

  @keyframes sparkle {
    0%,100% { opacity:0; transform: scale(0) rotate(0deg); }
    50%      { opacity:1; transform: scale(1) rotate(180deg); }
  }
  .sparkle { animation: sparkle var(--dur,2s) ease-in-out infinite; animation-delay: var(--delay,0s); }

  @keyframes fadeUp {
    from { opacity:0; transform: translateY(40px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); } to { transform: scaleX(1); }
  }

  .reveal { opacity:0; transform: translateY(35px); transition: opacity 0.85s cubic-bezier(.22,1,.36,1), transform 0.85s cubic-bezier(.22,1,.36,1); }
  .reveal.visible { opacity:1; transform: translateY(0); }

  /* Nav */
  .nav-glass {
    background: rgba(4,5,7,0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  /* Glow button */
  .btn-glow {
    position: relative; overflow: hidden;
    background: transparent;
    border: 1px solid rgba(200,210,255,0.25);
    color: var(--platinum);
    font-family: var(--sans);
    font-weight: 400; letter-spacing: 0.15em;
    text-transform: uppercase; font-size: 0.7rem;
    padding: 14px 36px; cursor: none;
    transition: border-color 0.3s, color 0.3s;
  }
  .btn-glow::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(91,143,255,0.15), rgba(200,210,255,0.05));
    opacity:0; transition: opacity 0.3s;
  }
  .btn-glow:hover { border-color: rgba(91,143,255,0.6); color: #fff; }
  .btn-glow:hover::before { opacity:1; }
  .btn-glow:active { transform: scale(0.97); }

  .btn-primary {
    background: linear-gradient(135deg, rgba(91,143,255,0.2), rgba(140,180,255,0.1));
    border: 1px solid rgba(91,143,255,0.4);
    color: var(--platinum);
    box-shadow: 0 0 30px rgba(91,143,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .btn-primary:hover {
    border-color: rgba(91,143,255,0.8);
    box-shadow: 0 0 50px rgba(91,143,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  /* Cards */
  .card-glass {
    background: var(--glass);
    border: 1px solid rgba(255,255,255,0.06);
    backdrop-filter: blur(12px);
    transition: transform 0.4s cubic-bezier(.22,1,.36,1), border-color 0.4s, box-shadow 0.4s;
  }
  .card-glass:hover {
    transform: translateY(-8px);
    border-color: rgba(91,143,255,0.2);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(91,143,255,0.08);
  }

  /* Collection grid */
  .gem-card { position: relative; overflow: hidden; cursor: none; }
  .gem-card::after {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(91,143,255,0), rgba(91,143,255,0.15));
    opacity:0; transition: opacity 0.4s;
  }
  .gem-card:hover::after { opacity:1; }
  .gem-card:hover img, .gem-card:hover .gem-placeholder { transform: scale(1.06); }
  .gem-card img, .gem-placeholder { transition: transform 0.6s cubic-bezier(.22,1,.36,1); }
  .gem-card:hover { box-shadow: 0 0 0 1px rgba(91,143,255,0.3), 0 20px 60px rgba(0,0,0,0.5); }

  /* Process line */
  .process-line { background: linear-gradient(90deg, var(--glow-b), transparent); transform-origin: left; }

  /* Testimonial */
  @keyframes slideIn { from { opacity:0; transform: translateX(30px); } to { opacity:1; transform: translateX(0); } }
  .testimonial-active { animation: slideIn 0.5s ease-out forwards; }

  /* Stat counter */
  @keyframes countUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }

  /* Input focus glow */
  .input-luxury {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: var(--platinum);
    font-family: var(--sans);
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    width: 100%;
  }
  .input-luxury::placeholder { color: var(--dim); }
  .input-luxury:focus {
    border-color: rgba(91,143,255,0.5);
    box-shadow: 0 0 0 1px rgba(91,143,255,0.15), 0 0 20px rgba(91,143,255,0.1);
  }

  /* Section heading */
  .section-label {
    font-family: var(--sans); font-weight: 400; font-size: 0.65rem;
    letter-spacing: 0.35em; text-transform: uppercase; color: var(--glow-b);
  }
  .section-title {
    font-family: var(--serif); font-weight: 300;
    color: var(--platinum); line-height: 1.15;
  }

  /* Noise grain overlay */
  .grain::before {
    content:''; position:fixed; inset:0; z-index:1000; pointer-events:none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  /* Divider */
  .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); }

  @media (max-width: 768px) {
    .cursor, .cursor-ring { display: none; }
    body { cursor: auto; }
  }
`;

/* ─── DIAMOND SVG ─────────────────────────────────────────────────────── */
const DiamondSVG = ({ size = 340 }) => (
  <svg width={size} height={size} viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="diamond-svg diamond-animate">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#b8ccff" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#4060c0" stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id="g2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#dde8ff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1a2a60" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#2040a0" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="g4" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0a1840" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#5080e0" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="g5" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#3060c0" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="gEdge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#80a0ff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#2040a0" stopOpacity="0.3" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {/* Outer girdle — crown top */}
    <polygon points="170,30 280,130 170,160 60,130" fill="url(#g1)" opacity="0.95" />
    {/* Crown facets */}
    <polygon points="170,30 225,80 170,160" fill="url(#g3)" opacity="0.9" />
    <polygon points="170,30 115,80 170,160" fill="url(#g2)" opacity="0.85" />
    <polygon points="170,30 280,130 225,80" fill="url(#g5)" opacity="0.7" />
    <polygon points="170,30 60,130 115,80" fill="url(#g4)" opacity="0.75" />
    <polygon points="225,80 280,130 170,160" fill="url(#g2)" opacity="0.6" />
    <polygon points="115,80 60,130 170,160" fill="url(#g1)" opacity="0.5" />
    {/* Pavilion */}
    <polygon points="60,130 170,160 170,305" fill="url(#g4)" opacity="0.9" />
    <polygon points="280,130 170,160 170,305" fill="url(#g2)" opacity="0.85" />
    <polygon points="60,130 170,305 115,190" fill="url(#g3)" opacity="0.7" />
    <polygon points="280,130 170,305 225,190" fill="url(#g5)" opacity="0.65" />
    <polygon points="60,130 170,160 115,190" fill="url(#g1)" opacity="0.55" />
    <polygon points="280,130 170,160 225,190" fill="url(#g2)" opacity="0.5" />
    {/* Culet highlight */}
    <circle cx="170" cy="305" r="3" fill="white" opacity="0.9" filter="url(#glow)" />
    {/* Edge lines */}
    <g stroke="url(#gEdge)" strokeWidth="0.6" opacity="0.7" fill="none">
      <polygon points="170,30 280,130 170,160 60,130" />
      <line x1="170" y1="30" x2="170" y2="160" />
      <line x1="170" y1="30" x2="225" y2="80" />
      <line x1="170" y1="30" x2="115" y2="80" />
      <line x1="60" y1="130" x2="170" y2="305" />
      <line x1="280" y1="130" x2="170" y2="305" />
      <line x1="170" y1="160" x2="170" y2="305" />
      <line x1="170" y1="160" x2="115" y2="190" />
      <line x1="170" y1="160" x2="225" y2="190" />
    </g>
    {/* Highlight streak */}
    <line x1="170" y1="35" x2="240" y2="100" stroke="white" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
    <circle cx="175" cy="42" r="4" fill="white" opacity="0.8" filter="url(#glow)" />
  </svg>
);

/* ─── SPARKLES ───────────────────────────────────────────────────────── */
const Sparkle = ({ x, y, size = 12, delay = 0, dur = 2.5 }) => (
  <div className="sparkle" style={{
    position: 'absolute', left: `${x}%`, top: `${y}%`,
    '--dur': `${dur}s`, '--delay': `${delay}s`,
    width: size, height: size, pointerEvents: 'none'
  }}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill="rgba(200,220,255,0.9)" />
    </svg>
  </div>
);

/* ─── HOOK: INTERSECTION OBSERVER ────────────────────────────────────── */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

/* ─── ANIMATED COUNTER ───────────────────────────────────────────────── */
const Counter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        let start = 0;
        const step = target / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(start));
        }, 25);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

/* ─── NAV ─────────────────────────────────────────────────────────────── */
const Nav = ({ scrollY }) => {
  const [open, setOpen] = useState(false);
  const scrolled = scrollY > 60;
  const links = ['Collection', 'Process', 'About', 'Contact'];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      padding: scrolled ? '16px 48px' : '28px 48px',
      transition: 'padding 0.4s, background 0.4s'
    }} className={scrolled ? 'nav-glass' : ''}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '0 auto' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 20,8 20,16 12,22 4,16 4,8" stroke="rgba(200,220,255,0.6)" strokeWidth="0.8" fill="none" />
            <polygon points="12,2 20,8 12,11 4,8" fill="rgba(200,220,255,0.15)" />
          </svg>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--platinum)', letterSpacing: '0.1em' }}>DP JEWELS</span>
        </div>
        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="hidden-mobile">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: 'var(--sans)', fontSize: '0.68rem', fontWeight: 400,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)',
              textDecoration: 'none', transition: 'color 0.3s', cursor: 'none'
            }}
              onMouseEnter={e => e.target.style.color = 'var(--platinum)'}
              onMouseLeave={e => e.target.style.color = 'var(--dim)'}>{l}</a>
          ))}
          <button className="btn-glow btn-primary" style={{ padding: '10px 24px', fontSize: '0.65rem' }}>Book Consultation</button>
        </div>
        {/* Mobile menu */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: 'var(--silver)', cursor: 'pointer', display: 'none' }} className="show-mobile">☰</button>
      </div>
      {open && (
        <div style={{ padding: '24px 48px', display: 'flex', flexDirection: 'column', gap: 20, borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 16 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      )}
      <style>{`
        @media(max-width:768px){.hidden-mobile{display:none!important}.show-mobile{display:block!important}}
        @media(min-width:769px){.show-mobile{display:none!important}}
      `}</style>
    </nav>
  );
};

/* ─── HERO ────────────────────────────────────────────────────────────── */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden', background: 'var(--black)'
    }}>
      {/* Ambient radial bg */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,50,120,0.25) 0%, transparent 70%)'
      }} />
      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.06,
        backgroundImage: 'linear-gradient(rgba(200,220,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,220,255,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Sparkles */}
      {[
        { x: 15, y: 25, s: 10, d: 0, dur: 2.2 }, { x: 82, y: 18, s: 8, d: 0.7, dur: 3 }, { x: 68, y: 70, s: 12, d: 1.2, dur: 2.5 },
        { x: 28, y: 72, s: 9, d: 0.4, dur: 2.8 }, { x: 90, y: 55, s: 7, d: 1.8, dur: 2.2 }, { x: 5, y: 48, s: 11, d: 0.9, dur: 3.1 },
        { x: 50, y: 8, s: 8, d: 0.2, dur: 2.6 }, { x: 45, y: 88, s: 10, d: 1.5, dur: 2.4 }, { x: 76, y: 38, s: 6, d: 0.6, dur: 3.3 },
      ].map((s, i) => <Sparkle key={i} x={s.x} y={s.y} size={s.s} delay={s.d} dur={s.dur} />)}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', maxWidth: 1200, padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Overline */}
          <div style={{
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(.22,1,.36,1) 0.2s',
            marginBottom: 56
          }}>
            <span className="section-label" style={{ letterSpacing: '0.45em' }}>Est. 1987 · Geneva</span>
          </div>

          {/* Diamond */}
          <div style={{
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
            transition: 'all 1.2s cubic-bezier(.22,1,.36,1) 0.5s',
            marginBottom: 52
          }}>
            <DiamondSVG size={280} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--serif)', fontWeight: 300,
            fontSize: 'clamp(3.2rem, 8vw, 7rem)',
            color: 'var(--platinum)', textAlign: 'center',
            letterSpacing: '0.04em', lineHeight: 1.05, marginBottom: 24,
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(.22,1,.36,1) 0.9s'
          }}>
            Precision.<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(180,200,255,0.8)' }}>Purity.</em> Trust.
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.9rem',
            letterSpacing: '0.15em', color: 'var(--dim)', textAlign: 'center',
            maxWidth: 420, lineHeight: 1.9, marginBottom: 48,
            opacity: loaded ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(.22,1,.36,1) 1.2s'
          }}>
            Rare diamonds, responsibly sourced. Certified for generations.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
            opacity: loaded ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(.22,1,.36,1) 1.4s'
          }}>
            <button className="btn-glow btn-primary" onClick={() => document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Collection
            </button>
            <button className="btn-glow" onClick={() => document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' })}>
              Our Process
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: loaded ? 0.5 : 0,
        transition: 'opacity 1s 2s'
      }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--dim)' }}>Scroll</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(var(--dim), transparent)', animation: 'lineGrow 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
};

/* ─── ABOUT ───────────────────────────────────────────────────────────── */
const About = () => {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();
  const milestones = [
    { year: '1987', text: 'Founded in Geneva by master gemmologist André Morel.' },
    { year: '1999', text: 'Expanded to Mumbai, bridging European craft with Indian heritage.' },
    { year: '2010', text: 'First lab to receive triple GIA–IGI–HRD certification.' },
    { year: '2026', text: 'Over 2,400 certified stones placed worldwide.' },
  ];
  return (
    <section id="about" style={{ padding: '140px 24px', background: `linear-gradient(180deg, var(--black) 0%, var(--deep) 100%)` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="about-grid">
        <div>
          <div ref={r1} className="reveal" style={{ transitionDelay: '0s' }}>
            <span className="section-label">Our Story</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginTop: 20, marginBottom: 28 }}>
              Four Decades of<br /><em>Gemmological</em> Mastery
            </h2>
            <p style={{ lineHeight: 2, color: 'var(--dim)', fontSize: '0.88rem', maxWidth: 480 }}>
              We believe a diamond is not merely a stone. It is a promise — of authenticity, of rarity, of an unbroken chain of custody from earth to hand. Every diamond we offer carries that covenant.
            </p>
          </div>
        </div>
        {/* Timeline */}
        <div ref={r2} className="reveal" style={{ transitionDelay: '0.15s', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 28, paddingBottom: i < milestones.length - 1 ? 36 : 0, position: 'relative' }}>
              {/* Vertical line */}
              {i < milestones.length - 1 && <div style={{ position: 'absolute', left: 37, top: 28, width: 1, height: 'calc(100% - 28px)', background: 'linear-gradient(var(--glass-b), transparent)' }} />}
              <div style={{ flexShrink: 0, width: 76, height: 76, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', background: 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--glow-b)' }}>{m.year}</span>
              </div>
              <div style={{ paddingTop: 20 }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--silver)', lineHeight: 1.8 }}>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
      </div>
    </section>
  );
};

/* ─── COLLECTION ──────────────────────────────────────────────────────── */
const diamonds = [
  { id: 1, name: 'Éternité Round', cut: 'Brilliant Cut', carat: '2.40 ct', clarity: 'VVS1', color: 'D', price: 'Upon Request' },
  { id: 2, name: 'Glace Oval', cut: 'Oval Cut', carat: '3.10 ct', clarity: 'VS1', color: 'E', price: 'Upon Request' },
  { id: 3, name: 'DP Jewels Cushion', cut: 'Cushion Modified', carat: '1.85 ct', clarity: 'IF', color: 'D', price: 'Upon Request' },
  { id: 4, name: 'Éclat Marquise', cut: 'Marquise Cut', carat: '2.20 ct', clarity: 'VVS2', color: 'F', price: 'Upon Request' },
  { id: 5, name: 'Soleil Pear', cut: 'Pear Shape', carat: '1.60 ct', clarity: 'VS2', color: 'E', price: 'Upon Request' },
  { id: 6, name: 'Nuit Emerald', cut: 'Emerald Step', carat: '4.05 ct', clarity: 'FL', color: 'D', price: 'Upon Request' },
];

const GemPlaceholder = ({ id }) => {
  const colors = [
    ['#a0c0ff', '#4060c0'], ['#c0d8ff', '#3050a0'], ['#ffffff', '#6080d0'],
    ['#b0c8ff', '#2840a0'], ['#d0e0ff', '#5070c0'], ['#e0eaff', '#3060b0'],
  ];
  const [c1, c2] = colors[(id - 1) % colors.length];
  return (
    <div className="gem-placeholder" style={{ width: '100%', aspectRatio: '4/3', background: `linear-gradient(135deg, ${c1}11, ${c2}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={80} height={96} viewBox="0 0 340 340" fill="none">
        <polygon points="170,30 280,130 170,160 60,130" fill={c1} opacity="0.5" />
        <polygon points="60,130 170,160 170,305" fill={c2} opacity="0.6" />
        <polygon points="280,130 170,160 170,305" fill={c1} opacity="0.4" />
        <g stroke={c1} strokeWidth="1" opacity="0.4" fill="none">
          <polygon points="170,30 280,130 170,160 60,130" />
          <line x1="60" y1="130" x2="170" y2="305" />
          <line x1="280" y1="130" x2="170" y2="305" />
        </g>
      </svg>
    </div>
  );
};

const Collection = () => {
  const [modal, setModal] = useState(null);
  const titleRef = useReveal();

  return (
    <section id="collection" style={{ padding: '140px 24px', background: 'var(--deep)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span className="section-label">The Collection</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginTop: 20 }}>
            Exceptional Stones,<br /><em>Singular Character</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {diamonds.map((d, i) => (
            <CollectionCard key={d.id} d={d} i={i} onOpen={setModal} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div onClick={() => setModal(null)} style={{
          position: 'fixed', inset: 0, zIndex: 800,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)',
            maxWidth: 560, width: '100%', padding: 48, position: 'relative',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <button onClick={() => setModal(null)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: 'var(--dim)', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            <GemPlaceholder id={modal.id} />
            <div style={{ marginTop: 32 }}>
              <span className="section-label">{modal.cut}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 400, color: 'var(--platinum)', marginTop: 12, marginBottom: 20 }}>{modal.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['Carat', modal.carat], ['Clarity', modal.clarity], ['Color', modal.color], ['Price', modal.price]].map(([k, v]) => (
                  <div key={k} style={{ padding: '14px 16px', background: 'var(--glass)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 6 }}>{k}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--platinum)' }}>{v}</div>
                  </div>
                ))}
              </div>
              <button className="btn-glow btn-primary" style={{ width: '100%', marginTop: 24 }}>Request Information</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const CollectionCard = ({ d, i, onOpen }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal gem-card card-glass" onClick={() => onOpen(d)}
      style={{ transitionDelay: `${i * 0.08}s`, overflow: 'hidden' }}>
      <GemPlaceholder id={d.id} />
      <div style={{ padding: '24px 28px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--glow-b)', marginBottom: 6 }}>{d.cut}</p>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--platinum)' }}>{d.name}</h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)' }}>Carat</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1rem', color: 'var(--silver)' }}>{d.carat}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {[`${d.clarity}`, `Color ${d.color}`, 'GIA Certified'].map(tag => (
            <span key={tag} style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--dim)' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── WHY US ──────────────────────────────────────────────────────────── */
const WhyUs = () => {
  const titleRef = useReveal();
  const features = [
    { icon: '◈', title: 'Certified Quality', desc: 'Every stone carries dual GIA and IGI certification. Our grading standards exceed industry requirements.' },
    { icon: '◇', title: 'Transparent Pricing', desc: 'No hidden margins. We disclose our sourcing costs and offer clear, honest valuations.' },
    { icon: '◉', title: 'Global Sourcing', desc: 'Direct relationships with mines in Botswana, Canada, and Russia — conflict-free, every time.' },
    { icon: '◎', title: 'Trusted Partnerships', desc: 'Working with private clients, jewellers, and institutions across 42 countries since 1987.' },
  ];
  return (
    <section style={{ padding: '140px 24px', background: `linear-gradient(180deg, var(--deep) 0%, var(--charcoal) 100%)` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span className="section-label">Why DP Jewels</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginTop: 20 }}>The DP Jewels Standard</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
          {features.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ f, i }) => {
  const ref = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} className="reveal card-glass" style={{
      transitionDelay: `${i * 0.1}s`, padding: '40px 36px',
      borderColor: hov ? 'rgba(91,143,255,0.2)' : undefined
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{
        fontSize: '2rem', marginBottom: 24, color: hov ? 'var(--glow-b)' : 'var(--silver)',
        transition: 'color 0.3s, transform 0.4s',
        transform: hov ? 'scale(1.15) rotate(10deg)' : 'scale(1) rotate(0deg)',
        display: 'inline-block'
      }}>{f.icon}</div>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--platinum)', marginBottom: 14 }}>{f.title}</h3>
      <p style={{ fontSize: '0.8rem', lineHeight: 1.9, color: 'var(--dim)' }}>{f.desc}</p>
    </div>
  );
};

/* ─── PROCESS ─────────────────────────────────────────────────────────── */
const Process = () => {
  const titleRef = useReveal();
  const steps = [
    { n: '01', title: 'Source', desc: 'Direct acquisition from certified mines and licensed dealers worldwide.' },
    { n: '02', title: 'Inspect', desc: 'Rigorous gemmological analysis using electron microscopy and spectroscopy.' },
    { n: '03', title: 'Select', desc: 'Only 4% of evaluated stones meet our acceptance standards.' },
    { n: '04', title: 'Certify', desc: 'Full GIA grading report with traceable chain-of-custody documentation.' },
    { n: '05', title: 'Deliver', desc: 'Insured, climate-controlled delivery with personal concierge service.' },
  ];
  return (
    <section id="process" style={{ padding: '140px 24px', background: 'var(--charcoal)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 100 }}>
          <span className="section-label">The Process</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginTop: 20 }}>
            From Earth to<br /><em>Your Hands</em>
          </h2>
        </div>
        <div style={{ position: 'relative' }}>
          {/* Horizontal connector (desktop) */}
          <div style={{ position: 'absolute', top: 36, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,143,255,0.2), transparent)', zIndex: 0 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, position: 'relative', zIndex: 1 }}>
            {steps.map((s, i) => <ProcessStep key={i} s={s} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ s, i }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${i * 0.12}s`, flex: '1 1 160px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        border: '1px solid rgba(91,143,255,0.25)',
        background: 'radial-gradient(circle, rgba(91,143,255,0.1), transparent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 30px rgba(91,143,255,0.1)'
      }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--glow-b)' }}>{s.n}</span>
      </div>
      <div>
        <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--platinum)', marginBottom: 10 }}>{s.title}</h4>
        <p style={{ fontSize: '0.78rem', lineHeight: 1.85, color: 'var(--dim)' }}>{s.desc}</p>
      </div>
    </div>
  );
};

/* ─── TRUST / TESTIMONIALS ────────────────────────────────────────────── */
const testimonials = [
  { name: 'Isabella Chen', role: 'Private Collector, Hong Kong', text: 'DP Jewels\' attention to provenance is unmatched. The stone I received was more beautiful than any photograph could convey, and the certification gave me complete peace of mind.' },
  { name: 'Marcus Beaumont', role: 'Jeweller, London', text: 'As a jeweller, I have exacting standards. DP Jewels has never once fallen short. Their consistency across three years of partnership speaks to a genuinely rare level of integrity.' },
  { name: 'Priya Mehta', role: 'Heirloom Curator, Mumbai', text: 'From first inquiry to delivery, every interaction was handled with the grace of a true luxury house. I felt I was in the care of experts who genuinely revere their craft.' },
];

const Trust = () => {
  const [active, setActive] = useState(0);
  const titleRef = useReveal();
  const statsRef = useReveal();

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { value: 2400, suffix: '+', label: 'Certified Stones' },
    { value: 42, suffix: '', label: 'Countries Served' },
    { value: 37, suffix: '', label: 'Years of Excellence' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section style={{ padding: '140px 24px', background: `linear-gradient(180deg, var(--charcoal) 0%, var(--deep) 100%)` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span className="section-label">Client Trust</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginTop: 20 }}>Words from Our Clients</h2>
        </div>

        {/* Testimonial */}
        <div style={{ maxWidth: 720, margin: '0 auto 100px', textAlign: 'center' }}>
          <div key={active} className="testimonial-active">
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.1rem,2.5vw,1.45rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.8, color: 'var(--silver)', marginBottom: 40 }}>
              "{testimonials[active].text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 1, background: 'rgba(91,143,255,0.4)' }} />
              <div>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '0.8rem', color: 'var(--platinum)', letterSpacing: '0.1em' }}>{testimonials[active].name}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.68rem', color: 'var(--dim)', letterSpacing: '0.1em', marginTop: 4 }}>{testimonials[active].role}</p>
              </div>
              <div style={{ width: 40, height: 1, background: 'rgba(91,143,255,0.4)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 36 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 28 : 6, height: 6, borderRadius: 3,
                background: i === active ? 'var(--glow-b)' : 'rgba(255,255,255,0.15)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s'
              }} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '40px 32px', textAlign: 'center', background: 'var(--glass)', border: '1px solid rgba(255,255,255,0.05)', borderRight: i < stats.length - 1 ? 'none' : undefined }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontWeight: 300, color: 'var(--platinum)', marginBottom: 8 }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--dim)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CONTACT ─────────────────────────────────────────────────────────── */
const Contact = () => {
  const ref = useReveal();
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ padding: '140px 24px', background: 'var(--black)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div ref={ref} className="reveal">
          <span className="section-label">Connect</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginTop: 20, marginBottom: 16 }}>
            Begin Your<br /><em>Acquisition Journey</em>
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--dim)', lineHeight: 1.9, marginBottom: 60 }}>
            Every engagement begins with a private consultation. Share a few details and our team will respond within one business day.
          </p>

          {sent ? (
            <div style={{ padding: '60px 40px', border: '1px solid rgba(91,143,255,0.2)', background: 'rgba(91,143,255,0.05)' }}>
              <div style={{ fontSize: '2rem', marginBottom: 20 }}>◈</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--platinum)', marginBottom: 12 }}>Thank You</h3>
              <p style={{ color: 'var(--dim)', fontSize: '0.82rem', lineHeight: 1.9 }}>We have received your enquiry and will respond within one business day.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input className="input-luxury" placeholder="First Name" style={{ padding: '16px 18px', fontSize: '0.82rem' }} />
                <input className="input-luxury" placeholder="Last Name" style={{ padding: '16px 18px', fontSize: '0.82rem' }} />
              </div>
              <input className="input-luxury" placeholder="Email Address" type="email" style={{ padding: '16px 18px', fontSize: '0.82rem' }} />
              <select className="input-luxury" style={{ padding: '16px 18px', fontSize: '0.82rem', cursor: 'none' }}>
                <option value="" disabled selected>Area of Interest</option>
                <option>Engagement Diamonds</option>
                <option>Investment Stones</option>
                <option>Jewellery Commission</option>
                <option>Estate Valuation</option>
              </select>
              <textarea className="input-luxury" placeholder="Your message..." rows={5} style={{ padding: '16px 18px', fontSize: '0.82rem', resize: 'vertical' }} />
              <button className="btn-glow btn-primary" style={{ width: '100%', padding: '18px', marginTop: 8 }} onClick={() => setSent(true)}>
                Connect With Us
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ──────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ padding: '60px 48px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--black)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
      <div>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 400, color: 'var(--platinum)', letterSpacing: '0.1em' }}>DP JEWELS</span>
        <p style={{ fontSize: '0.68rem', color: 'var(--dim)', marginTop: 8, letterSpacing: '0.1em' }}>Geneva · Mumbai · New York</p>
      </div>
      <div style={{ display: 'flex', gap: 32 }}>
        {['Privacy', 'Terms', 'Certifications', 'Press'].map(l => (
          <a key={l} href="#" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)', textDecoration: 'none', transition: 'color 0.3s', cursor: 'none' }}
            onMouseEnter={e => e.target.style.color = 'var(--silver)'}
            onMouseLeave={e => e.target.style.color = 'var(--dim)'}>{l}</a>
        ))}
      </div>
      <p style={{ fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>© 2026 DP Jewels. All rights reserved.</p>
    </div>
  </footer>
);

/* ─── ROOT ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = e => {
      setCursor({ x: e.clientX, y: e.clientY });
      setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 60);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <div className="grain">
        {/* Cursors */}
        <div className="cursor" style={{ left: cursor.x, top: cursor.y }} />
        <div className="cursor-ring" style={{ left: ring.x, top: ring.y }} />

        <Nav scrollY={scrollY} />
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Collection />
        <div className="divider" />
        <WhyUs />
        <div className="divider" />
        <Process />
        <div className="divider" />
        <Trust />
        <div className="divider" />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
