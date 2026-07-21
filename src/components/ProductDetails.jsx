import { useState, useEffect } from "react";
import { formatPrice } from "../utils/format";

const FEATURES = [
  "Premium occasion fabric with comfortable lining",
  "Ready for wedding, festive, and family ceremonies",
  "Elegant finishing with handcrafted detail work",
  "Available in multiple sizes — fitted for every figure",
];

function ProductDetails({ product, onClose, onAdd, onBuyNow }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  // Touch swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const activeImage = gallery[currentIndex] || product.image;

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Touch Swipe Handlers
  const minSwipeDistance = 45;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Keyboard Navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gallery.length]);

  function handleAdd() {
    onAdd({ ...product, selectedSize, qty });
    onClose();
  }

  function handleBuyNow() {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size first!");
      return;
    }
    onBuyNow({ ...product, selectedSize, qty });
    onClose();
  }

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-labelledby="product-title">
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close" />

      <section className="details-panel">
        {/* Close Button */}
        <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Close details">
          ✕
        </button>

        {/* Swipeable Modern Gallery */}
        <div className="details-gallery">
          <div
            className="gallery-main swipeable-main"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img src={activeImage} alt={product.name} key={activeImage} className="gallery-slide-img" />

            {/* Slide Counter Badge */}
            {gallery.length > 1 && (
              <span className="slider-counter-badge">
                {currentIndex + 1} / {gallery.length}
              </span>
            )}

            {/* Left / Right Arrow Buttons */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className="slider-arrow arrow-prev"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="slider-arrow arrow-next"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}

            {/* Mobile Touch Swipe Cue */}
            {gallery.length > 1 && (
              <div className="swipe-hint-pill" aria-hidden="true">
                👈 Swipe Left / Right 👉
              </div>
            )}
          </div>

          {/* Dots Indicator */}
          {gallery.length > 1 && (
            <div className="slider-dots">
              {gallery.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  className={`dot-btn ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Thumbnails */}
          <div className="thumb-row">
            {gallery.map((img, idx) => (
              <button
                key={img}
                type="button"
                className={`thumb ${idx === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`View image ${idx + 1} of ${product.name}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Info & CTA Copy */}
        <div className="details-copy">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h2 id="product-title" className="serif">{product.name}</h2>
          </div>

          {/* Price */}
          <div className="details-price-row">
            <span className="details-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="details-original">{formatPrice(product.originalPrice)}</span>
            )}
            {discountPct && (
              <span className="savings-tag">{discountPct}% OFF</span>
            )}
          </div>

          <p className="description">{product.details}</p>

          {/* Size Selector */}
          <div>
            <p className="size-label">
              Select Size
              {selectedSize && <span style={{ color: "var(--wine)", marginLeft: "0.5rem" }}>{selectedSize}</span>}
            </p>
            <div className="size-row">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="qty-control">
            <span className="qty-label">Qty</span>
            <div className="qty-stepper">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Features */}
          <ul className="feature-list">
            {FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          {/* CTA Actions */}
          <div className="details-actions" style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
            <button
              type="button"
              className="btn-ghost"
              style={{ flex: 1, padding: "1rem", fontSize: "0.9rem", borderRadius: "0.85rem", whiteSpace: "nowrap" }}
              onClick={handleAdd}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="btn-primary"
              style={{ flex: 1.5, padding: "1rem", fontSize: "0.9rem", borderRadius: "0.85rem", whiteSpace: "nowrap" }}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
          {!selectedSize && (
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.5rem" }}>
              Please select a size above before buying
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
