import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/**
 * Industries served, on the graphite ground so it breaks the page between two
 * light sections. Each entry names the qualification burden rather than just the
 * market, since that is what differentiates a supplier who can actually take
 * the work.
 */
export default function Industries({ intro, items }) {
  return (
    <Section id="industries" tone="graphite" containerSize="wide" className="overflow-hidden">
      <div aria-hidden="true" className="blueprint absolute inset-0 opacity-60" />

      <div className="relative">
        <Reveal>
          <SectionHeading
            index={2}
            label={intro?.label}
            heading={intro?.heading}
            body={intro?.body}
            tone="light"
          />
        </Reveal>

        <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              delay={Math.min(index, 8) * 40}
              className="bg-ink/60 backdrop-blur-sm"
            >
              <div className="group h-full p-6 transition-colors duration-200 hover:bg-white/[0.05]">
                <span className="text-brand">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-[0.98rem] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[0.83rem] leading-relaxed text-steel-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
