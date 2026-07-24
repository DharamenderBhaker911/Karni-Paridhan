/**
 * GallerySection — Karni Paridhan
 * Instagram-style photo grid using product images
 */
import { useState } from "react";
import { products } from "../data/products";

// Pick the first image from up to 9 different products across categories
function getGalleryImages() {
  const seen = new Set();
  const result = [];
  for (const product of products) {
    if (result.length >= 9) break;
    if (product.images?.[0] && !seen.has(product.id)) {
      seen.add(product.id);
      result.push({
        src: product.images[0],
        name: product.name,
        category: product.category,
        price: product.price,
        id: product.id,
      });
    }
  }
  return result;
}

export default function GallerySection() {
  const [hoveredId, setHoveredId] = useState(null);
  const galleryItems = getGalleryImages();

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-inner">
        <div className="section-header-center">
          <span className="eyebrow">The Collection</span>
          <h2 className="gallery-title serif">
            Styled for <em>Every Occasion</em>
          </h2>
          <p className="gallery-sub">
            From royal Poshaks to elegant Kurta Sets — explore our handpicked looks.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div
              className={`gallery-item gallery-item--${i % 3 === 0 ? "tall" : "normal"}`}
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.src}
                alt={item.name}
                loading="lazy"
                className="gallery-img"
              />
              <div className={`gallery-overlay ${hoveredId === item.id ? "gallery-overlay--visible" : ""}`}>
                <span className="gallery-overlay-category">{item.category}</span>
                <p className="gallery-overlay-name">{item.name}</p>
                <span className="gallery-overlay-price">₹{item.price.toLocaleString("en-IN")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-cta">
          <a href="#products" className="btn-ghost gallery-cta-btn">
            View Full Collection ✦
          </a>
        </div>
      </div>
    </section>
  );
}
