import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Zap, Check } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, openCheckout } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? '');
  const [added, setAdded] = useState(false);

  const price = Number(product.price);
  const oldPrice = product.old_price ? Number(product.old_price) : null;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price,
        oldPrice: oldPrice ?? undefined,
        image: product.image_url,
        ageRange: product.age_range,
        rating: Number(product.rating),
        reviews: product.reviews,
        badge: product.badge ?? undefined,
        category: product.category_id,
      },
      selectedSize,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    handleAdd();
    setTimeout(() => openCheckout(), 100);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-navy-900/5"
    >
      {/* image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent opacity-60" />

        {/* badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-navy-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-soft">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-bubble-500 px-3 py-1 text-[10px] font-bold text-white shadow-glow-bubble">
              <Zap className="h-3 w-3 fill-white" /> {discount}% OFF
            </span>
          )}
        </div>

        {/* rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full glass px-2.5 py-1 shadow-soft">
          <Star className="h-3 w-3 fill-sun-400 text-sun-400" />
          <span className="text-[11px] font-bold text-navy-900">{Number(product.rating)}</span>
          <span className="text-[10px] text-navy-700/60">({product.reviews})</span>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-bold leading-tight text-navy-900">
          {product.name}
        </h3>
        <p className="mt-1 text-xs font-semibold text-navy-700/60">{product.age_range}</p>

        {/* price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold text-navy-900">
            Rs {price.toLocaleString()}
          </span>
          {oldPrice && (
            <span className="text-sm font-semibold text-navy-700/40 line-through">
              Rs {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* sizes */}
        {product.sizes.length > 0 && (
          <div className="mt-3">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-navy-700/50">Select Size</p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-all ${
                    selectedSize === s
                      ? 'bg-navy-900 text-white shadow-soft'
                      : 'bg-mint-50 text-navy-700 hover:bg-mint-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* buttons */}
        <div className="mt-4 flex gap-2 pt-auto">
          <button
            onClick={handleAdd}
            className="group/btn relative flex flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-mint-100 px-3 py-2.5 text-sm font-bold text-mint-700 transition-colors hover:bg-mint-200"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </>
            )}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-bubble-500 to-bubble-600 px-3 py-2.5 text-sm font-bold text-white shadow-glow-bubble transition-transform hover:scale-[1.03] active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
