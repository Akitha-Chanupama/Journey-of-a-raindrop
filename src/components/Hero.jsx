import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

/* ── Animated wave SVG ── */
function Waves() {
  return (
    <svg className="absolute bottom-0 left-0 w-full h-[40%]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="rgba(14,165,233,0.15)" style={{ animation: 'wave 8s ease-in-out infinite' }}
        d="M0,160 C320,200 480,120 720,160 C960,200 1120,120 1440,160 L1440,320 L0,320 Z" />
      <path fill="rgba(56,189,248,0.10)" style={{ animation: 'wave2 10s ease-in-out infinite' }}
        d="M0,200 C240,170 480,230 720,190 C960,170 1200,210 1440,200 L1440,320 L0,320 Z" />
      <path fill="rgba(2,132,199,0.18)" style={{ animation: 'wave 12s ease-in-out infinite reverse' }}
        d="M0,220 C360,190 600,250 900,210 C1100,190 1300,220 1440,230 L1440,320 L0,320 Z" />
    </svg>
  );
}

/* ── Floating orbs ── */
function Orbs() {
  const orbs = [
    { size: 300, x: '10%', y: '20%', color: 'rgba(14,165,233,0.12)', dur: 20 },
    { size: 400, x: '70%', y: '60%', color: 'rgba(139,92,246,0.08)', dur: 25 },
    { size: 200, x: '80%', y: '15%', color: 'rgba(56,189,248,0.10)', dur: 18 },
    { size: 250, x: '20%', y: '70%', color: 'rgba(6,182,212,0.09)', dur: 22 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full blur-3xl"
          style={{ width: o.size, height: o.size, left: o.x, top: o.y, background: o.color }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── Drifting particles ── */
function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 40}%`,
            background: `rgba(147,197,253,${0.3 + Math.random() * 0.4})`,
            animation: `float-up ${8 + Math.random() * 12}s linear ${Math.random() * 10}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-word', { y: 80, opacity: 0, rotateX: 40 }, {
        y: 0, opacity: 1, rotateX: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.3,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollDown = () => {
    const el = document.querySelectorAll('.scene')[1];
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref}
      className="scene relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#020617] via-[#0c1929] to-[#0c4a6e]"
    >
      <Orbs />
      <Particles />

      {/* Raindrop glyph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative mb-8"
      >
        <svg width="64" height="90" viewBox="0 0 64 90" className="drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
          <defs>
            <linearGradient id="hd" x1="0" y1="0" x2=".5" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M32 4 C32 4 8 38 8 56 C8 70 18 82 32 82 C46 82 56 70 56 56 C56 38 32 4 32 4Z" fill="url(#hd)" />
          <ellipse cx="22" cy="50" rx="6" ry="10" fill="white" opacity="0.25" />
          <ellipse cx="20" cy="43" rx="3" ry="5" fill="white" opacity="0.4" />
        </svg>
        {/* Pulse rings */}
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-sky-400/30"
            style={{ animation: `pulse-ring 3s ease-out ${i * 1}s infinite` }} />
        ))}
      </motion.div>

      {/* Title */}
      <div className="relative z-10 text-center px-6 overflow-hidden" style={{ perspective: '600px' }}>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6">
          {'Journey of a'.split(' ').map((w, i) => (
            <span key={i} className="hero-title-word inline-block mr-[0.3em] text-white">{w}</span>
          ))}
          <br className="hidden sm:block" />
          <span className="hero-title-word inline-block bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Raindrop
          </span>
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 text-base sm:text-lg md:text-xl text-sky-100/70 max-w-xl text-center px-6 mb-12 leading-relaxed"
      >
        An immersive scroll through the water cycle — from ocean to sky and back again.
      </motion.p>

      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(56,189,248,0.3)' }}
        whileTap={{ scale: 0.97 }}
        className="relative z-10 group flex items-center gap-3 px-8 py-3.5 rounded-full
          bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border border-sky-400/30
          text-sky-100 font-medium backdrop-blur-sm transition-all duration-300
          hover:border-sky-400/60 hover:from-sky-500/30 hover:to-cyan-500/30"
      >
        Begin the Journey
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-lg">↓</motion.span>
      </motion.button>

      <Waves />

      {/* Scroll mouse indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
          <motion.div className="w-1 h-1.5 bg-white/50 rounded-full" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}
