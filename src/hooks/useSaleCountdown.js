/**
 * useSaleCountdown — shared countdown hook for SalePopup & OfferBannerSection
 *
 * Uses a single localStorage key so both components always show the same timer.
 * Duration: 72 hours (3 days) from first visit.
 */
import { useState, useEffect } from "react";

const COUNTDOWN_KEY = "sale_countdown_end";
const DURATION_MS   = 72 * 60 * 60 * 1000; // 72 hours = 3 days

function getOrCreateEndTime() {
  const stored = localStorage.getItem(COUNTDOWN_KEY);
  const now    = Date.now();

  if (stored) {
    const end = parseInt(stored, 10);
    if (end > now) return end;   // Still in the future → reuse
  }

  // First visit or expired → reset
  const newEnd = now + DURATION_MS;
  localStorage.setItem(COUNTDOWN_KEY, String(newEnd));
  return newEnd;
}

function computeTimeLeft(end) {
  const diff = Math.max(0, end - Date.now());
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    total:   diff,
  };
}

export function useSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState(() =>
    computeTimeLeft(getOrCreateEndTime())
  );

  useEffect(() => {
    const tick = () => {
      const end  = getOrCreateEndTime();
      const left = computeTimeLeft(end);
      if (left.total === 0) localStorage.removeItem(COUNTDOWN_KEY);
      setTimeLeft(left);
    };

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return {
    days:    pad(timeLeft.days),
    hours:   pad(timeLeft.hours),
    minutes: pad(timeLeft.minutes),
    seconds: pad(timeLeft.seconds),
    isExpired: timeLeft.total === 0,
  };
}
