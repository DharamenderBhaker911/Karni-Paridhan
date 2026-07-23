import { useState } from "react";
import { formatPrice } from "../utils/format";

const DISCOUNT_LABELS = {
  "New": "badge-new",
  "Best Seller": "badge-bestseller",
};

function ProductCard({ product, onOpen, onAdd, onBuyNow }) {
  const [wishlisted, setWishlisted] = useState(false);

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const badgeClass = DISCOUNT_LABELS[product.badge] || "";

  return (
    <article className="product-card" onClick={() => onOpen(product)} style={{ cursor: "pointer" }}>
      {/* Image area */}
      <div className="product-media">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`product-badge ${badgeClass}`}>
            {product.badge}
          </span>
        )}

        {/* Discount % */}
        {discountPct && (
          <span className="discount-badge">-{discountPct}%</span>
        )}

        {/* Wishlist button */}
        {/* <button
          type="button"
          className={`wishlist-btn ${wishlisted ? "active" : ""}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.stopPropagation(); setWishlisted((v) => !v); }}
        >
          {wishlisted ? "❤️" : "🤍"}
        </button> */}

        {/* Subtle tap/click hint overlay */}
        <div className="product-tap-hint" aria-hidden="true">
          <span>👆 Tap to View</span>
        </div>
      </div>

      {/* Info */}
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-tone">{product.tone}</p>

        <div className="price-row">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="btn-ghost"
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
