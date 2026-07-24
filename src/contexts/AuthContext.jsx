/**
 * AuthContext — Karni Paridhan
 *
 * Provides authentication state and actions to the entire app.
 *
 * What it manages:
 *  - Supabase session (JWT token, expiry, refresh)
 *  - User profile (including role from the `profiles` table)
 *  - Auth actions: signIn, signUp, signOut, resetPassword, updatePassword
 *
 * Role resolution:
 *  - After login, fetches the user's row from `profiles` table
 *  - `role` is 'user' by default, 'admin' for admins
 *  - Role is stored in state, never in localStorage (always re-fetched from DB)
 *
 * Usage:
 *  import { useAuth } from '../contexts/AuthContext';
 *  const { user, role, loading, signIn, signOut } = useAuth();
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { supabase } from "../supabase/client";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

/* ─── Helper: fetch profile + role from the profiles table ─────────────────── */
async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.warn("[AuthContext] Could not fetch profile:", error.message);
    return null;
  }
  return data;
}

/* ─── Provider ──────────────────────────────────────────────────────────────── */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true); // true until first session check completes

  /* ── Initialize: get existing session on mount ── */
  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);

          const prof = await fetchProfile(initialSession.user.id);
          if (mounted) {
            setProfile(prof);
            setRole(prof?.role ?? "user");
          }
        }
      } catch (err) {
        console.error("[AuthContext] init error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initialize();
    return () => { mounted = false; };
  }, []);

  /* ── Listen for auth state changes (login, logout, token refresh) ── */
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          const prof = await fetchProfile(newSession.user.id);
          setProfile(prof);
          setRole(prof?.role ?? "user");
        } else {
          setProfile(null);
          setRole("user");
        }

        // Mark loading done (catches PASSWORD_RECOVERY events too)
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /* ─── Auth Actions ──────────────────────────────────────────────────────── */

  /**
   * Sign in with email + password.
   * Returns { error } — caller handles success/error UI.
   */
  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };
    toast.success("Welcome back! 👑");
    return { error: null };
  }, []);

  /**
   * Create a new account.
   * Creates the profile row with role='user' via database trigger (recommended)
   * or as a fallback insert here.
   *
   * Returns { error }
   */
  const signUp = useCallback(async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // stored in auth.users.raw_user_meta_data
      },
    });

    if (error) return { error };

    // Attempt to insert a profile row (catches cases where the DB trigger isn't set up)
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName || "",
        role: "user",
      });
    }

    toast.success("Account created! Check your email to confirm. 🎉");
    return { error: null };
  }, []);

  /**
   * Sign out the current user.
   */
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    toast("Logged out. Come back soon! 🙏", { icon: "👋" });
  }, []);

  /**
   * Send a password reset email.
   * Returns { error }
   */
  const resetPassword = useCallback(async (email) => {
    const redirectUrl = `${window.location.origin}/#/update-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    return { error };
  }, []);

  /**
   * Update the current user's password (called from UpdatePasswordPage).
   * Returns { error }
   */
  const updatePassword = useCallback(async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (!error) toast.success("Password updated successfully! ✅");
    return { error };
  }, []);

  /**
   * Update the user's profile (name, avatar, etc.).
   * Returns { error }
   */
  const updateProfile = useCallback(async (updates) => {
    if (!user?.id) return { error: new Error("Not logged in") };

    const { error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (!error) {
      setProfile((prev) => ({ ...prev, ...updates }));
      toast.success("Profile updated! ✅");
    }
    return { error };
  }, [user?.id]);

  /* ─── Computed helpers ──────────────────────────────────────────────────── */
  const isAdmin = role === "admin";
  const isLoggedIn = !!user;

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      role,
      loading,
      isAdmin,
      isLoggedIn,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updatePassword,
      updateProfile,
    }),
    [session, user, profile, role, loading, isAdmin, isLoggedIn,
     signIn, signUp, signOut, resetPassword, updatePassword, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ─── Hook ──────────────────────────────────────────────────────────────────── */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
