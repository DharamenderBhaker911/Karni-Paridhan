import { useState } from "react";

const logoUrl      = new URL("../../assets/logo.png",       import.meta.url).href;
const bhimLogo     = new URL("../../assets/bhim_logo.png",  import.meta.url).href;
const gpayLogo     = new URL("../../assets/gpay_logo.jpg",  import.meta.url).href;
const paytmLogo    = new URL("../../assets/paytm_logo.jpg", import.meta.url).href;
const phonepe      = new URL("../../assets/phonepe_logo.jpg",import.meta.url).href;

/* ─── Social icon SVGs ─────────────────────────────────────────────────────── */
const IconInsta = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const IconFB = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const IconYT = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const IconWA = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18l3-.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
  </svg>
);

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const shopLinks = [
  { label: "Royal Poshak",   href: "/#/" },
  { label: "Anarkali Suits", href: "/#/" },
  { label: "Kurta Sets",     href: "/#/" },
  { label: "New Arrivals",   href: "/#/" },
  { label: "Sale",           href: "/#/" },
];
const infoLinks = [
  { label: "About Us",           href: "/#/about" },
  { label: "Our Collections",    href: "/#/" },
  { label: "Size Guide",         href: "/#/size-guide" },
  { label: "Fabric Care Tips",   href: "/#/faqs" },
  { label: "Gift Cards",         href: "/#/contact" },
];
const supportLinks = [
  { label: "Returns & Exchange", href: "/#/shipping-returns" },
  { label: "Track Your Order",   href: "/#/track-order" },
  { label: "FAQs",               href: "/#/faqs" },
  { label: "Privacy Policy",     href: "/#/privacy" },
  { label: "Terms of Service",   href: "/#/terms" },
];

const socialLinks = [
  { icon: <IconInsta />, label: "Instagram",  href: "https://instagram.com",  color: "#E1306C" },
  { icon: <IconFB />,    label: "Facebook",   href: "https://facebook.com",   color: "#1877F2" },
  { icon: <IconYT />,    label: "YouTube",    href: "https://youtube.com",    color: "#FF0000" },
  { icon: <IconWA />,    label: "WhatsApp",   href: "https://wa.me/919999999999?text=Hi%2C%20I%20need%20help%20with%20my%20order", color: "#25D366" },
];

const paymentLogos = [
  { src: bhimLogo,  alt: "BHIM UPI" },
  { src: gpayLogo,  alt: "Google Pay" },
  { src: paytmLogo, alt: "Paytm" },
  { src: phonepe,   alt: "PhonePe" },
];

const trustBadges = [
  { icon: "🚚", title: "Free Shipping",  sub: "On orders ₹999+" },
  { icon: "🔄", title: "Easy Returns",   sub: "7-day hassle-free" },
  { icon: "🔒", title: "Secure Payments",sub: "100% encrypted" },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */
import { useNewsletter } from "../hooks/useNewsletter";

function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isSuccess, isPending } = useNewsletter();

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) {
      subscribe(email);
    }
  }

  return (
    <footer className="footer-v2" id="contact">

      {/* ── Trust Strip ────────────────────────────────────────────── */}
      <div className="footer-trust-strip">
        <div className="footer-trust-inner">
          {trustBadges.map((b) => (
            <div className="footer-trust-item" key={b.title}>
              <span className="footer-trust-icon">{b.icon}</span>
              <div>
                <span className="footer-trust-title">{b.title}</span>
                <span className="footer-trust-sub">{b.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Body ───────────────────────────────────────────────── */}
      <div className="footer-body">
        <div className="footer-main-grid">

          {/* ── Brand Column ─────────────────────────────────────── */}
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <img src={logoUrl} alt="Karni Paridhan" className="footer-logo-img" />
              <div>
                <p className="footer-brand-name serif">Karni Paridhan</p>
                <p className="footer-brand-tagline">करणी परिधान</p>
              </div>
            </div>

            <p className="footer-brand-desc">
              Royal ethnic wear crafted with intention — from heritage designs to
              premium fabrics. Every piece tells the story of artisan hands and
              the timeless elegance of Rajputana traditions.
            </p>

            {/* Social Icons */}
            <div className="footer-socials">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social-btn"
                  style={{ "--social-color": s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="footer-payment-wrap">
              <p className="footer-payment-label">We Accept</p>
              <div className="footer-payment-logos">
                {paymentLogos.map((p) => (
                  <div key={p.alt} className="footer-payment-chip">
                    <img src={p.src} alt={p.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Link Columns ─────────────────────────────────────── */}
          <div className="footer-link-col">
            <h4 className="footer-col-heading">Shop</h4>
            <ul className="footer-link-list">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="footer-link">
                    <IconArrow />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-link-col">
            <h4 className="footer-col-heading">Information</h4>
            <ul className="footer-link-list">
              {infoLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="footer-link">
                    <IconArrow />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-link-col">
            <h4 className="footer-col-heading">Support</h4>
            <ul className="footer-link-list">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="footer-link">
                    <IconArrow />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact + Newsletter ──────────────────────────────── */}
          <div className="footer-contact-col-v2">
            <h4 className="footer-col-heading">Contact Us</h4>

            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon"><IconPin /></span>
                <span>
                  Shop No. 408, Shree Kuberji Textile World,<br />
                  Surat, Gujarat – 395010
                </span>
              </li>
              <li>
                <span className="footer-contact-icon"><IconPhone /></span>
                <a href="tel:+919999999999">+91 99999 99999</a>
              </li>
              <li>
                <span className="footer-contact-icon"><IconMail /></span>
                <a href="mailto:karnicollection@gmail.com">karnicollection@gmail.com</a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <p className="footer-newsletter-title">Get Exclusive Offers</p>
              <p className="footer-newsletter-sub">
                Join our mailing list for sale alerts & new drops.
              </p>
              {isSuccess ? (
                <div className="footer-subscribed">
                  🎉 You're on the list! Thank you.
                </div>
              ) : (
                <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isPending}
                    className="footer-newsletter-input"
                    aria-label="Email for newsletter"
                  />
                  <button type="submit" className="footer-newsletter-btn" disabled={isPending}>
                    {isPending ? "..." : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <div className="footer-divider" />

      {/* ── Bottom Bar ──────────────────────────────────────────────── */}
      <div className="footer-bottom-v2">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            © {year} <strong>Karni Paridhan</strong>. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <span className="footer-heart">♥</span> in India 🇮🇳
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
