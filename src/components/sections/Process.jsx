import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/**
 * The staged path from drawing to delivery, rendered as a numbered rail.
 *
 * Each stage states its exit criteria rather than a marketing line, because the
 * point of publishing a process is to show a buyer where the control gates are.
 * Four across on desktop wraps to two rows for the eight standard stages.
 */
export default function Process({ process }) {
  const steps = process?.steps ?? [];

  return (
    <Section id="process" containerSize="wide" divided>
      <Reveal>
        <SectionHeading
          index={4}
          label={process?.label}
          heading={process?.heading}
          body={process?.body}
        />
      </Reveal>

      <ol className="mt-14 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={Math.min(index, 8) * 40}
            className="relative bg-white"
          >
            <div className="group h-full p-6 transition-colors duration-200 hover:bg-steel-50">
              <div className="flex items-center justify-between">
                <span className="tabular font-mono text-2xl font-medium text-steel-300 transition-colors duration-200 group-hover:text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Flow arrow, hidden on the last cell of each row by the border grid. */}
                <span aria-hidden="true" className="h-px w-8 bg-steel-200 transition-colors group-hover:bg-brand/40" />
              </div>
              <h3 className="mt-5 text-[0.98rem] font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-steel-600">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
