import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import { products } from "./data/products";
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/ProductPage";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import PaymentModal from "./components/PaymentModal";
import SalePopup from "./components/SalePopup";

// New homepage sections
import UspSection from "./components/UspSection";
import CraftStorySection from "./components/CraftStorySection";
import TestimonialsSection from "./components/TestimonialsSection";
import GallerySection from "./components/GallerySection";
import OfferBannerSection from "./components/OfferBannerSection";

// Auth pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";

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

// Admin
import AdminPage from "./pages/AdminPage";

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
      <Hero />

      {/* ── Offer Banner (Sale Countdown) ── */}
      <OfferBannerSection />

      {/* ── USP Strip ── */}
      <UspSection />

      {/* ── Product Grid ── */}
      <ProductGrid
        products={products}
        onOpen={setSelectedProduct}
        onAdd={addToCart}
        onBuyNow={handleCardBuyNow}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* ── Craft / Brand Story ── */}
      <CraftStorySection />

      {/* ── Gallery ── */}
      <GallerySection />

      {/* ── Testimonials ── */}
      <TestimonialsSection />

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
    </main>
  );
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* ── Storefront / Home ── */}
            <Route path="/" element={<StoreFront />} />

            {/* ── Auth ── */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />

            {/* ── Info Pages ── */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/size-guide" element={<SizeGuidePage />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />

            {/* ── User Account (Protected) ── */}
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />

            {/* ── Admin (Protected) ── */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
