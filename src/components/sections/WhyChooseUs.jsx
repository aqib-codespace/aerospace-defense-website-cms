import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/**
 * Differentiators. Laid out as numbered rows rather than a card grid — each one
 * is a claim a buyer can audit, so it gets room to be specific rather than being
 * compressed into a tile.
 */
export default function WhyChooseUs({ whyUs }) {
  const features = whyUs?.features ?? [];

  return (
    <Section tone="steel" containerSize="wide" divided>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal variant="left" className="lg:sticky lg:top-28">
            <SectionHeading
              index={3}
              label={whyUs?.label}
              heading={whyUs?.heading}
              body={whyUs?.body}
              className="max-w-none"
            />
          </Reveal>
        </div>

        <ul className="lg:col-span-8">
          {features.map((feature, index) => (
            <Reveal
              as="li"
              key={feature.title}
              variant="right"
              delay={Math.min(index, 4) * 60}
              className="border-t border-steel-200 first:border-t-0"
            >
              <div className="group flex gap-6 py-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-steel-300 bg-white text-brand transition-colors duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <Icon name={feature.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.7rem] text-steel-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.05rem] font-semibold text-ink">{feature.title}</h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-steel-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
