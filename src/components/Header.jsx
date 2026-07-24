import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../contexts/AuthContext";

const categories = [
  { label: "Anarkali", href: "#products", icon: "🌸" },
  { label: "Kurta-Set", href: "#products", icon: "✨" },
  { label: "Rajputi Posak", href: "#products", icon: "👑" },
  { label: "Suit", href: "#products", icon: "👘" },
  { label: "Purse", href: "#products", icon: "👜" },
];

function Header({ onCategorySelect }) {
  const { cartCount, setCartOpen } = useCart();
  const { isLoggedIn, isAdmin, signOut, profile } = useAuth();
  const navigate = useNavigate();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const accountRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function navigateHomeAndScroll(hash) {
    if (window.location.hash.startsWith("#/")) {
      // We are in HashRouter, so "/" is "#/"
      if (window.location.hash !== "#/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }
    }
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
          <span className="mobile-menu-bars">
            <span />
            <span />
            <span />
          </span>
          <span className="mobile-menu-label">{mobileOpen ? "Close" : "Menu"}</span>
        </button>

        {/* Brand — centered on mobile, left on desktop */}
        <Link to="/" className="brand-mark" aria-label="Karni Paridhan home">
          <img src={images.logo} alt="Karni Paridhan" />
          <span>Karni Paridhan</span>
        </Link>

        {/* Desktop Nav — Middle */}
        <nav className="header-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => navigateHomeAndScroll("top")} className="nav-link bg-transparent border-0 cursor-pointer">
            Home
          </button>

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
                  <button
                    key={cat.label}
                    type="button"
                    className="dropdown-item w-full text-left bg-transparent border-0 cursor-pointer"
                    onClick={() => {
                      setCategoryOpen(false);
                      navigateHomeAndScroll("products");
                      if (onCategorySelect) onCategorySelect(cat.label);
                    }}
                  >
                    <span className="dropdown-item-icon">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" onClick={() => navigateHomeAndScroll("products")} className="nav-link bg-transparent border-0 cursor-pointer">
            Shop
          </button>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Actions — Right Side */}
        <div className="header-actions flex items-center gap-2">
          {/* Account */}
          {isLoggedIn ? (
            <div className="nav-dropdown relative" ref={accountRef}>
              <button
                type="button"
                className={`nav-link nav-dropdown-trigger flex items-center gap-1 ${accountOpen ? "active" : ""}`}
                onClick={() => setAccountOpen((v) => !v)}
              >
                <span className="text-xl">👤</span>
                <span className="hidden md:inline max-w-[100px] truncate">{profile?.full_name || "Account"}</span>
              </button>
              {accountOpen && (
                <div className="dropdown-menu" style={{ right: 0, left: "auto", minWidth: "180px" }}>
                  <div className="dropdown-arrow" style={{ right: "1rem", left: "auto" }} />
                  <Link to="/my-orders" className="dropdown-item" onClick={() => setAccountOpen(false)}>
                    <span>📦</span> My Orders
                  </Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={() => setAccountOpen(false)}>
                    <span>❤️</span> My Wishlist
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="dropdown-item flex items-center gap-2 font-medium" onClick={() => setAccountOpen(false)}>
                      <span>⚙️</span> Admin Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    className="dropdown-item w-full text-left bg-transparent border-0 cursor-pointer flex items-center gap-2 text-red-600 hover:text-red-700"
                    onClick={() => {
                      setAccountOpen(false);
                      signOut();
                    }}
                  >
                    <span>👋</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link hidden md:flex items-center gap-1">
              <span>👤</span> Log In
            </Link>
          )}

          {/* Cart */}
          <button
            type="button"
            className="cart-btn ml-2"
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
        <Link to="/" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
          🏠 Home
        </Link>

        {/* Mobile Category Accordion */}
        <div className="mobile-category">
          <button
            type="button"
            className="mobile-nav-link mobile-category-toggle bg-transparent border-0 w-full text-left"
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
                <button
                  key={cat.label}
                  type="button"
                  className="mobile-category-item w-full text-left bg-transparent border-0 cursor-pointer"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileCategoryOpen(false);
                    navigateHomeAndScroll("products");
                    if (onCategorySelect) onCategorySelect(cat.label);
                  }}
                >
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="button" onClick={() => { setMobileOpen(false); navigateHomeAndScroll("products"); }} className="mobile-nav-link bg-transparent border-0 text-left w-full">
          🛒 Shop
        </button>
        <Link to="/about" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
          🏛 About Us
        </Link>
        <Link to="/contact" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
          📞 Contact Us
        </Link>

        {/* Mobile Auth */}
        {!isLoggedIn && (
          <Link to="/login" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
            👤 Log In / Sign Up
          </Link>
        )}
        
        {isLoggedIn && (
          <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
            📦 My Orders
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
            ❤️ My Wishlist
          </Link>
        )}
        {isLoggedIn && isAdmin && (
          <Link to="/admin" onClick={() => setMobileOpen(false)} className="mobile-nav-link text-red-700">
            ⚙️ Admin Dashboard
          </Link>
        )}

        <button
          type="button"
          className="btn-primary"
          style={{ marginTop: "1rem", borderRadius: "999px", width: "100%" }}
          onClick={() => { setCartOpen(true); setMobileOpen(false); }}
        >
          🛍 View Cart ({cartCount})
        </button>

        {isLoggedIn && (
          <button
            type="button"
            className="mobile-nav-link bg-transparent border-0 text-left w-full mt-4 text-red-600"
            onClick={() => {
              setMobileOpen(false);
              signOut();
            }}
          >
            👋 Sign Out
          </button>
        )}
      </nav>
    </>
  );
}

export default Header;
