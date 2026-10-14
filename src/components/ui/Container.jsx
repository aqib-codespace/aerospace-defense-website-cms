import { cn } from "@/lib/utils";

/**
 * The single horizontal rhythm for the site. Generous on large displays —
 * procurement staff read these pages on wide desktop monitors, and a narrow
 * centred column wastes the space that spec tables and equipment grids need.
 */
const SIZES = {
  narrow: "max-w-3xl",
  default: "max-w-[92rem]",
  wide: "max-w-[106rem]",
};

export default function Container({ as: Tag = "div", size = "default", className, children }) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16",
        SIZES[size] ?? SIZES.default,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
