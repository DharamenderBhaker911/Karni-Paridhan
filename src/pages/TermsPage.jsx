/**
 * TermsPage — Karni Paridhan
 * Terms of Service
 */
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Legal</span>
          <h1 className="inner-page-title serif">Terms of Service</h1>
          <p className="inner-page-sub">Last updated: January 2025</p>
        </div>
      </div>

      <section className="legal-section section-pad">
        <div className="legal-content container-narrow">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the Karni Paridhan website, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our website.</p>

          <h2>2. Products and Pricing</h2>
          <p>All prices are listed in Indian Rupees (₹) and include GST. We reserve the right to modify prices without prior notice. Product images are for reference only; actual colour and texture may vary slightly due to photography and display settings.</p>

          <h2>3. Order Placement</h2>
          <p>Placing an order constitutes an offer to purchase the product(s). We reserve the right to refuse or cancel any order at our discretion, including but not limited to cases of pricing errors, stock unavailability, or suspected fraud.</p>

          <h2>4. Payment</h2>
          <p>Payment is required at the time of order placement via approved UPI methods. Cash on Delivery (COD) is available for eligible orders as described in our Shipping & Returns policy. Failed or disputed payments may result in order cancellation.</p>

          <h2>5. Shipping and Delivery</h2>
          <p>We endeavour to ship orders within 1–2 business days of confirmation. Delivery timelines are estimates and not guaranteed. Karni Paridhan is not liable for delays caused by courier partners, natural disasters, or other circumstances beyond our control.</p>

          <h2>6. Returns and Refunds</h2>
          <p>Returns are accepted within 7 days of delivery subject to the conditions outlined in our Return Policy. Refunds are processed within 5–7 business days of receiving the returned item. Shipping charges are non-refundable.</p>

          <h2>7. Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and designs, is the exclusive property of Karni Paridhan and is protected by applicable copyright and trademark laws. Reproduction or distribution without our express written consent is prohibited.</p>

          <h2>8. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorised use of your account. We reserve the right to terminate accounts that violate these terms.</p>

          <h2>9. Limitation of Liability</h2>
          <p>Karni Paridhan shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific order giving rise to the claim.</p>

          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Surat, Gujarat.</p>

          <h2>11. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Continued use of our website after changes constitutes acceptance of the updated Terms.</p>

          <h2>12. Contact</h2>
          <p>For any questions about these Terms, please contact us:<br />
          <strong>Email:</strong> karnicollection@gmail.com<br />
          <strong>WhatsApp:</strong> +91 99999 99999</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
