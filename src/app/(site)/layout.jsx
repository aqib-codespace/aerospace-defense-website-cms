import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteSettings, getContentBlock, getCollectionItems } from "@/db/queries/content";

/**
 * Public-site chrome: sticky header and footer. Applies to the homepage and the
 * legal pages, and to nothing under /admin.
 *
 * All queries are React-cache()-wrapped, so the page below reuses these results
 * rather than re-fetching them.
 */
export default async function SiteLayout({ children }) {
  const [settings, footer, capabilities, industries] = await Promise.all([
    getSiteSettings(),
    getContentBlock("footer"),
    getCollectionItems("capabilities"),
    getCollectionItems("industries"),
  ]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-[2px] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Header settings={settings} />

      {/* Offsets the fixed header (utility bar + nav row). */}
      <main id="main" className="pt-[4.5rem] lg:pt-[6.5rem]">
        {children}
      </main>

      <Footer
        settings={settings}
        footer={footer}
        capabilities={capabilities}
        industries={industries}
      />
    </>
  );
}
