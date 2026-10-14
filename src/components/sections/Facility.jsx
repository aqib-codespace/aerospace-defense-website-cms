import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpecList from "@/components/ui/SpecList";
import Panel from "@/components/ui/Panel";

/**
 * Plant overview. The photo runs full-bleed to the section edge with the
 * facility datasheet overlapping it — one composition instead of a photo and a
 * table sitting politely side by side.
 */
export default function Facility({ facility }) {
  return (
    <Section id="facility" size="flush" divided className="overflow-hidden">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[22rem] lg:col-span-7 lg:min-h-[34rem]">
          <Image
            src={facility.image.src}
            alt={facility.image.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/25" />
        </div>

        <div className="relative flex items-center bg-white py-14 lg:col-span-5 lg:py-20 lg:pl-12">
          <Reveal variant="right" className="w-full lg:-ml-24">
            <Panel marks className="bg-white p-7 shadow-raised sm:p-9">
              <SectionHeading
                index={10}
                label={facility?.label}
                heading={facility?.heading}
                body={facility?.body}
                className="max-w-none"
              />
              <div className="mt-7 border-t border-steel-200 pt-5">
                <SpecList items={facility?.specs ?? []} />
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
