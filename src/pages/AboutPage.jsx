/**
 * AboutPage — Karni Paridhan
 * Brand story, heritage, values, and artisan spotlight
 */
import { Link } from "react-router-dom";
import { images, products } from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const values = [
  { icon: "👑", title: "Royal Heritage", desc: "Every design is rooted in the rich culture of Rajputana, honouring centuries of royal aesthetic and artisan tradition." },
  { icon: "🧵", title: "Master Craftsmen", desc: "Our ensembles are handcrafted by skilled artisans from Rajasthan who have inherited their craft through generations." },
  { icon: "🌿", title: "Conscious Fashion", desc: "We source sustainable fabrics — Chanderi, Tussar, Kota Doria — supporting local weavers and ethical production." },
  { icon: "💎", title: "Unmatched Quality", desc: "From Zardozi embroidery to Gota Patti borders, every detail is quality-checked before it reaches your door." },
];

const milestones = [
  { year: "2010", event: "Founded in Surat, Gujarat" },
  { year: "2013", event: "Launched our Rajputi Posak signature line" },
  { year: "2016", event: "Partnered with 40+ Rajasthani artisans" },
  { year: "2019", event: "Crossed 10,000+ happy customers" },
  { year: "2022", event: "Launched Anarkali & Kurta-Set collections" },
  { year: "2024", event: "Went nationwide with pan-India delivery" },
];

const team = [
  { name: "Kiran Sharma", role: "Founder & Creative Director", emoji: "👩‍🎨" },
  { name: "Rajesh Bhati", role: "Head of Artisan Relations", emoji: "🤝" },
  { name: "Priya Rathore", role: "Lead Designer", emoji: "✏️" },
  { name: "Mahesh Soni", role: "Operations Manager", emoji: "📦" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <CartDrawer />

      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="eyebrow">Our Story</span>
          <h1 className="about-hero-title serif">
            Rooted in Rajputana,<br />
            <em>Crafted with Love</em>
          </h1>
          <p className="about-hero-sub">
            Since 2010, we have been bringing the timeless grandeur of Indian ethnic fashion to women across the country — one handcrafted piece at a time.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="about-story section-pad">
        <div className="about-story-inner container-narrow">
          <div className="about-story-text">
            <span className="eyebrow">The Beginning</span>
            <h2 className="about-section-title serif">A Love Letter to Rajasthani Heritage</h2>
            <p>
              Karni Paridhan was born from a simple belief — that every woman deserves to wear something that feels like royalty. Founded in 2010 in the textile hub of Surat, Gujarat, our brand draws its soul from the magnificent cultural tapestry of Rajasthan.
            </p>
            <p style={{ marginTop: "1rem" }}>
              The name <strong>Karni Paridhan</strong> (करणी परिधान) translates to "righteous clothing" — reflecting our commitment to authenticity, craftsmanship, and cultural pride. Every piece in our collection is a tribute to the artisans, the heritage, and the women who wear it with grace.
            </p>
            <p style={{ marginTop: "1rem" }}>
              From our signature <strong>Rajputi Posaks</strong> adorned with Gota Patti and Zardozi, to breezy Chanderi Kurta Sets and elegant Anarkalis — our collections are designed to make every occasion feel extraordinary.
            </p>
          </div>
          <div className="about-story-badge-col">
            <div className="about-story-badge">
              <span className="about-badge-num">15+</span>
              <span className="about-badge-label">Years of Legacy</span>
            </div>
            <div className="about-story-badge">
              <span className="about-badge-num">10K+</span>
              <span className="about-badge-label">Happy Customers</span>
            </div>
            <div className="about-story-badge">
              <span className="about-badge-num">40+</span>
              <span className="about-badge-label">Artisan Partners</span>
            </div>
            <div className="about-story-badge">
              <span className="about-badge-num">500+</span>
              <span className="about-badge-label">Unique Designs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section-pad" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="container-narrow">
          <div className="section-header-center">
            <span className="eyebrow">What We Stand For</span>
            <h2 className="about-section-title serif">Our Core Values</h2>
          </div>
          <div className="about-values-grid">
            {values.map((v) => (
              <div className="about-value-card" key={v.title}>
                <span className="about-value-icon">{v.icon}</span>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline section-pad">
        <div className="container-narrow">
          <div className="section-header-center">
            <span className="eyebrow">Our Journey</span>
            <h2 className="about-section-title serif">Milestones That Made Us</h2>
          </div>
          <div className="about-timeline-list">
            {milestones.map((m, i) => (
              <div className="about-timeline-item" key={m.year}>
                <div className="about-timeline-dot" />
                <div className="about-timeline-year">{m.year}</div>
                <div className="about-timeline-event">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team section-pad" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="container-narrow">
          <div className="section-header-center">
            <span className="eyebrow">The People</span>
            <h2 className="about-section-title serif">Meet Our Team</h2>
            <p className="about-team-sub">Passionate individuals united by a love for Indian culture and craftsmanship.</p>
          </div>
          <div className="about-team-grid">
            {team.map((t) => (
              <div className="about-team-card" key={t.name}>
                <div className="about-team-avatar">{t.emoji}</div>
                <h3 className="about-team-name">{t.name}</h3>
                <p className="about-team-role">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section-pad">
        <div className="container-narrow text-center">
          <h2 className="about-section-title serif" style={{ color: "#fff" }}>Ready to Explore?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "2rem", fontSize: "1.1rem" }}>
            Browse our full collection and find the piece that speaks to your soul.
          </p>
          <Link to="/" className="btn-gold" style={{ fontSize: "1rem", padding: "0.95rem 2.5rem" }}>
            ✦ Shop Collection
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
