/**
 * Cart Persistence Service — Karni Paridhan
 *
 * Syncs the in-memory cart to Supabase for logged-in users.
 * Guest users get a local-only cart (no Supabase calls).
 *
 * Strategy:
 *  - Each cart item is one row keyed by (user_id, product_id + size)
 *  - On login: fetch server cart, merge with any local items
 *  - On logout: server cart is kept; local state cleared
 *
 * @module services/cart
 */
import { supabase } from "../supabase/client";

/** Composite key that uniquely identifies a cart slot (product + size) */
const makeKey = (productId, size) => `${productId}::${size ?? ""}`;

/**
 * Fetch all cart items for a user from Supabase.
 *
 * @param {string} userId
 * @returns {Promise<{data: import('../types/index').CartItem[]|null, error: Error|null}>}
 */
export async function fetchCart(userId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) return { data: null, error };

  // Unwrap the product_snapshot JSONB column back to CartItem shape
  return {
    data: data.map((row) => ({ ...row.product_snapshot, _rowId: row.id })),
    error: null,
  };
}

/**
 * Upsert (add or update quantity) a single cart item.
 *
 * @param {string} userId
 * @param {import('../types/index').CartItem} item
 * @returns {Promise<{error: Error|null}>}
 */
export async function upsertCartItem(userId, item) {
  const compositeKey = makeKey(item.id, item.selectedSize);

  const { error } = await supabase.from("cart_items").upsert(
    {
      user_id: userId,
      product_id: compositeKey,
      product_snapshot: item,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,product_id" }
  );

  return { error };
}

/**
 * Remove a single cart item.
 *
 * @param {string} userId
 * @param {string} productId
 * @param {string|null} selectedSize
 * @returns {Promise<{error: Error|null}>}
 */
export async function removeCartItem(userId, productId, selectedSize) {
  const compositeKey = makeKey(productId, selectedSize);

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", compositeKey);

  return { error };
}

/**
 * Clear all cart items for a user (called after successful order).
 *
 * @param {string} userId
 * @returns {Promise<{error: Error|null}>}
 */
export async function clearCart(userId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  return { error };
}

/**
 * Replace the entire server cart with local items (used on login merge).
 *
 * @param {string} userId
 * @param {import('../types/index').CartItem[]} items
 * @returns {Promise<{error: Error|null}>}
 */
export async function syncCartToServer(userId, items) {
  // Delete all existing rows first, then insert fresh
  const { error: delErr } = await clearCart(userId);
  if (delErr) return { error: delErr };

  if (items.length === 0) return { error: null };

  const rows = items.map((item) => ({
    user_id: userId,
    product_id: makeKey(item.id, item.selectedSize),
    product_snapshot: item,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("cart_items").insert(rows);
  return { error };
}
