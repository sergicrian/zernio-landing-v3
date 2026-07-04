import { Navbar } from "@/components/sections/navbar";
import { Hero, HeroNav } from "@/components/sections/hero";
import { HeroBackground } from "@/components/sections/hero-background";
import { TrustBar } from "@/components/sections/trust-bar";

// Remaining sections are intentionally commented while we focus on the navbar, hero
// and trust bar in the v3 dark rebuild. They still live in components/sections/ and
// will be re-themed and re-mounted section by section.
// import { WhyZernio } from "@/components/sections/why-zernio";
// import { GridBand } from "@/components/sections/grid-band";
// import { NoMetaApp } from "@/components/sections/no-meta-app";
// import { HowItWorks } from "@/components/sections/how-it-works";
// import { Features } from "@/components/sections/features";
// import { CodeExample } from "@/components/sections/code-example";
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
        <div className="relative isolate flex h-[780px] flex-col pt-8 lg:pt-10">
          <HeroBackground />
          <HeroNav />
          <div className="flex flex-1 flex-col justify-center">
            <Hero />
          </div>
        </div>
        <TrustBar />
      </main>

      {/* Rest of the landing, mounted later:
      <WhyZernio />
      <GridBand />
      <NoMetaApp />
      <HowItWorks />
      <Features />
      <CodeExample />
      <ErrorReference />
      <Testimonial />
      <Faq />
      <FinalCta />
      <Footer />
      */}
    </>
  );
}
