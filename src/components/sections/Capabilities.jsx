import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

/**
 * Capability grid. Each card carries a monospace headline spec (tolerance,
 * envelope, or standard) because that single figure is what a buyer scans for
 * when deciding whether to bother sending a drawing.
 */
export default function Capabilities({ intro, items, rfqHref }) {
  return (
    <Section id="capabilities" containerSize="wide">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal variant="left" className="flex-1">
          <SectionHeading
            index={1}
            label={intro?.label}
            heading={intro?.heading}
            body={intro?.body}
            className="max-w-2xl"
          />
        </Reveal>
        <Reveal variant="right" className="shrink-0">
          <Button href={rfqHref} variant="outline">
            Send a drawing for quote
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          </Button>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <Reveal
            as="li"
            key={item.id}
            delay={Math.min(index, 6) * 45}
            className="bg-white"
          >
            {/*
             * A single-pixel grid rather than gapped cards: gapless cells read as
             * one machined plate, and the hover state lifts only the active cell.
             */}
            <div className="group relative h-full p-6 transition-colors duration-200 hover:bg-steel-50">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between gap-4">
                <span className="text-brand">
                  <Icon name={item.icon} className="h-7 w-7" />
                </span>
                {item.spec && (
                  <span className="tabular border border-steel-200 bg-white px-2 py-1 font-mono text-[0.7rem] text-steel-600">
                    {item.spec}
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-[1.02rem] font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-steel-600">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
