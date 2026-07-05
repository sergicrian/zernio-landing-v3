import { Navbar } from "@/components/sections/navbar";
import { Hero, HeroNav } from "@/components/sections/hero";
import { HeroBackground } from "@/components/sections/hero-background";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhyZernio } from "@/components/sections/why-zernio";
import { NoMetaApp } from "@/components/sections/no-meta-app";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { CodeExample } from "@/components/sections/code-example";
import { ErrorReference } from "@/components/sections/error-reference";
import { Testimonial } from "@/components/sections/testimonial";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { SupportButton } from "@/components/sections/support-button";

// Remaining sections are intentionally commented while we focus on the navbar, hero
// and trust bar in the v3 dark rebuild. They still live in components/sections/ and
// will be re-themed and re-mounted section by section.
// import { GridBand } from "@/components/sections/grid-band";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero is a fixed 780px block: the WhatsApp nav sits near the top and the
            content stack is centered in the remaining space. `relative` anchors the
            full-bleed background layer, which paints behind the content (-z-10). */}
        <div
          id="overview"
          className="relative isolate flex h-[780px] flex-col pt-8 lg:pt-10"
        >
          <HeroBackground />
          <HeroNav />
          <div className="flex flex-1 flex-col justify-center">
            <Hero />
          </div>
        </div>
        <TrustBar />

        {/* Why Zernio + No Meta App composed as one bordered panel on the void
            canvas. The frame sits inside the same 1080 box (px-4/lg:px-8) as the
            navbar/hero, so its edges line up with the logo and CTAs. `relative
            z-10` lifts it above the hero background layer, which bleeds down from
            the fold behind it (same fix as the trust bar). Bottom corners stay
            square (rounded-t only) so the panel reads as open-ended into the
            Error reference banner below. */}
        <section
          id="why-zernio"
          className="relative z-10 scroll-mt-24 px-page py-16 lg:px-page-desktop lg:py-24"
        >
          <div className="mx-auto w-full max-w-[1080px]">
            <div className="overflow-hidden rounded-t-3xl border border-graphite">
              <WhyZernio />
              <NoMetaApp />
              <HowItWorks />
              <Features />
              {/* Code example: last block of the panel — inherits the lateral
                  rails, no gap after Features. */}
              <CodeExample />
            </div>

            {/* Error reference + testimonial + FAQ: continue the framed chain below
                the panel, inside the same 1080 box so their rails line up. The FAQ is
                the closing block and rounds off the bottom of the frame. */}
            <ErrorReference />
            <Testimonial />
            <Faq />

            {/* Closing CTA: sits on the void just below the framed FAQ, sharing the
                same 1080 box so its content aligns with everything above. */}
            <FinalCta />
          </div>
        </section>

        {/* Footer sits on the void just below the final CTA. It runs full-bleed (its
            own px-page rails) so the glass render can screen-blend against the canvas,
            while its inner card is capped at the same 1080 box as everything above. */}
        <Footer />
      </main>

      {/* Fixed support button, pinned to the bottom-right corner across all
          breakpoints so it stays reachable while scrolling. */}
      <SupportButton />
    </>
  );
}
