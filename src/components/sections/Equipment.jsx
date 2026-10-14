import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/**
 * Machine list as a spec gallery. Photo, make and model, category, and working
 * envelope — the four things a buyer checks to confirm a part will physically fit
 * the equipment before they send a drawing.
 */
export default function Equipment({ intro, items }) {
  return (
    <Section id="equipment" containerSize="wide" divided>
      <Reveal>
        <SectionHeading
          index={6}
          label={intro?.label}
          heading={intro?.heading}
          body={intro?.body}
        />
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal as="li" key={item.id} variant="scale" delay={Math.min(index, 6) * 50}>
            <article className="group h-full border border-steel-200 bg-white transition-colors duration-200 hover:border-brand/45">
              <div className="relative aspect-4/3 overflow-hidden bg-steel-100">
                {item.image?.src ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || item.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="blueprint-light absolute inset-0" />
                )}
                {item.category && (
                  <span className="absolute left-0 top-0 bg-ink/85 px-2.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white">
                    {item.category}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-[0.98rem] font-semibold text-ink">{item.name}</h3>
                {item.note && (
                  <p className="mt-1.5 text-[0.83rem] leading-relaxed text-steel-600">{item.note}</p>
                )}
                {item.spec && (
                  <p className="tabular mt-4 border-t border-steel-200 pt-3 font-mono text-[0.78rem] text-brand">
                    {item.spec}
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
