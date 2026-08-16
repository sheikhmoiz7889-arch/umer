import { motion } from 'framer-motion';
import { Star, Heart, Cloud, Sparkles } from 'lucide-react';

export default function FloatingShapes() {
  const shapes = [
    { Icon: Star, className: 'top-[18%] left-[8%] text-sun-300', anim: 'animate-float-slow', size: 'h-8 w-8', delay: 0 },
    { Icon: Heart, className: 'top-[60%] left-[5%] text-bubble-300', anim: 'animate-float-mid', size: 'h-7 w-7', delay: 0.4 },
    { Icon: Cloud, className: 'top-[30%] right-[6%] text-sky-200', anim: 'animate-float-slow', size: 'h-12 w-12', delay: 0.2 },
    { Icon: Sparkles, className: 'top-[70%] right-[10%] text-mint-300', anim: 'animate-float-fast', size: 'h-7 w-7', delay: 0.6 },
    { Icon: Star, className: 'top-[45%] left-[48%] text-bubble-200', anim: 'animate-float-mid', size: 'h-5 w-5', delay: 0.3 },
    { Icon: Heart, className: 'bottom-[14%] right-[28%] text-sun-200', anim: 'animate-float-fast', size: 'h-6 w-6', delay: 0.5 },
  ];

  const bubbles = [
    'top-[12%] left-[20%] h-24 w-24 bg-mint-200/40',
    'top-[55%] left-[12%] h-16 w-16 bg-sky-200/40',
    'top-[25%] right-[20%] h-20 w-20 bg-bubble-200/40',
    'bottom-[18%] left-[40%] h-28 w-28 bg-sun-200/30',
    'bottom-[8%] right-[8%] h-14 w-14 bg-mint-200/40',
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft blobs */}
      {bubbles.map((b, i) => (
        <div
          key={`b-${i}`}
          className={`absolute rounded-full blur-2xl ${b} ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-mid'}`}
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      {/* icon shapes */}
      {shapes.map(({ Icon, className, anim, size, delay }, i) => (
        <motion.div
          key={`s-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + delay, type: 'spring', stiffness: 120 }}
          className={`absolute ${className} ${anim}`}
          style={{ animationDelay: `${delay}s` }}
        >
          <Icon className={`${size} fill-current drop-shadow`} />
        </motion.div>
      ))}
    </div>
  );
}
