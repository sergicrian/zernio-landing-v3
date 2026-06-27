import Image from "next/image";

import heymarkLogo from "@/public/heymark-logo-black.webp";
import pedro from "@/public/pedro.png";

/**
 * Testimonial (Figma 27:378). Centered quote framed by the line grid: narrow rail
 * columns on each side (with a mid-height tick) and inner borders on the quote
 * block. Rails show on desktop; mobile is just the centered quote.
 */
export function Testimonial() {
  return (
    <section className="flex border-b border-cream-muted">
      {/* Left rail */}
      <div className="hidden w-[62px] shrink-0 flex-col lg:flex">
        <div className="flex-1 border-b border-cream-muted" />
        <div className="flex-1" />
      </div>

      {/* Quote */}
      <div className="flex flex-1 flex-col items-center gap-5 px-6 py-12 text-center lg:border-x lg:border-cream-muted lg:px-10 lg:py-16">
        <Image src={heymarkLogo} alt="HeyMark" className="h-7 w-auto" />

        <p className="max-w-2xl text-base leading-relaxed text-charcoal">
          Zernio lets us focus on the fun parts of giving people good marketing
          tools. They handle the business intelligence layer behind the APIs, and
          we build a consumer product on top of it. Without Zernio, it would be a
          whole different kind of business.
        </p>

        <div className="flex items-center gap-3">
          <div className="size-9 overflow-hidden rounded-full">
            <Image
              src={pedro}
              alt="Pedro Cisternas"
              className="size-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-charcoal">Pedro Cisternas</p>
            <p className="text-xs text-charcoal-muted">Co-founder, HeyMark</p>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <div className="hidden w-[64px] shrink-0 flex-col lg:flex">
        <div className="flex-1 border-b border-cream-muted" />
        <div className="flex-1" />
      </div>
    </section>
  );
}
