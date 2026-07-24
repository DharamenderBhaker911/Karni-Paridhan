import { images } from "../data/products";

function Hero() {
  return (
    <section className="hero" id="top">

      {/* Background Logo Watermark */}
      <div className="hero-logo-watermark" aria-hidden="true">
        <img src={images.logo} alt="" />
      </div>

      {/* Decorative orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />

      {/* Main Content */}
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow motion-rise motion-rise-d1">
          ✦ Indian Ethnic Wear · Rajasthan ✦
        </p>

        <h1 className="hero-tagline serif motion-rise motion-rise-d2">
          Wear the <em>Heritage,</em><br />Own the Moment
        </h1>

        <p className="hero-sub motion-rise motion-rise-d3">
          Welcome to Karni Paridhan — where tradition meets timeless elegance. Discover our exclusive collection of premium Rajputi posaks, handcrafted Anarkalis, and sophisticated Kurta sets, each piece narrating a story of heritage and unmatched craftsmanship.
        </p>

        <div className="hero-actions motion-rise motion-rise-d3">
          <a href="#products" className="btn-primary hero-cta-primary">
            ✦ Shop Collection
          </a>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="hero-trust-bar motion-rise motion-rise-d4">
        {/* Free Delivery */}
        <div className="trust-pill">
          <span className="trust-pill-icon" role="img" aria-label="Delivery Truck">
            🚚
          </span>
          <div className="trust-pill-text-container">
            <span className="trust-pill-title">Free Delivery</span>
            <span className="trust-pill-sub">Pan India</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        {/* Luxury Collection — Crown + Diamond SVG */}
        <div className="trust-pill">
          <span className="trust-pill-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e4c06e" />
                  <stop offset="100%" stopColor="#c49a3c" />
                </linearGradient>
              </defs>
              {/* Crown */}
              <path d="M10 22L14 12L20 18L24 10L28 18L34 12L38 22H10Z" fill="url(#goldGrad)" stroke="#c49a3c" strokeWidth="1.2" strokeLinejoin="round" />
              {/* Diamond body */}
              <path d="M14 24L24 44L34 24H14Z" fill="url(#goldGrad)" opacity="0.9" />
              <path d="M14 24H34" stroke="#c49a3c" strokeWidth="1.2" />
              {/* Diamond top facets */}
              <path d="M14 24L19 18H29L34 24" fill="url(#goldGrad)" stroke="#c49a3c" strokeWidth="1.2" strokeLinejoin="round" />
              {/* Center line */}
              <path d="M24 18V44" stroke="#b8860b" strokeWidth="0.8" opacity="0.5" />
            </svg>
          </span>
          <div>
            <span className="trust-pill-title">Luxury Collection</span>
            <span className="trust-pill-sub">Handcrafted</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        {/* UPI — Official style SVG */}
        <div className="trust-pill">
          <span className="trust-pill-icon upi-icon">
            <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" width="60" height="30">
              {/* U */}
              <path d="M4 6V22C4 28 9 32 16 32C23 32 28 28 28 22V6H22V22C22 25 19 27 16 27C13 27 10 25 10 22V6H4Z" fill="#4a4a4a" />
              {/* P */}
              <path d="M32 6H44C50 6 54 10 54 15C54 20 50 24 44 24H38V32H32V6ZM38 11V19H44C47 19 48 17 48 15C48 13 47 11 44 11H38Z" fill="#4a4a4a" />
              {/* I */}
              <path d="M58 6H64V32H58V6Z" fill="#4a4a4a" />
              {/* Arrow motif - orange */}
              <polygon points="66,8 78,18 66,28" fill="#f26522" />
              {/* Arrow motif - green (offset) */}
              <polygon points="70,13 80,21 70,31" fill="#138808" opacity="0.92" />
            </svg>
          </span>
          <div>
            <span className="trust-pill-title">UPI Accepted</span>
            <span className="trust-pill-sub">Easy Payments</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        {/* Premium Fabric */}
        <div className="trust-pill">
          <span className="trust-pill-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
              <defs>
                <linearGradient id="fabricGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a83358" />
                  <stop offset="100%" stopColor="#7b1c3a" />
                </linearGradient>
              </defs>
              <ellipse cx="24" cy="12" rx="12" ry="5" fill="url(#fabricGrad)" opacity="0.25" stroke="#7b1c3a" strokeWidth="1.5" />
              <rect x="12" y="12" width="24" height="24" fill="url(#fabricGrad)" opacity="0.15" stroke="#7b1c3a" strokeWidth="1.5" />
              <ellipse cx="24" cy="36" rx="12" ry="5" fill="url(#fabricGrad)" opacity="0.25" stroke="#7b1c3a" strokeWidth="1.5" />
              <path d="M16 14 Q24 24 16 34" stroke="#c49a3c" strokeWidth="1.2" fill="none" />
              <path d="M24 12 Q24 24 24 36" stroke="#c49a3c" strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M32 14 Q24 24 32 34" stroke="#c49a3c" strokeWidth="1.2" fill="none" />
              <path d="M36 8L40 4" stroke="#7b1c3a" strokeWidth="2" strokeLinecap="round" />
              <circle cx="40" cy="4" r="2" fill="#c49a3c" />
            </svg>
          </span>
          <div>
            <span className="trust-pill-title">7 Days Return Available</span>
            <span className="trust-pill-sub">100% Genuine</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
