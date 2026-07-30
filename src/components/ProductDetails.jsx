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

          {/* Size Selector — hidden for Purse/bags */}
          {product.sizes && product.sizes.length > 0 && (
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
          )}

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

            <a
              href={`https://wa.me/919784842239?text=${encodeURIComponent(`Hi! I'm interested in:\n*${product.name}*${selectedSize ? `\nSize: ${selectedSize}` : ''}\n\nPlease share more details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-enquiry-btn"
              onClick={e => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquiry on WhatsApp
            </a>
          </div>



          {/* Delivery Note */}
          <div className="details-delivery-note" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#444', marginBottom: '4px' }}>
              <strong>Free Delivery & 7 Days Replacement</strong>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span>🚚 Free delivery</span>
              <span className="dot-sep">·</span>
              <span>🔒 Secure payment</span>
              <span className="dot-sep">·</span>
              <span>↩ Easy returns</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
