/**
 * Social glyphs are hand-rolled because the icon library dropped brand marks.
 * Anything without a known glyph renders as a letter badge, so an admin can add
 * any platform in Settings and it still looks deliberate.
 */
const GLYPHS = {
  linkedin: (
    <path
      d="M3 9.5h4.5V21H3V9.5Zm2.25-6a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM10 9.5h4.3v1.57h.06c.6-1.06 2.06-1.82 3.64-1.82 3.06 0 4 1.85 4 4.9V21h-4.5v-5.4c0-1.35-.5-2.3-1.75-2.3-1.2 0-1.9.8-1.9 2.3V21H10V9.5Z"
      fill="currentColor"
    />
  ),
  youtube: (
    <path
      d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"
      fill="currentColor"
    />
  ),
  x: (
    <path
      d="M17.53 3h3.2l-6.99 7.99L22 21h-6.2l-4.86-6.35L5.3 21H2.1l7.48-8.55L2 3h6.36l4.55 6.02L17.53 3Zm-1.12 16.1h1.77L7.68 4.8H5.78l10.63 14.3Z"
      fill="currentColor"
    />
  ),
};

const ALIASES = { twitter: "x", "x (twitter)": "x" };

export default function SocialIcon({ platform, className = "h-4 w-4" }) {
  const key = String(platform ?? "").trim().toLowerCase();
  const glyph = GLYPHS[ALIASES[key] ?? key];

  if (!glyph) {
    return (
      <span
        className={`${className} inline-flex items-center justify-center font-mono text-[0.7rem] font-medium leading-none`}
        aria-hidden="true"
      >
        {(platform?.[0] ?? "?").toUpperCase()}
      </span>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {glyph}
    </svg>
  );
}
