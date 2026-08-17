import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'kinetrexa-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item,
        );
      }
      return [...current, { productId: product.id, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.productId !== productId);
      }
      const product = products.find((entry) => entry.id === productId);
      const max = product?.stock || 99;
      return current.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.min(quantity, max) } : item,
      );
    });
  };

  const clearCart = () => setItems([]);

  const getCartCount = () => items.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
    }),
    [items, cartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
