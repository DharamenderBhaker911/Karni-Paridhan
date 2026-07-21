const bhimLogo = new URL("../../assets/bhim_logo.png", import.meta.url).href;

function Footer() {
  const year = new Date().getFullYear();

  const shopLinks = [
    { label: "Royal Poshak", href: "#products" },
    { label: "Anarkali", href: "#products" },
    { label: "Kurta Sets", href: "#products" },
    { label: "New Arrivals", href: "#products" },
  ];

  const infoLinks = [
    { label: "About Us", href: "#craft" },
    { label: "Collections", href: "#collections" },
    { label: "Size Guide", href: "#products" },
    { label: "Care Instructions", href: "#products" },
  ];

  const supportLinks = [
    { label: "Returns & Exchange", href: "#" },
    { label: "Track Order", href: "#" },
    { label: "FAQs", href: "#" },
  ];

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <h2 className="serif">Karni Paridhan</h2>
          <p>
            Royal ethnic wear crafted with intention — from heritage designs to premium
            fabrics. Every piece tells the story of artisan hands and Rajputana traditions.
          </p>
          <div className="footer-upi-badge">
            <img src={bhimLogo} alt="BHIM UPI" className="footer-upi-logo" />
            <span>Payments Accepted</span>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4>Shop</h4>
          {shopLinks.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
        </div>

        {/* Info */}
        <div className="footer-col">
          <h4>Information</h4>
          {infoLinks.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
        </div>

        {/* Contact & Support */}
        <div className="footer-col footer-contact-col">
          <h4>Contact & Support</h4>
          <div className="footer-contact-details" style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "rgba(255,255,255,0.7)", marginBottom: "1.2rem" }}>
            <p style={{ marginBottom: "0.8rem" }}>
              <span style={{ color: "var(--gold-light)", fontWeight: "600", display: "block", marginBottom: "0.2rem" }}>📍 Address:</span>
              4th Floor, SHOP NO. 408 SHREE KUBERJI TEXTILE WORLD, SURAT, GUJRAT, 395010
            </p>
            <p>
              <span style={{ color: "var(--gold-light)", fontWeight: "600", display: "block", marginBottom: "0.2rem" }}>✉️ Email:</span>
              <a href="mailto:karnicollection@gmail.com" style={{ display: "inline", color: "inherit", textDecoration: "underline" }}>
                karnicollection@gmail.com
              </a>
            </p>
          </div>

          <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>Quick Links</span>
          {supportLinks.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Karni Paridhan. All rights reserved.</p>
        <p>Made with ❤️ in India</p>
      </div>
    </footer>
  );
}

export default Footer;
