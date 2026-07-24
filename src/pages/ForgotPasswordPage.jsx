/**
 * ForgotPasswordPage — Karni Paridhan
 *
 * Sends a password reset email via Supabase Auth.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { images } from "../data/products";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) { setEmailError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    setSubmitting(true);
    const { error } = await resetPassword(email.trim());

    if (error) {
      toast.error("Failed to send reset email. Please try again.");
      setSubmitting(false);
      return;
    }

    setSent(true);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <img src={images.logo} alt="Karni Paridhan" className="auth-logo" />
          <span className="auth-brand">Karni Paridhan</span>
        </div>

        {sent ? (
          /* ── Success state ── */
          <div className="auth-sent-state">
            <div className="auth-sent-icon">📧</div>
            <h1 className="auth-title">Check your inbox!</h1>
            <p className="auth-sub">
              We've sent a password reset link to <strong>{email}</strong>.
              <br />
              Check your spam folder if you don't see it in a few minutes.
            </p>
            <Link to="/login" className="auth-submit" style={{ display: "block", textAlign: "center", marginTop: "1.5rem" }}>
              ← Back to Login
            </Link>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <h1 className="auth-title">Forgot Password?</h1>
            <p className="auth-sub">
              No worries — enter your email and we'll send you a reset link.
            </p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className={`auth-field ${emailError ? "auth-field--err" : ""}`}>
                <label htmlFor="forgot-email">Email Address</label>
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  disabled={submitting}
                />
                {emailError && <p className="auth-err">{emailError}</p>}
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
                    Sending…
                  </span>
                ) : (
                  "Send Reset Link →"
                )}
              </button>
            </form>

            <p className="auth-switch">
              <Link to="/login" className="auth-switch-link">
                ← Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
