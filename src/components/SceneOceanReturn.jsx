import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function SceneOceanReturn() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.return-text', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="scene relative bg-gradient-to-b from-[#065f46] via-[#0c4a6e] to-[#020617]">
      {/* Deep ocean waves */}
      <svg className="absolute bottom-0 left-0 w-full h-[50%]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="rgba(3,105,161,0.3)" style={{ animation: 'wave 7s ease-in-out infinite' }}
          d="M0,140 C320,180 480,100 720,140 C960,180 1120,100 1440,140 L1440,320 L0,320 Z" />
        <path fill="rgba(7,89,133,0.3)" style={{ animation: 'wave2 9s ease-in-out infinite' }}
          d="M0,180 C240,150 480,210 720,170 C960,150 1200,190 1440,180 L1440,320 L0,320 Z" />
        <path fill="rgba(2,6,23,0.4)" style={{ animation: 'wave 11s ease-in-out infinite reverse' }}
          d="M0,220 C360,190 600,250 900,210 C1100,190 1300,220 1440,230 L1440,320 L0,320 Z" />
      </svg>

      {/* Sparkles on ocean surface */}
      <div className="absolute bottom-[15%] left-0 right-0 h-[20%] pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-sky-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${2 + Math.random() * 2}s ease-in-out ${Math.random() * 3}s infinite`,
            }} />
        ))}
      </div>

      {/* Floating mist/orbs */}
      {[
        { size: 200, x: '20%', y: '30%', color: 'rgba(14,165,233,0.08)', dur: 18 },
        { size: 280, x: '65%', y: '50%', color: 'rgba(6,182,212,0.06)', dur: 22 },
        { size: 160, x: '75%', y: '25%', color: 'rgba(56,189,248,0.07)', dur: 16 },
      ].map((o, i) => (
        <motion.div key={i} className="absolute rounded-full blur-3xl"
          style={{ width: o.size, height: o.size, left: o.x, top: o.y, background: o.color }}
          animate={{ x: [0, 20, -15, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Infinity loop symbol */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 0.15, scale: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2"
        width="200" height="100" viewBox="0 0 200 100"
      >
        <path d="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50 Z"
          fill="none" stroke="rgba(147,197,253,0.6)" strokeWidth="2"
          strokeDasharray="8,6"
          style={{ animation: 'flow-right 6s linear infinite' }} />
      </motion.svg>

      {/* Content */}
      <div className="return-text relative z-10 text-center px-6 max-w-2xl">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-400/15 text-cyan-300 border border-cyan-400/25">
          Stage 7 · The Cycle Continues
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          Home Again
        </h2>
        <p className="text-base sm:text-lg text-sky-100/70 leading-relaxed max-w-lg mx-auto mb-10">
          Rivers carry our raindrop back to the vast ocean, completing one loop of
          Earth's endless water cycle — a journey billions of years old.
        </p>

        {/* Restart button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(56,189,248,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
            bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border border-sky-400/30
            text-sky-100 font-medium backdrop-blur-sm transition-all duration-300
            hover:border-sky-400/60 hover:from-sky-500/30 hover:to-cyan-500/30"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Start Again
        </motion.button>
      </div>

      {/* Gradient fade to dark at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}
