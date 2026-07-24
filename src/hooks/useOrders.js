/**
 * useOrders — TanStack Query hooks for order data
 *
 * All hooks handle loading, error, and success states automatically.
 * Cache is invalidated after mutations so the UI stays fresh.
 *
 * @module hooks/useOrders
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserOrders,
  getAllOrders,
  createOrder,
  updateOrderStatus,
} from "../services/orders";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

/** Query key factory — keeps keys consistent and easy to invalidate */
export const orderKeys = {
  all: ["orders"],
  user: (userId) => ["orders", "user", userId],
  admin: (filters) => ["orders", "admin", filters],
};

/* ─── Queries ──────────────────────────────────────────────────────────────── */

/**
 * Fetch orders for the currently logged-in user.
 */
export function useUserOrders() {
  const { user } = useAuth();

  return useQuery({
    queryKey: orderKeys.user(user?.id),
    queryFn: async () => {
      const { data, error } = await getUserOrders(user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Fetch all orders (admin only).
 * Supabase RLS will return an empty array or error for non-admins.
 *
 * @param {Object} [filters]
 * @param {string} [filters.status]
 * @param {string} [filters.search]
 */
export function useAllOrders(filters = {}) {
  return useQuery({
    queryKey: orderKeys.admin(filters),
    queryFn: async () => {
      const { data, error } = await getAllOrders(filters);
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 30, // 30 seconds — admin sees fresher data
  });
}

/* ─── Mutations ────────────────────────────────────────────────────────────── */

/**
 * Mutation to create a new order.
 * Shows toast on success/error.
 * On success, invalidates user order cache.
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (orderData) =>
      createOrder({ ...orderData, userId: user?.id ?? null }),
    onSuccess: () => {
      // Invalidate user orders so "My Orders" page refreshes
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: orderKeys.user(user.id) });
      }
      // Note: success toast is shown in the component for better UX sequencing
    },
    onError: (error) => {
      console.error("[useCreateOrder] Error:", error);
      toast.error("Failed to save order. Please screenshot your order details.");
    },
  });
}

/**
 * Mutation to update order status (admin only).
 * Shows toast on success/error.
 *
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: (data) => {
      toast.success(`Order ${data.data?.order_id} → ${data.data?.status}`);
      // Invalidate all admin order queries
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
    onError: (error) => {
      console.error("[useUpdateOrderStatus] Error:", error);
      toast.error("Failed to update order status. Please try again.");
    },
  });
}
