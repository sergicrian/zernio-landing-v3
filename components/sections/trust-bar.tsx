import { Badge } from "@/components/ui/badge";

import warner from "@/public/WarnerMusicGrouplogo.svg";
import warner1 from "@/public/WarnerMusicGrouplogo-1.svg";
import vibiz from "@/public/vibizlogo.svg";
import remax from "@/public/REMAXlogo.svg";

/**
 * Trust bar (Figma 4:613, reworked). A single ruled row: the label lives in its
 * own block on the left, the four logos each get their own block to the right.
 * On mobile the label is a full-width block on top and the logos drop into a 2x2
 * grid below. Logos are drawn with a CSS mask so they take a token color:
 * silver-mist at rest, midnight-ink on cell hover. The vibiz cell keeps the
 * burgundy "Case study" badge.
 */
const LOGOS: { src: string; alt: string; badge?: boolean }[] = [
  { src: warner.src, alt: "Warner Music Group" },
  { src: warner1.src, alt: "Warner Music Group" },
  { src: vibiz.src, alt: "vibiz.ai", badge: true },
  { src: remax.src, alt: "RE/MAX" },
];

export function TrustBar() {
  return (
    <section className="border-y border-ash-border rule-y">
      <div className="grid grid-cols-2 sm:grid-cols-5">
        {/* Label: full-width block on mobile, first column on desktop. */}
        <div className="col-span-2 flex items-center justify-center border-b border-ash-border px-6 py-8 sm:col-span-1 sm:justify-start sm:border-b-0 sm:border-r sm:py-0">
          <p className="text-center text-sm font-semibold text-midnight-ink sm:text-left">
            Trusted by developers at
          </p>
        </div>

        {/* Logo blocks. Interior hairline rails only; the outer rails come from
            the page's 1080 content box and the section's border-y. */}
        {LOGOS.map((logo, i) => (
          <div
            key={i}
            className={[
              "group relative flex h-[104px] items-center justify-center border-ash-border",
              // Mobile 2-col grid: right rail on the left column (0, 2); bottom
              // rail under the first logo row (0, 1).
              i === 0 ? "border-b border-r sm:border-b-0" : "",
              i === 1 ? "border-b sm:border-b-0 sm:border-r" : "",
              i === 2 ? "border-r" : "",
              // Desktop 5-col row: last cell has no right rail (outer rail only).
              i === 3 ? "sm:border-r-0" : "",
            ].join(" ")}
          >
            {logo.badge ? (
              <Badge variant="secondary" className="absolute right-3 top-3">
                Case study
              </Badge>
            ) : null}
            <span
              role="img"
              aria-label={logo.alt}
              className="h-[38px] w-[86px] max-w-full bg-silver-mist transition-colors duration-base group-hover:bg-midnight-ink sm:h-[52px] sm:w-[120px]"
              style={{
                maskImage: `url(${logo.src})`,
                WebkitMaskImage: `url(${logo.src})`,
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "contain",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
