import Label from "./Label";
import { cn } from "@/lib/utils";

/**
 * Label + heading + supporting line. Left-aligned by default: technical
 * documents are read left-to-right down a column, and centred paragraphs slow
 * that down.
 */
export default function SectionHeading({
  index,
  label,
  heading,
  body,
  as: Tag = "h2",
  align = "left",
  tone = "dark",
  className,
  children,
}) {
  const light = tone === "light";
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {label && (
        <Label
          index={index}
          tone={light ? "light" : "brand"}
          className={cn("mb-5", centered && "justify-center")}
        >
          {label}
        </Label>
      )}

      {heading && (
        <Tag
          className={cn(
            "text-[1.9rem] font-semibold leading-[1.15] sm:text-4xl lg:text-[2.6rem]",
            light ? "text-white" : "text-ink",
          )}
        >
          {heading}
        </Tag>
      )}

      {body && (
        <p
          className={cn(
            "mt-5 text-pretty leading-relaxed",
            light ? "text-steel-300" : "text-steel-600",
          )}
        >
          {body}
        </p>
      )}

      {children}
    </div>
  );
}
