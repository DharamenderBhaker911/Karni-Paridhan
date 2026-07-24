/**
 * Newsletter Service — Karni Paridhan
 *
 * Handles newsletter subscriber management via Supabase.
 * INSERT is open (no auth required). Duplicates are handled gracefully.
 *
 * @module services/newsletter
 */
import { supabase } from "../supabase/client";

/**
 * Subscribe an email to the newsletter.
 * Uses upsert so re-subscribing an existing email just sets is_active = true.
 *
 * @param {string} email
 * @returns {Promise<{error: Error|null, alreadySubscribed: boolean}>}
 */
export async function subscribeNewsletter(email) {
  const normalized = email.trim().toLowerCase();

  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email: normalized,
      is_active: true,
      subscribed_at: new Date().toISOString(),
    },
    {
      onConflict: "email",
      ignoreDuplicates: false, // upsert re-activates if they unsubscribed
    }
  );

  return { error };
}

/**
 * Unsubscribe an email (sets is_active = false, never deletes rows).
 *
 * @param {string} email
 * @returns {Promise<{error: Error|null}>}
 */
export async function unsubscribeNewsletter(email) {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ is_active: false })
    .eq("email", email.trim().toLowerCase());

  return { error };
}
