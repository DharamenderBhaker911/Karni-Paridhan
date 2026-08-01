/**
 * OfferBannerSection — Karni Paridhan
 * Full-width offer banner with live countdown timer (synced with SalePopup)
 */
import { useSaleCountdown } from "../hooks/useSaleCountdown";

export default function OfferBannerSection() {
  const { days, hours, minutes, seconds, isExpired } = useSaleCountdown();

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
            <span className="offer-timer-num">{days}</span>
            <span className="offer-timer-label">Days</span>
          </div>
          <span className="offer-timer-sep">:</span>
          <div className="offer-timer-block">
            <span className="offer-timer-num">{hours}</span>
            <span className="offer-timer-label">Hours</span>
          </div>
          <span className="offer-timer-sep">:</span>
          <div className="offer-timer-block">
            <span className="offer-timer-num">{minutes}</span>
            <span className="offer-timer-label">Mins</span>
          </div>
          <span className="offer-timer-sep">:</span>
          <div className="offer-timer-block">
            <span className="offer-timer-num">{seconds}</span>
            <span className="offer-timer-label">Secs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
