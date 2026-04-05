import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function Cloud({ className, w = 240, opacity = 0.7, dur = 20 }) {
  return (
    <motion.svg
      animate={{ x: [0, 40, -20, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute ${className}`}
      width={w} height={w * 0.5} viewBox="0 0 240 120" style={{ opacity }}
    >
      <defs>
        <radialGradient id={`cg${w}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="75" rx="100" ry="45" fill={`url(#cg${w})`} />
      <ellipse cx="80" cy="60" rx="65" ry="38" fill={`url(#cg${w})`} />
      <ellipse cx="160" cy="62" rx="60" ry="35" fill={`url(#cg${w})`} />
      <ellipse cx="120" cy="55" rx="50" ry="30" fill="white" opacity="0.5" />
    </motion.svg>
  );
}

export default function SceneCloud() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cloud-text', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="scene bg-gradient-to-b from-[#0e7490] via-[#0ea5e9] to-[#7dd3fc]">
      {/* Multi-layer clouds */}
      <Cloud className="top-[6%] left-[-3%]" w={320} opacity={0.35} dur={24} />
      <Cloud className="top-[18%] right-[-6%]" w={380} opacity={0.4} dur={28} />
      <Cloud className="top-[30%] left-[15%]" w={260} opacity={0.55} dur={20} />
      <Cloud className="top-[14%] right-[25%]" w={200} opacity={0.3} dur={18} />
      <Cloud className="top-[42%] left-[40%]" w={300} opacity={0.5} dur={22} />
      <Cloud className="top-[8%] left-[55%]" w={180} opacity={0.25} dur={16} />

      {/* Central big cloud — hero element */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-[20%] left-1/2 -translate-x-1/2"
      >
        <svg width="500" height="260" viewBox="0 0 500 260" className="drop-shadow-[0_8px_40px_rgba(255,255,255,0.25)]">
          <defs>
            <linearGradient id="bigCloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
          </defs>
          <ellipse cx="250" cy="160" rx="200" ry="90" fill="url(#bigCloud)" />
          <ellipse cx="170" cy="130" rx="120" ry="80" fill="url(#bigCloud)" />
          <ellipse cx="330" cy="135" rx="110" ry="70" fill="url(#bigCloud)" />
          <ellipse cx="250" cy="110" rx="85" ry="60" fill="white" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Converging vapor dots */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => {
          const angle = (i / 25) * Math.PI * 2;
          const r = 180 + Math.random() * 120;
          return (
            <motion.div key={i}
              className="absolute w-2 h-2 bg-sky-200/50 rounded-full blur-[2px]"
              style={{ left: `calc(50% + ${Math.cos(angle) * r}px)`, top: `calc(30% + ${Math.sin(angle) * r}px)` }}
              animate={inView ? {
                x: -Math.cos(angle) * r * 0.7,
                y: -Math.sin(angle) * r * 0.7,
                opacity: [0.6, 0],
                scale: [1, 0.3],
              } : {}}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="cloud-text relative z-10 text-center px-6 max-w-2xl mt-[35vh]">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/15 text-sky-800 border border-white/30">
          Stage 2 · Condensation
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-sky-900 mb-5 leading-tight">
          Clouds Take Shape
        </h2>
        <p className="text-base sm:text-lg text-sky-800/70 leading-relaxed max-w-lg mx-auto">
          High in the atmosphere, water vapor cools and clings to tiny dust particles,
          forming the beautiful clouds that drift across our skies.
        </p>
      </div>
    </section>
  );
}
