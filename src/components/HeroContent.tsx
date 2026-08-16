import { motion } from 'framer-motion';
import { ShoppingBag, Phone, ShieldCheck, Truck, Heart } from 'lucide-react';
import { PHONE } from '@/lib/constants';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const trust = [
  { Icon: ShieldCheck, label: 'Premium Quality' },
  { Icon: Truck, label: 'Fast Delivery' },
  { Icon: Heart, label: '5-Star Happy' },
];

export default function HeroContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-xl">
      {/* eyebrow pill */}
      <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full bg-white/70 ring-1 ring-mint-200 px-4 py-1.5 shadow-soft">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint-500" />
        </span>
        <span className="text-xs font-bold tracking-wide text-navy-800 uppercase">Lahore's #1 Kids Store</span>
      </motion.div>

      {/* heading */}
      <motion.h1
        variants={item}
        className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-navy-900 text-balance"
      >
        Cute, Comfy &{' '}
        <span className="relative inline-block">
          <span className="gradient-text">Trendy</span>
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
            <path d="M2 9C40 3 160 3 198 9" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>{' '}
        Clothes for Your Little Ones! 🎈
      </motion.h1>

      {/* subheading */}
      <motion.p variants={item} className="mt-5 text-base sm:text-lg text-navy-700/80 leading-relaxed max-w-lg">
        Premium quality kidswear for ages <span className="font-bold text-navy-900">0 to 13</span>. Top-rated choice in Lahore with{' '}
        <span className="font-bold text-bubble-600">5-star customer happiness!</span>
      </motion.p>

      {/* CTAs */}
      <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-4">
        <motion.a
          href="#shop"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-bubble-500 via-bubble-600 to-sun-500 px-7 py-4 text-base font-bold text-white shadow-glow-bubble"
        >
          <ShoppingBag className="h-5 w-5" />
          Explore Collection 🛍️
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-bubble-400 to-sun-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60" />
        </motion.a>

        <a
          href={`tel:${PHONE}`}
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-4 text-base font-bold text-navy-900 ring-2 ring-navy-900/10 shadow-soft transition-colors hover:text-bubble-600"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-bubble-100 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative grid place-items-center h-7 w-7 rounded-full bg-mint-100 text-mint-600">
            <Phone className="h-4 w-4" />
          </span>
          Call Us Now 📞
        </a>
      </motion.div>

      {/* trust badges */}
      <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {trust.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm font-semibold text-navy-700">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-mint-50 text-mint-600 ring-1 ring-mint-100">
              <Icon className="h-4 w-4" />
            </span>
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
