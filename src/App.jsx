import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { products } from "./data/products";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/ProductPage";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import PaymentModal from "./components/PaymentModal";
import SalePopup from "./components/SalePopup";

function AppContent() {
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
      <Hero />
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
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
