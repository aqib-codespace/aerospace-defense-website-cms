import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Capabilities from "@/components/sections/Capabilities";
import Industries from "@/components/sections/Industries";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Quality from "@/components/sections/Quality";
import Equipment from "@/components/sections/Equipment";
import Certifications from "@/components/sections/Certifications";
import CaseStudies from "@/components/sections/CaseStudies";
import Engineering from "@/components/sections/Engineering";
import Facility from "@/components/sections/Facility";
import Resources from "@/components/sections/Resources";
import Careers from "@/components/sections/Careers";
import Financing from "@/components/sections/Financing";
import Faq from "@/components/sections/Faq";
import RfqSection from "@/components/sections/RfqSection";
import { getSiteSettings, getContentBlock, getCollectionItems } from "@/db/queries/content";

/**
 * Section order is the qualification path a procurement engineer follows:
 * credentials → what you can make → who you make it for → how you control it →
 * proof → the document they need → the RFQ. Reordering the page is reordering
 * this list; removing a section is deleting one line.
 */
export default async function HomePage() {
  const [
    settings,
    hero,
    trustBar,
    capabilitiesIntro,
    industriesIntro,
    whyUs,
    process,
    quality,
    equipmentIntro,
    certificationsIntro,
    caseStudiesIntro,
    engineering,
    facility,
    resourcesIntro,
    careers,
    financing,
    faqIntro,
    contact,
    capabilities,
    industries,
    equipment,
    certifications,
    caseStudies,
    resources,
    positions,
    faqs,
  ] = await Promise.all([
    getSiteSettings(),
    getContentBlock("hero"),
    getContentBlock("trust_bar"),
    getContentBlock("capabilities_intro"),
    getContentBlock("industries_intro"),
    getContentBlock("why_us"),
    getContentBlock("process"),
    getContentBlock("quality"),
    getContentBlock("equipment_intro"),
    getContentBlock("certifications_intro"),
    getContentBlock("case_studies_intro"),
    getContentBlock("engineering"),
    getContentBlock("facility"),
    getContentBlock("resources_intro"),
    getContentBlock("careers"),
    getContentBlock("financing"),
    getContentBlock("faq_intro"),
    getContentBlock("contact"),
    getCollectionItems("capabilities"),
    getCollectionItems("industries"),
    getCollectionItems("equipment"),
    getCollectionItems("certifications"),
    getCollectionItems("case-studies"),
    getCollectionItems("resources"),
    getCollectionItems("positions"),
    getCollectionItems("faqs"),
  ]);

  const rfqHref = settings.scheduleUrl || "#rfq";

  /**
   * The capability statement is a Resources row rather than a setting, so the
   * hero's secondary CTA resolves it here. Falls back to the resources section
   * when no file has been uploaded yet.
   */
  const capabilityStatementUrl = resources.find(
    (item) => item.type === "Capability" && item.url,
  )?.url;

  /**
   * Structured data. `Manufacturer` is not a schema.org type — the correct
   * choice for a contract manufacturer is Organization with an additionalType,
   * which is what a search engine will actually parse.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${settings.siteUrl}#organization`,
        additionalType: "https://www.wikidata.org/wiki/Q187939",
        name: settings.company,
        description: settings.metaDescription,
        url: settings.siteUrl,
        telephone: settings.phone,
        email: settings.email,
        image: `${settings.siteUrl}${hero.image.src}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.addressLine1,
          description: settings.addressLine2,
        },
        naics: "332710",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Manufacturing capabilities",
          itemListElement: capabilities.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.description,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data must be raw JSON, not JSX text.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero hero={hero} settings={settings} capabilityStatementUrl={capabilityStatementUrl} />
      <TrustBar trustBar={trustBar} />
      <Capabilities intro={capabilitiesIntro} items={capabilities} rfqHref={rfqHref} />
      <Industries intro={industriesIntro} items={industries} />
      <WhyChooseUs whyUs={whyUs} />
      <Process process={process} />
      <Quality quality={quality} />
      <Equipment intro={equipmentIntro} items={equipment} />
      <Facility facility={facility} />
      <Certifications intro={certificationsIntro} items={certifications} />
      <CaseStudies intro={caseStudiesIntro} items={caseStudies} />
      <Engineering engineering={engineering} />
      <Resources intro={resourcesIntro} items={resources} email={settings.email} />
      <Careers careers={careers} positions={positions} rfqHref={rfqHref} />
      {/* Business Growth is optional per supplier — toggled in Settings. */}
      {settings.financingEnabled && financing && <Financing financing={financing} />}
      <Faq intro={faqIntro} faqs={faqs} settings={settings} />
      <RfqSection contact={contact} settings={settings} />
    </>
  );
}
