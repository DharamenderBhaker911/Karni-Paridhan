import { useState, useEffect } from "react";

// ─── 48-hour countdown using localStorage so it persists across page reloads ──
const COUNTDOWN_KEY  = "sale_countdown_end";
const DURATION_MS    = 48 * 60 * 60 * 1000; // 48 hours in ms

function getOrCreateEndTime() {
  const stored = localStorage.getItem(COUNTDOWN_KEY);
  const now    = Date.now();

  if (stored) {
    const end = parseInt(stored, 10);
    // If still in the future → use it; otherwise → reset for another 48 h
    if (end > now) return end;
  }

  const newEnd = now + DURATION_MS;
  localStorage.setItem(COUNTDOWN_KEY, String(newEnd));
  return newEnd;
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const end = getOrCreateEndTime();
    return Math.max(0, end - Date.now());
  });

  useEffect(() => {
    const tick = () => {
      const end  = getOrCreateEndTime();
      const left = Math.max(0, end - Date.now());

      // Timer reached zero → reset for another 48 h
      if (left === 0) {
        localStorage.removeItem(COUNTDOWN_KEY);
      }

      setTimeLeft(left);
    };

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const hours        = Math.floor(totalSeconds / 3600);
  const minutes      = Math.floor((totalSeconds % 3600) / 60);
  const seconds      = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return { hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}

// ─── Popup component ────────────────────────────────────────────────────────
function SalePopup({ onClose }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const { hours, minutes, seconds } = useCountdown();

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

        {/* Live 48-hour countdown */}
        <div className="sale-modal__timer">
          <div className="sale-modal__timer-unit">
            <span className="sale-modal__timer-num">{hours}</span>
            <span className="sale-modal__timer-label">HRS</span>
          </div>
          <span className="sale-modal__timer-sep">:</span>
          <div className="sale-modal__timer-unit">
            <span className="sale-modal__timer-num">{minutes}</span>
            <span className="sale-modal__timer-label">MIN</span>
          </div>
          <span className="sale-modal__timer-sep">:</span>
          <div className="sale-modal__timer-unit">
            <span className="sale-modal__timer-num">{seconds}</span>
            <span className="sale-modal__timer-label">SEC</span>
          </div>
        </div>

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
