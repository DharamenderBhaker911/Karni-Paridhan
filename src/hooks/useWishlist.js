/**
 * useWishlist — TanStack Query hooks for wishlist data
 *
 * Wishlist is user-scoped. Guest users get an empty list with a prompt to login.
 *
 * @module hooks/useWishlist
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, toggleWishlist } from "../services/wishlist";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export const wishlistKeys = {
  all: ["wishlist"],
  user: (userId) => ["wishlist", userId],
};

/**
 * Fetch the current user's wishlist (array of product IDs).
 * Returns an empty array for guests (no error, no network call).
 */
export function useWishlist() {
  const { user } = useAuth();

  return useQuery({
    queryKey: wishlistKeys.user(user?.id),
    queryFn: async () => {
      const { data, error } = await getWishlist(user.id);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes — wishlist doesn't change often
    placeholderData: [], // show empty wishlist while loading
  });
}

/**
 * Toggle a product in/out of the wishlist with optimistic updates.
 */
export function useToggleWishlist() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ productId, isCurrentlyWishlisted }) => {
      if (!user?.id) throw new Error("Please log in to save to wishlist");
      return toggleWishlist(user.id, productId, isCurrentlyWishlisted);
    },

    // Optimistic update — flip the icon immediately without waiting for server
    onMutate: async ({ productId, isCurrentlyWishlisted }) => {
      if (!user?.id) return;
      await queryClient.cancelQueries({ queryKey: wishlistKeys.user(user.id) });

      const previousWishlist = queryClient.getQueryData(wishlistKeys.user(user.id));

      queryClient.setQueryData(wishlistKeys.user(user.id), (old = []) => {
        if (isCurrentlyWishlisted) {
          return old.filter((id) => id !== productId);
        }
        return [...old, productId];
      });

      return { previousWishlist };
    },

    onError: (error, _variables, context) => {
      // Rollback on error
      if (context?.previousWishlist && user?.id) {
        queryClient.setQueryData(
          wishlistKeys.user(user.id),
          context.previousWishlist
        );
      }
      toast.error(
        error.message === "Please log in to save to wishlist"
          ? "❤️ Please log in to save items to wishlist"
          : "Could not update wishlist. Try again."
      );
    },

    onSuccess: (_data, { isCurrentlyWishlisted }) => {
      toast.success(
        isCurrentlyWishlisted ? "Removed from wishlist" : "❤️ Added to wishlist!"
      );
    },

    onSettled: () => {
      // Always refetch to ensure server state is accurate
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.user(user.id) });
      }
    },
  });
}
