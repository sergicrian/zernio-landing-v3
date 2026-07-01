import { CodeExample } from "@/components/sections/code-example";
import { ErrorReference } from "@/components/sections/error-reference";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { GridBand } from "@/components/sections/grid-band";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Navbar } from "@/components/sections/navbar";
import { NoMetaApp } from "@/components/sections/no-meta-app";
import { Testimonial } from "@/components/sections/testimonial";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhyZernio } from "@/components/sections/why-zernio";

/**
 * The full Zernio landing (nav + all sections + footer). Rendered as-is by the
 * light route (app/page.tsx) and wrapped in `.theme-dark` by the dark route
 * (app/dark/page.tsx). Every section is theme-agnostic: it reads the palette from
 * CSS variables, so the same tree renders correctly in both themes.
 */
export function LandingPage() {
  return (
    <>
      <Navbar />
      {/* pt offsets the 72px fixed navbar */}
      <main className="px-page pt-[72px] lg:px-page-desktop">
        {/* Hero block as an open grid: the 1080 and 1280 vertical rails run the
            full height (from the navbar down), and the two top rules span the full
            1280 max-width. Rails and rules cross each other, so the corners stay
            open instead of closing into a boxed frame. */}
        <div className="relative mx-auto w-full max-w-content overflow-x-clip border-x border-ash-border">
          {/* 1080 vertical rails, full height */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[1080px] -translate-x-1/2 border-x border-ash-border"
          />
          {/* top rails-only margin, then two full-width rules 50px apart */}
          <div className="h-[50px]" />
          <div className="h-[50px] border-y border-ash-border" />
          {/* content at 1080 */}
          <div className="mx-auto w-full max-w-[1080px]">
            <Hero />
            <TrustBar />
            <div className="h-28" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-content overflow-x-clip border-x border-ash-border">
          {/* Rest of the sections at 1080 with solid vertical rails; horizontal
              rules are solid across 1080 and dashed into the gutters (rule-*) */}
          <div className="mx-auto w-full max-w-[1080px] border-x border-t border-ash-border rule-t">
            <WhyZernio />
            <GridBand />
            <NoMetaApp />
            <HowItWorks />
            <GridBand className="h-28" />
            <Features />
            <GridBand className="border-t rule-t" />
            <CodeExample />
            <ErrorReference />
            <Testimonial />
            <Faq />
            <FinalCta />
            <GridBand className="lg:h-[170px]" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
