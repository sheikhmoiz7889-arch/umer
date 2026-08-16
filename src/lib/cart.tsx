import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

export interface StorefrontProduct {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  ageRange: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
}

export interface CartItem extends StorefrontProduct {
  qty: number;
  size: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  count: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addItem: (product: StorefrontProduct, size: string) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, delta: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addItem = useCallback((product: StorefrontProduct, size: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1, size }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const updateQty = useCallback((id: string, size: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i,
        )
        .filter((i) => i.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    isOpen,
    isCheckoutOpen,
    count,
    subtotal,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    openCheckout: () => {
      setIsOpen(false);
      setIsCheckoutOpen(true);
    },
    closeCheckout: () => setIsCheckoutOpen(false),
    addItem,
    removeItem,
    updateQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
