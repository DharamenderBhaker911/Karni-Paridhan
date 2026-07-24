import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchCart,
  upsertCartItem,
  removeCartItem,
  clearCart as clearCartSupabase,
  syncCartToServer,
} from "../services/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useAuth();

  // On login, fetch server cart and merge with any local items
  useEffect(() => {
    if (!user) return;

    fetchCart(user.id).then(({ data: serverItems }) => {
      if (!serverItems) return;

      setCartItems((localItems) => {
        if (localItems.length === 0) return serverItems;

        // Merge: add quantities for duplicates
        const merged = [...serverItems];
        localItems.forEach((localItem) => {
          const key = `${localItem.id}-${localItem.selectedSize ?? ""}`;
          const existing = merged.find(
            (i) => `${i.id}-${i.selectedSize ?? ""}` === key
          );
          if (existing) {
            existing.qty += localItem.qty;
          } else {
            merged.push(localItem);
          }
        });

        // Sync merged result back to server
        syncCartToServer(user.id, merged);
        return merged;
      });
    });
  }, [user]);

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

    // Fire and forget to Supabase
    if (user) {
      setTimeout(() => upsertCartItem(user.id, updatedItem), 0);
    }

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
    if (user) {
      removeCartItem(user.id, id, selectedSize);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) {
      clearCartSupabase(user.id);
    }
  };

  const updateQuantityItem = (item, qty) => {
    if (qty < 1) {
      removeFromCart(item.id, item.selectedSize);
      return;
    }
    setCartItems((current) =>
      current.map((i) => {
        if (i.id === item.id && i.selectedSize === item.selectedSize) {
          const updated = { ...i, qty };
          if (user) upsertCartItem(user.id, updated);
          return updated;
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
