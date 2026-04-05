import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function Flower({ x, delay }) {
  return (
    <motion.svg
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="absolute bottom-[15%]"
      style={{ left: x }} width="40" height="60" viewBox="0 0 40 60"
    >
      <rect x="18" y="30" width="4" height="30" fill="rgba(34,197,94,0.7)" rx="2" />
      <circle cx="20" cy="24" r="10" fill="rgba(244,114,182,0.5)" />
      <circle cx="14" cy="19" r="6" fill="rgba(251,146,60,0.4)" />
      <circle cx="26" cy="19" r="6" fill="rgba(167,139,250,0.4)" />
      <circle cx="20" cy="24" r="4" fill="rgba(250,204,21,0.7)" />
    </motion.svg>
  );
}

export default function ScenePlant() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.plant-text', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="scene bg-gradient-to-b from-[#451a03] via-[#14532d] to-[#065f46]">
      {/* Plant / tree illustration */}
      <motion.div
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ originY: 1, transformOrigin: 'bottom center' }}
      >
        <svg width="200" height="360" viewBox="0 0 200 360">
          {/* Trunk */}
          <rect x="88" y="160" width="24" height="200" fill="rgba(120,53,15,0.8)" rx="6" />
          {/* Root */}
          <path d="M100,340 C80,360 50,370 30,380" stroke="rgba(120,53,15,0.5)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M100,340 C120,360 150,365 170,380" stroke="rgba(120,53,15,0.5)" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Canopy layers */}
          <ellipse cx="100" cy="130" rx="80" ry="60" fill="rgba(34,197,94,0.5)" />
          <ellipse cx="70" cy="100" rx="55" ry="50" fill="rgba(22,163,74,0.5)" />
          <ellipse cx="130" cy="105" rx="50" ry="45" fill="rgba(22,163,74,0.5)" />
          <ellipse cx="100" cy="80" rx="45" ry="40" fill="rgba(74,222,128,0.4)" />
          {/* Highlight */}
          <ellipse cx="85" cy="70" rx="20" ry="15" fill="rgba(187,247,208,0.3)" />
        </svg>
      </motion.div>

      {/* Water arrows going up the trunk */}
      {inView && Array.from({ length: 6 }).map((_, i) => (
        <motion.div key={i}
          className="absolute left-1/2 -translate-x-1/2 w-1 h-4 bg-sky-400/40 rounded-full"
          style={{ bottom: '18%' }}
          animate={{ y: [-0, -250], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
        />
      ))}

      {/* Transpiration vapor */}
      {inView && Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={i}
          className="absolute w-2 h-2 bg-sky-300/30 rounded-full blur-[2px]"
          style={{
            left: `calc(50% + ${-60 + Math.random() * 120}px)`,
            top: '28%',
          }}
          animate={{ y: [-0, -80 - Math.random() * 80], opacity: [0.5, 0], x: [0, (Math.random() - 0.5) * 60] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      {/* Ground flowers */}
      <Flower x="15%" delay={0.3} />
      <Flower x="30%" delay={0.5} />
      <Flower x="65%" delay={0.7} />
      <Flower x="80%" delay={0.4} />

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-[#14532d] via-[#166534] to-transparent" />

      {/* Flying particles - pollen/seeds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-amber-200/40 rounded-full"
            style={{
              top: `${20 + Math.random() * 40}%`,
              animation: `drift ${8 + Math.random() * 10}s linear ${Math.random() * 8}s infinite`,
            }} />
        ))}
      </div>

      {/* Content */}
      <div className="plant-text relative z-10 text-center px-6 max-w-2xl">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest bg-green-400/15 text-green-300 border border-green-400/25">
          Stage 6 · Transpiration
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          Nourishing Life
        </h2>
        <p className="text-base sm:text-lg text-emerald-100/70 leading-relaxed max-w-lg mx-auto">
          Roots draw water upward through the plant, delivering nutrients to every leaf.
          Through transpiration, moisture returns to the air — continuing the cycle.
        </p>
      </div>
    </section>
  );
}
