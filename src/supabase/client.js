/**
 * Supabase Client — Karni Paridhan
 *
 * Initializes the Supabase client using environment variables.
 * VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env
 *
 * The anon key is safe to expose in the browser — it is a public key.
 * Row Level Security policies enforce all data access controls server-side.
 *
 * Never add the service_role key here or anywhere in the frontend.
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "[Karni Paridhan] Missing Supabase environment variables.\n" +
    "Create a .env file in the project root with:\n" +
    "  VITE_SUPABASE_URL=https://your-project.supabase.co\n" +
    "  VITE_SUPABASE_ANON_KEY=your-anon-key"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Persist session across page refreshes using localStorage
    persistSession: true,
    // Automatically refresh the JWT token before it expires
    autoRefreshToken: true,
    // Detect OAuth callbacks (used for magic links and OAuth providers)
    detectSessionInUrl: true,
  },
});
