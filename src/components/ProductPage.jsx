import { useState, useEffect, useRef, useCallback } from "react";
import { formatPrice } from "../utils/format";
import { enrichProduct } from "../data/productEnricher";
import { useWishlist, useToggleWishlist } from "../hooks/useWishlist";

/* ─── Icon helpers (inline SVG for zero-dep) ──────────────────────────── */
const Ico = {
  Close:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Back:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m0 0 7 7m-7-7 7-7"/></svg>,
  Heart:   ({filled}) => <svg viewBox="0 0 24 24" fill={filled?"currentColor":"none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Zoom:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>,
  Share:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>,
  Truck:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 5v3h-7V8zM5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>,
  Return:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
  Lock:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  COD:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  Star:    () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Chevron: ({dir="down"}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{transform: dir==="up"?"rotate(180deg)":dir==="left"?"rotate(90deg)":dir==="right"?"rotate(-90deg)":"none"}}><path d="m6 9 6 6 6-6"/></svg>,
  Ruler:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.3 8.7 8.7 21.3c-.4.4-.9.6-1.4.6H4a2 2 0 0 1-2-2v-3.3c0-.5.2-1 .6-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="m7.5 10.5 2 2m.5-4.5 2 2m.5-4.5 2 2"/></svg>,
  ChevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>,
};

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Breadcrumb ─────────────────────────────────────────────────────────── */
function Breadcrumb({ category, name, onBack }) {
  const crumbs = ["Home", "Women", category, name];
  return (
    <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
      <button className="pdp-back-btn" onClick={onBack} aria-label="Go back">
        <Ico.Back />
      </button>
      <ol>
        {crumbs.map((c, i) => (
          <li key={i}>
            {i < crumbs.length - 1 ? (
              <><span className="pdp-crumb-link">{c}</span><span className="pdp-crumb-sep">›</span></>
            ) : (
              <span className="pdp-crumb-active">{c.length > 28 ? c.slice(0, 28) + "…" : c}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── Product Gallery ────────────────────────────────────────────────────── */
function ProductGallery({ images, productName }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [loaded, setLoaded] = useState({});
  const touchStart = useRef(null);
  const touchEnd   = useRef(null);

  useEffect(() => { setActive(0); setLoaded({}); }, [images]);

  const go = useCallback((dir) => {
    setActive(p => (p + dir + images.length) % images.length);
  }, [images.length]);

  function onTouchStart(e) { touchStart.current = e.targetTouches[0].clientX; }
  function onTouchMove(e)  { touchEnd.current   = e.targetTouches[0].clientX; }
  function onTouchEnd()    {
    if (!touchStart.current || !touchEnd.current) return;
    const dist = touchStart.current - touchEnd.current;
    if (Math.abs(dist) > 40) go(dist > 0 ? 1 : -1);
    touchStart.current = touchEnd.current = null;
  }

  function onImgLoad(i) { setLoaded(p => ({...p, [i]: true})); }

  return (
    <>
      <div className="pdp-gallery">
        {/* Thumbnail strip */}
        <div className="pdp-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`pdp-thumb ${i === active ? "pdp-thumb--active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              {!loaded[i] && <div className="pdp-thumb-skel" />}
              <img
                src={img}
                alt=""
                loading="lazy"
                onLoad={() => onImgLoad(i)}
                style={{ opacity: loaded[i] ? 1 : 0 }}
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          className="pdp-main-img-wrap"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {!loaded[active] && <div className="pdp-img-skel" />}
          <img
            key={images[active]}
            src={images[active]}
            alt={productName}
            className={`pdp-main-img ${loaded[active] ? "pdp-main-img--loaded" : ""}`}
            onLoad={() => onImgLoad(active)}
            onClick={() => setZoomed(true)}
          />

          {/* Counter + controls */}
          {images.length > 1 && (
            <>
              <span className="pdp-img-counter">{active + 1} / {images.length}</span>
              <button className="pdp-gallery-arrow pdp-gallery-arrow--prev" onClick={() => go(-1)} aria-label="Previous"><Ico.Chevron dir="left" /></button>
              <button className="pdp-gallery-arrow pdp-gallery-arrow--next" onClick={() => go(1)}  aria-label="Next"><Ico.Chevron dir="right" /></button>
            </>
          )}
          <button className="pdp-zoom-btn" onClick={() => setZoomed(true)} aria-label="Zoom"><Ico.Zoom /></button>
        </div>

        {/* Mobile dots */}
        {images.length > 1 && (
          <div className="pdp-gallery-dots">
            {images.map((_, i) => (
              <button key={i} className={`pdp-dot ${i === active ? "pdp-dot--active" : ""}`} onClick={() => setActive(i)} aria-label={`Go to image ${i + 1}`} />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      {zoomed && (
        <div className="pdp-lightbox" onClick={() => setZoomed(false)}>
          <button className="pdp-lightbox-close" onClick={() => setZoomed(false)}><Ico.Close /></button>
          <img src={images[active]} alt={productName} onClick={e => e.stopPropagation()} />
          {images.length > 1 && (
            <>
              <button className="pdp-lightbox-arrow pdp-lightbox-arrow--prev" onClick={e => { e.stopPropagation(); go(-1); }}><Ico.Chevron dir="left" /></button>
              <button className="pdp-lightbox-arrow pdp-lightbox-arrow--next" onClick={e => { e.stopPropagation(); go(1);  }}><Ico.Chevron dir="right" /></button>
            </>
          )}
        </div>
      )}
    </>
  );
}

/* ── Stars ──────────────────────────────────────────────────────────────── */
function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="pdp-stars" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`pdp-star ${i < full ? "pdp-star--full" : i === full && half ? "pdp-star--half" : ""}`}>
          <Ico.Star />
        </span>
      ))}
    </span>
  );
}

/* ── Color Selector ─────────────────────────────────────────────────────── */
function ColorSelector({ colors, selected, onSelect }) {
  return (
    <div className="pdp-section">
      <div className="pdp-section-label">
        Color: <strong>{selected?.name}</strong>
      </div>
      <div className="pdp-color-row">
        {colors.map(c => (
          <button
            key={c.name}
            className={`pdp-color-swatch ${selected?.name === c.name ? "pdp-color-swatch--active" : ""}`}
            style={{ "--swatch-bg": c.hex }}
            onClick={() => onSelect(c)}
            aria-label={c.name}
            title={c.name}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Size Selector ──────────────────────────────────────────────────────── */
function SizeSelector({ sizes, selected, onSelect, availableSizes, sizeError, onGuideOpen }) {
  return (
    <div className="pdp-section">
      <div className="pdp-section-label">
        <span>Size: {selected && <strong>{selected}</strong>}</span>
        <button className="pdp-size-guide-link" onClick={onGuideOpen}>
          <Ico.Ruler /> Size Guide
        </button>
      </div>
      <div className={`pdp-size-row ${sizeError ? "pdp-size-row--shake" : ""}`}>
        {sizes.map(s => {
          const avail = !availableSizes || availableSizes.includes(s);
          return (
            <button
              key={s}
              className={`pdp-size-btn ${selected === s ? "pdp-size-btn--selected" : ""} ${!avail ? "pdp-size-btn--disabled" : ""}`}
              onClick={() => avail && onSelect(s)}
              disabled={!avail}
              aria-pressed={selected === s}
            >
              {s}
            </button>
          );
        })}
      </div>
      {sizeError && <p className="pdp-size-error">⚠ Please select a size to continue</p>}
    </div>
  );
}

/* ── Quantity Selector ──────────────────────────────────────────────────── */
function QuantitySelector({ qty, setQty }) {
  return (
    <div className="pdp-qty-wrap">
      <span className="pdp-section-label" style={{marginBottom:0}}>Qty</span>
      <div className="pdp-qty">
        <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">−</button>
        <span>{qty}</span>
        <button onClick={() => setQty(q => Math.min(10, q + 1))} aria-label="Increase">+</button>
      </div>
    </div>
  );
}

/* ── Trust Badges ───────────────────────────────────────────────────────── */
function TrustBadges() {
  const badges = [
    { icon: <Ico.Truck />,  label: "Free Shipping",  sub: "On all orders" },
    { icon: <Ico.Return />, label: "Easy Returns",    sub: "7-day policy" },
    { icon: <Ico.Lock />,   label: "Secure Payment",  sub: "100% encrypted" },
  ];
  return (
    <div className="pdp-trust">
      {badges.map(b => (
        <div key={b.label} className="pdp-trust-item">
          <span className="pdp-trust-icon">{b.icon}</span>
          <span className="pdp-trust-title">{b.label}</span>
          <span className="pdp-trust-sub">{b.sub}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Product Highlights ─────────────────────────────────────────────────── */
function ProductHighlights({ items }) {
  return (
    <div className="pdp-block">
      <h3 className="pdp-block-title">Product Highlights</h3>
      <div className="pdp-highlights">
        {items.map((h, i) => (
          <div key={i} className="pdp-highlight-card">
            <span className="pdp-highlight-icon">{h.icon}</span>
            <span className="pdp-highlight-label">{h.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Fabric & Care ──────────────────────────────────────────────────────── */
function FabricCare({ items }) {
  return (
    <div className="pdp-block">
      <h3 className="pdp-block-title">Fabric & Care</h3>
      <div className="pdp-fabric-grid">
        {items.map(({ label, value }) => (
          <div key={label} className="pdp-fabric-card">
            <span className="pdp-fabric-label">{label}</span>
            <span className="pdp-fabric-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Description ────────────────────────────────────────────────────────── */
function Description({ product }) {
  const [expanded, setExpanded] = useState(false);
  const text = product.details;
  const long = text.length > 220;
  return (
    <div className="pdp-block pdp-accordion-block">
      <button className="pdp-accordion-header" onClick={() => setExpanded(v => !v)}>
        <span>Description</span>
        <Ico.Chevron dir={expanded ? "up" : "down"} />
      </button>
      {expanded && (
        <div className="pdp-accordion-body pdp-fade-in">
          <p>{text}</p>
          <ul>
            <li>Premium quality fabric sourced from certified weavers.</li>
            <li>Handcrafted embroidery by skilled Rajasthani artisans.</li>
            <li>Each piece is individually quality-checked before dispatch.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Specifications ─────────────────────────────────────────────────────── */
function Specifications({ specs }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="pdp-block pdp-accordion-block">
      <button className="pdp-accordion-header" onClick={() => setExpanded(v => !v)}>
        <span>Specifications</span>
        <Ico.Chevron dir={expanded ? "up" : "down"} />
      </button>
      {expanded && (
        <div className="pdp-accordion-body pdp-fade-in">
          <table className="pdp-spec-table">
            <tbody>
              {specs.map(([k, v]) => (
                <tr key={k}>
                  <td className="pdp-spec-key">{k}</td>
                  <td className="pdp-spec-val">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── Size Guide Modal ───────────────────────────────────────────────────── */
function SizeGuideModal({ guide, onClose }) {
  return (
    <div className="pdp-lightbox pdp-sg-modal" onClick={onClose}>
      <div className="pdp-sg-panel" onClick={e => e.stopPropagation()}>
        <div className="pdp-sg-header">
          <h3>Size Guide</h3>
          <button onClick={onClose}><Ico.Close /></button>
        </div>
        <div className="pdp-sg-model-info">
          <span>📏 Model: {guide.modelInfo.height} • Wearing size {guide.modelInfo.size}</span>
        </div>
        <div className="pdp-sg-table-wrap">
          <table className="pdp-sg-table">
            <thead>
              <tr>{guide.headers.map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {guide.rows.map(row => (
                <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="pdp-sg-note">All measurements are approximate. For best fit, compare with a garment you own.</p>
      </div>
    </div>
  );
}

/* ── Reviews ────────────────────────────────────────────────────────────── */
function Reviews({ reviews, rating, reviewCount }) {
  const dist = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 2 },
  ];
  return (
    <div className="pdp-block">
      <h3 className="pdp-block-title">Customer Reviews</h3>
      <div className="pdp-reviews-summary">
        <div className="pdp-reviews-big-rating">
          <span className="pdp-big-num">{rating}</span>
          <Stars rating={parseFloat(rating)} />
          <span className="pdp-rev-count">{reviewCount} reviews</span>
        </div>
        <div className="pdp-rating-bars">
          {dist.map(d => (
            <div key={d.stars} className="pdp-rating-bar-row">
              <span>{d.stars}★</span>
              <div className="pdp-rating-bar-track">
                <div className="pdp-rating-bar-fill" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="pdp-bar-pct">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pdp-review-cards">
        {reviews.map(r => (
          <div key={r.id} className="pdp-review-card">
            <div className="pdp-review-top">
              <div className="pdp-review-avatar">{r.avatar}</div>
              <div>
                <div className="pdp-review-name">{r.name}
                  {r.verified && <span className="pdp-verified">✔ Verified</span>}
                </div>
                <div className="pdp-review-meta">{r.location} · {r.date}</div>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="pdp-review-text">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FAQ ────────────────────────────────────────────────────────────────── */
function FAQ({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="pdp-block">
      <h3 className="pdp-block-title">Frequently Asked Questions</h3>
      <div className="pdp-faq-list">
        {faqs.map((f, i) => (
          <div key={i} className="pdp-faq-item">
            <button className="pdp-faq-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <Ico.Chevron dir={open === i ? "up" : "down"} />
            </button>
            {open === i && <p className="pdp-faq-a pdp-fade-in">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Similar Products Carousel ──────────────────────────────────────────── */
function SimilarProducts({ products, currentId, onOpen }) {
  const similar = products.filter(p => p.id !== currentId).slice(0, 8);
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
  };
  if (!similar.length) return null;
  return (
    <div className="pdp-block">
      <div className="pdp-block-header">
        <h3 className="pdp-block-title" style={{marginBottom:0}}>Similar Products</h3>
        <div className="pdp-carousel-btns">
          <button onClick={() => scroll(-1)}><Ico.Chevron dir="left" /></button>
          <button onClick={() => scroll(1)}><Ico.ChevronRight /></button>
        </div>
      </div>
      <div className="pdp-similar-scroll" ref={scrollRef}>
        {similar.map(p => {
          const disc = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : null;
          return (
            <div key={p.id} className="pdp-similar-card" onClick={() => onOpen(p)}>
              <div className="pdp-similar-img-wrap">
                {disc && <span className="pdp-similar-badge">{disc}% OFF</span>}
                <img src={p.image} alt={p.name} loading="lazy" />
              </div>
              <div className="pdp-similar-info">
                <p className="pdp-similar-name">{p.name.split("(")[0].trim()}</p>
                <div className="pdp-similar-price">
                  <span>{formatPrice(p.price)}</span>
                  {p.originalPrice && <s>{formatPrice(p.originalPrice)}</s>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Sticky Buy Bar (Mobile) ────────────────────────────────────────────── */
function StickyBuyBar({ price, originalPrice, onAdd, onBuy }) {
  return (
    <div className="pdp-sticky-bar">
      <div className="pdp-sticky-price">
        <span className="pdp-sticky-current">{formatPrice(price)}</span>
        {originalPrice && <s className="pdp-sticky-orig">{formatPrice(originalPrice)}</s>}
      </div>
      <div className="pdp-sticky-actions">
        <button className="pdp-sticky-cart" onClick={onAdd}>🛍 Add to Cart</button>
        <button className="pdp-sticky-buy"  onClick={onBuy}>⚡ Buy Now</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PRODUCT PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ProductPage({ product: rawProduct, allProducts, onClose, onAdd, onBuyNow }) {
  const product = enrichProduct(rawProduct);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize,  setSelectedSize]  = useState(null);
  const [qty,           setQty]           = useState(1);
  const [sizeError,     setSizeError]     = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const sizeRef = useRef(null);

  const { data: wishlist = [] } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const wishlisted = wishlist.includes(rawProduct.id);

  // Gallery updates with selected colour
  const gallery = (product.colorGalleries?.[selectedColor?.name]) || product.gallery || [product.image];

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Keyboard close
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  function validate() {
    // Only enforce size selection if the product actually has sizes
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setSizeError(false), 800);
      return false;
    }
    return true;
  }

  function handleAdd() {
    if (!validate()) return;
    onAdd({ ...rawProduct, selectedSize, selectedColor: selectedColor?.name, qty });
  }

  function handleBuy() {
    if (!validate()) return;
    onBuyNow({ ...rawProduct, selectedSize, selectedColor: selectedColor?.name, qty });
  }

  const disc = rawProduct.originalPrice
    ? Math.round(((rawProduct.originalPrice - rawProduct.price) / rawProduct.originalPrice) * 100)
    : null;

  return (
    <div className="pdp-shell">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="pdp-topbar">
        <button className="pdp-topbar-back" onClick={onClose} aria-label="Back">
          <Ico.Back />
        </button>
        <span className="pdp-topbar-title serif">Karni Paridhan</span>
        <div className="pdp-topbar-actions">
          <button
            className={`pdp-topbar-btn ${wishlisted ? "pdp-topbar-btn--active" : ""}`}
            onClick={() => toggleWishlist({ productId: rawProduct.id, isCurrentlyWishlisted: wishlisted })}
            aria-label="Wishlist"
          >
            <Ico.Heart filled={wishlisted} />
          </button>
          <button className="pdp-topbar-btn" aria-label="Share">
            <Ico.Share />
          </button>
        </div>
      </div>

      {/* ── Scrollable Body ──────────────────────────────────────────────── */}
      <div className="pdp-body">
        {/* Breadcrumb */}
        <Breadcrumb category={rawProduct.category} name={rawProduct.name} onBack={onClose} />

        {/* Two-col layout on desktop */}
        <div className="pdp-main-grid">

          {/* LEFT: Gallery */}
          <div className="pdp-left">
            <ProductGallery images={gallery} productName={rawProduct.name} />
          </div>

          {/* RIGHT: Info */}
          <div className="pdp-right">
            {/* Title block */}
            <div className="pdp-title-block">
              <p className="pdp-eyebrow">{rawProduct.category}</p>
              <h1 className="pdp-name serif">{rawProduct.name.split("(")[0].trim()}</h1>
              <p className="pdp-tagline">{product.tagline}</p>

              {/* Rating */}
              <div className="pdp-rating-row">
                <Stars rating={parseFloat(product.rating)} />
                <span className="pdp-rating-num">{product.rating}</span>
                <span className="pdp-rating-ct">({product.reviewCount} Reviews)</span>
              </div>

              {/* Price */}
              <div className="pdp-price-row">
                <span className="pdp-price">{formatPrice(rawProduct.price)}</span>
                {rawProduct.originalPrice && (
                  <span className="pdp-mrp">
                    MRP <s>{formatPrice(rawProduct.originalPrice)}</s>
                  </span>
                )}
                {disc && <span className="pdp-disc-badge">{disc}% OFF</span>}
              </div>
              <p className="pdp-tax-note">Inclusive of all taxes</p>

              {/* Stock + Delivery */}
              <div className="pdp-availability">
                <span className="pdp-in-stock">● In Stock</span>
                <span className="pdp-delivery">🚚 Delivery by <strong>{product.deliveryDate}</strong></span>
              </div>
            </div>


            {/* Size — hidden for Purse/bags */}
            {product.sizes && product.sizes.length > 0 && (
              <div ref={sizeRef}>
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                  availableSizes={selectedColor?.availableSizes}
                  sizeError={sizeError}
                  onGuideOpen={() => setShowSizeGuide(true)}
                />
              </div>
            )}

            {/* Qty */}
            <QuantitySelector qty={qty} setQty={setQty} />

            {/* CTA Buttons (desktop) */}
            <div className="pdp-cta-row">
              <button className="pdp-btn-cart" onClick={handleAdd}>🛍 Add to Cart</button>
              <button className="pdp-btn-buy"  onClick={handleBuy}>⚡ Buy Now</button>
            </div>

            {/* Trust Badges */}
            <TrustBadges />
          </div>
        </div>

        {/* ── Detail Sections ────────────────────────────────────────────── */}
        <div className="pdp-sections-wrap">
          <ProductHighlights items={product.highlights} />
          <FabricCare items={product.fabricCare} />
          <Description product={rawProduct} />
          <Specifications specs={product.specs} />
          <Reviews reviews={product.reviews} rating={product.rating} reviewCount={product.reviewCount} />
          <FAQ faqs={product.faqs} />
          <SimilarProducts products={allProducts} currentId={rawProduct.id} onOpen={onClose} />
        </div>
      </div>

      {/* ── Sticky Buy Bar (mobile only) ─────────────────────────────────── */}
      <StickyBuyBar price={rawProduct.price} originalPrice={rawProduct.originalPrice} onAdd={handleAdd} onBuy={handleBuy} />

      {/* ── Size Guide Modal ─────────────────────────────────────────────── */}
      {showSizeGuide && <SizeGuideModal guide={product.sizeGuide} onClose={() => setShowSizeGuide(false)} />}
    </div>
  );
}
