import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function SceneSoil() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.soil-text', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.soil-layer', {
        scaleX: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 50%', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="scene bg-gradient-to-b from-[#166534] via-[#78350f] to-[#451a03]">
      {/* Grass strip at top */}
      <div className="absolute top-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C100,50 140,20 180,80 C220,50 260,10 300,80 C340,40 380,5 420,80 C460,50 500,15 540,80 C580,40 620,20 660,80 C700,50 740,10 780,80 C820,55 860,15 900,80 C940,45 980,20 1020,80 C1060,50 1100,10 1140,80 C1180,55 1220,15 1260,80 C1300,50 1340,20 1380,80 C1400,50 1420,30 1440,80 L1440,0 L0,0 Z"
            fill="rgba(22,101,52,0.7)" />
        </svg>
      </div>

      {/* Soil cross-section layers */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%]">
        {[
          { color: 'rgba(120,53,15,0.5)', h: '25%', top: '0%' },
          { color: 'rgba(92,40,12,0.5)', h: '25%', top: '20%' },
          { color: 'rgba(69,26,3,0.6)', h: '30%', top: '40%' },
          { color: 'rgba(41,10,0,0.5)', h: '35%', top: '65%' },
        ].map((layer, i) => (
          <div key={i} className="soil-layer absolute left-0 right-0 origin-left"
            style={{ top: layer.top, height: layer.h, background: layer.color }} />
        ))}

        {/* Rock textures */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: 20 + Math.random() * 30,
              height: 15 + Math.random() * 20,
              left: `${Math.random() * 90}%`,
              top: `${40 + Math.random() * 50}%`,
              background: `rgba(${80 + Math.random() * 40}, ${50 + Math.random() * 30}, ${20 + Math.random() * 20}, 0.4)`,
              borderRadius: `${30 + Math.random() * 30}% ${30 + Math.random() * 30}%`,
            }} />
        ))}
      </div>

      {/* Seeping water drops */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i}
            className="absolute w-1.5 h-3 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 30}%`,
              background: 'rgba(147,197,253,0.4)',
            }}
            animate={inView ? {
              y: [0, 200 + Math.random() * 100],
              opacity: [0.6, 0],
            } : {}}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>

      {/* Root-like veins */}
      <svg className="absolute left-1/2 top-[25%] -translate-x-1/2 opacity-30 w-[500px] h-[400px]" viewBox="0 0 500 400">
        <path d="M250,0 C250,80 200,120 170,200 C150,250 100,300 80,380" fill="none" stroke="rgba(180,140,100,0.4)" strokeWidth="2" />
        <path d="M250,0 C250,80 300,130 320,200 C340,260 380,320 400,380" fill="none" stroke="rgba(180,140,100,0.4)" strokeWidth="2" />
        <path d="M250,0 C255,100 250,180 250,280 C250,330 245,370 250,400" fill="none" stroke="rgba(180,140,100,0.5)" strokeWidth="2.5" />
        <path d="M170,200 C140,230 120,210 90,260" fill="none" stroke="rgba(180,140,100,0.3)" strokeWidth="1.5" />
        <path d="M320,200 C345,225 370,215 390,250" fill="none" stroke="rgba(180,140,100,0.3)" strokeWidth="1.5" />
      </svg>

      {/* Content */}
      <div className="soil-text relative z-10 text-center px-6 max-w-2xl">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-600/20 text-amber-300 border border-amber-600/30">
          Stage 5 · Infiltration
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          Seeping Into the Soil
        </h2>
        <p className="text-base sm:text-lg text-amber-100/70 leading-relaxed max-w-lg mx-auto">
          Some water percolates deep into the earth, filtering through layers of soil
          and rock, replenishing underground aquifers.
        </p>
      </div>
    </section>
  );
}
