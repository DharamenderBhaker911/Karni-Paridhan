/**
 * TestimonialsSection — Karni Paridhan
 * Customer reviews carousel with star ratings
 */
import { useState } from "react";

const testimonials = [
  {
    name: "Priya Rathore",
    location: "Jaipur, Rajasthan",
    product: "Royal Crimson Gota Patti Rajputi Poshak",
    rating: 5,
    review: "Absolutely stunning! The Gota Patti work is so intricate and the fabric quality is exceptional. I wore this to my cousin's wedding and received so many compliments. Will definitely order again! 👑",
    avatar: "👩",
  },
  {
    name: "Anjali Sharma",
    location: "Surat, Gujarat",
    product: "Embroidered Paisley Yoke Kurta Set",
    rating: 5,
    review: "The embroidery on the yoke is breathtaking — you can tell it's done by expert hands. The fabric is lightweight and comfortable even for long functions. Karni Paridhan never disappoints!",
    avatar: "👩‍🦱",
  },
  {
    name: "Meena Choudhary",
    location: "Jodhpur, Rajasthan",
    product: "Ivory Pearl Silk Rajputi Bridal Poshak",
    rating: 5,
    review: "I wore this for my Roka ceremony and felt like a queen. The pearl embellishments are real and the silk quality is pure luxury. The delivery was also super fast. Highly recommended for brides!",
    avatar: "👸",
  },
  {
    name: "Divya Bhatt",
    location: "Ahmedabad, Gujarat",
    product: "Pastel Chanderi Silk Floral Set",
    rating: 4,
    review: "Beautiful kurta set — the Chanderi fabric is so airy and elegant. Perfect for daytime events. The dupatta is lovely too. Only wish the colours were slightly more vibrant but overall very happy!",
    avatar: "🧕",
  },
  {
    name: "Sunita Meena",
    location: "Udaipur, Rajasthan",
    product: "Champagne Gold Tissue Silk Poshak",
    rating: 5,
    review: "Ordered for Navratri and the garment exceeded all my expectations. The shimmer of the tissue silk is absolutely magical under lights. Customer service was very helpful too. 10/10!",
    avatar: "👩‍🎤",
  },
  {
    name: "Rekha Joshi",
    location: "Mumbai, Maharashtra",
    product: "Midnight Black Floral Daman Suit",
    rating: 5,
    review: "I was hesitant to order ethnic wear online but Karni Paridhan proved me wrong. The suit arrived perfectly packed, the stitching quality is top-notch, and the floral print is even more beautiful in person!",
    avatar: "💁",
  },
];

function Stars({ count }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "star star--filled" : "star star--empty"}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const visible = 3; // show 3 at a time on desktop
  const total = testimonials.length;

  function prev() {
    setCurrent((c) => (c - 1 + total) % total);
  }
  function next() {
    setCurrent((c) => (c + 1) % total);
  }

  // Get 3 visible testimonials (with wrap-around)
  const displayed = Array.from({ length: visible }).map(
    (_, i) => testimonials[(current + i) % total]
  );

  return (
    <section className="testimonials-section" id="reviews">
      <div className="testimonials-inner">
        <div className="section-header-center">
          <span className="eyebrow">Customer Love</span>
          <h2 className="testimonials-title serif">
            What Our Customers Say
          </h2>
          <p className="testimonials-sub">
            Loved by 10,000+ women across India — here's what they have to say.
          </p>
        </div>

        <div className="testimonials-carousel">
          {displayed.map((t, i) => (
            <div className="testimonial-card" key={`${t.name}-${i}`}>
              <Stars count={t.rating} />
              <p className="testimonial-text">"{t.review}"</p>
              <div className="testimonial-footer">
                <span className="testimonial-avatar">{t.avatar}</span>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-location">{t.location}</p>
                  <p className="testimonial-product">Bought: {t.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="testimonials-nav">
          <button className="testimonials-nav-btn" onClick={prev} aria-label="Previous">←</button>
          <div className="testimonials-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === current ? "testimonial-dot--active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <button className="testimonials-nav-btn" onClick={next} aria-label="Next">→</button>
        </div>

        {/* Summary stats */}
        <div className="testimonials-stats">
          <div className="testimonial-stat">
            <span className="testimonial-stat-num">4.9</span>
            <Stars count={5} />
            <span className="testimonial-stat-label">Average Rating</span>
          </div>
          <div className="testimonial-stat-divider" />
          <div className="testimonial-stat">
            <span className="testimonial-stat-num">10K+</span>
            <span className="testimonial-stat-label">Happy Customers</span>
          </div>
          <div className="testimonial-stat-divider" />
          <div className="testimonial-stat">
            <span className="testimonial-stat-num">98%</span>
            <span className="testimonial-stat-label">Would Recommend</span>
          </div>
        </div>
      </div>
    </section>
  );
}
