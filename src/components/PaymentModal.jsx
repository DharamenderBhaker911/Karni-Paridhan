import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatPrice } from "../utils/format";

const UPI_ID = "dharmendrabhakar14@axl";
const PAYEE_NAME = "Dharmedhra Bhakar";

const paytmLogo = "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg";
const gpayLogo = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg";
const phonepeLogo = "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg";
const bhimLogo = "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg";

function PaymentModal({ subtotal, productName, onClose, onSuccess }) {
  const [paid, setPaid] = useState(false);
  const [activeTab, setActiveTab] = useState("apps");

  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${subtotal.toFixed(2)}&tn=OrderPayment`;

  function getAppUrl(app) {
    const baseParams = `pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${subtotal.toFixed(2)}&tn=OrderPayment`;

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isAndroid) {
      if (app === "gpay") return `intent://pay?${baseParams}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
      if (app === "phonepe") return `intent://pay?${baseParams}#Intent;scheme=upi;package=com.phonepe.app;end`;
      if (app === "paytm") return `intent://pay?${baseParams}#Intent;scheme=upi;package=net.one97.paytm;end`;
    } else if (isIOS) {
      if (app === "gpay") return `gpay://upi/pay?${baseParams}`;
      if (app === "phonepe") return `phonepe://pay?${baseParams}`;
      if (app === "paytm") return `paytmmp://pay?${baseParams}`;
    }
    return `upi://pay?${baseParams}`;
  }

  function handleConfirm() {
    setPaid(true);
    setTimeout(() => { onSuccess(); onClose(); }, 3200);
  }

  return (
    <div className="checkout-page" role="dialog" aria-modal="true" aria-label="Checkout">

      {paid ? (
        /* ── Success Full Page ── */
        <div className="checkout-success-page">
          <div className="checkout-success-inner">
            <div className="success-checkmark-ring">
              <svg viewBox="0 0 52 52" className="success-check-svg">
                <circle className="success-check-circle" cx="26" cy="26" r="24" fill="none" />
                <path className="success-check-path" fill="none" d="M14 27l8 8 16-16" />
              </svg>
            </div>
            <h2 className="success-title">Order Confirmed!</h2>
            <p className="success-order-num">
              Order #{Math.random().toString(36).substr(2, 8).toUpperCase()}
            </p>
            <p className="success-msg">
              Thank you for shopping with <strong>Karni Paridhan</strong>.<br />
              Your royal outfit will be prepared with care. 🎉
            </p>
            <div className="success-amount-badge">{formatPrice(subtotal)} Paid via UPI</div>
          </div>
        </div>
      ) : (
        /* ── Checkout Full Page Layout ── */
        <div className="checkout-layout">

          {/* ── LEFT PANEL — Order Details ── */}
          <div className="checkout-left">
            {/* Brand Bar */}
            <div className="checkout-brand-bar">
              <span className="checkout-brand-name">Karni Paridhan</span>
              <span className="checkout-secure-pill">🔒 Secure Checkout</span>
            </div>

            {/* Amount Hero */}
            <div className="checkout-amount-hero">
              <p className="checkout-amount-label">Total Payable</p>
              <div className="checkout-amount-display">
                <span className="checkout-currency">₹</span>
                <span className="checkout-amount-num">
                  {subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
              {productName && (
                <p className="checkout-product-name">📦 {productName}</p>
              )}
            </div>

            {/* Order Summary Card */}
            <div className="checkout-summary-card">
              <p className="checkout-summary-title">Order Summary</p>
              <div className="checkout-summary-row">
                <span>{productName || "Your Order"}</span>
                <span className="checkout-summary-val">{formatPrice(subtotal)}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Delivery</span>
                <span className="checkout-summary-free">FREE</span>
              </div>
              <div className="checkout-summary-divider" />
              <div className="checkout-summary-row checkout-summary-total">
                <span>Total</span>
                <span className="checkout-summary-val">{formatPrice(subtotal)}</span>
              </div>
              <p className="checkout-summary-tax">Inclusive of all taxes · GST applied</p>
            </div>

            {/* UPI ID */}
            <div className="checkout-upi-card">
              <span className="checkout-upi-icon">💳</span>
              <div>
                <p className="checkout-upi-label">Paying to</p>
                <p className="checkout-upi-id">{UPI_ID}</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="checkout-trust-row">
              <span className="checkout-trust-badge">🛡 100% Secure</span>
              <span className="checkout-trust-badge">🔐 UPI Certified</span>
              <span className="checkout-trust-badge">🏦 RBI Regulated</span>
            </div>
          </div>

          {/* ── RIGHT PANEL — Payment Methods ── */}
          <div className="checkout-right">
            {/* Back Button */}
            <button type="button" className="checkout-back-btn" onClick={onClose}>
              ← Back to Cart
            </button>

            <h3 className="checkout-right-title">Choose Payment Method</h3>

            {/* Tab Switcher */}
            <div className="checkout-tab-row">
              <button
                type="button"
                className={`checkout-tab ${activeTab === "apps" ? "active" : ""}`}
                onClick={() => setActiveTab("apps")}
              >
                📲 UPI Apps
              </button>
              <button
                type="button"
                className={`checkout-tab ${activeTab === "qr" ? "active" : ""}`}
                onClick={() => setActiveTab("qr")}
              >
                ⬛ Scan QR Code
              </button>
            </div>

            {activeTab === "apps" ? (
              <div className="checkout-app-grid">
                <a href={getAppUrl("gpay")} className="checkout-app-btn gpay-btn" onClick={handleConfirm} title="Google Pay">
                  <img src={gpayLogo} alt="Google Pay" />
                  <div>
                    <p className="checkout-app-name">Google Pay</p>
                    <p className="checkout-app-hint">Tap to open GPay</p>
                  </div>
                  <span className="checkout-app-arrow">›</span>
                </a>
                <a href={getAppUrl("phonepe")} className="checkout-app-btn phonepe-btn" onClick={handleConfirm} title="PhonePe">
                  <img src={phonepeLogo} alt="PhonePe" />
                  <div>
                    <p className="checkout-app-name">PhonePe</p>
                    <p className="checkout-app-hint">Tap to open PhonePe</p>
                  </div>
                  <span className="checkout-app-arrow">›</span>
                </a>
                <a href={getAppUrl("paytm")} className="checkout-app-btn paytm-btn" onClick={handleConfirm} title="Paytm">
                  <img src={paytmLogo} alt="Paytm" />
                  <div>
                    <p className="checkout-app-name">Paytm</p>
                    <p className="checkout-app-hint">Tap to open Paytm</p>
                  </div>
                  <span className="checkout-app-arrow">›</span>
                </a>
                <a href={getAppUrl("generic")} className="checkout-app-btn bhim-btn" onClick={handleConfirm} title="BHIM UPI">
                  <img src={bhimLogo} alt="BHIM UPI" />
                  <div>
                    <p className="checkout-app-name">BHIM UPI</p>
                    <p className="checkout-app-hint">Any UPI app</p>
                  </div>
                  <span className="checkout-app-arrow">›</span>
                </a>
              </div>
            ) : (
              <div className="checkout-qr-section">
                <div className="checkout-qr-card">
                  <QRCodeSVG
                    value={upiUrl}
                    size={200}
                    fgColor="#4e0f22"
                    bgColor="#ffffff"
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <p className="checkout-qr-hint">Open any UPI app → Scan QR → Pay ₹{subtotal.toFixed(2)}</p>
              </div>
            )}

            {/* Confirm / Done */}
            <button type="button" className="checkout-confirm-btn" onClick={handleConfirm}>
              ✓ I've Completed the Payment
            </button>

            <p className="checkout-confirm-note">
              Click only after you've paid successfully in your UPI app
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentModal;
