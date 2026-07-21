import { useState, useRef, useEffect } from "react";
import { images } from "../data/products";
import { useCart } from "../context/CartContext";

const categories = [
  { label: "Anarkali", href: "#products", icon: "🌸" },
  { label: "Kurta-Set", href: "#products", icon: "✨" },
  { label: "Rajputi Posak", href: "#products", icon: "👑" },
];

function Header({ onCategorySelect }) {
  const { cartCount, setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="site-header">

        {/* Mobile-only: Hamburger on far LEFT */}
        <button
          className={`mobile-menu-btn ${mobileOpen ? "open" : ""}`}
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Brand — centered on mobile, left on desktop */}
        <a href="#top" className="brand-mark" aria-label="Karni Paridhan home">
          <img src={images.logo} alt="Karni Paridhan" />
          <span>Karni Paridhan</span>
        </a>

        {/* Desktop Nav — Middle */}
        <nav className="header-nav" aria-label="Primary navigation">
          <a href="#top" className="nav-link">Home</a>

          {/* Category Dropdown */}
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className={`nav-link nav-dropdown-trigger ${categoryOpen ? "active" : ""}`}
              onClick={() => setCategoryOpen((v) => !v)}
              aria-expanded={categoryOpen}
              aria-haspopup="true"
            >
              Category
              <svg
                className={`dropdown-chevron ${categoryOpen ? "rotated" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {categoryOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-arrow" />
                {categories.map((cat) => (
                  <a
                    key={cat.label}
                    href={cat.href}
                    className="dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      setCategoryOpen(false);
                      if (onCategorySelect) onCategorySelect(cat.label);
                    }}
                  >
                    <span className="dropdown-item-icon">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#products" className="nav-link">Shop</a>
          <a href="#contact" className="nav-link">Contact Us</a>
        </nav>

        {/* Actions — Right Side */}
        <div className="header-actions">
          {/* Cart */}
          <button
            type="button"
            className="cart-btn"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${cartCount} items`}
          >
            <span className="cart-icon">🛍</span>
            <span className="cart-text">Cart</span>
            <span className="cart-count" key={cartCount}>{cartCount}</span>
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className={`mobile-nav ${mobileOpen ? "open" : ""}`} aria-label="Mobile navigation">
        <a href="#top" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
          🏠 Home
        </a>

        {/* Mobile Category Accordion */}
        <div className="mobile-category">
          <button
            type="button"
            className="mobile-nav-link mobile-category-toggle"
            onClick={() => setMobileCategoryOpen((v) => !v)}
          >
            <span>🗂 Category</span>
            <svg
              className={`dropdown-chevron ${mobileCategoryOpen ? "rotated" : ""}`}
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {mobileCategoryOpen && (
            <div className="mobile-category-items">
              {categories.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  className="mobile-category-item"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setMobileCategoryOpen(false);
                    if (onCategorySelect) onCategorySelect(cat.label);
                  }}
                >
                  <span>{cat.icon}</span> {cat.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <a href="#products" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
          🛒 Shop
        </a>
        <a href="#contact" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
          📞 Contact Us
        </a>

        <button
          type="button"
          className="btn-primary"
          style={{ marginTop: "0.5rem", borderRadius: "999px" }}
          onClick={() => { setCartOpen(true); setMobileOpen(false); }}
        >
          🛍 View Cart ({cartCount})
        </button>
      </nav>
    </>
  );
}

export default Header;
