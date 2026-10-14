import Link from "next/link";
import { cn } from "@/lib/utils";

const TONES = {
  white: "border-steel-200 bg-white",
  steel: "border-steel-200 bg-steel-50",
  graphite: "border-white/10 bg-white/[0.03]",
};

/**
 * The shared panel surface: 1px border, 2px radius, flat shadow. Every
 * card-shaped element on the site builds on this, so the whole page reads as
 * one set of drawing frames rather than assorted boxes.
 *
 * `marks` adds corner registration ticks (see .registration in globals.css) for
 * panels that should feel like a plate on a drawing.
 */
export default function Panel({
  as: Tag = "div",
  href,
  tone = "white",
  interactive = false,
  marks = false,
  className,
  children,
  ...props
}) {
  const classes = cn(
    "relative rounded-[2px] border shadow-panel transition-colors duration-200",
    TONES[tone],
    marks && "registration",
    interactive &&
      (tone === "graphite"
        ? "hover:border-brand/50 hover:bg-white/[0.055]"
        : "hover:border-brand/45 hover:shadow-raised"),
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
