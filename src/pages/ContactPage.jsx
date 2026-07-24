/**
 * ContactPage — Karni Paridhan
 * Contact form, store details, social links
 */
import { useState } from "react";
import { supabase } from "../supabase/client";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const contactDetails = [
  {
    icon: "📍",
    title: "Visit Our Store",
    lines: ["Shop No. 408, Shree Kuberji Textile World,", "Surat, Gujarat – 395010"],
  },
  {
    icon: "📞",
    title: "Call Us",
    lines: ["+91 99999 99999"],
    href: "tel:+919999999999",
  },
  {
    icon: "📧",
    title: "Email Us",
    lines: ["karnicollection@gmail.com"],
    href: "mailto:karnicollection@gmail.com",
  },
  {
    icon: "🕐",
    title: "Business Hours",
    lines: ["Mon – Sat: 10 AM – 8 PM", "Sunday: 11 AM – 6 PM"],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        created_at: new Date().toISOString(),
      });
      if (error) throw error;
      setSent(true);
      toast.success("Message sent! We'll get back to you soon. 🙏");
    } catch (err) {
      // Fallback: open WhatsApp with the message
      const waText = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
      );
      window.open(`https://wa.me/919999999999?text=${waText}`, "_blank");
      toast.success("Opening WhatsApp to send your message!");
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="inner-page-title serif">Contact Us</h1>
          <p className="inner-page-sub">We'd love to hear from you. Reach out for orders, queries, or collaborations.</p>
        </div>
      </div>

      <section className="contact-section section-pad">
        <div className="contact-inner container-narrow">

          {/* Left: Details */}
          <div className="contact-details-col">
            <h2 className="contact-col-title serif">We're Here to Help</h2>
            <p className="contact-col-sub">
              Whether you have a question about sizing, want to track an order, or simply want to say hello — we are just a message away.
            </p>

            <div className="contact-detail-list">
              {contactDetails.map((d) => (
                <div className="contact-detail-item" key={d.title}>
                  <span className="contact-detail-icon">{d.icon}</span>
                  <div>
                    <p className="contact-detail-title">{d.title}</p>
                    {d.href ? (
                      <a href={d.href} className="contact-detail-link">
                        {d.lines[0]}
                      </a>
                    ) : (
                      d.lines.map((l, i) => (
                        <p key={i} className="contact-detail-line">{l}</p>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20help%20with%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-wa-btn"
            >
              <span>💬</span> Chat on WhatsApp
            </a>
          </div>

          {/* Right: Form */}
          <div className="contact-form-col">
            {sent ? (
              <div className="contact-success">
                <span className="contact-success-icon">🎉</span>
                <h3>Thank You!</h3>
                <p>Your message has been sent. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2 className="contact-col-title serif">Send a Message</h2>

                <div className="contact-form-row">
                  <div className="auth-field">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Priya Sharma"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      disabled={submitting}
                      required
                    />
                  </div>
                  <div className="auth-field">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    disabled={submitting}
                    required
                    className="contact-textarea"
                  />
                </div>

                <button type="submit" className="auth-submit" disabled={submitting}>
                  {submitting ? (
                    <span className="auth-submit-loading">
                      <span className="auth-spinner" /> Sending…
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
