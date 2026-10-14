import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { getSiteSettings } from "@/db/queries/content";
import { safeCssColor } from "@/lib/utils";
import "./globals.css";

/**
 * IBM Plex is the typographic choice for a reason: it was commissioned as a
 * corporate/technical family, its mono cut is metrically related to the sans,
 * and it holds up in dense spec tables where a geometric display face falls
 * apart. Mono carries every label, tolerance, and part number on the site.
 */
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(settings.siteUrl),
    title: {
      default: settings.metaTitle,
      template: `%s · ${settings.company}`,
    },
    description: settings.metaDescription,
    applicationName: settings.company,
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      siteName: settings.company,
      type: "website",
      url: settings.siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.metaTitle,
      description: settings.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export async function generateViewport() {
  const settings = await getSiteSettings();
  return { themeColor: safeCssColor(settings.brandColor, "#0e8f9e") };
}

/**
 * Document shell only — fonts, brand tokens, and metadata.
 *
 * The marketing header/footer live in src/app/(site)/layout.jsx instead, so
 * /admin renders as its own application rather than a page wrapped in the
 * supplier's navigation.
 */
export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable}`}
      /*
       * The two brand tokens are set here, at request time, from Settings.
       * Everything else in globals.css derives from them via color-mix(), so
       * this is the entire "rebrand the template" surface area.
       */
      style={{
        "--brand": safeCssColor(settings.brandColor, "#0e8f9e"),
        "--accent": safeCssColor(settings.accentColor, "#d98324"),
      }}
    >
      <body className="bg-white font-sans text-ink antialiased">
        <noscript>
          {/* Scroll-reveal needs JS; show everything when it's unavailable. */}
          <style>{`.reveal { opacity: 1; transform: none; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
