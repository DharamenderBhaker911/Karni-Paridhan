import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import PaymentModal from "./PaymentModal";



function CartDrawer() {
  const navigate = useNavigate();
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

  // Build a summary of product names for cart payment
  const cartSummary = cartItems.length === 1
    ? cartItems[0].name
    : `${cartItems.length} items`;

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
                        onClick={() => updateQuantity(item, item.qty - 1)}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item, item.qty + 1)}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
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
            </div>

            {/* Trust Badge */}
            <div className="cart-trust-row">
              <span>🔒 Secure Checkout</span>
              <span className="dot-sep">·</span>
              <span>📲 UPI / QR Pay</span>
            </div>

            <button
              type="button"
              className="checkout-btn"
              onClick={() => {
                setShowPayment(true);
              }}
            >
              <span>Proceed to Pay</span>
              <span className="checkout-amount-chip">{formatPrice(total)}</span>
            </button>

            {/* WhatsApp Enquiry Button */}
            <a
              href={`https://wa.me/919784842239?text=${encodeURIComponent(`Hi! I have ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in my cart worth ₹${total}. I'd like to enquire before placing my order.\n\nItems:\n${cartItems.map(i => `• ${i.name}${i.selectedSize ? ` (${i.selectedSize})` : ''} x${i.qty}`).join('\n')}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cart-wa-enquiry-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquiry on WhatsApp
            </a>
          </div>
        )}
      </aside>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          subtotal={subtotal}
          productName={cartSummary}
          items={cartItems}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}

export default CartDrawer;
