import { useMemo, useState, useRef } from "react";
import ProductCard from "./ProductCard";

const ALL = "All";
const PAGE_SIZE = 8; // products per page

/** Fisher-Yates shuffle — returns a NEW shuffled array, does not mutate the original */
function shuffleArray(arr, seed) {
  const result = [...arr];
  // Simple seeded pseudo-random using the seed value
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function ProductGrid({ products, onOpen, onAdd, onBuyNow, activeCategory, setActiveCategory }) {
  const [page, setPage] = useState(1);

  // Generate a random seed once per page-load (component mount); it never changes
  // while the tab is open, but every fresh page load / refresh gives a new seed.
  const seedRef = useRef(Math.floor(Math.random() * 0xffffffff));

  const activeFilter = activeCategory || ALL;

  // Shuffle ALL products randomly on page load, then keep that order stable
  const sortedProducts = useMemo(() => {
    return shuffleArray(products, seedRef.current);
  }, [products]);

  const categories = useMemo(() => {
    const cats = sortedProducts.map(p => p.category);
    return [ALL, ...new Set(cats)];
  }, [sortedProducts]);

  const filtered = useMemo(() => {
    const base = activeFilter === ALL
      ? sortedProducts
      : sortedProducts.filter(p => p.category === activeFilter);
    return base;
  }, [sortedProducts, activeFilter]);

  // Reset to page 1 when filter changes
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilter(cat) {
    if (setActiveCategory) setActiveCategory(cat);
    setPage(1);
    // Scroll to section
    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function goToPage(p) {
    setPage(p);
    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  return (
    <section className="shop-section" id="products">
      {/* Section header */}
      <div className="shop-header">
        <div className="shop-header__left">
          <p className="shop-eyebrow">Our Collection</p>
          <h2 className="shop-title serif">
            {activeFilter === ALL ? "Shop All Products" : activeFilter}
          </h2>
          <p className="shop-count">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="shop-header__right">
          <span className="shop-sale-badge">🔥 75% OFF — Limited Time</span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="shop-filters" role="group" aria-label="Filter by category">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            className={`shop-filter-btn ${activeFilter === cat ? "shop-filter-btn--active" : ""}`}
            onClick={() => handleFilter(cat)}
            aria-pressed={activeFilter === cat}
          >
            {cat === ALL ? "🛍 All" : cat}
            <span className="shop-filter-count">
              {cat === ALL
                ? products.length
                : products.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {paginated.length > 0 ? (
        <div className="shop-grid">
          {paginated.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpen}
              onAdd={onAdd}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      ) : (
        <div className="shop-empty">
          <p className="shop-empty__icon">🔍</p>
          <p className="shop-empty__text">No products in this category yet.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="shop-pagination">
          <button
            className="shop-pg-btn"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ← Prev
          </button>

          <div className="shop-pg-nums">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                className={`shop-pg-num ${n === page ? "shop-pg-num--active" : ""}`}
                onClick={() => goToPage(n)}
                aria-label={`Page ${n}`}
                aria-current={n === page ? "page" : undefined}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            className="shop-pg-btn"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
