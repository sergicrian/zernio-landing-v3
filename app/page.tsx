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

export default function Home() {
  return (
    <>
      <Navbar />
      {/* pt offsets the 72px fixed navbar */}
      <main className="px-page pt-[72px] lg:px-page-desktop">
        {/* Content box: border-x draws the outer left/right rails of the grid */}
        <div className="mx-auto w-full max-w-content border-x border-cream-muted">
          <GridBand />
          <Hero />
          <TrustBar />
          <GridBand className="h-28" />
          <WhyZernio />
          <GridBand />
          <NoMetaApp />
          <HowItWorks />
          <GridBand className="h-28" />
          <Features />
          <GridBand className="border-t" />
          <CodeExample />
          <ErrorReference />
          <Testimonial />
          <Faq />
          <FinalCta />
          <GridBand className="lg:h-[170px]" />
        </div>
      </main>
      <Footer />
    </>
  );
}
