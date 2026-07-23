import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatPrice } from "../utils/format";

const UPI_ID = "paytmQR6up87h@ptys";
const PAYEE_NAME = "Shree Laddu Gopal Sweets";
const GST_RATE = 0.18;
const SHOP_WA = "916376614836"; // WhatsApp number for order notifications

const paytmLogo = "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg";
const gpayLogo  = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg";
const phonepeLogo = "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg";

// Steps: "address" → "payment" → "success"
function PaymentModal({ subtotal, productName, selectedSize, onClose, onSuccess }) {
  const [step, setStep] = useState("address");

  // Address form
  const [form, setForm] = useState({
    name: "", phone: "", whatsapp: "", address: "", city: "", state: "", pincode: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [sameAsPhone, setSameAsPhone] = useState(true);

  // GST
  const baseAmount  = subtotal;
  const gstAmount   = Math.round(baseAmount * GST_RATE);
  const totalPayable = baseAmount + gstAmount;

  // Stable order ID
  const [orderId] = useState(
    () => "#KP" + Date.now().toString(36).toUpperCase().slice(-6)
  );

  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${totalPayable.toFixed(2)}&tn=${orderId}`;

  function paytmDeepLink() {
    const p = `pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${totalPayable.toFixed(2)}&tn=${orderId}`;
    if (/Android/i.test(navigator.userAgent))
      return `intent://pay?${p}#Intent;scheme=upi;package=net.one97.paytm;end`;
    if (/iPhone|iPad/i.test(navigator.userAgent))
      return `paytmmp://pay?${p}`;
    return `upi://pay?${p}`;
  }

  // Build the WhatsApp message sent to shop number
  function buildWhatsAppMsg() {
    const waNum = sameAsPhone ? form.phone : form.whatsapp;
    return encodeURIComponent(
      `🛍️ *NEW ORDER — Karni Paridhan*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *Order ID:* ${orderId}\n` +
      `👗 *Product:* ${productName || "—"}\n` +
      `📐 *Size:* ${selectedSize || "—"}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *BILL DETAILS*\n` +
      `Item Price:  ₹${baseAmount.toFixed(2)}\n` +
      `CGST (9%):   ₹${Math.round(gstAmount / 2).toFixed(2)}\n` +
      `SGST (9%):   ₹${Math.round(gstAmount / 2).toFixed(2)}\n` +
      `Delivery:    FREE\n` +
      `*Total Paid: ₹${totalPayable.toFixed(2)}*\n` +
      `UPI to: ${UPI_ID}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *DELIVERY ADDRESS*\n` +
      `Name:     ${form.name}\n` +
      `Phone:    ${form.phone}\n` +
      `WhatsApp: ${waNum}\n` +
      `Address:  ${form.address}\n` +
      `City:     ${form.city}, ${form.state} – ${form.pincode}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ Customer has completed UPI payment.`
    );
  }

  function handleSendWhatsApp() {
    const msg = buildWhatsAppMsg();
    window.open(`https://wa.me/${SHOP_WA}?text=${msg}`, "_blank");
    // Show success after opening WhatsApp
    setStep("success");
    setTimeout(() => { onSuccess(); onClose(); }, 5000);
  }

  function validateForm() {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()))
      errors.phone = "Valid 10-digit mobile number required";
    if (!sameAsPhone && (!form.whatsapp.trim() || !/^\d{10}$/.test(form.whatsapp.trim())))
      errors.whatsapp = "Valid 10-digit WhatsApp number required";
    if (!form.address.trim()) errors.address = "Address is required";
    if (!form.city.trim()) errors.city = "City is required";
    if (!form.state.trim()) errors.state = "State is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim()))
      errors.pincode = "Valid 6-digit PIN code required";
    return errors;
  }

  function handleAddressSubmit(e) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setStep("payment");
  }

  function handleInput(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
    if (formErrors[field]) setFormErrors((p) => ({ ...p, [field]: "" }));
  }

  // ── SUCCESS ──────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="checkout-page" role="dialog" aria-modal="true">
        <div className="checkout-success-page">
          <div className="checkout-success-inner">
            <div className="success-checkmark-ring">
              <svg viewBox="0 0 52 52" className="success-check-svg">
                <circle className="success-check-circle" cx="26" cy="26" r="24" fill="none" />
                <path className="success-check-path" fill="none" d="M14 27l8 8 16-16" />
              </svg>
            </div>
            <h2 className="success-title">Order Placed! 🎉</h2>
            <p className="success-order-num">{orderId}</p>
            <p className="success-msg">
              Thank you, <strong>{form.name}</strong>!<br />
              Your order details have been sent via WhatsApp.<br />
              We'll deliver to <strong>{form.city}, {form.state}</strong>.
            </p>
            <div className="success-amount-badge">{formatPrice(totalPayable)} Paid via UPI</div>
            <p className="success-delivery-note">📦 Expected delivery in 5–7 business days</p>
          </div>
        </div>
      </div>
    );
  }

  // ── ADDRESS STEP ─────────────────────────────────────────────────
  if (step === "address") {
    return (
      <div className="checkout-page" role="dialog" aria-modal="true" aria-label="Delivery Address">
        <div className="checkout-layout checkout-layout-single">
          {/* Left — Bill */}
          <div className="checkout-left">
            <div className="checkout-brand-bar">
              <span className="checkout-brand-name">Karni Paridhan</span>
              <span className="checkout-secure-pill">🔒 Secure</span>
            </div>
            <div className="checkout-steps">
              <div className="step-item active"><span className="step-num">1</span><span className="step-label">Address</span></div>
              <div className="step-line" />
              <div className="step-item"><span className="step-num">2</span><span className="step-label">Payment</span></div>
            </div>
            <div className="checkout-bill-card">
              <p className="checkout-bill-title">📋 Order Bill</p>
              {productName && (
                <div className="checkout-bill-row">
                  <span className="checkout-bill-label">Product</span>
                  <span className="checkout-bill-val product-name-cell">{productName}</span>
                </div>
              )}
              {selectedSize && (
                <div className="checkout-bill-row">
                  <span className="checkout-bill-label">Size</span>
                  <span className="checkout-bill-val"><span className="bill-size-badge">{selectedSize}</span></span>
                </div>
              )}
              <div className="checkout-bill-row">
                <span className="checkout-bill-label">Item Price</span>
                <span className="checkout-bill-val">{formatPrice(baseAmount)}</span>
              </div>
              <div className="checkout-bill-row">
                <span className="checkout-bill-label">Delivery</span>
                <span className="checkout-bill-val checkout-free">FREE</span>
              </div>
              <div className="checkout-bill-row gst-row">
                <span className="checkout-bill-label">GST (18%)<span className="gst-note">CGST 9% + SGST 9%</span></span>
                <span className="checkout-bill-val gst-amount">+{formatPrice(gstAmount)}</span>
              </div>
              <div className="checkout-bill-divider" />
              <div className="checkout-bill-row total-row">
                <span className="checkout-bill-total-label">Total Payable</span>
                <span className="checkout-bill-total-amount">{formatPrice(totalPayable)}</span>
              </div>
            </div>
            <div className="checkout-trust-row">
              <span className="checkout-trust-badge">🛡 Secure</span>
              <span className="checkout-trust-badge">📲 UPI Pay</span>
              <span className="checkout-trust-badge">🚚 Free Delivery</span>
            </div>
          </div>

          {/* Right — Form */}
          <div className="checkout-right">
            <button type="button" className="checkout-back-btn" onClick={onClose}>← Back</button>
            <h3 className="checkout-right-title">📍 Delivery Address</h3>
            <p className="checkout-right-sub">Where should we send your royal outfit?</p>

            <form className="address-form" onSubmit={handleAddressSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${formErrors.name ? "has-error" : ""}`}>
                  <label htmlFor="addr-name">Full Name *</label>
                  <input id="addr-name" type="text" placeholder="e.g. Priya Sharma"
                    value={form.name} onChange={(e) => handleInput("name", e.target.value)} />
                  {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                </div>
                <div className={`form-group ${formErrors.phone ? "has-error" : ""}`}>
                  <label htmlFor="addr-phone">Mobile Number *</label>
                  <input id="addr-phone" type="tel" placeholder="10-digit mobile" maxLength={10}
                    value={form.phone}
                    onChange={(e) => handleInput("phone", e.target.value.replace(/\D/g, ""))} />
                  {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                </div>
              </div>

              {/* WhatsApp field */}
              <div className="form-group wa-group">
                <label className="wa-label">
                  <span>📱 WhatsApp Number *</span>
                  <label className="wa-same-checkbox">
                    <input type="checkbox" checked={sameAsPhone}
                      onChange={(e) => { setSameAsPhone(e.target.checked); if (e.target.checked) handleInput("whatsapp", ""); }} />
                    <span>Same as mobile</span>
                  </label>
                </label>
                {!sameAsPhone && (
                  <div className={`wa-input-wrap ${formErrors.whatsapp ? "has-error" : ""}`}>
                    <input id="addr-wa" type="tel" placeholder="WhatsApp number" maxLength={10}
                      value={form.whatsapp}
                      onChange={(e) => handleInput("whatsapp", e.target.value.replace(/\D/g, ""))} />
                    {formErrors.whatsapp && <span className="form-error">{formErrors.whatsapp}</span>}
                  </div>
                )}
              </div>

              <div className={`form-group ${formErrors.address ? "has-error" : ""}`}>
                <label htmlFor="addr-street">House / Street Address *</label>
                <input id="addr-street" type="text" placeholder="e.g. 45, Shivaji Nagar, Near Post Office"
                  value={form.address} onChange={(e) => handleInput("address", e.target.value)} />
                {formErrors.address && <span className="form-error">{formErrors.address}</span>}
              </div>

              <div className="form-row">
                <div className={`form-group ${formErrors.city ? "has-error" : ""}`}>
                  <label htmlFor="addr-city">City *</label>
                  <input id="addr-city" type="text" placeholder="e.g. Jaipur"
                    value={form.city} onChange={(e) => handleInput("city", e.target.value)} />
                  {formErrors.city && <span className="form-error">{formErrors.city}</span>}
                </div>
                <div className={`form-group ${formErrors.state ? "has-error" : ""}`}>
                  <label htmlFor="addr-state">State *</label>
                  <input id="addr-state" type="text" placeholder="e.g. Rajasthan"
                    value={form.state} onChange={(e) => handleInput("state", e.target.value)} />
                  {formErrors.state && <span className="form-error">{formErrors.state}</span>}
                </div>
              </div>

              <div className={`form-group ${formErrors.pincode ? "has-error" : ""}`}>
                <label htmlFor="addr-pin">PIN Code *</label>
                <input id="addr-pin" type="text" placeholder="6-digit PIN" maxLength={6}
                  value={form.pincode}
                  onChange={(e) => handleInput("pincode", e.target.value.replace(/\D/g, ""))} />
                {formErrors.pincode && <span className="form-error">{formErrors.pincode}</span>}
              </div>

              <button type="submit" className="checkout-confirm-btn address-submit-btn">
                Continue to Payment →
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── PAYMENT STEP — styled like the screenshot (dark QR-first layout) ──
  return (
    <div className="checkout-page" role="dialog" aria-modal="true" aria-label="Payment">
      <div className="pay-screen">

        {/* Header */}
        <div className="pay-screen__header">
          <button type="button" className="pay-screen__back" onClick={() => setStep("address")}>
            ←
          </button>
          <div className="pay-screen__header-info">
            <p className="pay-screen__shop">{PAYEE_NAME}</p>
            <p className="pay-screen__upi">{UPI_ID}</p>
          </div>
          <span className="pay-screen__lock">🔒</span>
        </div>

        {/* Amount */}
        <div className="pay-screen__amount-row">
          <p className="pay-screen__amount-label">Order Amount</p>
          <p className="pay-screen__amount">₹{totalPayable.toFixed(2)}</p>
          <p className="pay-screen__gst-note">Incl. 18% GST · {orderId}</p>
        </div>

        {/* QR */}
        <div className="pay-screen__qr-wrap">
          <QRCodeSVG
            value={upiUrl}
            size={220}
            fgColor="#111111"
            bgColor="#ffffff"
            level="H"
            includeMargin={false}
          />
          <p className="pay-screen__qr-hint">Scan with any UPI app</p>
        </div>

        {/* Divider */}
        <div className="pay-screen__or"><span>or pay via</span></div>

        {/* Pay via Paytm button */}
        <a
          href={paytmDeepLink()}
          className="pay-screen__btn pay-screen__btn--paytm"
        >
          <img src={paytmLogo} alt="Paytm" className="pay-screen__btn-logo" />
          Pay via <strong>Paytm</strong>
        </a>

        {/* GPay button */}
        <a
          href={`intent://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${totalPayable.toFixed(2)}&tn=${orderId}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`}
          className="pay-screen__btn pay-screen__btn--gpay"
        >
          <img src={gpayLogo} alt="GPay" className="pay-screen__btn-logo" />
          Pay via <strong>Google Pay</strong>
        </a>

        {/* PhonePe */}
        <a
          href={`intent://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${totalPayable.toFixed(2)}&tn=${orderId}#Intent;scheme=upi;package=com.phonepe.app;end`}
          className="pay-screen__btn pay-screen__btn--phonepe"
        >
          <img src={phonepeLogo} alt="PhonePe" className="pay-screen__btn-logo" />
          Pay via <strong>PhonePe</strong>
        </a>

        {/* Order details */}
        <div className="pay-screen__details">
          <div className="pay-screen__detail-row">
            <span>Order ID</span><span>{orderId}</span>
          </div>
          <div className="pay-screen__detail-row">
            <span>Order Amount</span><span>₹{baseAmount.toFixed(2)}</span>
          </div>
          <div className="pay-screen__detail-row">
            <span>GST (18%)</span><span>+₹{gstAmount.toFixed(2)}</span>
          </div>
          <div className="pay-screen__detail-row pay-screen__detail-row--total">
            <span>Total Payable</span><span>₹{totalPayable.toFixed(2)}</span>
          </div>
        </div>

        {/* WhatsApp confirm button */}
        <div className="pay-screen__wa-section">
          <p className="pay-screen__wa-label">
            ✅ After paying, confirm your order on WhatsApp
          </p>
          <button
            type="button"
            className="pay-screen__wa-btn"
            onClick={handleSendWhatsApp}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.117a.75.75 0 0 0 .93.93l5.29-1.467A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.816 9.816 0 0 1-5.032-1.387l-.36-.214-3.733 1.035 1.034-3.736-.234-.372A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
            </svg>
            Send Order on WhatsApp
          </button>
          <p className="pay-screen__wa-note">
            This will open WhatsApp with your order details &amp; bill
          </p>
        </div>

        <p className="pay-screen__footer">All UPI Accepted · {UPI_ID}</p>
      </div>
    </div>
  );
}

export default PaymentModal;
