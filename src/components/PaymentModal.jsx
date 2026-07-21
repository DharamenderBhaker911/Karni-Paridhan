import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatPrice } from "../utils/format";

const UPI_ID = "dharmendrabhakar14@axl";
const PAYEE_NAME = "Dharmendhra Bhakar";

const paytmLogo = new URL("../../assets/paytm_logo.jpg", import.meta.url).href;
const gpayLogo = new URL("../../assets/gpay_logo.jpg", import.meta.url).href;
const phonepeLogo = new URL("../../assets/phonepe_logo.jpg", import.meta.url).href;
const bhimLogo = new URL("../../assets/bhim_logo.png", import.meta.url).href;

function PaymentModal({ subtotal, productName, onClose, onSuccess }) {
  const [paid, setPaid] = useState(false);
  const [activeTab, setActiveTab] = useState("apps"); // "apps" | "qr"

  // General UPI deep-link URL
  const upiUrl = [
    `upi://pay?pa=${UPI_ID}`,
    `pn=${encodeURIComponent(PAYEE_NAME)}`,
    `am=${subtotal.toFixed(2)}`,
    `cu=INR`,
    `tn=${encodeURIComponent(productName ? `Karni Paridhan - ${productName}` : "Karni Paridhan Order")}`,
  ].join("&");

  function getAppUrl(app) {
    const baseParams = [
      `pa=${UPI_ID}`,
      `pn=${encodeURIComponent(PAYEE_NAME)}`,
      `am=${subtotal.toFixed(2)}`,
      `cu=INR`,
      `tn=${encodeURIComponent(productName ? `Karni Paridhan - ${productName}` : "Karni Paridhan Order")}`,
    ].join("&");

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
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 3200);
  }

  return (
    <div className="payment-modal-shell" role="dialog" aria-modal="true" aria-label="UPI Payment">
      <button
        className="payment-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close payment"
      />

      <div className="payment-panel">
        {paid ? (
          /* ── Success State ── */
          <div className="payment-success">
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
        ) : (
          /* ── Payment State ── */
          <>
            {/* Header */}
            <div className="payment-header">
              <div className="payment-header-left">
                <p className="payment-secure-label">🔒 Secure Checkout</p>
                <h2 className="payment-title">Complete Payment</h2>
              </div>
              <button
                type="button"
                className="payment-close-x"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Amount Card */}
            <div className="payment-amount-card">
              <div className="payment-amount-card-left">
                <p className="payment-amount-label">Total Payable</p>
                {productName && (
                  <p className="payment-product-chip">📦 {productName}</p>
                )}
              </div>
              <div className="payment-amount-display">
                <span className="payment-currency">₹</span>
                <span className="payment-amount-num">
                  {subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
            </div>

            {/* UPI ID Row */}
            <div className="upi-id-row">
              <span>💳</span>
              <span>Pay to:</span>
              <strong>{UPI_ID}</strong>
            </div>

            {/* Tab Switcher */}
            <div className="payment-tab-row">
              <button
                type="button"
                className={`payment-tab ${activeTab === "apps" ? "active" : ""}`}
                onClick={() => setActiveTab("apps")}
              >
                📲 UPI Apps
              </button>
              <button
                type="button"
                className={`payment-tab ${activeTab === "qr" ? "active" : ""}`}
                onClick={() => setActiveTab("qr")}
              >
                ⬛ Scan QR
              </button>
            </div>

            {activeTab === "apps" ? (
              /* App Grid */
              <div className="payment-app-grid">
                <a
                  href={getAppUrl("gpay")}
                  className="payment-app-btn gpay-btn"
                  onClick={handleConfirm}
                  title="Pay via Google Pay"
                >
                  <img src={gpayLogo} alt="Google Pay" />
                  <span>Google Pay</span>
                </a>
                <a
                  href={getAppUrl("phonepe")}
                  className="payment-app-btn phonepe-btn"
                  onClick={handleConfirm}
                  title="Pay via PhonePe"
                >
                  <img src={phonepeLogo} alt="PhonePe" />
                  <span>PhonePe</span>
                </a>
                <a
                  href={getAppUrl("paytm")}
                  className="payment-app-btn paytm-btn"
                  onClick={handleConfirm}
                  title="Pay via Paytm"
                >
                  <img src={paytmLogo} alt="Paytm" />
                  <span>Paytm</span>
                </a>
                <a
                  href={getAppUrl("generic")}
                  className="payment-app-btn bhim-btn"
                  onClick={handleConfirm}
                  title="Pay via BHIM UPI"
                >
                  <img src={bhimLogo} alt="BHIM UPI" />
                  <span>BHIM UPI</span>
                </a>
              </div>
            ) : (
              /* QR Code */
              <div className="qr-wrap">
                <QRCodeSVG
                  value={upiUrl}
                  size={180}
                  fgColor="#4e0f22"
                  bgColor="#ffffff"
                  level="M"
                  includeMargin={false}
                />
                <p className="qr-scan-hint">Scan with any UPI app</p>
              </div>
            )}

            {/* Confirm Button */}
            <button
              type="button"
              className="payment-confirm-btn"
              onClick={handleConfirm}
            >
              ✓ I've Completed the Payment
            </button>

            {/* Cancel */}
            <button
              type="button"
              className="payment-cancel-btn"
              onClick={onClose}
            >
              Cancel & go back
            </button>

            {/* Security Row */}
            <div className="payment-security-row">
              <span>🛡 100% Secure</span>
              <span className="dot-sep">·</span>
              <span>🔐 UPI Certified</span>
              <span className="dot-sep">·</span>
              <span>🏦 RBI Regulated</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;
