import { cn } from "@/libs/design-system/cn";

/**
 * Ruled spacer band from the Figma line grid (4:579 / 4:666 / 4:719, the FAQ
 * frames, and the pre-footer block). A short empty row that carries the center
 * rail (desktop only) and a bottom hairline, sitting inside the content box whose
 * border-x provides the outer rails. Pass `className` to override height/display.
 */
export function GridBand({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid h-14 grid-cols-1 border-b border-cream-muted lg:grid-cols-2",
        className,
      )}
    >
      <div className="border-cream-muted lg:border-r" />
      <div />
    </div>
  );
}
