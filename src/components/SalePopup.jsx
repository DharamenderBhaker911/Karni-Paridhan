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
      className={`sale-modal-overlay ${closing ? "sale-modal-overlay--out" : "sale-modal-overlay--in"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Sale Offer"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="sale-modal">
        {/* Close */}
        <button
          type="button"
          className="sale-modal__close"
          onClick={handleClose}
          aria-label="Dismiss"
        >
          ✕
        </button>

        {/* Tag line */}
        <p className="sale-modal__eyebrow text-red-700">🏷 Limited Time Offer</p>

        {/* Big % */}
        <div className="sale-modal__badge-row">
          <span className="sale-modal__pct">75<sup>%</sup></span>
          <span className="sale-modal__off">OFF</span>
        </div>

        <p className="sale-modal__days-left">⏰ 2 Days Left!</p>

        <p className="sale-modal__headline serif">Royal Collection<br /><em>at Unbeatable Prices</em></p>

        <button
          type="button"
          className="sale-modal__cta"
          onClick={handleClose}
        >
          Shop Now →
        </button>

        <p className="sale-modal__note">Free delivery · Easy returns</p>
      </div>
    </div>
  );
}

export default SalePopup;
