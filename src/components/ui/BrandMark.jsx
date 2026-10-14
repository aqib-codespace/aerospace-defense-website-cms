import { cn } from "@/lib/utils";

/**
 * The template's logo mark: a swept delta inside a square frame with corner
 * registration ticks and a datum line beneath it — flight over a measured
 * baseline. Squared rather than rounded, matching the rest of the design
 * language, and drawn from the live brand tokens so it re-colours the moment a
 * supplier changes its brand colour in Settings.
 *
 * Being a single SVG it stays sharp from a 16px favicon to a print header with
 * no image request. A supplier that has its own logo uploads it in Settings and
 * this steps aside.
 */
export default function BrandMark({ className, title }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : "true"}
      className={cn("h-10 w-10 shrink-0", className)}
    >
      {/*
       * Shading uses white/black overlays rather than colour stops, so the
       * gradient follows var(--brand) on every browser without relying on
       * color-mix() support inside SVG paint servers.
       */}
      <defs>
        <linearGradient id="bm-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.26" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="44" height="44" fill="var(--brand)" />
      <rect x="2" y="2" width="44" height="44" fill="url(#bm-sheen)" />

      {/* Corner registration ticks */}
      <path
        d="M6 12V6h6M42 12V6h-6M6 36v6h6M42 36v6h-6"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="1.6"
      />

      {/* Swept delta */}
      <path d="M24 11 36 33h-9.2L24 26.4 21.2 33H12Z" fill="#ffffff" />

      {/* Datum line */}
      <path d="M13 37.5h22" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="square" />
    </svg>
  );
}
