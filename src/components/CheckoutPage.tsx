import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ShoppingBag, Check, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { WHATSAPP, ADDRESS, PHONE_DISPLAY } from '@/lib/constants';

export default function CheckoutPage() {
  const { items, isCheckoutOpen, closeCheckout, subtotal, clear, count } = useCart();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Lahore',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isCheckoutOpen) return null;

  const shipping = subtotal > 3000 ? 0 : 150;
  const total = subtotal + shipping;

  const buildWhatsAppMessage = () => {
    const orderLines = items
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} (Size: ${item.size}) x${item.qty} = Rs ${(item.price * item.qty).toLocaleString()}`,
      )
      .join('\n');

    return encodeURIComponent(
      `*New Order — Umer Garments*\n\n` +
        `*Customer:* ${form.name}\n` +
        `*Phone:* ${form.phone}\n` +
        `*Address:* ${form.address}, ${form.city}\n` +
        (form.notes ? `*Notes:* ${form.notes}\n` : '') +
        `\n*Order Items:*\n${orderLines}\n\n` +
        `*Subtotal:* Rs ${subtotal.toLocaleString()}\n` +
        `*Shipping:* ${shipping === 0 ? 'FREE' : `Rs ${shipping}`}\n` +
        `*Total:* Rs ${total.toLocaleString()}\n\n` +
        `Please confirm my order. Thank you!`,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      clear();
      setSubmitted(false);
      setForm({ name: '', phone: '', address: '', city: 'Lahore', notes: '' });
      closeCheckout();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-gradient-to-b from-mint-50 to-white"
        >
          {/* top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-900/5 bg-white/80 px-4 py-3 backdrop-blur-lg sm:px-8">
            <button
              onClick={closeCheckout}
              className="flex items-center gap-2 rounded-full bg-mint-50 px-4 py-2 text-sm font-bold text-navy-700 transition-colors hover:bg-mint-100"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="font-display text-lg font-extrabold text-navy-900">Checkout</h1>
            <button
              onClick={closeCheckout}
              className="grid place-items-center h-9 w-9 rounded-xl bg-mint-50 text-navy-700 hover:bg-mint-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {submitted ? (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="grid place-items-center h-24 w-24 rounded-full bg-mint-100"
              >
                <Check className="h-12 w-12 text-mint-600" />
              </motion.div>
              <h2 className="mt-6 font-display text-2xl font-extrabold text-navy-900">Order Sent!</h2>
              <p className="mt-2 max-w-sm text-sm text-navy-700/70">
                Your order has been sent to Umer Garments on WhatsApp. We'll confirm your order shortly. Thank you!
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
              <div className="grid gap-8 lg:grid-cols-5">
                {/* form */}
                <form onSubmit={handleSubmit} className="lg:col-span-3">
                  <h2 className="font-display text-xl font-extrabold text-navy-900">Delivery Details</h2>
                  <p className="mt-1 text-sm text-navy-700/60">
                    Fill in your info and we'll send the order to our WhatsApp to confirm.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full Name" required>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Ahmed Khan"
                          className="input"
                        />
                      </Field>
                      <Field label="Phone Number" required>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="e.g. 0300 1234567"
                          className="input"
                        />
                      </Field>
                    </div>
                    <Field label="Delivery Address" required>
                      <textarea
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="House #, Street, Area"
                        rows={2}
                        className="input resize-none"
                      />
                    </Field>
                    <Field label="City" required>
                      <input
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Lahore"
                        className="input"
                      />
                    </Field>
                    <Field label="Order Notes (optional)">
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Any special instructions..."
                        rows={2}
                        className="input resize-none"
                      />
                    </Field>
                  </div>

                  {/* trust badges */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-navy-700/70">
                      <ShieldCheck className="h-4 w-4 text-mint-500" /> Secure Order
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-navy-700/70">
                      <Truck className="h-4 w-4 text-mint-500" /> Fast Delivery in Lahore
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-navy-700/70">
                      <MapPin className="h-4 w-4 text-mint-500" /> {ADDRESS}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={items.length === 0}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bubble-500 to-bubble-600 px-6 py-4 text-base font-bold text-white shadow-glow-bubble transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Send Order on WhatsApp
                  </button>
                </form>

                {/* order summary */}
                <div className="lg:col-span-2">
                  <div className="sticky top-24 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-navy-900/5">
                    <h3 className="font-display text-lg font-extrabold text-navy-900">
                      Order Summary {count > 0 && `(${count})`}
                    </h3>

                    {items.length === 0 ? (
                      <p className="mt-4 text-sm text-navy-700/60">Your cart is empty. Add products to checkout.</p>
                    ) : (
                      <>
                        <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                          {items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-14 w-14 shrink-0 rounded-xl object-cover"
                              />
                              <div className="flex-1 text-sm">
                                <p className="font-bold text-navy-900 leading-tight">{item.name}</p>
                                <p className="text-xs text-navy-700/50">
                                  {item.size} × {item.qty}
                                </p>
                                <p className="mt-0.5 font-bold text-navy-900">
                                  Rs {(item.price * item.qty).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 space-y-2 border-t border-navy-900/5 pt-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-navy-700/70">Subtotal</span>
                            <span className="font-bold text-navy-900">Rs {subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-navy-700/70">Shipping</span>
                            <span className="font-bold text-navy-900">
                              {shipping === 0 ? 'FREE' : `Rs ${shipping}`}
                            </span>
                          </div>
                          {shipping > 0 && (
                            <p className="text-xs text-mint-600 font-semibold">
                              Add Rs {(3000 - subtotal).toLocaleString()} more for FREE shipping!
                            </p>
                          )}
                          <div className="flex justify-between border-t border-navy-900/5 pt-2">
                            <span className="font-display text-lg font-extrabold text-navy-900">Total</span>
                            <span className="font-display text-lg font-extrabold text-navy-900">
                              Rs {total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="mt-4 rounded-2xl bg-mint-50 p-3 text-center">
                      <p className="text-xs font-semibold text-navy-700/70">
                        Need help? Call us at{' '}
                        <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="text-bubble-600 font-bold">
                          {PHONE_DISPLAY}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-700/60">
        {label} {required && <span className="text-bubble-500">*</span>}
      </span>
      {children}
    </label>
  );
}
