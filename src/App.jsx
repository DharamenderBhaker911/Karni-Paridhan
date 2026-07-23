import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { products } from "./data/products";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
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

  // When a header category is clicked: set the filter AND scroll to products
  function handleCategorySelect(categoryName) {
    setActiveCategory(categoryName);
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  // "Buy Now" from card → open ProductDetails so user MUST pick size first
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

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
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

      {/* 75% OFF Sale Popup */}
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
