import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatPrice } from "../utils/format";

const UPI_ID     = "paytmQR6up87h@ptys";
const PAYEE_NAME = "Shree Laddu Gopal Sweets";
const GST_RATE   = 0.18;
const SHOP_WA    = "916376614836";

const paytmLogo   = "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg";
const gpayLogo    = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg";
const phonepeLogo = "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg";

// Steps: address → payment → success
function PaymentModal({ subtotal, productName, selectedSize, onClose, onSuccess }) {
  const [step, setStep]         = useState("address");
  const [sameAsPhone, setSameAs] = useState(true);
  const [formErrors, setErrors] = useState({});
  const [form, setForm]         = useState({
    name: "", phone: "", whatsapp: "",
    address: "", city: "", state: "", pincode: "",
  });

  const [orderId] = useState(
    () => "#KP" + Date.now().toString(36).toUpperCase().slice(-6)
  );

  const qrRef       = useRef(null);
  const payBodyRef  = useRef(null);

  const base  = subtotal;
  const gst   = Math.round(base * GST_RATE);
  const cgst  = Math.round(gst / 2);
  const sgst  = gst - cgst;
  const total = base + gst;
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${total.toFixed(2)}&tn=${orderId}`;
  const waNum  = sameAsPhone ? form.phone : form.whatsapp;

  // Auto-scroll down to QR section 1.5s after payment page loads
  useEffect(() => {
    if (step === "payment" && payBodyRef.current) {
      const timer = setTimeout(() => {
        if (qrRef.current) {
          qrRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  function upiLink(pkg) {
    const p = `pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${total.toFixed(2)}&tn=${orderId}`;
    if (/Android/i.test(navigator.userAgent))
      return `intent://pay?${p}#Intent;scheme=upi;package=${pkg};end`;
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      if (pkg.includes("paytm"))   return `paytmmp://pay?${p}`;
      if (pkg.includes("phonepe")) return `phonepe://pay?${p}`;
      return `gpay://upi/pay?${p}`;
    }
    return `upi://pay?${p}`;
  }

  function downloadQR() {
    const svg = document.querySelector(".pm-qr-svg-el");
    if (!svg) return;
    const svgData  = new XMLSerializer().serializeToString(svg);
    const canvas   = document.createElement("canvas");
    const size     = 300;
    canvas.width   = size;
    canvas.height  = size;
    const ctx      = canvas.getContext("2d");
    const img      = new Image();
    img.onload = () => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const a    = document.createElement("a");
      a.download = `KarniParidhan-QR-${orderId}.png`;
      a.href     = canvas.toDataURL("image/png");
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
    if (!form.name.trim())                                          e.name     = "Full name required";
    if (!/^\d{10}$/.test(form.phone.trim()))                       e.phone    = "Valid 10-digit number required";
    if (!sameAsPhone && !/^\d{10}$/.test(form.whatsapp.trim()))    e.whatsapp = "Valid 10-digit WhatsApp number";
    if (!form.address.trim())                                       e.address  = "Address required";
    if (!form.city.trim())                                          e.city     = "City required";
    if (!form.state.trim())                                         e.state    = "State required";
    if (!/^\d{6}$/.test(form.pincode.trim()))                      e.pincode  = "Valid 6-digit PIN required";
    return e;
  }

  function submitAddress(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep("payment");
  }

  function sendWhatsApp() {
    const msg = encodeURIComponent(
      `🛍️ *NEW ORDER — Karni Paridhan*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *Order ID:* ${orderId}\n` +
      `👗 *Product:* ${productName || "—"}\n` +
      `📐 *Size:* ${selectedSize || "—"}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *BILL*\n` +
      `Item Price : ₹${base.toFixed(2)}\n` +
      `CGST (9%)  : ₹${cgst.toFixed(2)}\n` +
      `SGST (9%)  : ₹${sgst.toFixed(2)}\n` +
      `Delivery   : FREE\n` +
      `*Total Paid: ₹${total.toFixed(2)}*\n` +
      `UPI: ${UPI_ID}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *ADDRESS*\n` +
      `Name    : ${form.name}\n` +
      `Phone   : ${form.phone}\n` +
      `WhatsApp: ${waNum}\n` +
      `Address : ${form.address}\n` +
      `${form.city}, ${form.state} – ${form.pincode}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ Payment Done via UPI`
    );
    window.open(`https://wa.me/${SHOP_WA}?text=${msg}`, "_blank");
    setStep("success");
    setTimeout(() => { onSuccess(); onClose(); }, 5000);
  }

  /* ─── SUCCESS ─────────────────────────────────────── */
  if (step === "success") {
    return (
      <div className="pm-overlay">
        <div className="pm-success">
          <div className="pm-success__icon">
            <svg viewBox="0 0 52 52">
              <circle className="pm-success__circle" cx="26" cy="26" r="24" fill="none" />
              <path  className="pm-success__tick"   fill="none" d="M14 27l8 8 16-16" />
            </svg>
          </div>
          <h2 className="pm-success__title">Order Placed! 🎉</h2>
          <p  className="pm-success__id">{orderId}</p>
          <p  className="pm-success__msg">
            Thank you, <strong>{form.name}</strong>! Your order details have been sent via WhatsApp.<br />
            Delivering to <strong>{form.city}, {form.state}</strong>.
          </p>
          <div className="pm-success__badge">{formatPrice(total)} Paid via UPI</div>
          <p className="pm-success__eta">📦 Expected delivery: 5–7 business days</p>
        </div>
      </div>
    );
  }

  /* ─── PAYMENT SCREEN ──────────────────────────────── */
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

          {/* ── SECTION 1: Amount + GST Bill (visible first) ── */}
          <div className="pm-pay__bill-section">
            <p className="pm-pay__bill-eyebrow">Order Summary</p>
            {productName && (
              <div className="pm-pay__bill-product">{productName} {selectedSize && <span className="pm-pay__size-pill">{selectedSize}</span>}</div>
            )}

            <div className="pm-pay__amount-big">
              <span className="pm-pay__currency">₹</span>
              <span className="pm-pay__amount-num">{total.toFixed(2)}</span>
            </div>

            <div className="pm-pay__gst-breakdown">
              <div className="pm-pay__gst-row">
                <span>Item Price</span><span>₹{base.toFixed(2)}</span>
              </div>
              <div className="pm-pay__gst-row">
                <span>CGST @ 9%</span><span>+₹{cgst.toFixed(2)}</span>
              </div>
              <div className="pm-pay__gst-row">
                <span>SGST @ 9%</span><span>+₹{sgst.toFixed(2)}</span>
              </div>
              <div className="pm-pay__gst-row">
                <span>Delivery</span><span className="pm-pay__free">FREE</span>
              </div>
              <div className="pm-pay__gst-total">
                <span>Total Payable</span><span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pm-pay__delivery-addr">
              <span>📍</span>
              <span>{form.name} · {form.address}, {form.city} – {form.pincode}</span>
              <button className="pm-pay__addr-change" onClick={() => setStep("address")}>Change</button>
            </div>

            <p className="pm-pay__scroll-hint">↓ Scroll down to pay</p>
          </div>

          {/* ── SECTION 2: QR + Download + App Buttons ── */}
          <div className="pm-pay__payment-section" ref={qrRef}>
            <p className="pm-pay__pay-eyebrow">Choose Payment Method</p>

            {/* QR Code */}
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
              <button className="pm-pay__download-btn" onClick={downloadQR}>
                ⬇ Download QR Code
              </button>
            </div>

            {/* Divider */}
            <div className="pm-pay__or"><span>or pay via app</span></div>

            {/* App Buttons */}
            <div className="pm-pay__app-list">
              <a href={upiLink("net.one97.paytm")} className="pm-pay__app-btn">
                <img src={paytmLogo} alt="Paytm" className="pm-pay__app-logo" />
                <span className="pm-pay__app-name">Paytm</span>
                <span className="pm-pay__app-arrow">›</span>
              </a>
              <a href={upiLink("com.google.android.apps.nbu.paisa.user")} className="pm-pay__app-btn">
                <img src={gpayLogo} alt="Google Pay" className="pm-pay__app-logo" />
                <span className="pm-pay__app-name">Google Pay</span>
                <span className="pm-pay__app-arrow">›</span>
              </a>
              <a href={upiLink("com.phonepe.app")} className="pm-pay__app-btn">
                <img src={phonepeLogo} alt="PhonePe" className="pm-pay__app-logo" />
                <span className="pm-pay__app-name">PhonePe</span>
                <span className="pm-pay__app-arrow">›</span>
              </a>
            </div>

            {/* WhatsApp confirm — after scrolling to the bottom */}
            <div className="pm-pay__wa-block">
              <p className="pm-pay__wa-title">✅ After Payment — Confirm Order</p>
              <p className="pm-pay__wa-sub">Pay via UPI above, then tap below to send us your order details on WhatsApp</p>
              <button className="pm-pay__wa-btn" onClick={sendWhatsApp}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.117a.75.75 0 0 0 .93.93l5.29-1.467A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.816 9.816 0 0 1-5.032-1.387l-.36-.214-3.733 1.035 1.034-3.736-.234-.372A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
                </svg>
                Send Order on WhatsApp
              </button>
            </div>

            <p className="pm-pay__footer">Order ID: {orderId} · All UPI apps accepted</p>
          </div>
        </div>
      </div>
    );
  }

  /* ─── ADDRESS FORM ────────────────────────────────── */
  return (
    <div className="pm-overlay">
      <div className="pm-card pm-addr-card">

        <div className="pm-card__head">
          <button className="pm-card__back" onClick={onClose}>←</button>
          <span className="pm-card__head-title">Delivery Address</span>
          <span className="pm-card__head-step">Step 1 / 2</span>
        </div>

        <div className="pm-addr__body">

          {/* Bill Sidebar */}
          <div className="pm-addr__bill">
            <p className="pm-bill__title">🧾 Order Summary</p>
            {productName && (
              <div className="pm-bill__row">
                <span className="pm-bill__label">Product</span>
                <span className="pm-bill__val pm-bill__product">{productName}</span>
              </div>
            )}
            {selectedSize && (
              <div className="pm-bill__row">
                <span className="pm-bill__label">Size</span>
                <span className="pm-bill__val"><span className="pm-bill__size">{selectedSize}</span></span>
              </div>
            )}
            <div className="pm-bill__divider" />
            <div className="pm-bill__row">
              <span className="pm-bill__label">Item Price</span>
              <span className="pm-bill__val">{formatPrice(base)}</span>
            </div>
            <div className="pm-bill__row">
              <span className="pm-bill__label">CGST @ 9%</span>
              <span className="pm-bill__val">+{formatPrice(cgst)}</span>
            </div>
            <div className="pm-bill__row">
              <span className="pm-bill__label">SGST @ 9%</span>
              <span className="pm-bill__val">+{formatPrice(sgst)}</span>
            </div>
            <div className="pm-bill__row">
              <span className="pm-bill__label">Delivery</span>
              <span className="pm-bill__val pm-bill__free">FREE</span>
            </div>
            <div className="pm-bill__divider pm-bill__divider--thick" />
            <div className="pm-bill__row pm-bill__row--total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="pm-bill__gst-note">GSTIN: 08XXXXX0000X1ZX · 18% GST</p>
          </div>

          {/* Form */}
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
                  <div className={`pm-field ${formErrors.whatsapp ? "pm-field--err" : ""}`} style={{marginTop:"0.4rem"}}>
                    <input id="pm-wa" type="tel" placeholder="WhatsApp number" maxLength={10}
                      value={form.whatsapp} onChange={e => setField("whatsapp", e.target.value.replace(/\D/g, ""))} />
                    {formErrors.whatsapp && <p className="pm-err">{formErrors.whatsapp}</p>}
                  </div>
                )}
              </div>

              <div className={`pm-field ${formErrors.address ? "pm-field--err" : ""}`}>
                <label htmlFor="pm-addr">Street / House / Flat *</label>
                <input id="pm-addr" type="text" placeholder="e.g. 45, Shivaji Nagar, Near Post Office"
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
