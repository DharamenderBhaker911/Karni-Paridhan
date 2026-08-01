import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import { products as rawProducts } from "./data/products";
import { enrichProduct } from "./data/productEnricher";
const products = rawProducts.map(enrichProduct);

// import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
// import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/ProductPage";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import PaymentModal from "./components/PaymentModal";
import SalePopup from "./components/SalePopup";
import WhatsAppFloat from "./components/WhatsAppFloat";


import OfferBannerSection from "./components/OfferBannerSection";

// Auth pages removed

// New pages
import AboutPage from "./pages/AboutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";
import SizeGuidePage from "./pages/SizeGuidePage";
import ShippingReturnsPage from "./pages/ShippingReturnsPage";
import FaqsPage from "./pages/FaqsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import TrackOrderPage from "./pages/TrackOrderPage";


function StoreFront() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [directBuyProduct, setDirectBuyProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showSalePopup, setShowSalePopup] = useState(true);
  const { addToCart } = useCart();

  function handleCategorySelect(categoryName) {
    setActiveCategory(categoryName);
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleCardBuyNow(product) {
    setSelectedProduct(product);
  }

  return (
    <main>
      <Header onCategorySelect={handleCategorySelect} />

      {/* ── Hero ── */}
      {/* <Hero /> */}

      {/* ── Offer Banner (Sale Countdown) ── */}
      <OfferBannerSection />

      {/* ── Product Grid ── */}
      <ProductGrid
        products={products}
        onOpen={setSelectedProduct}
        onAdd={addToCart}
        onBuyNow={handleCardBuyNow}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <Footer />

      {/* ── Full-Screen Product Detail Page ── */}
      {selectedProduct && (
        <ProductPage
          product={selectedProduct}
          allProducts={products}
          onClose={() => setSelectedProduct(null)}
          onAdd={(productWithOptions) => {
            addToCart(productWithOptions);
            setSelectedProduct(null);
          }}
          onBuyNow={(prod) => {
            setDirectBuyProduct(prod);
            setSelectedProduct(null);
          }}
        />
      )}

      {directBuyProduct && (
        <PaymentModal
          subtotal={directBuyProduct.price * (directBuyProduct.qty || 1)}
          productName={directBuyProduct.name}
          selectedSize={directBuyProduct.selectedSize}
          items={[directBuyProduct]}
          onClose={() => setDirectBuyProduct(null)}
          onSuccess={() => {
            setDirectBuyProduct(null);
          }}
        />
      )}

      <CartDrawer />

      {showSalePopup && (
        <SalePopup onClose={() => setShowSalePopup(false)} />
      )}

      {/* Floating WhatsApp — visible during shopping, hidden when payment modal is open */}
      <WhatsAppFloat hidden={!!directBuyProduct} />
    </main>
  );
}

function App() {
  return (
    <HashRouter>
      <CartProvider>
        <Routes>
          {/* ── Storefront / Home ── */}
          <Route path="/" element={<StoreFront />} />

          {/* ── Info Pages ── */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />

          {/* ── User Account (Public now) ── */}
          <Route
            path="/my-orders"
            element={<MyOrdersPage />}
          />
          <Route
            path="/wishlist"
            element={<WishlistPage />}
          />

        </Routes>
      </CartProvider>
    </HashRouter>
  );
}

export default App;
