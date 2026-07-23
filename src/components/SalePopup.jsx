import { useState, useEffect } from "react";

function SalePopup({ onClose }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 350);
  }

  if (!visible) return null;

  return (
    <div
      className={`sale-toast ${closing ? "sale-toast--out" : "sale-toast--in"}`}
      role="complementary"
      aria-label="Sale Offer"
    >
      {/* Close */}
      <button
        type="button"
        className="sale-toast__close"
        onClick={handleClose}
        aria-label="Dismiss"
      >
        ✕
      </button>

      {/* Tag line */}
      <p className="sale-toast__eyebrow">🏷 Limited Time Offer</p>

      {/* Big % */}
      <div className="sale-toast__badge-row">
        <span className="sale-toast__pct">75<sup>%</sup></span>
        <span className="sale-toast__off">OFF</span>
      </div>

      <p className="sale-toast__headline serif">Royal Collection<br /><em>at Unbeatable Prices</em></p>

      {/* Price list */}
      {/* <ul className="sale-toast__list">
        <li><span>👑 Poshak</span><span>₹1,200 – ₹2,500</span></li>
        <li><span>🌸 Anarkali</span><span>₹700 – ₹2,000</span></li>
        <li><span>✨ Kurta Set</span><span>₹500 – ₹1,600</span></li>
      </ul> */}

      <button
        type="button"
        className="sale-toast__cta"
        onClick={handleClose}
      >
        Shop Now →
      </button>

      <p className="sale-toast__note">Free delivery · Easy returns</p>
    </div>
  );
}

export default SalePopup;
