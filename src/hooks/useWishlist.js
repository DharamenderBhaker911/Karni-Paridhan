/**
 * useWishlist — TanStack Query hooks for wishlist data
 *
 * Wishlist is now stored in localStorage since authentication was removed.
 *
 * @module hooks/useWishlist
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const wishlistKeys = {
  all: ["wishlist"],
  local: () => ["wishlist", "local"],
};

const getLocalWishlist = () => {
  try {
    const saved = localStorage.getItem("karni_wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const setLocalWishlist = (list) => {
  localStorage.setItem("karni_wishlist", JSON.stringify(list));
};

/**
 * Fetch the wishlist from localStorage
 */
export function useWishlist() {
  return useQuery({
    queryKey: wishlistKeys.local(),
    queryFn: async () => {
      return getLocalWishlist();
    },
    staleTime: Infinity, // never stale since it's local
  });
}

/**
 * Toggle a product in/out of the wishlist with optimistic updates.
 */
export function useToggleWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, isCurrentlyWishlisted }) => {
      const currentList = getLocalWishlist();
      let newList;
      if (isCurrentlyWishlisted) {
        newList = currentList.filter(id => id !== productId);
      } else {
        newList = [...currentList, productId];
      }
      setLocalWishlist(newList);
      return newList;
    },

    onMutate: async ({ productId, isCurrentlyWishlisted }) => {
      await queryClient.cancelQueries({ queryKey: wishlistKeys.local() });

      const previousWishlist = queryClient.getQueryData(wishlistKeys.local());

      queryClient.setQueryData(wishlistKeys.local(), (old = []) => {
        if (isCurrentlyWishlisted) {
          return old.filter((id) => id !== productId);
        }
        return [...old, productId];
      });

      return { previousWishlist };
    },

    onError: (error, _variables, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(
          wishlistKeys.local(),
          context.previousWishlist
        );
      }
      toast.error("Could not update wishlist. Try again.");
    },

    onSuccess: (_data, { isCurrentlyWishlisted }) => {
      toast.success(
        isCurrentlyWishlisted ? "Removed from wishlist" : "❤️ Added to wishlist!"
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.local() });
    },
  });
}
