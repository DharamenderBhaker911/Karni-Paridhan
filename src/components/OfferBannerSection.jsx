/**
 * OfferBannerSection — Karni Paridhan
 * Full-width offer banner with live countdown timer
 */
import { useState, useEffect } from "react";

// Set your sale end date here
const SALE_END = new Date();
SALE_END.setDate(SALE_END.getDate() + 3); // 3 days from now
SALE_END.setHours(23, 59, 59, 0);

function useCountdown(endDate) {
  function getTimeLeft() {
    const diff = endDate - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, days: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function OfferBannerSection() {
  const { days, hours, minutes, seconds } = useCountdown(SALE_END);
  const isExpired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  if (isExpired) return null;

  return (
    <section className="offer-banner-section">
      <div className="offer-banner-orb offer-banner-orb-1" aria-hidden="true" />
      <div className="offer-banner-orb offer-banner-orb-2" aria-hidden="true" />

      <div className="offer-banner-inner">
        <div className="offer-banner-text">
          <span className="offer-eyebrow">⚡ Limited Time Offer</span>
          <h2 className="offer-banner-title serif">
            Flat 75% OFF — Royal Collection Sale
          </h2>
          <p className="offer-banner-sub">
            Exclusive discounts on Rajputi Poshaks, Anarkalis, and Kurta Sets. Don't miss it!
          </p>
        </div>

        <div className="offer-timer">
          <div className="offer-timer-block">
            <span className="offer-timer-num">{pad(days)}</span>
            <span className="offer-timer-label">Days</span>
          </div>
          <span className="offer-timer-sep">:</span>
          <div className="offer-timer-block">
            <span className="offer-timer-num">{pad(hours)}</span>
            <span className="offer-timer-label">Hours</span>
          </div>
          <span className="offer-timer-sep">:</span>
          <div className="offer-timer-block">
            <span className="offer-timer-num">{pad(minutes)}</span>
            <span className="offer-timer-label">Mins</span>
          </div>
          <span className="offer-timer-sep">:</span>
          <div className="offer-timer-block">
            <span className="offer-timer-num">{pad(seconds)}</span>
            <span className="offer-timer-label">Secs</span>
          </div>
        </div>

        <a href="#products" className="offer-banner-cta btn-gold">
          ✦ Shop Sale Now
        </a>
      </div>
    </section>
  );
}
