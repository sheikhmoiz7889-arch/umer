import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Category, Product } from '@/lib/types';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: cats, error: cErr }, { data: prods, error: pErr }] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('products').select('*').order('sort_order', { ascending: true }),
    ]);
    if (cErr) console.error(cErr);
    if (pErr) console.error(pErr);
    setCategories(cats || []);
    setProducts(prods || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = active === 'all' ? products : products.filter((p) => p.category_id === active);

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
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={cat.slug}
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                active === cat.id
                  ? 'bg-navy-900 text-white shadow-float'
                  : 'bg-mint-50 text-navy-700 hover:bg-mint-100'
              }`}
            >
              {cat.emoji && <span className="mr-1.5">{cat.emoji}</span>}
              {cat.name}
            </button>
          ))}
        </div>

        {/* product grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-navy-700/30" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <Package className="h-10 w-10 text-navy-700/20" />
            <p className="mt-3 text-sm font-semibold text-navy-700/50">No products in this category yet.</p>
          </div>
        ) : (
          <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
