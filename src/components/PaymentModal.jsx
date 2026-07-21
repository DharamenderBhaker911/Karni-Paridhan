import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatPrice } from "../utils/format";

const UPI_ID = "dharmendrabhakar14@axl";
const PAYEE_NAME = "KarniParidhan";

const paytmLogo = new URL("../../assets/paytm_logo.jpg", import.meta.url).href;
const gpayLogo = new URL("../../assets/gpay_logo.jpg", import.meta.url).href;
const phonepeLogo = new URL("../../assets/phonepe_logo.jpg", import.meta.url).href;
const bhimLogo = new URL("../../assets/bhim_logo.png", import.meta.url).href;

function PaymentModal({ subtotal, productName, onClose, onSuccess }) {
  const [paid, setPaid] = useState(false);

  // General UPI deep-link URL — any UPI app can scan this
  const upiUrl = [
    `upi://pay?pa=${UPI_ID}`,
    `pn=${encodeURIComponent(PAYEE_NAME)}`,
    `am=${subtotal.toFixed(2)}`,
    `cu=INR`,
    `tn=${encodeURIComponent(productName ? `Karni Paridhan - ${productName}` : "Karni Paridhan Order")}`,
  ].join("&");

  // Helper to compile specific UPI app URLs for direct redirect on mobile
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
      if (app === "gpay") {
        return `intent://pay?${baseParams}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
      }
      if (app === "phonepe") {
        return `intent://pay?${baseParams}#Intent;scheme=upi;package=com.phonepe.app;end`;
      }
      if (app === "paytm") {
        return `intent://pay?${baseParams}#Intent;scheme=upi;package=net.one97.paytm;end`;
      }
    } else if (isIOS) {
      if (app === "gpay") {
        return `gpay://upi/pay?${baseParams}`;
      }
      if (app === "phonepe") {
        return `phonepe://pay?${baseParams}`;
      }
      if (app === "paytm") {
        return `paytmmp://pay?${baseParams}`;
      }
    }

    // Default universal link
    return `upi://pay?${baseParams}`;
  }

  function handleConfirm() {
    setPaid(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2800);
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
            <span className="success-icon">✅</span>
            <h2 className="success-title serif">Payment Received!</h2>
            <p className="success-msg">
              Thank you for your order from Karni Paridhan.
              <br />
              We'll prepare your royal outfit with care. 🎉
            </p>
          </div>
        ) : (
          /* ── QR & Redirect Payment State ── */
          <>
            <h2 className="payment-title serif">Secure Checkout</h2>
            
            {productName ? (
              <p className="payment-product-info">
                Buying: <strong>{productName}</strong>
              </p>
            ) : (
              <p className="payment-subtitle">
                Complete your royal collection order
              </p>
            )}

            {/* Price Info */}
            <div className="payment-amount-row">
              <span className="payment-amount-label">Total Amount</span>
              <span className="payment-amount">{formatPrice(subtotal)}</span>
            </div>

            {/* Mobile-friendly Direct Redirection Buttons (Logos serve as buttons) */}
            <div className="mobile-redirect-container">
              <p className="mobile-redirect-label">⚡ Direct App Payment (Mobile)</p>
              <div className="redirect-grid-logo">
                <a
                  href={getAppUrl("gpay")}
                  className="logo-btn-link gpay-logo-btn"
                  onClick={handleConfirm}
                  title="Pay via Google Pay"
                >
                  <img src={gpayLogo} alt="Google Pay" className="payment-brand-logo" />
                </a>

                <a
                  href={getAppUrl("phonepe")}
                  className="logo-btn-link phonepe-logo-btn"
                  onClick={handleConfirm}
                  title="Pay via PhonePe"
                >
                  <img src={phonepeLogo} alt="PhonePe" className="payment-brand-logo" />
                </a>

                <a
                  href={getAppUrl("paytm")}
                  className="logo-btn-link paytm-logo-btn"
                  onClick={handleConfirm}
                  title="Pay via Paytm"
                >
                  <img src={paytmLogo} alt="Paytm" className="payment-brand-logo" />
                </a>

                <a
                  href={getAppUrl("generic")}
                  className="logo-btn-link bhim-logo-btn"
                  onClick={handleConfirm}
                  title="Pay via BHIM UPI"
                >
                  <img src={bhimLogo} alt="BHIM UPI" className="payment-brand-logo" />
                </a>
              </div>
            </div>

            <div className="divider-or">
              <span>OR Scan QR Code</span>
            </div>

            {/* QR Code */}
            <div className="qr-wrap">
              <QRCodeSVG
                value={upiUrl}
                size={180}
                fgColor="#4e0f22"
                bgColor="#ffffff"
                level="M"
                includeMargin={false}
              />
            </div>

            {/* UPI ID */}
            <div className="upi-id-row">
              <span>💳</span>
              <span>Pay to:</span>
              <strong>{UPI_ID}</strong>
            </div>

            {/* Actions */}
            <button
              type="button"
              className="payment-confirm-btn"
              onClick={handleConfirm}
            >
              ✓ I've Completed the Payment
            </button>
            <button
              type="button"
              className="payment-cancel-btn"
              onClick={onClose}
            >
              Cancel & go back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;
