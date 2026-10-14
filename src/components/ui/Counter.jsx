"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a statistic up when it scrolls into view.
 *
 * Values are authored as free text in the admin panel ("±0.0002\"", "40k+",
 * "AS9100D"), so the numeric part is extracted and animated while any
 * prefix/suffix is preserved verbatim. Thousands separators are treated as part
 * of the number, not a suffix. Anything without digits renders as-is.
 *
 * `display === null` means "not animating" and renders the authored text, which
 * is deliberately the initial state: the server-rendered HTML must contain the
 * real figure, not a zero, or crawlers and no-JS visitors would read a supplier
 * advertising 0 years of production history.
 */
export default function Counter({ value, className, duration = 1300 }) {
  const text = String(value ?? "");

  const match = text.match(/^(\D*)([\d,]*\d(?:\.\d+)?)(.*)$/s);
  const digits = match ? match[2].replace(/,/g, "") : null;
  const target = digits === null ? null : Number(digits);
  const decimals = digits?.includes(".") ? digits.split(".")[1].length : 0;
  const grouped = Boolean(match && match[2].includes(","));

  const ref = useRef(null);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    if (target === null) return;

    const node = ref.current;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Leave `display` null: the final value is already on screen.
    if (!node || reduced || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          // easeOutExpo — fast start, settles precisely on the target.
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(target * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  if (target === null || display === null) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    );
  }

  const rendered = grouped
    ? display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : display.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {match[1]}
      {rendered}
      {match[3]}
    </span>
  );
}
