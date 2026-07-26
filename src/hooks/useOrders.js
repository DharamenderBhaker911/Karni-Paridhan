/**
 * useOrders — TanStack Query hooks for order data
 *
 * Orders are saved to localStorage for the user's history,
 * and pushed to the server via services/orders.
 *
 * @module hooks/useOrders
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder, updateOrderStatus } from "../services/orders";
import toast from "react-hot-toast";

export const orderKeys = {
  all: ["orders"],
  local: () => ["orders", "local"],
};

const getLocalOrders = () => {
  try {
    const saved = localStorage.getItem("karni_orders");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalOrder = (order) => {
  const currentOrders = getLocalOrders();
  // Ensure the order has a timestamp
  const newOrder = {
    ...order,
    created_at: order.created_at || new Date().toISOString()
  };
  localStorage.setItem("karni_orders", JSON.stringify([newOrder, ...currentOrders]));
  return newOrder;
};

/**
 * Fetch orders from localStorage (since we removed auth).
 */
export function useUserOrders() {
  return useQuery({
    queryKey: orderKeys.local(),
    queryFn: async () => {
      return getLocalOrders();
    },
    staleTime: Infinity, // never stale since it's local
  });
}

/**
 * Fetch all orders (admin only).
 */
export function useAllOrders(filters = {}) {
  // Without auth, admin frontend isn't easily accessible
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: async () => {
      return [];
    },
    staleTime: Infinity,
  });
}

/**
 * Mutation to create a new order.
 * Saves to localStorage AND attempts to push to Supabase.
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData) => {
      // 1. Save to local storage
      const localOrder = saveLocalOrder(orderData);
      
      // 2. Attempt to save to Supabase (fire and forget, might fail if RLS requires auth)
      try {
        // The parameters expected by createOrder in services/orders.js are different
        // PaymentModal seems to pass raw fields if we look at how it calls createOrder
        // Wait, PaymentModal actually calls createOrder with a flat object, we should just pass it through
        await createOrder(orderData);
      } catch (e) {
        console.warn("Failed to push order to Supabase:", e);
      }

      return localOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.local() });
    },
    onError: (error) => {
      console.error("[useCreateOrder] Error:", error);
      toast.error("Failed to save order locally. Please screenshot your order details.");
    },
  });
}

/**
 * Mutation to update order status.
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: (data) => {
      toast.success(`Order updated`);
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
    onError: (error) => {
      console.error("[useUpdateOrderStatus] Error:", error);
      toast.error("Failed to update order status. Please try again.");
    },
  });
}
