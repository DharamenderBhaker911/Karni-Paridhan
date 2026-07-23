import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatPrice } from "../utils/format";

const UPI_ID = "paytmQR6up87h@ptys";
const PAYEE_NAME = "Shree Laddu Gopal Sweets";
const GST_RATE = 0.18;
const SHOP_WA = "916376614836";

const paytmLogo = "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg";
const gpayLogo = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg";
const phonepeLogo = "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg";

// Steps: address → payment → sending → success
function PaymentModal({ subtotal, productName, selectedSize, onClose, onSuccess }) {
  const [step, setStep] = useState("address");
  const [sameAsPhone, setSameAs] = useState(true);
  const [formErrors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "", phone: "", whatsapp: "",
    address: "", city: "", state: "", pincode: "",
  });

  const [orderId] = useState(
    () => "#KP" + Date.now().toString(36).toUpperCase().slice(-6)
  );

  const qrRef = useRef(null);
  const payBodyRef = useRef(null);

  const base = subtotal;
  const gst = Math.round(base * GST_RATE);
  const cgst = Math.round(gst / 2);
  const sgst = gst - cgst;
  const total = base + gst;
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${total.toFixed(2)}&tn=${orderId}`;

  // Customer WhatsApp number
  const customerWa = sameAsPhone ? form.phone : form.whatsapp;

  // Auto-scroll to QR section after 1.5s on payment page
  useEffect(() => {
    if (step === "payment" && qrRef.current) {
      const t = setTimeout(() => {
        qrRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Auto-trigger WhatsApp to customer when "sending" step loads
  useEffect(() => {
    if (step === "sending") {
      // Small delay so the UI renders first, then fire WhatsApp
      const t = setTimeout(() => {
        openCustomerWhatsApp();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [step]);

  function upiLink(pkg) {
    const p = `pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${total.toFixed(2)}&tn=${orderId}`;
    if (/Android/i.test(navigator.userAgent))
      return `intent://pay?${p}#Intent;scheme=upi;package=${pkg};end`;
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      if (pkg.includes("paytm")) return `paytmmp://pay?${p}`;
      if (pkg.includes("phonepe")) return `phonepe://pay?${p}`;
      return `gpay://upi/pay?${p}`;
    }
    return `upi://pay?${p}`;
  }

  // Build bill message (for customer)
  function buildCustomerMsg() {
    return encodeURIComponent(
      `🎊 *Order Confirmed — Karni Paridhan*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *Order ID:* ${orderId}\n` +
      `👗 *Product:* ${productName || "—"}\n` +
      `📐 *Size:* ${selectedSize || "—"}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *YOUR BILL*\n` +
      `Item Price : ₹${base.toFixed(2)}\n` +
      `CGST (9%)  : ₹${cgst.toFixed(2)}\n` +
      `SGST (9%)  : ₹${sgst.toFixed(2)}\n` +
      `Delivery   : FREE 🚚\n` +
      `*Total Paid: ₹${total.toFixed(2)}*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Delivery Address*\n` +
      `${form.address}\n` +
      `${form.city}, ${form.state} – ${form.pincode}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🚚 Expected: 5–7 business days\n` +
      `Thank you for shopping with us! 🙏\n` +
      `— Team Karni Paridhan`
    );
  }

  // Build bill message (for shop)
  function buildShopMsg() {
    return encodeURIComponent(
      `🛍️ *NEW ORDER — Karni Paridhan*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *Order ID:* ${orderId}\n` +
      `👗 *Product:* ${productName || "—"}\n` +
      `📐 *Size:* ${selectedSize || "—"}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *BILL*\n` +
      `Item : ₹${base.toFixed(2)}\n` +
      `GST  : ₹${gst.toFixed(2)}\n` +
      `*Total: ₹${total.toFixed(2)}*\n` +
      `UPI: ${UPI_ID}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *ADDRESS*\n` +
      `Name    : ${form.name}\n` +
      `Phone   : ${form.phone}\n` +
      `WhatsApp: 91${customerWa}\n` +
      `Address : ${form.address}\n` +
      `${form.city}, ${form.state} – ${form.pincode}`
    );
  }

  function openCustomerWhatsApp() {
    // Open WhatsApp to CUSTOMER with their order bill
    const url = `https://wa.me/91${customerWa}?text=${buildCustomerMsg()}`;
    window.open(url, "_blank");

    // Also notify shop in same gesture context
    setTimeout(() => {
      window.open(`https://wa.me/${SHOP_WA}?text=${buildShopMsg()}`, "_blank");
    }, 400);

    // Move to success after a moment
    setTimeout(() => {
      setStep("success");
      setTimeout(() => { onSuccess?.(); }, 3000);
    }, 1200);
  }

  function handleUpiClick() {
    // When user taps a UPI app → transition to "sending" step
    // The "sending" useEffect will fire openCustomerWhatsApp automatically
    setTimeout(() => setStep("sending"), 600);
  }

  function downloadQR() {
    const svg = document.querySelector(".pm-qr-svg-el");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      const a = document.createElement("a");
      a.download = `KarniParidhan-QR-${orderId}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }

  function setField(k, v) {
    setForm(f => ({ ...f, [k]: v }));
    if (formErrors[k]) setErrors(e => ({ ...e, [k]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name required";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Valid 10-digit number required";
    if (!sameAsPhone && !/^\d{10}$/.test(form.whatsapp.trim())) e.whatsapp = "Valid 10-digit WhatsApp number";
    if (!form.address.trim()) e.address = "Address required";
    if (!form.city.trim()) e.city = "City required";
    if (!form.state.trim()) e.state = "State required";
    if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = "Valid 6-digit PIN required";
    return e;
  }

  function submitAddress(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep("payment");
  }

  /* ── SUCCESS ───────────────────────────────────── */
  if (step === "success") {
    return (
      <div className="pm-overlay">
        <div className="pm-success">
          <div className="pm-success__icon">
            <svg viewBox="0 0 52 52">
              <circle className="pm-success__circle" cx="26" cy="26" r="24" fill="none" />
              <path className="pm-success__tick" fill="none" d="M14 27l8 8 16-16" />
            </svg>
          </div>
          <h2 className="pm-success__title">Order Placed! 🎉</h2>
          <p className="pm-success__id">{orderId}</p>
          <p className="pm-success__msg">
            Thank you, <strong>{form.name}</strong>!<br />
            Your bill has been sent to your WhatsApp.<br />
            Delivering to <strong>{form.city}, {form.state}</strong>.
          </p>
          <div className="pm-success__badge">{formatPrice(total)} Paid via UPI</div>
          <p className="pm-success__eta">📦 Expected delivery: 5–7 business days</p>
          <button className="pm-success__close" onClick={onClose}>Close ✕</button>
        </div>
      </div>
    );
  }

  /* ── SENDING (auto-fires WhatsApp, shows spinner) ── */
  if (step === "sending") {
    return (
      <div className="pm-overlay">
        <div className="pm-sending">
          <div className="pm-sending__spinner" />
          <h3 className="pm-sending__title">Processing your order…</h3>
          <p className="pm-sending__sub">Sending your bill to WhatsApp 📲</p>
          <p className="pm-sending__wa">+91 {customerWa}</p>
          <p className="pm-sending__note">Please allow WhatsApp to open</p>
        </div>
      </div>
    );
  }

  /* ── PAYMENT SCREEN ─────────────────────────────── */
  if (step === "payment") {
    return (
      <div className="pm-overlay">
        <div className="pm-pay" ref={payBodyRef}>

          {/* Dark Header */}
          <div className="pm-pay__header">
            <button className="pm-pay__back" onClick={() => setStep("address")}>←</button>
            <div className="pm-pay__header-info">
              <p className="pm-pay__shop">{PAYEE_NAME}</p>
              <p className="pm-pay__upi">{UPI_ID}</p>
            </div>
            <span>🔒</span>
          </div>

          {/* SECTION 1: Amount + GST (visible first) */}
          <div className="pm-pay__bill-section">
            <p className="pm-pay__bill-eyebrow">Order Summary</p>
            {productName && (
              <div className="pm-pay__bill-product">
                {productName}
                {selectedSize && <span className="pm-pay__size-pill">{selectedSize}</span>}
              </div>
            )}

            <div className="pm-pay__amount-big">
              <span className="pm-pay__currency">₹</span>
              <span className="pm-pay__amount-num">{total.toFixed(2)}</span>
            </div>

            <div className="pm-pay__gst-breakdown">
              <div className="pm-pay__gst-row"><span>Item Price</span><span>₹{base.toFixed(2)}</span></div>
              <div className="pm-pay__gst-row"><span>CGST @ 9%</span><span>+₹{cgst.toFixed(2)}</span></div>
              <div className="pm-pay__gst-row"><span>SGST @ 9%</span><span>+₹{sgst.toFixed(2)}</span></div>
              <div className="pm-pay__gst-row"><span>Delivery</span><span className="pm-pay__free">FREE</span></div>
              <div className="pm-pay__gst-total"><span>Total Payable</span><span>₹{total.toFixed(2)}</span></div>
            </div>

            <div className="pm-pay__delivery-addr">
              <span>📍</span>
              <span>{form.name} · {form.address}, {form.city} – {form.pincode}</span>
              <button className="pm-pay__addr-change" onClick={() => setStep("address")}>Change</button>
            </div>

            <div className="pm-pay__wa-notify">
              <span>📲</span>
              <span>Bill will be auto-sent to <strong>+91 {customerWa}</strong> after payment</span>
            </div>

            <p className="pm-pay__scroll-hint">↓ Scroll to pay</p>
          </div>

          {/* SECTION 2: QR + App Buttons */}
          <div className="pm-pay__payment-section" ref={qrRef}>
            <p className="pm-pay__pay-eyebrow">Choose Payment Method</p>

            <div className="pm-pay__qr-block">
              <div className="pm-pay__qr-box">
                <QRCodeSVG
                  value={upiUrl}
                  size={200}
                  fgColor="#111"
                  bgColor="#fff"
                  level="H"
                  className="pm-qr-svg-el"
                />
              </div>
              <p className="pm-pay__qr-upi">UPI: {UPI_ID}</p>
              <p className="pm-pay__qr-hint">Scan with any UPI app</p>
              <button className="pm-pay__download-btn" onClick={downloadQR}>⬇ Download QR</button>
            </div>

            <div className="pm-pay__or"><span>or open app directly</span></div>

            {/* UPI App Buttons — clicking auto-sends WhatsApp */}
            <div className="pm-pay__app-list">
              <a
                href={upiLink("net.one97.paytm")}
                className="pm-pay__app-btn"
                onClick={handleUpiClick}
              >
                <img src={paytmLogo} alt="Paytm" className="pm-pay__app-logo" />
                <span className="pm-pay__app-name">Paytm</span>
                <span className="pm-pay__app-arrow">›</span>
              </a>
              <a
                href={upiLink("com.google.android.apps.nbu.paisa.user")}
                className="pm-pay__app-btn"
                onClick={handleUpiClick}
              >
                <img src={gpayLogo} alt="Google Pay" className="pm-pay__app-logo" />
                <span className="pm-pay__app-name">Google Pay</span>
                <span className="pm-pay__app-arrow">›</span>
              </a>
              <a
                href={upiLink("com.phonepe.app")}
                className="pm-pay__app-btn"
                onClick={handleUpiClick}
              >
                <img src={phonepeLogo} alt="PhonePe" className="pm-pay__app-logo" />
                <span className="pm-pay__app-name">PhonePe</span>
                <span className="pm-pay__app-arrow">›</span>
              </a>
            </div>

            <div className="pm-pay__auto-note">
              <span>✅</span>
              <span>After tapping any app above, your bill is automatically sent to your WhatsApp</span>
            </div>

            <p className="pm-pay__footer">Order ID: {orderId}</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── ADDRESS FORM ───────────────────────────────── */
  return (
    <div className="pm-overlay">
      <div className="pm-card pm-addr-card">

        <div className="pm-card__head">
          <button className="pm-card__back" onClick={onClose}>←</button>
          <span className="pm-card__head-title">📍 Delivery Address</span>
          <span className="pm-card__head-step">Step 1 / 2</span>
        </div>

        <div className="pm-addr__body pm-addr__body--single">
          <div className="pm-addr__form-wrap">
            <form className="pm-addr__form" onSubmit={submitAddress} noValidate>

              <div className="pm-field-row">
                <div className={`pm-field ${formErrors.name ? "pm-field--err" : ""}`}>
                  <label htmlFor="pm-name">Full Name *</label>
                  <input id="pm-name" type="text" placeholder="e.g. Priya Sharma"
                    value={form.name} onChange={e => setField("name", e.target.value)} />
                  {formErrors.name && <p className="pm-err">{formErrors.name}</p>}
                </div>
                <div className={`pm-field ${formErrors.phone ? "pm-field--err" : ""}`}>
                  <label htmlFor="pm-phone">Mobile *</label>
                  <input id="pm-phone" type="tel" placeholder="10-digit" maxLength={10}
                    value={form.phone} onChange={e => setField("phone", e.target.value.replace(/\D/g, ""))} />
                  {formErrors.phone && <p className="pm-err">{formErrors.phone}</p>}
                </div>
              </div>

              <div className="pm-field pm-field--wa">
                <div className="pm-wa__label-row">
                  <label>📱 WhatsApp Number *</label>
                  <label className="pm-wa__check">
                    <input type="checkbox" checked={sameAsPhone}
                      onChange={e => { setSameAs(e.target.checked); if (e.target.checked) setField("whatsapp", ""); }} />
                    Same as mobile
                  </label>
                </div>
                {!sameAsPhone && (
                  <div className={`pm-field ${formErrors.whatsapp ? "pm-field--err" : ""}`} style={{ marginTop: "0.4rem" }}>
                    <input id="pm-wa" type="tel" placeholder="WhatsApp number" maxLength={10}
                      value={form.whatsapp} onChange={e => setField("whatsapp", e.target.value.replace(/\D/g, ""))} />
                    {formErrors.whatsapp && <p className="pm-err">{formErrors.whatsapp}</p>}
                  </div>
                )}
              </div>

              <div className={`pm-field ${formErrors.address ? "pm-field--err" : ""}`}>
                <label htmlFor="pm-addr">Street / House / Flat *</label>
                <input id="pm-addr" type="text" placeholder="e.g. 45, Shivaji Nagar"
                  value={form.address} onChange={e => setField("address", e.target.value)} />
                {formErrors.address && <p className="pm-err">{formErrors.address}</p>}
              </div>

              <div className="pm-field-row">
                <div className={`pm-field ${formErrors.city ? "pm-field--err" : ""}`}>
                  <label htmlFor="pm-city">City *</label>
                  <input id="pm-city" type="text" placeholder="Jaipur"
                    value={form.city} onChange={e => setField("city", e.target.value)} />
                  {formErrors.city && <p className="pm-err">{formErrors.city}</p>}
                </div>
                <div className={`pm-field ${formErrors.state ? "pm-field--err" : ""}`}>
                  <label htmlFor="pm-state">State *</label>
                  <input id="pm-state" type="text" placeholder="Rajasthan"
                    value={form.state} onChange={e => setField("state", e.target.value)} />
                  {formErrors.state && <p className="pm-err">{formErrors.state}</p>}
                </div>
              </div>

              <div className={`pm-field ${formErrors.pincode ? "pm-field--err" : ""}`}>
                <label htmlFor="pm-pin">PIN Code *</label>
                <input id="pm-pin" type="text" placeholder="6-digit PIN" maxLength={6}
                  value={form.pincode} onChange={e => setField("pincode", e.target.value.replace(/\D/g, ""))} />
                {formErrors.pincode && <p className="pm-err">{formErrors.pincode}</p>}
              </div>

              <p className="pm-addr__wa-hint">
                📲 Your order bill will be auto-sent to your WhatsApp after payment
              </p>

              <button type="submit" className="pm-addr__submit">
                Proceed to Payment →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
