import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("karni_cart");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to load cart from localStorage", e);
    }
    return [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("karni_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.qty, 0),
    [cartItems]
  );

  const addToCart = (product) => {
    const key = `${product.id}-${product.selectedSize ?? ""}`;
    let updatedItem = null;

    setCartItems((current) => {
      const existing = current.find(
        (item) => `${item.id}-${item.selectedSize ?? ""}` === key
      );

      if (existing) {
        return current.map((item) => {
          if (`${item.id}-${item.selectedSize ?? ""}` === key) {
            const newItem = { ...item, qty: item.qty + (product.qty ?? 1) };
            updatedItem = newItem;
            return newItem;
          }
          return item;
        });
      }

      const newItem = { ...product, qty: product.qty ?? 1 };
      updatedItem = newItem;
      return [...current, newItem];
    });



    setCartOpen(true);
  };

  const updateQuantity = (id, qty) => {
    // We don't have selectedSize here, assume we just want to update the first match
    // Actually updateQuantity is passed id, which in CartDrawer is the product ID. Wait!
    // If the cart has multiple sizes of the same product, CartDrawer's updateQuantity is broken!
    // CartDrawer calls `updateQuantity(item.id, qty)` instead of passing composite key.
    // Let's modify updateQuantity to take the composite key or just item.id for now
    
    // We'll update CartDrawer shortly to pass the composite key, or just pass `item`
  };

  const removeFromCart = (id, selectedSize) => {
    setCartItems((current) =>
      current.filter((item) => !(item.id === id && item.selectedSize === selectedSize))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantityItem = (item, qty) => {
    if (qty < 1) {
      removeFromCart(item.id, item.selectedSize);
      return;
    }
    setCartItems((current) =>
      current.map((i) => {
        if (i.id === item.id && i.selectedSize === item.selectedSize) {
          return { ...i, qty };
        }
        return i;
      })
    );
  };

  const value = {
    cartItems,
    cartCount,
    subtotal,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQuantity: updateQuantityItem,
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
