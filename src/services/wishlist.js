/**
 * Wishlist Service — Karni Paridhan
 *
 * All wishlist-related Supabase operations.
 * Only works for authenticated users (enforced by RLS).
 *
 * @module services/wishlist
 */
import { supabase } from "../supabase/client";

/**
 * Fetch all wishlist product IDs for a user.
 *
 * @param {string} userId
 * @returns {Promise<{data: string[]|null, error: Error|null}>}
 */
export async function getWishlist(userId) {
  const { data, error } = await supabase
    .from("wishlist")
    .select("product_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return { data: null, error };
  return { data: data.map((r) => r.product_id), error: null };
}

/**
 * Add a product to the wishlist.
 *
 * @param {string} userId
 * @param {string} productId
 * @returns {Promise<{error: Error|null}>}
 */
export async function addToWishlist(userId, productId) {
  const { error } = await supabase.from("wishlist").insert({
    user_id: userId,
    product_id: productId,
  });
  return { error };
}

/**
 * Remove a product from the wishlist.
 *
 * @param {string} userId
 * @param {string} productId
 * @returns {Promise<{error: Error|null}>}
 */
export async function removeFromWishlist(userId, productId) {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  return { error };
}

/**
 * Toggle a product in/out of the wishlist.
 * Returns the new state: true = added, false = removed.
 *
 * @param {string} userId
 * @param {string} productId
 * @param {boolean} isCurrentlyWishlisted
 * @returns {Promise<{wishlisted: boolean, error: Error|null}>}
 */
export async function toggleWishlist(userId, productId, isCurrentlyWishlisted) {
  if (isCurrentlyWishlisted) {
    const { error } = await removeFromWishlist(userId, productId);
    return { wishlisted: false, error };
  } else {
    const { error } = await addToWishlist(userId, productId);
    return { wishlisted: true, error };
  }
}
