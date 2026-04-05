import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function SceneRiver() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.river-text', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="scene bg-gradient-to-b from-[#1e293b] via-[#14532d] to-[#166534]">
      {/* Mountains silhouette */}
      <svg className="absolute top-0 left-0 w-full h-[40%]" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path d="M0,400 L200,120 L400,280 L550,80 L700,250 L900,50 L1100,200 L1250,100 L1440,300 L1440,400 Z"
          fill="rgba(15,23,42,0.5)" />
        <path d="M0,400 L150,200 L350,320 L500,150 L680,300 L850,130 L1050,280 L1200,160 L1440,350 L1440,400 Z"
          fill="rgba(20,83,45,0.4)" />
      </svg>

      {/* Trees */}
      <div className="absolute bottom-[30%] left-0 right-0 pointer-events-none h-[30%]">
        {Array.from({ length: 20 }).map((_, i) => {
          const h = 60 + Math.random() * 80;
          const left = Math.random() * 100;
          return (
            <svg key={i} className="absolute bottom-0" style={{ left: `${left}%`, height: h, width: h * 0.5 }} viewBox="0 0 30 60">
              <polygon points="15,2 28,45 2,45" fill={`rgba(${22 + Math.random() * 20},${100 + Math.random() * 55},${34 + Math.random() * 20},${0.4 + Math.random() * 0.3})`} />
              <rect x="13" y="42" width="4" height="18" fill="rgba(80,50,20,0.5)" />
            </svg>
          );
        })}
      </div>

      {/* River SVG path */}
      <svg className="absolute bottom-0 left-0 w-full h-[40%]" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="riverG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(14,165,233,0.05)" />
            <stop offset="30%" stopColor="rgba(56,189,248,0.4)" />
            <stop offset="70%" stopColor="rgba(56,189,248,0.4)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0.05)" />
          </linearGradient>
        </defs>
        <path d="M-20,180 C180,140 300,220 500,160 C700,100 800,200 1000,150 C1200,100 1350,170 1460,140"
          fill="none" stroke="url(#riverG)" strokeWidth="60" strokeLinecap="round" />
        <path d="M-20,180 C180,140 300,220 500,160 C700,100 800,200 1000,150 C1200,100 1350,170 1460,140"
          fill="none" stroke="rgba(186,230,253,0.2)" strokeWidth="2" strokeDasharray="12,8"
          style={{ animation: 'flow-right 4s linear infinite' }} />
      </svg>

      {/* Flowing particles along river */}
      <div className="absolute bottom-[10%] left-0 right-0 h-[15%] pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-sky-300/50 rounded-full blur-[1px]"
            style={{
              top: `${30 + Math.random() * 40}%`,
              animation: `flow-right ${6 + Math.random() * 4}s linear ${Math.random() * 6}s infinite`,
            }} />
        ))}
      </div>

      {/* Floating leaves */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="absolute pointer-events-none text-xl"
          style={{
            top: `${60 + Math.random() * 15}%`,
            animation: `leaf ${10 + Math.random() * 8}s linear ${i * 3}s infinite`,
          }}>🍃</div>
      ))}

      {/* Content */}
      <div className="river-text relative z-10 text-center px-6 max-w-2xl">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-400/15 text-emerald-300 border border-emerald-400/25">
          Stage 4 · Collection
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          Into the River
        </h2>
        <p className="text-base sm:text-lg text-emerald-100/70 leading-relaxed max-w-lg mx-auto">
          Hitting the earth, our raindrop joins a flowing river — winding through
          forests and valleys, carrying life across the landscape.
        </p>
      </div>
    </section>
  );
}
