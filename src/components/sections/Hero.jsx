import Image from "next/image";
import { ArrowRight, Download, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Counter from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

/**
 * Above-the-fold unit for a procurement audience.
 *
 * Deliberately not a centred consumer hero: the copy sits in a left column with
 * the photograph occupying the right half edge-to-edge, and the compliance
 * strip leads. A buyer qualifying a supplier looks for certifications and a CAGE
 * code before they read a value proposition, so those come first.
 *
 * Both calls to action are load-bearing — "Request RFQ" for buyers ready to
 * quote, "Capability Statement" for the ones who need a document to circulate
 * internally first.
 */
export default function Hero({ hero, settings, capabilityStatementUrl }) {
  return (
    <section
      id="top"
      className="surface-graphite relative overflow-hidden text-white"
    >
      <div aria-hidden="true" className="blueprint absolute inset-0 opacity-80" />

      {/* Photograph: right half on desktop, stacked block on mobile. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[46%] lg:block"
      >
        <Image
          src={hero.image.src}
          alt=""
          fill
          priority
          sizes="46vw"
          className="object-cover"
        />
        {/* Left-edge gradient blends the photo into the graphite ground. */}
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/45 to-ink/15" />
        <div className="absolute inset-0 bg-ink/25" />
        {/* Inspection scan sweep */}
        <div className="absolute inset-y-0 left-0 w-1/3 overflow-hidden">
          <div className="scan-line h-full w-16 bg-linear-to-r from-transparent via-brand/25 to-transparent" />
        </div>
      </div>

      <Container className="relative">
        <div className="py-14 lg:w-[54%] lg:py-24 xl:py-28">
          {hero.label && (
            <p
              className="rise-in mb-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-brand/35 bg-brand/10 px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand sm:text-[0.7rem]"
              style={{ animationDelay: "0s" }}
            >
              <Lock className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
              {hero.label}
            </p>
          )}

          <h1
            className="rise-in text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl xl:text-[3.6rem]"
            style={{ animationDelay: "0.08s" }}
          >
            {hero.headline}
          </h1>

          <p
            className="rise-in mt-6 max-w-xl text-[1.02rem] leading-relaxed text-steel-300"
            style={{ animationDelay: "0.16s" }}
          >
            {hero.subheadline}
          </p>

          <div
            className="rise-in mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.24s" }}
          >
            <Button href={settings.scheduleUrl || "#rfq"} size="xl">
              {hero.primaryCtaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            </Button>
            <Button
              href={capabilityStatementUrl || "#resources"}
              download={capabilityStatementUrl ? true : undefined}
              size="xl"
              variant="outline-light"
            >
              <Download className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </div>

        {/* Mobile photograph */}
        <div className="relative -mx-5 aspect-16/10 sm:-mx-8 lg:hidden">
          <Image src={hero.image.src} alt={hero.image.alt} fill sizes="100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/35" />
        </div>
      </Container>

      {/* Headline metrics */}
      {hero.stats?.length > 0 && (
        <div className="relative border-t border-white/10 bg-ink/40">
          <Container>
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {hero.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "py-6 lg:py-7",
                    index % 2 === 1 && "border-l border-white/10 pl-6",
                    index > 0 && "lg:border-l lg:border-white/10 lg:pl-8",
                    index >= 2 && "border-t border-white/10 lg:border-t-0",
                  )}
                >
                  <dd className="tabular font-mono text-2xl font-medium text-white sm:text-[1.75rem]">
                    <Counter value={stat.value} />
                  </dd>
                  <dt className="mt-1.5 text-[0.78rem] leading-snug text-steel-400">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      )}
    </section>
  );
}
