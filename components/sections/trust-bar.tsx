import { Badge } from "@/components/ui/badge";

import warner from "@/public/WarnerMusicGrouplogo.svg";
import warner1 from "@/public/WarnerMusicGrouplogo-1.svg";
import vibiz from "@/public/vibizlogo.svg";
import remax from "@/public/REMAXlogo.svg";

/**
 * Trust bar (Figma 4:613). Top hairline, label, then a bordered 4-cell logo grid
 * (two columns on mobile). Logos are drawn with a CSS mask so they take a token
 * color: charcoal-muted at rest, charcoal (the next darker token) on cell hover.
 * The vibiz cell keeps the burgundy "Case study" badge.
 */
const LOGOS: { src: string; alt: string; badge?: boolean }[] = [
  { src: warner.src, alt: "Warner Music Group" },
  { src: warner1.src, alt: "Warner Music Group" },
  { src: vibiz.src, alt: "vibiz.ai", badge: true },
  { src: remax.src, alt: "RE/MAX" },
];

export function TrustBar() {
  return (
    <section className="flex flex-col gap-10 border-t border-cream-muted pt-10">
      <p className="text-center text-sm font-bold text-charcoal">
        Trusted by developers at
      </p>

      <ul className="grid grid-cols-2 border-t border-cream-muted sm:grid-cols-4">
        {LOGOS.map((logo, i) => (
          <li
            key={i}
            className="group relative flex h-[104px] items-center justify-center border-b border-r border-cream-muted"
          >
            {logo.badge ? (
              <Badge variant="secondary" className="absolute right-3 top-3">
                Case study
              </Badge>
            ) : null}
            <span
              role="img"
              aria-label={logo.alt}
              className="h-[38px] w-[86px] max-w-full bg-charcoal-muted transition-colors duration-base group-hover:bg-charcoal sm:h-[77px] sm:w-[172px]"
              style={{
                maskImage: `url(${logo.src})`,
                WebkitMaskImage: `url(${logo.src})`,
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "contain",
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
