import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function SceneRain() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rain-text', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="scene bg-gradient-to-b from-[#7dd3fc] via-[#334155] to-[#1e293b]">
      {/* Dark storm clouds at top */}
      <div className="absolute top-0 left-0 right-0 h-[35%]">
        <svg className="w-full h-full" viewBox="0 0 1440 300" preserveAspectRatio="none">
          <ellipse cx="300" cy="100" rx="350" ry="150" fill="rgba(30,41,59,0.7)" />
          <ellipse cx="700" cy="80" rx="400" ry="160" fill="rgba(30,41,59,0.8)" />
          <ellipse cx="1100" cy="110" rx="350" ry="140" fill="rgba(30,41,59,0.65)" />
          <ellipse cx="500" cy="60" rx="250" ry="100" fill="rgba(51,65,85,0.5)" />
          <ellipse cx="900" cy="50" rx="280" ry="110" fill="rgba(51,65,85,0.45)" />
        </svg>
      </div>

      {/* Lightning flash overlay */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none"
        style={{ animation: 'lightning-flash 8s linear infinite' }} />

      {/* Rain streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => {
          const left = Math.random() * 100;
          const h = 20 + Math.random() * 40;
          const dur = 0.4 + Math.random() * 0.5;
          const delay = Math.random() * 3;
          return (
            <div key={i} className="absolute"
              style={{
                left: `${left}%`,
                top: -40,
                width: 1.5,
                height: h,
                borderRadius: 2,
                background: 'linear-gradient(to bottom, transparent, rgba(147,197,253,0.6), transparent)',
                animation: `rain-fall ${dur}s linear ${delay}s infinite`,
              }} />
          );
        })}
      </div>

      {/* Splash effects at bottom */}
      <div className="absolute bottom-[8%] left-0 right-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="absolute w-3 h-3 rounded-full border border-sky-300/30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animation: `pulse-ring 2s ease-out ${Math.random() * 3}s infinite`,
            }} />
        ))}
      </div>

      {/* Content */}
      <div className="rain-text relative z-10 text-center px-6 max-w-2xl">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest bg-indigo-400/15 text-indigo-300 border border-indigo-400/25">
          Stage 3 · Precipitation
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          Falling Back to Earth
        </h2>
        <p className="text-base sm:text-lg text-sky-100/70 leading-relaxed max-w-lg mx-auto">
          When droplets grow heavy enough, gravity takes over. Our raindrop
          plummets through the atmosphere, accelerating toward the ground below.
        </p>
      </div>

      {/* Ground fog */}
      <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-gradient-to-t from-slate-800/50 to-transparent" />
    </section>
  );
}
