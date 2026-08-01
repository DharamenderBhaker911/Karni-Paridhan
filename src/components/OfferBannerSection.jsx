/**
 * OfferBannerSection — Karni Paridhan
 * Premium animated offer slider with auto-play, countdown timer & shimmer effects
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { useSaleCountdown } from "../hooks/useSaleCountdown";

// React Icons
import { FiTag, FiStar, FiTruck, FiGift, FiAward, FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdDiamond } from "react-icons/md";
import { RiShoppingBag3Line, RiMedalLine } from "react-icons/ri";

// ─── Slide Data ──────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    eyebrowIcon: <FiTag size={13} />,
    eyebrow: "Grand Summer Sale",
    headline: "Flat 75% OFF",
    sub: "Royal Rajputi Poshaks & Anarkalis",
    badge: "75%",
    badgeLabel: "OFF",
    accent: "linear-gradient(135deg, #7b1c3a 0%, #4e0f22 50%, #2d0815 100%)",
    orbColor1: "rgba(196,154,60,0.25)",
    orbColor2: "rgba(232,192,186,0.18)",
    tagIcon: <RiMedalLine size={12} />,
    tag: "Most Popular",
    ctaIcon: <RiShoppingBag3Line size={15} />,
    cta: "Shop Royal Collection",
  },
  {
    id: 2,
    eyebrowIcon: <MdDiamond size={13} />,
    eyebrow: "Exclusive Deal",
    headline: "Buy 2 Get 1 FREE",
    sub: "On all Kurta Sets & Ethnic Wear",
    badge: "B2G1",
    badgeLabel: "FREE",
    accent: "linear-gradient(135deg, #1a3a2a 0%, #0f2d1e 50%, #071a10 100%)",
    orbColor1: "rgba(138,158,122,0.3)",
    orbColor2: "rgba(196,154,60,0.2)",
    tagIcon: <FiStar size={12} />,
    tag: "New Arrivals",
    ctaIcon: <RiShoppingBag3Line size={15} />,
    cta: "Explore Kurta Sets",
  },
  {
    id: 3,
    eyebrowIcon: <FiTruck size={13} />,
    eyebrow: "Free Delivery",
    headline: "Extra 10% OFF",
    sub: "On all orders above ₹999 — Today Only!",
    badge: "10%",
    badgeLabel: "EXTRA",
    accent: "linear-gradient(135deg, #1a1a4e 0%, #0f0f2d 50%, #07071a 100%)",
    orbColor1: "rgba(196,154,60,0.22)",
    orbColor2: "rgba(168,51,88,0.2)",
    tagIcon: <FiClock size={12} />,
    tag: "Today Only",
    ctaIcon: <FiGift size={15} />,
    cta: "Grab This Deal",
  },
];

const TICKER_ITEMS = [
  { icon: <FiTag size={12} />,          text: "Flat 75% OFF on Royal Collection" },
  { icon: <FiTruck size={12} />,        text: "Free Delivery on orders above ₹999" },
  { icon: <MdDiamond size={12} />,      text: "Buy 2 Get 1 FREE on Kurta Sets" },
  { icon: <FiStar size={12} />,         text: "New Arrivals — Limited Stock" },
  { icon: <FiAward size={12} />,        text: "Easy Returns · 100% Authentic" },
  { icon: <RiMedalLine size={12} />,    text: "10,000+ Happy Customers" },
];

export default function OfferBannerSection() {
  const { days, hours, minutes, seconds, isExpired } = useSaleCountdown();
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState("in");
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef(null);

  const goTo = useCallback(
    (next, dir = "left") => {
      if (transitioning) return;
      setTransitioning(true);
      setAnimDir(dir === "left" ? "out-left" : "out-right");

      setTimeout(() => {
        setCurrent(next);
        setAnimDir("in");
        setTimeout(() => setTransitioning(false), 700);
      }, 500);
    },
    [transitioning]
  );

  const next = useCallback(() => {
    const n = (current + 1) % SLIDES.length;
    goTo(n, "left");
  }, [current, goTo]);

  const prev = useCallback(() => {
    const n = (current - 1 + SLIDES.length) % SLIDES.length;
    goTo(n, "right");
  }, [current, goTo]);

  // Auto-play — 7 seconds (slower)
  useEffect(() => {
    intervalRef.current = setInterval(next, 7000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const pause = () => clearInterval(intervalRef.current);
  const resume = () => {
    intervalRef.current = setInterval(next, 7000);
  };

  if (isExpired) return null;

  const slide = SLIDES[current];
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      className="obs-root"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-label="Current Offers"
    >
      {/* ── Ticker Bar ──────────────────────────────────────────────────── */}
      <div className="obs-ticker" aria-hidden="true">
        <div className="obs-ticker__track">
          {doubled.map((item, i) => (
            <span key={i} className="obs-ticker__item">
              <span className="obs-ticker__icon">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Slide ──────────────────────────────────────────────────── */}
      <div
        className={`obs-slide obs-slide--${animDir}`}
        style={{ background: slide.accent }}
        key={slide.id}
      >
        {/* Decorative orbs */}
        <div className="obs-orb obs-orb-1" style={{ background: slide.orbColor1 }} />
        <div className="obs-orb obs-orb-2" style={{ background: slide.orbColor2 }} />

        {/* Shimmer sweep */}
        <div className="obs-shimmer" aria-hidden="true" />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`obs-particle obs-particle--${i + 1}`} />
        ))}

        <div className="obs-slide__inner">

          {/* ── Left — Text Content ─────────────────────────────────────── */}
          <div className="obs-content">
            <div className="obs-tag">
              <span className="obs-tag__icon">{slide.tagIcon}</span>
              {slide.tag}
            </div>

            <p className="obs-eyebrow">
              <span className="obs-eyebrow__icon">{slide.eyebrowIcon}</span>
              {slide.eyebrow}
            </p>

            <h2 className="obs-headline serif">{slide.headline}</h2>

            <p className="obs-sub">{slide.sub}</p>

            <button className="obs-cta">
              <span className="obs-cta__icon">{slide.ctaIcon}</span>
              {slide.cta}
            </button>
          </div>

          {/* ── Center — Big Badge ──────────────────────────────────────── */}
          <div className="obs-badge-wrap">
            <div className="obs-badge">
              <span className="obs-badge__pct">{slide.badge}</span>
              <span className="obs-badge__off">{slide.badgeLabel}</span>
              <div className="obs-badge__ring obs-badge__ring-1" />
              <div className="obs-badge__ring obs-badge__ring-2" />
            </div>
          </div>

          {/* ── Right — Countdown Timer ─────────────────────────────────── */}
          <div className="obs-timer-wrap">
            <p className="obs-timer-label">
              <FiClock size={12} style={{ marginRight: "5px", verticalAlign: "middle" }} />
              Sale Ends In
            </p>
            <div className="obs-timer">
              <div className="obs-timer-unit">
                <span className="obs-timer-num">{days}</span>
                <span className="obs-timer-sub">Days</span>
              </div>
              <span className="obs-timer-sep">:</span>
              <div className="obs-timer-unit">
                <span className="obs-timer-num">{hours}</span>
                <span className="obs-timer-sub">Hrs</span>
              </div>
              <span className="obs-timer-sep">:</span>
              <div className="obs-timer-unit">
                <span className="obs-timer-num">{minutes}</span>
                <span className="obs-timer-sub">Min</span>
              </div>
              <span className="obs-timer-sep">:</span>
              <div className="obs-timer-unit">
                <span className="obs-timer-num">{seconds}</span>
                <span className="obs-timer-sub">Sec</span>
              </div>
            </div>
            <p className="obs-timer-note">
              <FiTruck size={11} style={{ marginRight: "4px", verticalAlign: "middle" }} />
              Free delivery · Easy returns
            </p>
          </div>
        </div>

        {/* ── Prev / Next arrows ──────────────────────────────────────── */}
        <button className="obs-arrow obs-arrow--prev" onClick={prev} aria-label="Previous offer">
          <FiChevronLeft size={20} />
        </button>
        <button className="obs-arrow obs-arrow--next" onClick={next} aria-label="Next offer">
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* ── Dot Indicators ──────────────────────────────────────────────── */}
      <div className="obs-dots" role="tablist" aria-label="Offer slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            className={`obs-dot ${i === current ? "obs-dot--active" : ""}`}
            onClick={() => goTo(i, i > current ? "left" : "right")}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
