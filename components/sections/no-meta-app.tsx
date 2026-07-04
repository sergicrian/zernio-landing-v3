"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { PANEL_STEP, useReveal } from "@/components/sections/hero-reveal";

/** Empty two-cell band: solid top/bottom rules + a centered vertical divider,
 *  spanning the full panel width rail to rail. */
function GridBand() {
  return (
    <div aria-hidden className="grid h-14 grid-cols-2 border-y border-graphite">
      <div className="border-r border-graphite" />
      <div />
    </div>
  );
}

/**
 * No Meta app required (Figma node 185:1223). Bracketed by a full-width two-cell
 * band above and below, with a mono eyebrow, a two-column lead heading / detail
 * row, and the coral CTA between them. Columns stack on mobile (lead first).
 *
 * Rendered inside the shared bordered panel composed in app/page.tsx.
 */
export function NoMetaApp() {
  return (
    <div>
      <GridBand />

      {/* Content. Interior padding matches the navbar pill (px-4/lg:px-8). Reveals
          on load, just after the Why Zernio title. */}
      <motion.div
        {...useReveal(PANEL_STEP.noMeta)}
        className="flex flex-col gap-10 px-4 py-12 lg:px-8"
      >
        <div className="flex flex-col gap-5">
          <p className="font-mono text-tag tracking-wider text-fog">
            No Meta Developer App Required
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <h2 className="text-heading font-medium tracking-tight text-paper">
              Zernio handles WABA provisioning through Meta Embedded Signup.
            </h2>
            <p className="text-body text-fog">
              No need to create a Meta app, configure webhooks, or pass App
              Review. Connect in one click from our dashboard.
            </p>
          </div>
        </div>

        <div>
          <Button className="rounded-xl">Start for free</Button>
        </div>
      </motion.div>

      <GridBand />
    </div>
  );
}
