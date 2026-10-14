import Container from "./Container";
import { cn } from "@/lib/utils";

const TONES = {
  white: "bg-white text-ink",
  steel: "bg-steel-50 text-ink",
  graphite: "surface-graphite text-white",
  brand: "bg-brand text-white",
};

const SIZES = {
  flush: "py-0",
  compact: "py-14 sm:py-16",
  default: "py-20 sm:py-24 lg:py-28",
};

/**
 * Every band on the page is a <Section>: it owns the vertical rhythm, the
 * background tone, and the anchor id the navigation links to. A hairline top
 * border on light sections keeps the page reading as stacked panels of a
 * document rather than floating blocks.
 */
export default function Section({
  id,
  tone = "white",
  size = "default",
  containerSize,
  divided = false,
  className,
  containerClassName,
  children,
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        TONES[tone],
        SIZES[size] ?? SIZES.default,
        divided && "border-t border-steel-200",
        className,
      )}
    >
      <Container size={containerSize} className={cn("relative", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
