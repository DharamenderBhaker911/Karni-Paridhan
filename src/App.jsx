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

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [directBuyProduct, setDirectBuyProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  // When a header category is clicked: set the filter AND scroll to products
  function handleCategorySelect(categoryName) {
    setActiveCategory(categoryName);
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <main>
      <Header onCategorySelect={handleCategorySelect} />
      <Hero />
      <ProductGrid
        products={products}
        onOpen={setSelectedProduct}
        onAdd={addToCart}
        onBuyNow={setDirectBuyProduct}
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
          onClose={() => setDirectBuyProduct(null)}
          onSuccess={() => {
            setDirectBuyProduct(null);
          }}
        />
      )}

      <CartDrawer />
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
