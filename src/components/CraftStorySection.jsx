/**
 * CraftStorySection — Karni Paridhan
 * Brand story mid-page section with a split layout
 */
import { Link } from "react-router-dom";
import { images } from "../data/products";

const highlights = [
  { num: "15+", label: "Years of Heritage" },
  { num: "40+", label: "Artisan Families" },
  { num: "500+", label: "Unique Designs" },
  { num: "10K+", label: "Happy Customers" },
];

export default function CraftStorySection() {
  return (
    <section className="craft-story-section" id="craft">
      <div className="craft-story-inner">

        {/* Decorative side panel */}
        <div className="craft-story-visual">
          <div className="craft-story-img-frame">
            <img src={images.logo} alt="Karni Paridhan Heritage" className="craft-story-logo" />
            <div className="craft-story-badge-float">
              <span className="craft-badge-year">Since</span>
              <span className="craft-badge-num">2010</span>
              <span className="craft-badge-label">Rajasthan</span>
            </div>
          </div>
          <div className="craft-story-orb" aria-hidden="true" />
        </div>

        {/* Text content */}
        <div className="craft-story-text">
          <span className="eyebrow">Our Craft</span>
          <h2 className="craft-story-title serif">
            Where Tradition Meets<br />
            <em>Timeless Elegance</em>
          </h2>
          <p className="craft-story-desc">
            Every Karni Paridhan garment is more than just clothing — it is a piece of living heritage. Our designs are inspired by the grandeur of Rajputana royalty, brought to life by master artisans who have practised their craft for generations.
          </p>
          <p className="craft-story-desc" style={{ marginTop: "1rem" }}>
            From the intricate <strong>Gota Patti embroidery</strong> on our Rajputi Poshaks to the fine <strong>Zardozi threadwork</strong> on our Anarkalis — each detail is a testament to our unwavering commitment to quality and authenticity.
          </p>

          {/* Highlights */}
          <div className="craft-highlights">
            {highlights.map((h) => (
              <div className="craft-highlight-item" key={h.label}>
                <span className="craft-highlight-num">{h.num}</span>
                <span className="craft-highlight-label">{h.label}</span>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn-primary craft-story-btn">
            Our Full Story →
          </Link>
        </div>

      </div>
    </section>
  );
}
