import { GridBand } from "@/components/sections/grid-band";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { NoMetaApp } from "@/components/sections/no-meta-app";
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
          <GridBand />
          <WhyZernio />
          <GridBand />
          <NoMetaApp />
        </div>
      </main>
    </>
  );
}
