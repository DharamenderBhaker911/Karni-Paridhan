/**
 * TrackOrderPage — Karni Paridhan
 * Order status lookup by Order ID or phone number
 */
import { useState } from "react";
import { supabase } from "../supabase/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const STATUS_STEPS = ["pending", "confirmed", "shipped", "delivered"];

const STATUS_CONFIG = {
  pending:   { label: "Order Placed",  icon: "📋", color: "#f59e0b" },
  confirmed: { label: "Confirmed",     icon: "✅", color: "#3b82f6" },
  shipped:   { label: "Shipped",       icon: "🚚", color: "#8b5cf6" },
  delivered: { label: "Delivered",     icon: "📦", color: "#22c55e" },
  cancelled: { label: "Cancelled",     icon: "❌", color: "#ef4444" },
};

export default function TrackOrderPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  async function handleTrack(e) {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setOrder(null);
    setNotFound(false);

    try {
      // Try searching by order_id or customer_phone
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .or(`order_id.eq.${search.trim().toUpperCase()},customer_phone.eq.${search.trim()}`)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setOrder(data);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  const currentStepIdx = order
    ? STATUS_STEPS.indexOf(order.status)
    : -1;

  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Order Tracking</span>
          <h1 className="inner-page-title serif">Track Your Order</h1>
          <p className="inner-page-sub">Enter your Order ID or registered phone number to see the live status of your delivery.</p>
        </div>
      </div>

      <section className="track-section section-pad">
        <div className="container-narrow">

          {/* Search Form */}
          <form className="track-form" onSubmit={handleTrack}>
            <input
              type="text"
              className="track-input"
              placeholder="Enter Order ID (e.g. #KP3X9A2B) or Phone Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="btn-primary track-btn" disabled={loading}>
              {loading ? (
                <span className="auth-submit-loading">
                  <span className="auth-spinner" /> Tracking…
                </span>
              ) : (
                "🔍 Track Order"
              )}
            </button>
          </form>

          {/* Not Found */}
          {notFound && (
            <div className="track-not-found">
              <span>😕</span>
              <h3>Order Not Found</h3>
              <p>We couldn't find an order with that ID or phone number. Please double-check and try again, or <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.</p>
            </div>
          )}

          {/* Order Found */}
          {order && (
            <div className="track-result">
              <div className="track-order-header">
                <div>
                  <h3 className="track-order-id">{order.order_id}</h3>
                  <p className="track-order-date">
                    Placed on {new Date(order.created_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                </div>
                <div
                  className="track-status-badge"
                  style={{
                    color: STATUS_CONFIG[order.status]?.color,
                    background: `${STATUS_CONFIG[order.status]?.color}18`,
                  }}
                >
                  {STATUS_CONFIG[order.status]?.icon} {STATUS_CONFIG[order.status]?.label}
                </div>
              </div>

              {/* Progress Bar */}
              {order.status !== "cancelled" && (
                <div className="track-progress">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step} className={`track-step ${i <= currentStepIdx ? "track-step--done" : ""} ${i === currentStepIdx ? "track-step--active" : ""}`}>
                      <div className="track-step-dot">
                        <span>{STATUS_CONFIG[step].icon}</span>
                      </div>
                      <p className="track-step-label">{STATUS_CONFIG[step].label}</p>
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={`track-step-line ${i < currentStepIdx ? "track-step-line--done" : ""}`} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {order.status === "cancelled" && (
                <div className="track-cancelled-msg">
                  <span>❌</span>
                  <p>This order has been cancelled. If you have any questions, please WhatsApp us.</p>
                </div>
              )}

              {/* Order Info */}
              <div className="track-order-details">
                <div className="track-detail-row">
                  <span>Product</span>
                  <span>{order.product_name}</span>
                </div>
                {order.selected_size && (
                  <div className="track-detail-row">
                    <span>Size</span>
                    <span>{order.selected_size}</span>
                  </div>
                )}
                <div className="track-detail-row">
                  <span>Total Amount</span>
                  <span><strong>₹{order.total_amount?.toLocaleString("en-IN")}</strong></span>
                </div>
                <div className="track-detail-row">
                  <span>Customer</span>
                  <span>{order.customer_name}</span>
                </div>
                <div className="track-detail-row">
                  <span>Delivery Address</span>
                  <span>{order.address}, {order.city}, {order.state} – {order.pincode}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/919999999999?text=Hi%2C%20I%20need%20help%20with%20order%20${order.order_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost track-wa-btn"
              >
                💬 Need Help? WhatsApp Us
              </a>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
