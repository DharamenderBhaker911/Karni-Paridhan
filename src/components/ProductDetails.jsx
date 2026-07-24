import { useState, useEffect, useRef } from "react";
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
  const [sizeError, setSizeError] = useState(false);

  // Touch swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sizeRowRef = useRef(null);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function triggerSizeError() {
    setSizeError(true);
    // Scroll size row into view on mobile
    if (sizeRowRef.current) {
      sizeRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Auto clear after animation
    setTimeout(() => setSizeError(false), 700);
  }

  function handleAdd() {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      triggerSizeError();
      return;
    }
    onAdd({ ...product, selectedSize, qty });
    onClose();
  }

  function handleBuyNow() {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      triggerSizeError();
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

        {/* ── Left: Image Gallery ── */}
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

        </div>


        {/* ── Right: Info & CTA ── */}
        <div className="details-copy">
          {/* Category & Stock */}
          <div className="details-top-row">
            <p className="eyebrow">{product.category}</p>
            <span className="in-stock-badge">✓ In Stock</span>
          </div>

          <h2 id="product-title" className="serif details-title">{product.name}</h2>

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

          {product.bestFor && (
            <div className="best-for-row">
              <span className="best-for-label">🎯 Best For:</span>
              <span className="best-for-text">{product.bestFor}</span>
            </div>
          )}

          {/* Size Selector */}
          <div ref={sizeRowRef}>
            <p className="size-label">
              Select Size
              {selectedSize && <span className="selected-size-display">{selectedSize}</span>}
            </p>
            <div className={`size-row ${sizeError ? "size-row-shake" : ""}`}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="size-error-pill">⚠ Please select a size to continue</p>
            )}
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
          <div className="details-actions">
            <button
              type="button"
              className="btn-ghost details-cta-btn"
              onClick={handleAdd}
            >
              🛍 Add to Cart
            </button>
            <button
              type="button"
              className="btn-primary details-cta-btn"
              onClick={handleBuyNow}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Delivery Note */}
          <div className="details-delivery-note">
            <span>🚚 Free delivery</span>
            <span className="dot-sep">·</span>
            <span>🔒 Secure payment</span>
            <span className="dot-sep">·</span>
            <span>↩ Easy returns</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
