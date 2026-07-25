import { useState } from "react";
import { formatPrice } from "../utils/format";

function ProductCard({ product, onOpen, onAdd, onBuyNow }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article
      className="pc"
      onClick={() => onOpen(product)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onOpen(product)}
      aria-label={`View ${product.name}`}
    >
      {/* Image */}
      <div className="pc__img-wrap">
        {!imgLoaded && <div className="pc__skeleton" />}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`pc__img ${imgLoaded ? "pc__img--loaded" : ""}`}
        />

        {/* Wishlist */}
        <button
          type="button"
          className={`pc__wish ${wishlisted ? "pc__wish--active" : ""}`}
          onClick={e => { e.stopPropagation(); setWishlisted(v => !v); }}
          aria-label="Add to wishlist"
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>

        {/* Category label */}
        <span className="pc__cat-pill">{product.category}</span>

        {discountPct === 75 && (
           <span className="pc__sale-badge" style={{ position: 'absolute', top: '10px', left: '10px', background: '#d32f2f', color: 'white', padding: '4px 8px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px', zIndex: 2 }}>
             SALE
           </span>
        )}
      </div>

      {/* Info */}
      <div className="pc__info">
        <h3 className="pc__name">{product.name}</h3>

        {/* Star rating (static) */}
        <div className="pc__stars" aria-label="4.5 stars">
          {"★★★★☆"}
          <span className="pc__rating-count">(48)</span>
        </div>

        <div className="pc__price-row">
          <span className="pc__price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className="pc__orig">{formatPrice(product.originalPrice)}</span>
              {discountPct > 0 && <span className="pc__discount" style={{ color: '#d32f2f', fontWeight: 600, fontSize: '0.85rem', marginLeft: '6px' }}>({discountPct}% OFF)</span>}
            </>
          )}
        </div>

        <div className="pc__delivery" style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px', marginBottom: '8px' }}>
          Expected Delivery: <span style={{ fontWeight: 600, color: '#333' }}>{product.deliveryDate}</span>
        </div>

        {/* Sizes strip */}
        <div className="pc__sizes">
          {product.sizes?.slice(0, 5).map(s => (
            <span key={s} className="pc__size">{s}</span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="pc__actions" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className="pc__btn pc__btn--cart"
            onClick={() => onAdd(product)}
          >
            + Cart
          </button>
          <button
            type="button"
            className="pc__btn pc__btn--buy"
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
