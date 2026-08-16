import { motion } from 'framer-motion';
import { Star, Zap } from 'lucide-react';
import { HERO_IMAGES } from '@/lib/constants';

export default function HeroImage() {
  const grid = [
    { src: HERO_IMAGES.grid1, span: 'row-span-2', rounded: 'rounded-tl-3xl' },
    { src: HERO_IMAGES.grid2, span: '', rounded: 'rounded-tr-3xl' },
    { src: HERO_IMAGES.grid3, span: '', rounded: '' },
    { src: HERO_IMAGES.grid4, span: 'row-span-2', rounded: 'rounded-bl-3xl' },
    { src: HERO_IMAGES.grid5, span: '', rounded: '' },
    { src: HERO_IMAGES.grid6, span: '', rounded: 'rounded-br-3xl' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="relative mx-auto w-full max-w-lg"
    >
      {/* main image */}
      <div className="relative perspective">
        <motion.div
          whileHover={{ rotateY: -6, rotateX: 3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="preserve-3d relative overflow-hidden rounded-[2rem] shadow-float ring-4 ring-white/70"
        >
          <img
            src={HERO_IMAGES.main}
            alt="Happy kid wearing stylish Umer Garments outfit"
            className="aspect-[4/5] w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent" />
        </motion.div>

        {/* grid strip */}
        <div className="mt-3 grid grid-cols-4 grid-rows-2 gap-2 h-40">
          {grid.slice(0, 6).map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 140 }}
              whileHover={{ scale: 1.06, zIndex: 10 }}
              className={`overflow-hidden ${g.span} ${g.rounded} ring-2 ring-white/60 shadow-soft`}
            >
              <img
                src={g.src}
                alt={`Umer Garments kidswear style ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rating badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 160 }}
        className="absolute -left-4 sm:-left-8 top-6 glass rounded-2xl px-4 py-3 shadow-float ring-1 ring-white/60 animate-float-mid"
      >
        <div className="flex items-center gap-2.5">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-sun-300 to-sun-500 shadow-glow-sun">
            <Star className="h-5 w-5 text-white fill-white" />
          </div>
          <div>
            <p className="font-display text-lg font-extrabold text-navy-900 leading-none">5.0 Rating</p>
            <p className="text-[11px] font-semibold text-navy-700/70">26+ Google Reviews</p>
          </div>
        </div>
      </motion.div>

      {/* Discount tag */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.15, type: 'spring', stiffness: 160 }}
        className="absolute -right-3 sm:-right-6 bottom-44 sm:bottom-48 glass rounded-2xl px-4 py-3 shadow-float ring-1 ring-white/60 animate-float-slow"
      >
        <div className="flex items-center gap-2.5">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-bubble-400 to-bubble-600 shadow-glow-bubble">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <div>
            <p className="font-display text-base font-extrabold text-navy-900 leading-none">Up to 30% OFF</p>
            <p className="text-[11px] font-semibold text-navy-700/70">New Arrivals</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
