/**
 * PrivacyPolicyPage — Karni Paridhan
 */
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Legal</span>
          <h1 className="inner-page-title serif">Privacy Policy</h1>
          <p className="inner-page-sub">Last updated: January 2025</p>
        </div>
      </div>

      <section className="legal-section section-pad">
        <div className="legal-content container-narrow">
          <h2>1. Introduction</h2>
          <p>Welcome to Karni Paridhan ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or make a purchase.</p>

          <h2>2. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as:</p>
          <ul>
            <li>Name, email address, and phone number when you create an account or place an order.</li>
            <li>Shipping address and payment information (processed securely via UPI; we do not store card/bank details).</li>
            <li>Communications you send us via email, WhatsApp, or our contact form.</li>
          </ul>
          <p>We also collect information automatically, including your IP address, browser type, and pages visited.</p>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To process and fulfil your orders and send related information.</li>
            <li>To send you promotional communications (you can opt out at any time).</li>
            <li>To improve our website and customer experience.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2>4. Sharing Your Information</h2>
          <p>We do not sell or rent your personal data to third parties. We may share your information with:</p>
          <ul>
            <li>Courier partners (Delhivery, Shiprocket) solely for order delivery.</li>
            <li>Payment processors (UPI networks) to complete transactions.</li>
            <li>Service providers who assist in operating our website (e.g., Supabase for database hosting).</li>
          </ul>

          <h2>5. Cookies</h2>
          <p>We use cookies to enhance your browsing experience, remember your cart, and analyse traffic. You can disable cookies in your browser settings, though this may affect site functionality.</p>

          <h2>6. Data Security</h2>
          <p>We implement appropriate technical and organisational measures to protect your personal data from unauthorised access, alteration, or disclosure. Our database is hosted on Supabase with row-level security enabled.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. To exercise these rights, email us at karnicollection@gmail.com or WhatsApp us.</p>

          <h2>8. Children's Privacy</h2>
          <p>Our service is not directed to children under 13. We do not knowingly collect personal information from children.</p>

          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page indicates when changes were made. Continued use of our website constitutes acceptance of the updated policy.</p>

          <h2>10. Contact Us</h2>
          <p>For any privacy-related questions, please contact us at:</p>
          <p><strong>Email:</strong> karnicollection@gmail.com<br />
          <strong>WhatsApp:</strong> +91 99999 99999<br />
          <strong>Address:</strong> Shop No. 408, Shree Kuberji Textile World, Surat, Gujarat – 395010</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
