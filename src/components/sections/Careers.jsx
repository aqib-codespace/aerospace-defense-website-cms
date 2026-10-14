import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

/**
 * Recruitment section. Open roles are listed as a table rather than cards —
 * skilled trades applicants scan for title, shift, and location, and a table
 * gives them all three without hunting.
 */
export default function Careers({ careers, positions, rfqHref }) {
  return (
    <Section id="careers" tone="steel" containerSize="wide" divided>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal variant="left">
            <SectionHeading
              index={12}
              label={careers?.label}
              heading={careers?.heading}
              body={careers?.body}
              className="max-w-none"
            />

            {careers?.benefits?.length > 0 && (
              <ul className="mt-8 space-y-2.5">
                {careers.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-brand/12 text-brand">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-[0.88rem] leading-relaxed text-steel-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="relative mt-9 aspect-16/10 overflow-hidden border border-steel-200">
              <Image
                src={careers.image.src}
                alt={careers.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal variant="right">
            <div className="border border-steel-200 bg-white">
              <div className="flex items-center justify-between border-b border-steel-200 px-5 py-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-steel-400">
                  Open positions
                </p>
                <p className="tabular font-mono text-[0.72rem] text-steel-500">
                  {positions.length} listed
                </p>
              </div>

              <ul className="divide-y divide-steel-200">
                {positions.map((position) => (
                  <li key={position.id}>
                    <a
                      href={position.applyUrl || rfqHref}
                      {...(position.applyUrl?.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex flex-col gap-3 p-5 transition-colors hover:bg-steel-50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <h3 className="text-[0.98rem] font-semibold text-ink">{position.title}</h3>
                        <p className="mt-1 text-[0.84rem] leading-relaxed text-steel-600">
                          {position.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center gap-3 font-mono text-[0.7rem] text-steel-500 sm:flex-col sm:items-end sm:gap-1">
                        <span className="text-brand">{position.department}</span>
                        <span>{position.location}</span>
                        <span>{position.type}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {careers?.ctaLabel && (
                <div className="border-t border-steel-200 p-5">
                  <Button href={careers.ctaHref || rfqHref} variant="ink" size="md">
                    {careers.ctaLabel}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
