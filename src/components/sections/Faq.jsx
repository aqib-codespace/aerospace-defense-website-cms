import { Plus, Phone } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { telHref } from "@/lib/utils";

/**
 * Accordion built on native <details>/<summary>: keyboard accessible, works with
 * JavaScript disabled, and leaves the answers in the HTML for search engines —
 * which also feed the FAQPage structured data emitted by the homepage.
 */
export default function Faq({ intro, faqs, settings }) {
  return (
    <Section id="faq" containerSize="wide" divided>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal variant="left" className="lg:sticky lg:top-28">
            <SectionHeading
              index={14}
              label={intro?.label}
              heading={intro?.heading}
              body={intro?.body}
              className="max-w-none"
            />
            <div className="mt-8 border border-steel-200 bg-steel-50 p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-steel-400">
                Direct line
              </p>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-steel-600">
                Engineering questions are answered by an engineer, not a sales desk.
              </p>
              <Button
                href={telHref(settings.phone)}
                variant="ink"
                size="md"
                className="mt-4"
                full
              >
                <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                {settings.phone}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal variant="right">
            <dl className="border border-steel-200 bg-white">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group border-b border-steel-200 last:border-b-0 open:bg-steel-50/60"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-5">
                    <dt className="text-[0.95rem] font-semibold text-ink">{faq.question}</dt>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-steel-300 text-steel-500 transition-all duration-200 group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white">
                      <Plus className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  </summary>
                  <dd className="px-5 pb-5 pr-14 text-[0.88rem] leading-relaxed text-steel-600">
                    {faq.answer}
                  </dd>
                </details>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
