import { cn } from "@/lib/utils";

/**
 * Label/value pairs rendered as a spec table — the core information pattern of
 * this template. Values use monospace tabular figures so tolerances, part
 * counts and capacities line up vertically and can be scanned like a datasheet.
 */
export default function SpecList({ items = [], tone = "dark", className }) {
  if (items.length === 0) return null;
  const light = tone === "light";

  return (
    <dl className={cn("divide-y", light ? "divide-white/10" : "divide-steel-200", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline justify-between gap-6 py-2.5">
          <dt
            className={cn(
              "font-mono text-[0.7rem] uppercase tracking-[0.14em]",
              light ? "text-white/45" : "text-steel-500",
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              "tabular text-right font-mono text-[0.82rem] font-medium",
              light ? "text-white" : "text-ink",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
