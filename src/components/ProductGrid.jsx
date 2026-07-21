import { useMemo } from "react";
import ProductCard from "./ProductCard";

const ALL = "All";

function ProductGrid({ products, onOpen, onAdd, onBuyNow, activeCategory, setActiveCategory }) {
  // activeCategory and setActiveCategory are now controlled from App.jsx
  // so the Header category clicks directly drive this filter
  const activeFilter = activeCategory || ALL;

  // Randomize products order once on component mount
  const randomizedProducts = useMemo(() => {
    return [...products].sort(() => Math.random() - 0.5);
  }, [products]);

  // Derive unique categories from products
  const categories = useMemo(() => {
    const cats = randomizedProducts.map((p) => p.category);
    return [ALL, ...new Set(cats)];
  }, [randomizedProducts]);

  const filtered = useMemo(() => {
    if (activeFilter === ALL) return randomizedProducts;
    return randomizedProducts.filter((p) => p.category === activeFilter);
  }, [randomizedProducts, activeFilter]);

  function handleFilterClick(cat) {
    if (setActiveCategory) setActiveCategory(cat);
  }

  return (
    <section className="product-section" id="products">
      <div className="product-section-header">
        <div>
          <p className="eyebrow">Our Collection</p>
          <h2 className="serif">
            {activeFilter === ALL ? "Shop the Full Range" : activeFilter}
          </h2>
          <p>
            {filtered.length} piece{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="category-filters" role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
            onClick={() => handleFilterClick(cat)}
            aria-pressed={activeFilter === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpen={onOpen}
            onAdd={onAdd}
            onBuyNow={onBuyNow}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1.1rem" }}>No products in this category yet.</p>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
