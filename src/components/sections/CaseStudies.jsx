import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/**
 * Case studies in challenge / solution / result order, which is how an engineer
 * reads a problem statement. The measured result is pulled out and given the
 * accent treatment, because an unquantified outcome is not evidence.
 */
export default function CaseStudies({ intro, items }) {
  return (
    <Section id="case-studies" containerSize="wide" divided>
      <Reveal>
        <SectionHeading
          index={8}
          label={intro?.label}
          heading={intro?.heading}
          body={intro?.body}
        />
      </Reveal>

      <div className="mt-12 space-y-6">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index, 4) * 60}>
            <article className="group grid border border-steel-200 bg-white transition-colors duration-200 hover:border-brand/40 lg:grid-cols-12">
              <div className="relative aspect-16/10 lg:col-span-4 lg:aspect-auto">
                {item.image?.src ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="blueprint-light absolute inset-0 bg-steel-50" />
                )}
                <span className="absolute left-0 top-0 bg-brand px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white">
                  {item.industry}
                </span>
              </div>

              <div className="p-6 lg:col-span-8 lg:p-8">
                <h3 className="text-[1.15rem] font-semibold leading-snug text-ink lg:text-[1.3rem]">
                  {item.title}
                </h3>

                <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-steel-400">
                      Challenge
                    </dt>
                    <dd className="mt-1.5 text-[0.86rem] leading-relaxed text-steel-600">
                      {item.challenge}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-steel-400">
                      Solution
                    </dt>
                    <dd className="mt-1.5 text-[0.86rem] leading-relaxed text-steel-600">
                      {item.solution}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 border-l-2 border-accent bg-steel-50 px-4 py-3">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-steel-400">
                    Result
                  </p>
                  <p className="mt-1 text-[0.9rem] font-medium leading-relaxed text-ink">
                    {item.result}
                  </p>
                </div>

                {item.process && (
                  <p className="mt-5 font-mono text-[0.72rem] text-steel-500">{item.process}</p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
