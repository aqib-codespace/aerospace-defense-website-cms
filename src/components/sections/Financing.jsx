import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

/**
 * Business-growth financing module — the one section addressed to shop owners
 * rather than to buyers, which is why it takes the accent treatment instead of
 * the brand one.
 *
 * REMOVABLE: page.js renders this only when Settings → "Show the Business Growth
 * section" is on, and the nav/footer link disappears with it. No other section
 * references it, so suppliers who don't want it simply switch it off.
 */
export default function Financing({ financing }) {
  return (
    <Section id="financing" tone="graphite" containerSize="wide" className="overflow-hidden">
      <div aria-hidden="true" className="hazard absolute inset-x-0 top-0 h-1.5" />
      <div aria-hidden="true" className="blueprint absolute inset-0 opacity-40" />

      <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal variant="left">
            <SectionHeading
              index={13}
              label={financing?.label}
              heading={financing?.heading}
              body={financing?.body}
              tone="light"
              className="max-w-none"
            />
          </Reveal>

          {financing?.bullets?.length > 0 && (
            <Reveal variant="left" delay={70}>
              <ul className="mt-9 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {financing.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-accent/15 text-accent">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-[0.86rem] leading-relaxed text-steel-300">{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal variant="left" delay={120}>
            <Button
              href={financing?.ctaHref || "#rfq"}
              variant="accent"
              size="xl"
              className="mt-10"
            >
              {financing?.ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            </Button>
            <p className="mt-4 max-w-lg font-mono text-[0.68rem] leading-relaxed text-white/35">
              Financing availability, terms, and approval are determined by the lender and are
              subject to credit review. Not a commitment to lend.
            </p>
          </Reveal>
        </div>

        <Reveal variant="right" delay={60} className="lg:col-span-5">
          <div className="relative aspect-4/3 overflow-hidden border border-white/10">
            <Image
              src={financing.image.src}
              alt={financing.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
