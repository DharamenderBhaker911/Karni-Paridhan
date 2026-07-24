/**
 * UpdatePasswordPage — Karni Paridhan
 *
 * Accessed via the reset email magic link.
 * Supabase embeds the token in the URL hash; the auth listener picks it up automatically.
 * By the time this page renders, the user is already "logged in" with a recovery session.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { images } from "../data/products";

export default function UpdatePasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPass, setShowPass] = useState(false);

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
    if (serverError) setServerError("");
  }

  function validate() {
    const e = {};
    if (!form.password) e.password = "New password is required";
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
    const { error } = await updatePassword(form.password);

    if (error) {
      setServerError(error.message);
      setSubmitting(false);
      return;
    }

    // Redirect to home after successful password update
    setTimeout(() => navigate("/", { replace: true }), 1500);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <img src={images.logo} alt="Karni Paridhan" className="auth-logo" />
          <span className="auth-brand">Karni Paridhan</span>
        </div>

        <h1 className="auth-title">Set New Password 🔐</h1>
        <p className="auth-sub">Choose a strong password to protect your account.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {serverError && (
            <div className="auth-server-error" role="alert">
              ⚠️ {serverError}
            </div>
          )}

          <div className={`auth-field ${errors.password ? "auth-field--err" : ""}`}>
            <label htmlFor="new-password">New Password</label>
            <div className="auth-password-wrap">
              <input
                id="new-password"
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
            {errors.password && <p className="auth-err">{errors.password}</p>}
          </div>

          <div className={`auth-field ${errors.confirmPassword ? "auth-field--err" : ""}`}>
            <label htmlFor="confirm-new-password">Confirm New Password</label>
            <div className="auth-password-wrap">
              <input
                id="confirm-new-password"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                disabled={submitting}
              />
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
                Updating…
              </span>
            ) : (
              "Update Password →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
