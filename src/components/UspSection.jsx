/**
 * UspSection — Karni Paridhan
 * "Why Choose Us" 4-feature strip
 */
const usps = [
  {
    icon: "👑",
    title: "500+ Exclusive Designs",
    desc: "From royal Rajputi Poshaks to modern Kurta Sets — our range covers every occasion with premium ethnic wear.",
  },
  {
    icon: "🧵",
    title: "Master-Crafted Quality",
    desc: "Every piece is handcrafted by skilled artisans using premium Chanderi, Tussar, and Kota Doria fabrics.",
  },
  {
    icon: "🚚",
    title: "Free Pan-India Delivery",
    desc: "We deliver to 20,000+ pin codes across India. Free shipping on orders above ₹999.",
  },
  {
    icon: "🔄",
    title: "7-Day Easy Returns",
    desc: "Not the right fit? No problem. Hassle-free returns and exchanges within 7 days of delivery.",
  },
];

export default function UspSection() {
  return (
    <section className="usp-section" id="why-us">
      <div className="usp-inner">
        <div className="section-header-center">
          <span className="eyebrow">Why Karni Paridhan</span>
          <h2 className="usp-title serif">
            Royal Quality, <em>Royal Experience</em>
          </h2>
        </div>
        <div className="usp-grid">
          {usps.map((u) => (
            <div className="usp-card" key={u.title}>
              <div className="usp-icon-wrap">
                <span className="usp-icon">{u.icon}</span>
              </div>
              <h3 className="usp-card-title">{u.title}</h3>
              <p className="usp-card-desc">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
