/**
 * Orders Service — Karni Paridhan
 *
 * All order-related Supabase operations.
 * Called from PaymentModal and useOrders hook.
 *
 * @module services/orders
 */
import { supabase } from "../supabase/client";

/**
 * Create a new order in Supabase.
 *
 * @param {Object} params
 * @param {string} params.orderId          - Display ID e.g. "#KP3X9A2B"
 * @param {string|null} params.userId      - null for guest orders
 * @param {Object} params.addressForm      - { name, phone, whatsapp, address, city, state, pincode }
 * @param {string} params.productName      - product display name or "N items"
 * @param {string|null} params.selectedSize
 * @param {number} params.subtotal
 * @param {number} params.gstAmount
 * @param {number} params.totalAmount
 * @param {Array}  params.cartItems        - full cart snapshot
 * @returns {Promise<{data: import('../types/index').Order|null, error: Error|null}>}
 */
export async function createOrder({
  orderId,
  userId = null,
  addressForm,
  productName,
  selectedSize = null,
  subtotal,
  gstAmount,
  totalAmount,
  cartItems = [],
}) {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      order_id: orderId,
      user_id: userId,
      customer_name: addressForm.name,
      customer_phone: addressForm.phone,
      customer_whatsapp: addressForm.whatsapp || addressForm.phone,
      address: addressForm.address,
      city: addressForm.city,
      state: addressForm.state,
      pincode: addressForm.pincode,
      product_name: productName,
      selected_size: selectedSize,
      subtotal: subtotal,
      gst_amount: gstAmount,
      total_amount: totalAmount,
      payment_method: "UPI",
      status: "pending",
      cart_items: cartItems,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Fetch all orders for a specific user.
 * (Used on a potential "My Orders" page for logged-in users)
 *
 * @param {string} userId
 * @returns {Promise<{data: import('../types/index').Order[]|null, error: Error|null}>}
 */
export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

/**
 * Fetch ALL orders (admin only — enforced by RLS).
 *
 * @param {Object} [filters]
 * @param {string} [filters.status]   - filter by status
 * @param {string} [filters.search]   - search by customer name or order_id
 * @returns {Promise<{data: import('../types/index').Order[]|null, error: Error|null}>}
 */
export async function getAllOrders({ status, search } = {}) {
  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(
      `customer_name.ilike.%${search}%,order_id.ilike.%${search}%,customer_phone.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Update the status of an order (admin only — enforced by RLS).
 *
 * @param {string} id     - UUID of the order row
 * @param {string} status - new status value
 * @returns {Promise<{data: import('../types/index').Order|null, error: Error|null}>}
 */
export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}
