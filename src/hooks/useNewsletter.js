/**
 * useNewsletter — mutation hook for newsletter subscription
 *
 * @module hooks/useNewsletter
 */
import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletter } from "../services/newsletter";
import toast from "react-hot-toast";

/**
 * Subscribe an email to the newsletter.
 * Shows loading/success/error toasts automatically.
 * The component just calls `mutate(email)` and checks `isSuccess`.
 */
export function useNewsletter() {
  return useMutation({
    mutationFn: (email) => subscribeNewsletter(email),
    onSuccess: () => {
      toast.success("🎉 You're subscribed! Watch for exclusive offers.");
    },
    onError: (error) => {
      console.error("[useNewsletter] Error:", error);
      toast.error("Could not subscribe. Please try again.");
    },
  });
}
