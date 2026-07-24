/**
 * FaqsPage — Karni Paridhan
 * Frequently Asked Questions with accordion
 */
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const faqCategories = [
  {
    category: "Orders & Payment",
    icon: "💳",
    faqs: [
      { q: "How do I place an order?", a: "Browse our collection, choose your product and size, and click 'Buy Now' or 'Add to Cart'. Follow the checkout steps to complete your order via UPI or WhatsApp." },
      { q: "What payment methods do you accept?", a: "We accept all major UPI apps including Google Pay, PhonePe, Paytm, and BHIM. We also accept Cash on Delivery (COD) for orders up to ₹3,000." },
      { q: "Is my payment information secure?", a: "Yes! All payments are processed through secure, encrypted UPI channels. We never store your payment information." },
      { q: "Can I modify or cancel my order after placing it?", a: "You can cancel or modify your order within 2 hours of placing it. After that, the order goes into processing. Contact us immediately on WhatsApp for urgent changes." },
      { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available for orders up to ₹3,000. For COD orders, please WhatsApp us directly with your details." },
    ],
  },
  {
    category: "Shipping & Delivery",
    icon: "🚚",
    faqs: [
      { q: "How long does delivery take?", a: "Standard delivery takes 5–7 business days across India. Express delivery (2–3 business days) is available in select cities for an additional ₹99." },
      { q: "Do you offer free shipping?", a: "Yes! We offer free standard shipping on all orders above ₹999. Orders below ₹999 have a flat shipping fee of ₹79." },
      { q: "Which states do you deliver to?", a: "We deliver pan-India to 20,000+ pin codes. Enter your pin code at checkout to confirm availability." },
      { q: "How can I track my order?", a: "Once your order is shipped, we'll send you a tracking link via WhatsApp. You can also use our Track Order page with your Order ID." },
    ],
  },
  {
    category: "Returns & Exchanges",
    icon: "🔄",
    faqs: [
      { q: "What is your return policy?", a: "We accept returns within 7 days of delivery. Items must be unused, unwashed, and with all tags intact." },
      { q: "How do I initiate a return?", a: "WhatsApp or email us with your Order ID and reason within 7 days of delivery. We'll arrange a free pickup from your doorstep." },
      { q: "Can I exchange for a different size?", a: "Yes! We offer free size exchanges within 7 days, subject to availability of the desired size. WhatsApp us to initiate the exchange." },
      { q: "When will I get my refund?", a: "Refunds are processed within 5–7 business days after we receive and inspect the returned item. The amount is credited to your original payment method." },
      { q: "Are sale items returnable?", a: "Items marked 'Final Sale' or purchased during flash sales are not eligible for return or exchange. Regular discounted items follow the standard 7-day return policy." },
    ],
  },
  {
    category: "Products & Sizing",
    icon: "👗",
    faqs: [
      { q: "How do I find the right size?", a: "Visit our Size Guide page for detailed measurement charts for all our product categories. If you're between sizes, we recommend sizing up for comfort." },
      { q: "Are the colors accurate in the photos?", a: "We make every effort to display colors accurately. However, slight variation may occur due to monitor settings and studio lighting. For an exact color match, WhatsApp us for a video." },
      { q: "Do you offer custom stitching?", a: "Yes! Custom stitching is available on select designs. WhatsApp us your measurements and the product you're interested in, and our team will guide you." },
      { q: "What fabrics do you use?", a: "We use premium fabrics including Chanderi Silk, Tussar, Kota Doria, Georgette, Satin, and Organza, sourced ethically from weavers across Rajasthan and Gujarat." },
      { q: "How should I care for my garment?", a: "Most of our garments are dry-clean recommended. For hand-washable items, use cold water and mild detergent. Avoid wringing. Store in the dust bag provided." },
    ],
  },
];

function FaqAccordion({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button
        className="faq-question"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <span className="faq-chevron">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="faq-answer">
          <p>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Help Center</span>
          <h1 className="inner-page-title serif">Frequently Asked Questions</h1>
          <p className="inner-page-sub">Everything you need to know. Can't find your answer? <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>WhatsApp us!</a></p>
        </div>
      </div>

      <section className="faq-section section-pad">
        <div className="container-narrow">

          {/* Category Tabs */}
          <div className="faq-tabs">
            {faqCategories.map((cat, i) => (
              <button
                key={cat.category}
                className={`faq-tab ${activeCategory === i ? "faq-tab--active" : ""}`}
                onClick={() => setActiveCategory(i)}
              >
                <span>{cat.icon}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="faq-list">
            {faqCategories[activeCategory].faqs.map((faq) => (
              <FaqAccordion key={faq.q} faq={faq} />
            ))}
          </div>

          {/* Still Need Help */}
          <div className="faq-still-help">
            <h3>Still have a question?</h3>
            <p>Our team is available Monday–Saturday, 10 AM to 8 PM.</p>
            <div className="faq-help-btns">
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 WhatsApp Us
              </a>
              <a href="mailto:karnicollection@gmail.com" className="btn-ghost">
                📧 Email Us
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
