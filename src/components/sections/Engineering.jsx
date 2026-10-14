import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/** Engineering services offered alongside manufacturing. */
export default function Engineering({ engineering }) {
  return (
    <Section id="engineering" tone="steel" containerSize="wide" divided>
      <Reveal>
        <SectionHeading
          index={9}
          label={engineering?.label}
          heading={engineering?.heading}
          body={engineering?.body}
        />
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {engineering?.services?.map((service, index) => (
          <Reveal as="li" key={service.title} delay={Math.min(index, 6) * 45}>
            <div className="group flex h-full gap-4 border border-steel-200 bg-white p-5 transition-colors duration-200 hover:border-brand/45">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-steel-200 bg-steel-50 text-brand transition-colors duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <Icon name={service.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[0.95rem] font-semibold text-ink">{service.title}</h3>
                <p className="mt-1.5 text-[0.84rem] leading-relaxed text-steel-600">
                  {service.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
