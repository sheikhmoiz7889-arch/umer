import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, count, openCheckout } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-navy-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-float"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-navy-900/5 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-bubble-500" />
                <h2 className="font-display text-lg font-extrabold text-navy-900">
                  Your Cart {count > 0 && `(${count})`}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="grid place-items-center h-9 w-9 rounded-xl bg-mint-50 text-navy-700 transition-colors hover:bg-mint-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid place-items-center h-20 w-20 rounded-full bg-mint-50">
                    <ShoppingBag className="h-9 w-9 text-mint-300" />
                  </div>
                  <p className="mt-4 font-display text-lg font-bold text-navy-900">Your cart is empty</p>
                  <p className="mt-1 text-sm text-navy-700/60">Add some cute outfits to get started!</p>
                  <button
                    onClick={closeCart}
                    className="mt-5 rounded-full bg-navy-900 px-6 py-2.5 text-sm font-bold text-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-3 rounded-2xl bg-mint-50/50 p-3 ring-1 ring-navy-900/5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <h3 className="text-sm font-bold text-navy-900 leading-tight">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-navy-700/40 transition-colors hover:text-bubble-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-navy-700/50">Size: {item.size}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1.5 rounded-lg bg-white px-1.5 py-1 ring-1 ring-navy-900/5">
                            <button
                              onClick={() => updateQty(item.id, item.size, -1)}
                              className="grid place-items-center h-6 w-6 rounded-md text-navy-700 hover:bg-mint-100"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold text-navy-900">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.size, 1)}
                              className="grid place-items-center h-6 w-6 rounded-md text-navy-700 hover:bg-mint-100"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-display text-sm font-extrabold text-navy-900">
                            Rs {(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* footer */}
            {items.length > 0 && (
              <div className="border-t border-navy-900/5 px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy-700/70">Subtotal</span>
                  <span className="font-display text-2xl font-extrabold text-navy-900">
                    Rs {subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="mb-3 text-xs text-navy-700/50">Shipping calculated at checkout. Order via WhatsApp.</p>
                <button
                  onClick={openCheckout}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bubble-500 to-bubble-600 px-6 py-3.5 text-base font-bold text-white shadow-glow-bubble transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Checkout <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
