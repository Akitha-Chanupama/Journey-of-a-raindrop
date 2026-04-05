import { motion } from 'framer-motion';

const COLORS = [
  '#38bdf8', '#0ea5e9', '#7dd3fc', '#6366f1',
  '#22c55e', '#92400e', '#16a34a', '#06b6d4',
];

export default function ProgressIndicator({ activeScene, total = 8 }) {
  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button key={i}
          onClick={() => document.querySelectorAll('.scene')[i]?.scrollIntoView({ behavior: 'smooth' })}
          className="relative group"
          aria-label={`Go to scene ${i + 1}`}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full transition-all duration-500"
            style={{
              background: activeScene === i ? COLORS[i] : 'rgba(255,255,255,0.2)',
              boxShadow: activeScene === i ? `0 0 10px ${COLORS[i]}` : 'none',
            }}
            animate={activeScene === i ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={{ duration: 1.5, repeat: activeScene === i ? Infinity : 0 }}
          />
          {activeScene === i && (
            <motion.div layoutId="prog-ring"
              className="absolute -inset-1 rounded-full border"
              style={{ borderColor: `${COLORS[i]}40` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}

      {/* Progress line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full -z-10">
        <div className="w-full h-full bg-white/5 rounded-full" />
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{ background: 'linear-gradient(to bottom, #38bdf8, #06b6d4)' }}
          animate={{ height: `${((activeScene) / (total - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
