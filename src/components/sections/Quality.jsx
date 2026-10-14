import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import SpecList from "@/components/ui/SpecList";
import Icon from "@/components/ui/Icon";

/**
 * Quality system: control points on the left, an audit datasheet on the right.
 *
 * The spec panel is the point of the section. A supplier quality engineer
 * evaluating a new source wants the standard revision, the FAI standard, the
 * PPM rate and the retention period — publishing them signals the system is real
 * and saves a round of emails.
 */
export default function Quality({ quality }) {
  return (
    <Section id="quality" tone="graphite" containerSize="wide" className="overflow-hidden">
      <div aria-hidden="true" className="blueprint absolute inset-0 opacity-50" />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal variant="left">
            <SectionHeading
              index={5}
              label={quality?.label}
              heading={quality?.heading}
              body={quality?.body}
              tone="light"
              className="max-w-none"
            />
          </Reveal>

          <ul className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2">
            {quality?.points?.map((point, index) => (
              <Reveal
                as="li"
                key={point.title}
                delay={Math.min(index, 6) * 40}
                className="bg-ink/50"
              >
                <div className="h-full p-5">
                  <span className="text-brand">
                    <Icon name={point.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-[0.92rem] font-semibold text-white">{point.title}</h3>
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-steel-400">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <Reveal variant="right">
            <Panel tone="graphite" marks className="p-6 backdrop-blur-sm sm:p-7">
              <p className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand">
                Quality data sheet
              </p>
              <SpecList items={quality?.specs ?? []} tone="light" />
              <p className="mt-6 border-t border-white/10 pt-4 font-mono text-[0.68rem] leading-relaxed text-white/40">
                Certificates, PPAP packages, and audit reports available on request.
              </p>
            </Panel>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
