import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.qty, 0),
    [cartItems]
  );

  const addToCart = (product) => {
    // Use id + selectedSize as composite key so same dress in diff sizes = separate entries
    const key = `${product.id}-${product.selectedSize ?? ""}`;

    setCartItems((current) => {
      const existing = current.find(
        (item) => `${item.id}-${item.selectedSize ?? ""}` === key
      );

      if (existing) {
        return current.map((item) =>
          `${item.id}-${item.selectedSize ?? ""}` === key
            ? { ...item, qty: item.qty + (product.qty ?? 1) }
            : item
        );
      }

      return [...current, { ...product, qty: product.qty ?? 1 }];
    });

    setCartOpen(true);
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) {
      setCartItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setCartItems((current) =>
      current.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    cartCount,
    subtotal,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a <CartProvider>");
  return ctx;
}
