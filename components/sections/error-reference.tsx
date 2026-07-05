"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/components/sections/hero-reveal";

/**
 * Error Reference (Figma 27:186), rebuilt on the v3 dark system. A continuation block
 * of the bordered panel: it carries the panel's lateral rails (border-x) plus a bottom
 * rail (border-b) that separates it from whatever section comes next, with the same
 * lateral padding rhythm as the other blocks (px-4 / lg:px-8). The rails stay square
 * (no rounded-b) so the frame chains straight into the following section. Inside sits a
 * carbon banner card linking to the WhatsApp API error reference docs; text and link
 * stack on mobile and sit on one row on desktop.
 *
 * The section paints the shared `.bg-dot-matrix` blueprint texture BEHIND the card (not
 * on the card itself). A radial mask fades the outermost dots into the void so the
 * pattern melts into the surrounding sections instead of ending on a hard edge. Extra
 * vertical padding gives the dotted field room to breathe above and below the card.
 *
 * Token mapping (off the old light tokens): carbon surface on a graphite hairline
 * (matching the feature tiles and panel), title in paper (label-lg), body in fog
 * (body), and the primary (coral) button from the design system.
 */
export function ErrorReference() {
  const reveal = useScrollReveal(0);

  return (
    <div
      id="error-reference"
      className="relative scroll-mt-24 overflow-hidden border-x border-b border-graphite px-4 py-16 lg:px-8 lg:py-24"
    >
      {/* Dot-matrix backdrop, faded to the void at the edges so it integrates with the
          landing rather than stopping abruptly. */}
      <div
        aria-hidden
        className="bg-dot-matrix pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      <motion.div
        {...reveal}
        className="relative flex flex-col gap-5 rounded-2xl border border-graphite bg-carbon p-6 sm:flex-row sm:items-end sm:justify-between lg:p-10"
      >
        <div className="flex flex-col gap-3">
          <p className="text-label-lg font-medium text-paper">
            WhatsApp API error reference
          </p>
          <p className="max-w-2xl text-body text-fog">
            Comprehensive guide to WhatsApp API error codes. Find solutions and
            troubleshoot common integration issues.
          </p>
        </div>

        <Button
          size="sm"
          className="shrink-0 self-start sm:self-end"
        >
          View error reference
        </Button>
      </motion.div>
    </div>
  );
}
