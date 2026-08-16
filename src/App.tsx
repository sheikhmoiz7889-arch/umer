import { CartProvider } from '@/lib/cart';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import CheckoutPage from '@/components/CheckoutPage';
import ContactFab from '@/components/ContactFab';

export default function App() {
  return (
    <CartProvider>
      <Hero />
      <ProductGrid />
      <CartDrawer />
      <CheckoutPage />
      <ContactFab />
    </CartProvider>
  );
}
