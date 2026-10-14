import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/**
 * Badge wall. The standard's short code leads in monospace at display size,
 * because that string ("AS9100D", "ITAR", "NIST SP 800-171") is literally what a
 * procurement team searches for and pastes into a supplier record.
 */
export default function Certifications({ intro, items }) {
  return (
    <Section id="certifications" tone="steel" containerSize="wide" divided>
      <Reveal>
        <SectionHeading
          index={7}
          label={intro?.label}
          heading={intro?.heading}
          body={intro?.body}
        />
      </Reveal>

      <ul className="mt-12 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal as="li" key={item.id} delay={Math.min(index, 8) * 35} className="bg-white">
            <div className="group relative h-full p-6">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100"
              />
              <div className="flex items-start justify-between gap-3">
                <p className="tabular font-mono text-[1.05rem] font-medium tracking-tight text-ink">
                  {item.code}
                </p>
                <span className="text-brand">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-3 text-[0.86rem] font-semibold text-steel-700">{item.name}</h3>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-steel-500">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
