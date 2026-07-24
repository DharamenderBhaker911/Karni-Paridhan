/**
 * WishlistPage — Karni Paridhan
 * Shows all wishlisted products for the logged-in user
 */
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useWishlist, useToggleWishlist } from "../hooks/useWishlist";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export default function WishlistPage() {
  const { data: wishlistIds = [], isLoading } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const { addToCart, setCartOpen } = useCart();

  // Get full product objects for wishlisted IDs
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  function handleAddToCart(product) {
    addToCart({ ...product, qty: 1 });
    setCartOpen(true);
  }

  function handleRemove(productId) {
    toggleWishlist(productId);
  }

  return (
    <>
      <Header />
      <CartDrawer />

      <div className="inner-page-hero">
        <div className="container-narrow">
          <span className="eyebrow">Your Account</span>
          <h1 className="inner-page-title serif">My Wishlist ❤️</h1>
          <p className="inner-page-sub">
            {wishlistedProducts.length > 0
              ? `${wishlistedProducts.length} item${wishlistedProducts.length !== 1 ? "s" : ""} saved`
              : "Your wishlist is empty"}
          </p>
        </div>
      </div>

      <section className="inner-page-body section-pad">
        <div className="container-narrow">
          {isLoading && (
            <div className="orders-loading">
              <div className="orders-spinner" />
              <p>Loading your wishlist…</p>
            </div>
          )}

          {!isLoading && wishlistedProducts.length === 0 && (
            <div className="orders-empty">
              <span>💔</span>
              <h3>Nothing saved yet</h3>
              <p>Tap the heart icon on any product to save it here for later.</p>
              <Link to="/" className="btn-primary" style={{ marginTop: "1.5rem" }}>
                Browse Collection
              </Link>
            </div>
          )}

          {!isLoading && wishlistedProducts.length > 0 && (
            <div className="wishlist-grid">
              {wishlistedProducts.map((product) => (
                <div className="wishlist-card" key={product.id}>
                  <div className="wishlist-img-wrap">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="wishlist-img"
                      loading="lazy"
                    />
                    <button
                      className="wishlist-remove-btn"
                      onClick={() => handleRemove(product.id)}
                      title="Remove from wishlist"
                    >
                      ❌
                    </button>
                  </div>
                  <div className="wishlist-card-body">
                    <span className="wishlist-category">{product.category}</span>
                    <h3 className="wishlist-name">{product.name}</h3>
                    <div className="wishlist-pricing">
                      <span className="wishlist-price">₹{product.price.toLocaleString("en-IN")}</span>
                      {product.originalPrice > product.price && (
                        <span className="wishlist-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                      )}
                    </div>
                    <button
                      className="btn-primary wishlist-add-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      🛍 Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
