/**
 * ShippingReturnsPage — Karni Paridhan
 * Shipping policy, delivery timelines, and return process
 */
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const shippingInfo = [
  { icon: "🚚", title: "Standard Delivery", desc: "5–7 business days across India. Free on orders above ₹999.", badge: "Free above ₹999" },
  { icon: "⚡", title: "Express Delivery", desc: "2–3 business days. Available in select cities. Additional charges apply.", badge: "₹99 extra" },
  { icon: "📍", title: "Coverage", desc: "We ship pan-India to 20,000+ pin codes via trusted courier partners like Delhivery and Shiprocket.", badge: "Pan India" },
  { icon: "📦", title: "Order Processing", desc: "Orders are processed within 24–48 hours of placement (excluding Sundays and public holidays).", badge: "1–2 Days" },
];

const returnSteps = [
  { step: "01", title: "Initiate Return", desc: "WhatsApp or email us within 7 days of delivery with your order ID and reason." },
  { step: "02", title: "Pack the Item", desc: "Repack the item in its original packaging. Ensure tags are intact and unused." },
  { step: "03", title: "Pickup Arranged", desc: "We'll arrange a free pickup from your doorstep within 2–3 business days." },
  { step: "04", title: "Refund Processed", desc: "Once we receive and inspect the item, your refund is initiated within 5–7 business days." },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Policies</span>
          <h1 className="inner-page-title serif">Shipping & Returns</h1>
          <p className="inner-page-sub">Everything you need to know about delivery and our hassle-free return policy.</p>
        </div>
      </div>

      <section className="policy-section section-pad">
        <div className="container-narrow">

          {/* Shipping */}
          <div className="policy-block">
            <h2 className="policy-block-title serif">📦 Shipping Information</h2>
            <div className="policy-cards">
              {shippingInfo.map((s) => (
                <div className="policy-card" key={s.title}>
                  <span className="policy-card-icon">{s.icon}</span>
                  <span className="policy-card-badge">{s.badge}</span>
                  <h3 className="policy-card-title">{s.title}</h3>
                  <p className="policy-card-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Return Policy */}
          <div className="policy-block">
            <h2 className="policy-block-title serif">🔄 Return & Exchange Policy</h2>
            <div className="policy-highlight">
              <span className="policy-highlight-icon">✅</span>
              <div>
                <h3>7-Day Hassle-Free Returns</h3>
                <p>Not happy with your purchase? We accept returns within 7 days of delivery, no questions asked (conditions apply).</p>
              </div>
            </div>

            <div className="return-steps">
              {returnSteps.map((r) => (
                <div className="return-step" key={r.step}>
                  <div className="return-step-num">{r.step}</div>
                  <div>
                    <h4 className="return-step-title">{r.title}</h4>
                    <p className="return-step-desc">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="policy-block">
            <h2 className="policy-block-title serif">📋 Return Conditions</h2>
            <ul className="policy-list">
              <li>Items must be unused, unwashed, and in original condition with all tags intact.</li>
              <li>Items on sale or marked "Final Sale" are not eligible for return.</li>
              <li>Custom-stitched or altered garments cannot be returned.</li>
              <li>Dupattas/accessories must be returned with the main garment.</li>
              <li>Refunds are issued to the original payment method or as store credit.</li>
              <li>Shipping charges (if any) are non-refundable.</li>
            </ul>
          </div>

          {/* COD */}
          <div className="policy-block">
            <h2 className="policy-block-title serif">💰 Cash on Delivery</h2>
            <p className="policy-text">
              Cash on Delivery (COD) is available on orders up to ₹3,000. For higher-value orders, we accept UPI payments via BHIM, Google Pay, PhonePe, and Paytm.
            </p>
            <p className="policy-text" style={{ marginTop: "0.8rem" }}>
              To place a COD order, please WhatsApp us your details directly.
            </p>
          </div>

          {/* Help CTA */}
          <div className="size-custom-cta">
            <span className="size-custom-icon">🙋</span>
            <div>
              <h3>Need Help With a Return?</h3>
              <p>Contact our support team and we'll resolve your issue within 24 hours.</p>
            </div>
            <a
              href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20return%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
