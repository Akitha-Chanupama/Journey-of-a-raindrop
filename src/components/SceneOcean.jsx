import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function SceneOcean() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ocean-text', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 65%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.sun-svg', {
        scale: 0.3, opacity: 0, duration: 1.2, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.steam-particle', {
        y: 60, opacity: 0, stagger: 0.1, duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 50%', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="scene bg-gradient-to-b from-[#0c4a6e] via-[#075985] to-[#0e7490]">
      {/* Ocean surface waves */}
      <svg className="absolute bottom-0 left-0 w-full h-[45%]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="rgba(8,145,178,0.25)" style={{ animation: 'wave 7s ease-in-out infinite' }}
          d="M0,160 C320,200 480,120 720,160 C960,200 1120,120 1440,160 L1440,320 L0,320 Z" />
        <path fill="rgba(6,182,212,0.20)" style={{ animation: 'wave2 9s ease-in-out infinite' }}
          d="M0,200 C240,170 480,230 720,190 C960,170 1200,210 1440,200 L1440,320 L0,320 Z" />
        <path fill="rgba(14,116,144,0.30)" style={{ animation: 'wave 11s ease-in-out infinite reverse' }}
          d="M0,240 C380,210 600,260 900,230 C1100,210 1300,240 1440,250 L1440,320 L0,320 Z" />
      </svg>

      {/* Sun */}
      <div className="sun-svg absolute top-12 right-12 sm:top-16 sm:right-20 lg:top-20 lg:right-28">
        <div className="relative">
          <motion.div animate={inView ? { scale: [1, 1.08, 1] } : {}} transition={{ duration: 4, repeat: Infinity }}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400 shadow-[0_0_80px_rgba(251,191,36,0.5)]" />
          {/* Rays */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 w-0.5 origin-bottom"
              style={{
                height: 60 + Math.random() * 30,
                transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                background: 'linear-gradient(to top, rgba(251,191,36,0.5), transparent)',
                animation: `glow-pulse ${2 + Math.random()}s ease-in-out ${Math.random()}s infinite`,
                color: '#fbbf24',
              }} />
          ))}
        </div>
      </div>

      {/* Rising steam/vapor particles */}
      <div className="absolute bottom-[30%] left-0 right-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="steam-particle absolute rounded-full blur-md"
            style={{
              width: 6 + Math.random() * 12,
              height: 6 + Math.random() * 12,
              left: `${15 + Math.random() * 70}%`,
              bottom: 0,
              background: `rgba(186,230,253,${0.25 + Math.random() * 0.25})`,
              animation: `float-up ${6 + Math.random() * 8}s linear ${Math.random() * 6}s infinite`,
            }} />
        ))}
      </div>

      {/* Content */}
      <div className="ocean-text relative z-10 text-center px-6 max-w-2xl">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-400/15 text-amber-300 border border-amber-400/25">
          Stage 1 · Evaporation
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          The Sun Warms the Ocean
        </h2>
        <p className="text-base sm:text-lg text-sky-100/70 leading-relaxed max-w-lg mx-auto">
          Energy from the sun heats the ocean surface, transforming liquid water
          into invisible vapor that rises gently into the atmosphere.
        </p>
      </div>
    </section>
  );
}
