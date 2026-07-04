"use client";

import { motion } from "motion/react";

import { HERO_STEP, useReveal } from "@/components/sections/hero-reveal";

import warner from "@/public/WarnerMusicGroup-logo.svg";
import clickup from "@/public/ClickUp-logo.svg";
import vibiz from "@/public/vibiz-logo.svg";
import remax from "@/public/REMAX-logo.svg";

/**
 * Trust bar. "Trusted by developers at" label followed by four customer logos.
 * Every logo ships on the same 148x66 canvas already balanced by design, so a single
 * cell size renders them consistently. Each is painted with a CSS mask so it takes a
 * token color (`ash`), monochrome on the dark canvas, and brightens to `mist` on hover.
 *
 * Responsive: on mobile/tablet the label sits on top and the logos form a 2x2 grid;
 * from `lg` up it collapses to a single row spread edge to edge.
 */
const LOGOS: { src: string; alt: string }[] = [
  { src: warner.src, alt: "Warner Music Group" },
  { src: clickup.src, alt: "ClickUp" },
  { src: vibiz.src, alt: "vibiz.ai" },
  { src: remax.src, alt: "RE/MAX" },
];

export function TrustBar() {
  return (
    // `relative z-10` lifts the bar above the hero background layer, which bleeds down
    // from the fold behind it: the fold is a positioned stacking context (painted after
    // this in-flow section), so without a positive z-index its content would paint over
    // the bar. This keeps the label + logos legible while the waves show through behind.
    <section className="relative z-10 px-page pt-10 pb-16 lg:px-page-desktop lg:pb-20">
      {/* px-4 / lg:px-8 mirrors the hero and navbar so the edges line up inside the
          same 1080 box. */}
      <div className="mx-auto w-full max-w-[1080px] px-4 lg:px-8">
        <motion.div
          {...useReveal(HERO_STEP.trust)}
          className="flex flex-col items-center gap-y-12 lg:flex-row lg:items-center lg:gap-x-10"
        >
          <p className="shrink-0 text-label text-ash">Trusted by developers at</p>

          {/* Columns step down with width: 2 (mobile) -> 3 (tablet) -> single row of 4
              (lg). `w-full` below lg overrides the parent's `items-center` shrink so the
              grid spans the full width and the fluid logos fill their cells. */}
          <div className="grid w-full grid-cols-2 place-items-center gap-x-12 gap-y-12 md:grid-cols-3 lg:w-auto lg:flex lg:flex-1 lg:items-center lg:justify-between lg:gap-0">
            {LOGOS.map((logo, i) => (
              <span
                key={logo.alt}
                role="img"
                aria-label={logo.alt}
                // Below lg the logos are fluid: each fills its grid cell width (all ship
                // on the same 148x66 canvas, so aspect-[148/66] + contain sizes them
                // consistently). From lg up they revert to the fixed size spread in a row.
                // In the 3-col tablet layout the 4th (last) logo would orphan into the
                // bottom-left cell, so it is placed in the middle column to read centred.
                className={
                  "block aspect-[148/66] w-full bg-ash transition-colors duration-base hover:bg-mist lg:aspect-auto lg:h-14 lg:w-32" +
                  (i === LOGOS.length - 1 ? " md:col-start-2 lg:col-auto" : "")
                }
                style={{
                  maskImage: `url(${logo.src})`,
                  WebkitMaskImage: `url(${logo.src})`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
