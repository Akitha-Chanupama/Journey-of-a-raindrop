import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENES = ['Hero', 'Evaporation', 'Condensation', 'Precipitation', 'Collection', 'Infiltration', 'Transpiration', 'Cycle'];

export default function Navbar({ activeScene }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const goTo = (i) => {
    const el = document.querySelectorAll('.scene')[i];
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <button onClick={() => goTo(0)} className="flex items-center gap-2 group">
          <svg width="22" height="30" viewBox="0 0 64 90" className="transition-transform group-hover:scale-110">
            <defs>
              <linearGradient id="nl" x1="0" y1="0" x2=".5" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <path d="M32 4 C32 4 8 38 8 56 C8 70 18 82 32 82 C46 82 56 70 56 56 C56 38 32 4 32 4Z" fill="url(#nl)" />
          </svg>
          <span className="hidden sm:inline font-display text-sm font-semibold text-white/80 tracking-wide">
            Raindrop
          </span>
        </button>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          {SCENES.map((name, i) => (
            <button key={name} onClick={() => goTo(i)}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-300
                ${activeScene === i ? 'text-sky-300' : 'text-white/50 hover:text-white/80'}`}
            >
              {name}
              {activeScene === i && (
                <motion.div layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-sky-400/10 border border-sky-400/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
              )}
            </button>
          ))}
        </div>

        {/* Active label — visible on mobile */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.span key={activeScene}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-xs font-medium text-sky-300/70"
            >
              {SCENES[activeScene]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
