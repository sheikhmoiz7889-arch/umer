import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES, type Category } from '@/lib/constants';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const [active, setActive] = useState<Category | 'all'>('all');

  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section id="shop" className="relative z-10 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-bubble-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-bubble-600 ring-1 ring-bubble-100">
            Our Collection
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900">
            Shop by Category
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-navy-700/70">
            Premium kidswear crafted with love — from newborns to teens. Pick a category and find the perfect outfit!
          </p>
        </div>

        {/* category tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActive('all')}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              active === 'all'
                ? 'bg-navy-900 text-white shadow-float'
                : 'bg-mint-50 text-navy-700 hover:bg-mint-100'
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                active === cat.id
                  ? 'bg-navy-900 text-white shadow-float'
                  : 'bg-mint-50 text-navy-700 hover:bg-mint-100'
              }`}
            >
              <span className="mr-1.5">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* product grid */}
        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
