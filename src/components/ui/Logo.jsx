import Image from "next/image";
import Link from "next/link";
import BrandMark from "./BrandMark";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: { mark: "h-8 w-8", name: "text-[0.95rem]", meta: "text-[0.58rem]" },
  md: { mark: "h-10 w-10", name: "text-[1.1rem]", meta: "text-[0.6rem]" },
  lg: { mark: "h-12 w-12", name: "text-xl", meta: "text-[0.65rem]" },
};

/**
 * Company lockup: mark, name, and a monospace qualifier line (the tagline,
 * typically the certification summary). Uses the uploaded logo when Settings
 * has one, the generated mark otherwise, so a fresh install never renders a
 * broken image.
 */
export default function Logo({
  settings,
  tone = "dark",
  size = "md",
  href = "/",
  showMeta = true,
  className,
}) {
  const scale = SIZES[size] ?? SIZES.md;
  const light = tone === "light";

  const content = (
    <>
      {settings?.logoUrl ? (
        <Image
          src={settings.logoUrl}
          alt=""
          width={240}
          height={96}
          className={cn("w-auto max-w-[10rem] object-contain", scale.mark)}
          priority
        />
      ) : (
        <BrandMark className={scale.mark} />
      )}

      <span className="min-w-0">
        <span
          className={cn(
            "block truncate font-semibold leading-tight tracking-[-0.02em]",
            scale.name,
            light ? "text-white" : "text-ink",
          )}
        >
          {settings?.company}
        </span>
        {showMeta && settings?.tagline && (
          <span
            className={cn(
              "mt-0.5 block truncate font-mono uppercase tracking-[0.16em]",
              scale.meta,
              light ? "text-white/45" : "text-steel-500",
            )}
          >
            {settings.tagline}
          </span>
        )}
      </span>
    </>
  );

  const classes = cn("group flex items-center gap-3", className);

  if (!href) return <span className={classes}>{content}</span>;

  return (
    <Link href={href} className={classes} aria-label={`${settings?.company} — home`}>
      {content}
    </Link>
  );
}
