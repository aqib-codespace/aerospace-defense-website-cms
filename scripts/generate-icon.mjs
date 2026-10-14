/**
 * Renders the favicon and Apple touch icon from the same delta-in-square geometry as
 * <BrandMark>, so the browser tab matches the header logo exactly.
 *
 * Run with: npm run icon
 * Re-run after changing the brand colour below (or replace src/app/icon.png
 * with the shop's own artwork — Next.js picks it up automatically).
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const BRAND = "#0e8f9e";
const ACCENT = "#d98324";

/** `padded` insets the mark for iOS, which crops to a rounded square. */
function markSvg({ size, padded = false }) {
  const inset = padded ? 6 : 0;
  const scale = (48 - inset * 2) / 48;

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="sheen" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34" />
          <stop offset="45%" stop-color="#ffffff" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.34" />
        </linearGradient>
      </defs>
      ${padded ? `<rect width="48" height="48" rx="10" fill="#0a0f14" />` : ""}
      <g transform="translate(${inset} ${inset}) scale(${scale.toFixed(4)})">
        <rect x="2" y="2" width="44" height="44" fill="${BRAND}" />
        <rect x="2" y="2" width="44" height="44" fill="url(#sheen)" />
        <path d="M6 12V6h6M42 12V6h-6M6 36v6h6M42 36v6h-6" fill="none"
              stroke="#ffffff" stroke-opacity="0.5" stroke-width="1.6" />
        <path d="M24 11 36 33h-9.2L24 26.4 21.2 33H12Z" fill="#ffffff" />
        <path d="M13 37.5h22" stroke="${ACCENT}" stroke-width="2.4" stroke-linecap="square" />      </g>
    </svg>
  `);
}

await sharp(markSvg({ size: 512 }))
  .png()
  .toFile(path.join(root, "src", "app", "icon.png"));

await sharp(markSvg({ size: 512, padded: true }))
  .png()
  .toFile(path.join(root, "src", "app", "apple-icon.png"));

console.log("Wrote src/app/icon.png and src/app/apple-icon.png.");
