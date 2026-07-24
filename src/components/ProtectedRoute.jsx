/**
 * ProtectedRoute — Karni Paridhan
 *
 * Wraps routes that require authentication or a specific role.
 *
 * Usage:
 *   <ProtectedRoute>           — requires any logged-in user
 *   <ProtectedRoute role="admin"> — requires admin role
 *
 * While auth is loading → shows a spinner (avoids flash of redirect).
 * If not logged in → redirects to /login.
 * If logged in but wrong role → shows access-denied message.
 */
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { isLoggedIn, loading, role: userRole } = useAuth();

  // Show blank/spinner while session is being loaded from storage
  if (loading) {
    return (
      <div className="protected-loading" role="status" aria-label="Loading…">
        <div className="protected-spinner" />
        <p>Loading…</p>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role (e.g., user accessing /admin)
  if (role && userRole !== role) {
    return (
      <div className="protected-denied">
        <h2>🔒 Access Denied</h2>
        <p>You don't have permission to view this page.</p>
        <a href="/" className="btn-primary">Go Home</a>
      </div>
    );
  }

  return children;
}
