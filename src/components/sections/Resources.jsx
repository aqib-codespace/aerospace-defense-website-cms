import { Download, Mail } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/**
 * Resource library. Items with a URL download directly; items without one fall
 * back to an email request rather than rendering a dead link — a missing PDF
 * should still produce a lead.
 */
export default function Resources({ intro, items, email }) {
  return (
    <Section id="resources" containerSize="wide" divided>
      <Reveal>
        <SectionHeading
          index={11}
          label={intro?.label}
          heading={intro?.heading}
          body={intro?.body}
        />
      </Reveal>

      <ul className="mt-12 grid gap-px border border-steel-200 bg-steel-200 lg:grid-cols-2">
        {items.map((item, index) => {
          const href = item.url || `mailto:${email}?subject=${encodeURIComponent(`Request: ${item.title}`)}`;
          const isDownload = Boolean(item.url);

          return (
            <Reveal as="li" key={item.id} delay={Math.min(index, 6) * 40} className="bg-white">
              <a
                href={href}
                {...(isDownload ? { download: true } : {})}
                className="group flex h-full items-start gap-5 p-6 transition-colors duration-200 hover:bg-steel-50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-steel-200 bg-steel-50 text-brand transition-colors duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  {isDownload ? (
                    <Download className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  ) : (
                    <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-brand">
                      {item.type}
                    </span>
                    {item.meta && (
                      <span className="font-mono text-[0.66rem] text-steel-400">{item.meta}</span>
                    )}
                  </div>
                  <h3 className="mt-2 text-[0.98rem] font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-steel-600">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-block font-mono text-[0.72rem] text-steel-500 group-hover:text-brand">
                    {isDownload ? "Download →" : "Request by email →"}
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
