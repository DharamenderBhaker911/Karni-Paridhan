/**
 * SignupPage — Karni Paridhan
 *
 * New account registration. Role defaults to 'user' — admin is set manually in Supabase.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { images } from "../data/products";

export default function SignupPage() {
  const { signUp, isLoggedIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!authLoading && isLoggedIn) {
    navigate("/", { replace: true });
    return null;
  }

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
    if (serverError) setServerError("");
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setServerError("");

    const { error } = await signUp(
      form.email.trim(),
      form.password,
      form.fullName.trim()
    );

    if (error) {
      setServerError(
        error.message.includes("already registered")
          ? "This email is already registered. Try logging in instead."
          : error.message
      );
      setSubmitting(false);
      return;
    }

    // Navigate to home — toast is shown by AuthContext
    navigate("/", { replace: true });
  }

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 2) return { label: "Weak", color: "#e53e3e" };
    if (score <= 3) return { label: "Fair", color: "#dd6b20" };
    return { label: "Strong", color: "#38a169" };
  })();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <img src={images.logo} alt="Karni Paridhan" className="auth-logo" />
          <span className="auth-brand">Karni Paridhan</span>
        </div>

        <h1 className="auth-title">Create Account 🌸</h1>
        <p className="auth-sub">Join our royal community</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {serverError && (
            <div className="auth-server-error" role="alert">
              ⚠️ {serverError}
            </div>
          )}

          {/* Full Name */}
          <div className={`auth-field ${errors.fullName ? "auth-field--err" : ""}`}>
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Priya Sharma"
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              disabled={submitting}
            />
            {errors.fullName && <p className="auth-err">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className={`auth-field ${errors.email ? "auth-field--err" : ""}`}>
            <label htmlFor="signup-email">Email Address</label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              disabled={submitting}
            />
            {errors.email && <p className="auth-err">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={`auth-field ${errors.password ? "auth-field--err" : ""}`}>
            <label htmlFor="signup-password">Password</label>
            <div className="auth-password-wrap">
              <input
                id="signup-password"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                disabled={submitting}
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
            {/* Password strength indicator */}
            {passwordStrength && (
              <div className="auth-strength">
                <span
                  className="auth-strength-bar"
                  style={{ background: passwordStrength.color, width: "60%" }}
                />
                <span
                  className="auth-strength-label"
                  style={{ color: passwordStrength.color }}
                >
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {errors.password && <p className="auth-err">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className={`auth-field ${errors.confirmPassword ? "auth-field--err" : ""}`}>
            <label htmlFor="signup-confirm">Confirm Password</label>
            <div className="auth-password-wrap">
              <input
                id="signup-confirm"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                disabled={submitting}
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="auth-err">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? (
              <span className="auth-submit-loading">
                <span className="auth-spinner" />
                Creating account…
              </span>
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-switch-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
