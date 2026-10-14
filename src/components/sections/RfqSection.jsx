import { MapPin, Navigation } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import SpecList from "@/components/ui/SpecList";
import RfqForm from "@/components/forms/RfqForm";

/**
 * The conversion section: RFQ form plus the contact directory.
 *
 * The directory is a spec table rather than prose because buyers route enquiries
 * by function — quoting, supplier quality, program management — and want the
 * right address without reading a paragraph.
 */
export default function RfqSection({ contact, settings }) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [settings.company, settings.addressLine1, settings.addressLine2].filter(Boolean).join(", "),
  )}`;

  return (
    <Section id="rfq" tone="steel" containerSize="wide" divided>
      <Reveal>
        <SectionHeading
          index={15}
          label={contact?.label}
          heading={contact?.heading}
          body={contact?.body}
        />
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="left" className="lg:col-span-8">
          <Panel marks className="p-6 sm:p-8">
            <RfqForm
              serviceOptions={contact?.serviceOptions ?? []}
              formNote={contact?.formNote}
              successMessage={contact?.successMessage}
              exportNotice={contact?.exportNotice}
            />
          </Panel>
        </Reveal>

        <Reveal variant="right" delay={80} className="lg:col-span-4">
          <div className="space-y-6">
            <Panel className="p-6">
              <p className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-steel-400">
                Contact directory
              </p>
              <SpecList items={contact?.contacts ?? []} />
            </Panel>

            <Panel className="overflow-hidden">
              <div className="relative aspect-4/3">
                {settings.mapEmbedUrl ? (
                  <iframe
                    src={settings.mapEmbedUrl}
                    title={`Map to ${settings.company}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blueprint-light group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-steel-50 text-center"
                  >
                    <span className="flex h-11 w-11 items-center justify-center border border-steel-300 bg-white text-brand">
                      <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="px-6">
                      <span className="block text-[0.88rem] font-semibold text-ink">
                        {settings.addressLine1}
                      </span>
                      <span className="mt-0.5 block text-[0.78rem] text-steel-500">
                        {settings.addressLine2}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-brand">
                        <Navigation className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                        Get directions
                      </span>
                    </span>
                  </a>
                )}
              </div>
            </Panel>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
