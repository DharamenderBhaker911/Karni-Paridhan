/**
 * MyOrdersPage — Karni Paridhan
 * Shows logged-in user's complete order history from Supabase
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserOrders } from "../hooks/useOrders";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: "⏳" },
  confirmed: { label: "Confirmed", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: "✅" },
  shipped: { label: "Shipped", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", icon: "🚚" },
  delivered: { label: "Delivered", color: "#22c55e", bg: "rgba(34,197,94,0.1)", icon: "📦" },
  cancelled: { label: "Cancelled", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: "❌" },
};

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;

  return (
    <div className="order-card">
      <div className="order-card-header" onClick={() => setExpanded((v) => !v)}>
        <div className="order-card-meta">
          <span className="order-id">{order.order_id}</span>
          <span className="order-date">
            {new Date(order.created_at).toLocaleDateString("en-IN", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </span>
        </div>
        <div className="order-card-right">
          <span
            className="order-status-badge"
            style={{ color: status.color, background: status.bg }}
          >
            {status.icon} {status.label}
          </span>
          <span className="order-total">₹{order.total_amount?.toLocaleString("en-IN")}</span>
          <span className="order-chevron">{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {expanded && (
        <div className="order-card-body">
          <div className="order-detail-grid">
            <div className="order-detail-group">
              <h4>Delivery Details</h4>
              <p><strong>{order.customer_name}</strong></p>
              <p>{order.address}, {order.city}</p>
              <p>{order.state} – {order.pincode}</p>
              <p>📞 {order.customer_phone}</p>
            </div>
            <div className="order-detail-group">
              <h4>Order Summary</h4>
              <p>Product: {order.product_name}</p>
              {order.selected_size && <p>Size: {order.selected_size}</p>}
              <p>Payment: {order.payment_method}</p>
              <div className="order-price-breakdown">
                <span>Subtotal</span><span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
                <span>GST (5%)</span><span>₹{order.gst_amount?.toLocaleString("en-IN")}</span>
                <span className="order-price-total"><strong>Total</strong></span>
                <span className="order-price-total"><strong>₹{order.total_amount?.toLocaleString("en-IN")}</strong></span>
              </div>
            </div>
          </div>

          {order.cart_items?.length > 0 && (
            <div className="order-items-list">
              <h4>Items Ordered</h4>
              {order.cart_items.map((item, i) => (
                <div className="order-item-row" key={i}>
                  <span className="order-item-name">{item.name}</span>
                  {item.selectedSize && <span className="order-item-size">Size: {item.selectedSize}</span>}
                  <span className="order-item-qty">×{item.qty}</span>
                  <span className="order-item-price">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MyOrdersPage() {
  const { data: orders, isLoading, isError } = useUserOrders();

  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Your Account</span>
          <h1 className="inner-page-title serif">My Orders</h1>
          <p className="inner-page-sub">Track and review all your Karni Paridhan purchases.</p>
        </div>
      </div>

      <section className="inner-page-body section-pad">
        <div className="container-narrow">
          {isLoading && (
            <div className="orders-loading">
              <div className="orders-spinner" />
              <p>Fetching your orders…</p>
            </div>
          )}

          {isError && (
            <div className="orders-empty">
              <span>😕</span>
              <p>Unable to load orders. Please try again.</p>
            </div>
          )}

          {!isLoading && !isError && orders?.length === 0 && (
            <div className="orders-empty">
              <span>🛍️</span>
              <h3>No orders yet</h3>
              <p>When you place an order, it will appear here.</p>
              <Link to="/" className="btn-primary" style={{ marginTop: "1.5rem" }}>
                Shop Now
              </Link>
            </div>
          )}

          {!isLoading && orders?.length > 0 && (
            <div className="orders-list">
              <p className="orders-count">{orders.length} order{orders.length !== 1 ? "s" : ""} found</p>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
