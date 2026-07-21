import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import PaymentModal from "./PaymentModal";

function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  const [showPayment, setShowPayment] = useState(false);

  if (!cartOpen) return null;

  const itemCount = cartItems.reduce((n, i) => n + i.qty, 0);
  const shipping = 0; // Free delivery
  const total = subtotal + shipping;

  function handlePaymentSuccess() {
    clearCart();
    setCartOpen(false);
    setShowPayment(false);
  }

  return (
    <>
      {/* Overlay */}
      <button
        className="cart-overlay"
        type="button"
        onClick={() => setCartOpen(false)}
        aria-label="Close cart"
      />

      {/* Drawer */}
      <aside className="cart-drawer" aria-label="Shopping cart">
        {/* Head */}
        <div className="cart-head">
          <div>
            <p className="cart-head-title">Your Cart</p>
            <p className="cart-head-sub">
              {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? "s" : ""}` : "Empty"}
            </p>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <span className="empty-cart-icon">🛍️</span>
              <p>Your cart is ready for royal looks.</p>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setCartOpen(false)}
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.selectedSize}`}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-meta">
                    {item.selectedSize ? `Size: ${item.selectedSize}` : "Size: —"} · {item.category}
                  </p>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div className="cart-item-actions">
                    {/* Qty */}
                    <div className="qty-mini">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (only when items exist) */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Order Summary */}
            <div className="order-summary">
              <p className="order-summary-title">Order Summary</p>
              <div className="order-summary-row">
                <span>Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
                <span className="order-summary-val">{formatPrice(subtotal)}</span>
              </div>
              <div className="order-summary-row">
                <span>Delivery</span>
                <span className="order-summary-val order-free">FREE</span>
              </div>
              <div className="order-summary-divider" />
              <div className="order-summary-row order-total-row">
                <span className="order-total-label">Total Payable</span>
                <span className="order-total-amount">{formatPrice(total)}</span>
              </div>
              <p className="order-tax-note">Inclusive of all taxes</p>
            </div>

            {/* Trust Badge */}
            <div className="cart-trust-row">
              <span>🔒 Secure Checkout</span>
              <span className="dot-sep">·</span>
              <span>📲 UPI / QR Pay</span>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              className="checkout-btn"
              onClick={() => setShowPayment(true)}
            >
              <span>Proceed to Pay</span>
              <span className="checkout-amount-chip">{formatPrice(total)}</span>
            </button>
          </div>
        )}
      </aside>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          subtotal={total}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}

export default CartDrawer;
