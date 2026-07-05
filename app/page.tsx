import { Navbar } from "@/components/sections/navbar";
import { Hero, HeroNav } from "@/components/sections/hero";
import { HeroBackground } from "@/components/sections/hero-background";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhyZernio } from "@/components/sections/why-zernio";
import { NoMetaApp } from "@/components/sections/no-meta-app";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { CodeExample } from "@/components/sections/code-example";

// Remaining sections are intentionally commented while we focus on the navbar, hero
// and trust bar in the v3 dark rebuild. They still live in components/sections/ and
// will be re-themed and re-mounted section by section.
// import { GridBand } from "@/components/sections/grid-band";
// import { ErrorReference } from "@/components/sections/error-reference";
// import { Testimonial } from "@/components/sections/testimonial";
// import { Faq } from "@/components/sections/faq";
// import { FinalCta } from "@/components/sections/final-cta";
// import { Footer } from "@/components/sections/footer";

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
            the fold behind it (same fix as the trust bar). The panel is fully
            closed (rounded-3xl, all four rails) — Code example is its last block. */}
        <section
          id="why-zernio"
          className="relative z-10 scroll-mt-24 px-page py-16 lg:px-page-desktop lg:py-24"
        >
          <div className="mx-auto w-full max-w-[1080px]">
            <div className="overflow-hidden rounded-3xl border border-graphite">
              <WhyZernio />
              <NoMetaApp />
              <HowItWorks />
              <Features />
              {/* Code example: closing block of the panel — inherits the lateral
                  rails and the bottom rail, no gap after Features. */}
              <CodeExample />
            </div>
          </div>
        </section>
      </main>

      {/* Rest of the landing, mounted later. When re-mounting, give each section the
          id the hero nav scrolls to (add `scroll-mt-24` so the sticky navbar doesn't
          overlap the heading) — otherwise that tab silently no-ops:
        faqs          -> <Faq />
      e.g. <section id="faqs" className="scroll-mt-24 …">…</section>

      <GridBand />
      <ErrorReference />
      <Testimonial />
      <Faq />
      <FinalCta />
      <Footer />
      */}
    </>
  );
}
