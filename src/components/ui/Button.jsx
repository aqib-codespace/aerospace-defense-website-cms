import Link from "next/link";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  accent: "bg-accent text-ink hover:bg-accent-dark",
  ink: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-steel-300 bg-white text-ink hover:border-brand hover:text-brand",
  "outline-light": "border border-white/25 text-white hover:border-brand hover:bg-white/5",
  white: "bg-white text-ink hover:bg-steel-100",
  ghost: "text-brand hover:bg-brand-light",
};

const SIZES = {
  sm: "h-9 gap-2 px-3.5 text-[0.8rem]",
  md: "h-11 gap-2 px-5 text-sm",
  lg: "h-12 gap-2.5 px-6 text-sm",
  xl: "h-14 gap-3 px-7 text-[0.95rem]",
};

/**
 * Squared, high-contrast action control — no pill shapes anywhere on this site.
 * Renders a Next.js <Link> for internal paths, a plain <a> for tel:/mailto:/
 * external and downloadable URLs, and a <button> otherwise.
 */
export default function Button({
  href,
  download,
  variant = "primary",
  size = "lg",
  full = false,
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center rounded-[2px] font-semibold tracking-tight",
    "transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-55",
    VARIANTS[variant],
    SIZES[size],
    full && "w-full",
    className,
  );

  if (href) {
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external || download) {
      return (
        <a
          href={href}
          download={download}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes} {...props}>
      {children}
    </button>
  );
}
