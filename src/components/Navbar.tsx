import { useEffect, useState } from 'react';
import { Menu, X, Crown, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { useCart } from '@/lib/cart';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3 inset-x-0 z-50 px-3 sm:top-5 sm:px-6"
    >
      <nav
        className={`mx-auto max-w-6xl rounded-2xl sm:rounded-full transition-all duration-500 ${
          scrolled
            ? 'glass shadow-float ring-1 ring-white/60'
            : 'glass shadow-soft ring-1 ring-white/40'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6 sm:py-3">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2.5 shrink-0">
            <motion.span
              whileHover={{ rotate: -12, scale: 1.1 }}
              className="grid place-items-center h-10 w-10 rounded-2xl bg-gradient-to-br from-sun-300 via-bubble-400 to-bubble-500 shadow-glow-bubble"
            >
              <Crown className="h-5 w-5 text-white" strokeWidth={2.5} />
            </motion.span>
            <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-navy-900 leading-none">
              Umer<span className="text-bubble-500"> Garments</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative px-3.5 py-2 text-sm font-semibold text-navy-800 rounded-full transition-colors hover:text-bubble-600"
                >
                  {link.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-bubble-400 to-sun-400 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + cart + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.a
              href="#shop"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bubble-500 to-bubble-600 px-5 py-2.5 text-sm font-bold text-white shadow-glow-bubble"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop Now
              <span className="absolute -inset-0.5 rounded-full bg-bubble-400/40 animate-pulse-ring -z-10" />
            </motion.a>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative grid place-items-center h-10 w-10 rounded-xl bg-white/70 ring-1 ring-navy-900/10 text-navy-800 transition-colors hover:bg-bubble-50"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 grid place-items-center h-5 min-w-5 rounded-full bg-bubble-500 px-1 text-[10px] font-bold text-white shadow-glow-bubble"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center h-10 w-10 rounded-xl bg-white/70 ring-1 ring-navy-900/10 text-navy-800"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <ul className="px-3 pb-3 pt-1 space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-bubble-50 hover:text-bubble-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#shop"
                    onClick={() => setOpen(false)}
                    className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bubble-500 to-bubble-600 px-4 py-3 text-sm font-bold text-white shadow-glow-bubble"
                  >
                    <ShoppingBag className="h-4 w-4" /> Shop Now
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
