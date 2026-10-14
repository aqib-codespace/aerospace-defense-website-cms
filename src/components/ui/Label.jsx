import { cn } from "@/lib/utils";

/**
 * Monospace section marker, e.g. "02 / CAPABILITIES".
 *
 * The numbering is not decoration: it gives procurement staff a spoken
 * reference ("the certifications block") and reinforces the controlled-document
 * feel that separates an industrial supplier site from a marketing page.
 */
export default function Label({ index, children, tone = "brand", className }) {
  if (!children) return null;

  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em]",
        tone === "brand" ? "text-brand" : "text-white/55",
        className,
      )}
    >
      {index != null && (
        <span className={tone === "brand" ? "text-steel-400" : "text-white/35"}>
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span aria-hidden="true" className={cn("h-3 w-px", tone === "brand" ? "bg-brand/40" : "bg-white/25")} />
      {children}
    </p>
  );
}
