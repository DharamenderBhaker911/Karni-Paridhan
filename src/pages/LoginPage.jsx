/**
 * LoginPage — Karni Paridhan
 *
 * Email + Password login form.
 * Handles: validation, loading state, error display, redirect after login.
 */
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { images } from "../data/products";

export default function LoginPage() {
  const { signIn, loading: authLoading, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Redirect destination after login (e.g., came from /admin)
  const from = location.state?.from?.pathname || "/";

  // Already logged in → go home
  if (!authLoading && isLoggedIn) {
    navigate(from, { replace: true });
    return null;
  }

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
    if (serverError) setServerError("");
  }

  function validate() {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setServerError("");

    const { error } = await signIn(form.email.trim(), form.password);

    if (error) {
      setServerError(
        error.message === "Invalid login credentials"
          ? "Incorrect email or password. Please try again."
          : error.message
      );
      setSubmitting(false);
      return;
    }

    navigate(from, { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo-wrap">
          <img src={images.logo} alt="Karni Paridhan" className="auth-logo" />
          <span className="auth-brand">Karni Paridhan</span>
        </div>

        <h1 className="auth-title">Welcome Back 👑</h1>
        <p className="auth-sub">Sign in to access your orders & wishlist</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Server Error */}
          {serverError && (
            <div className="auth-server-error" role="alert">
              ⚠️ {serverError}
            </div>
          )}

          {/* Email */}
          <div className={`auth-field ${errors.email ? "auth-field--err" : ""}`}>
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              disabled={submitting}
              aria-describedby={errors.email ? "login-email-err" : undefined}
            />
            {errors.email && (
              <p className="auth-err" id="login-email-err" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className={`auth-field ${errors.password ? "auth-field--err" : ""}`}>
            <div className="auth-field-label-row">
              <label htmlFor="login-password">Password</label>
              <Link to="/forgot-password" className="auth-forgot-link">
                Forgot password?
              </Link>
            </div>
            <div className="auth-password-wrap">
              <input
                id="login-password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                disabled={submitting}
                aria-describedby={errors.password ? "login-pass-err" : undefined}
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="auth-err" id="login-pass-err" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-submit"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? (
              <span className="auth-submit-loading">
                <span className="auth-spinner" />
                Signing in…
              </span>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-switch-link">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
