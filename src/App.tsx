import { useState } from 'react';
import { CartProvider } from '@/lib/cart';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import CheckoutPage from '@/components/CheckoutPage';
import ContactFab from '@/components/ContactFab';
import AdminPanel from '@/components/AdminPanel';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <CartProvider>
      <Hero />
      <ProductGrid />
      <CartDrawer />
      <CheckoutPage />
      <ContactFab />

      {/* Admin entry — hidden gear button bottom-left */}
      <button
        onClick={() => setAdminOpen(true)}
        className="fixed bottom-5 left-5 z-50 grid place-items-center h-11 w-11 rounded-full bg-navy-900/80 text-white/60 shadow-soft ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-navy-900 hover:text-white"
        aria-label="Open admin panel"
        title="Admin Panel"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      </button>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </CartProvider>
  );
}
