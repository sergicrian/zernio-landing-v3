"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { WhatsappTile } from "@/components/sections/hero";
import { useScrollReveal } from "@/components/sections/hero-reveal";

import soc2Badge from "@/public/soc2.webp";
import gdprBadge from "@/public/gdpr.webp";

/**
 * Final CTA (v3 dark). Closing conversion block: the animated WhatsApp app-icon,
 * the 64px display heading, a body line and the same coral / gradient action pair
 * as the navbar and hero.
 *
 * Sits on the void canvas (no gradient card, no rails) inside the same 1080 box as
 * the rest of the landing, so its content aligns with everything above it. Reuses
 * the hero's fade-up vocabulary via `useScrollReveal`, so the stack assembles
 * itself the moment the section scrolls into view (reduced-motion shows it at once).
 *
 * Reveal order is icon → heading → body → actions (local ordinals 0–3), staggered
 * by the shared timing system in hero-reveal.
 */
export function FinalCta() {
  return (
    <section id="final-cta" className="scroll-mt-24 py-24 lg:py-32">
      <div className="flex flex-col items-center text-center">
        {/* Animated WhatsApp app-icon — the same video tile as the hero. */}
        <motion.div {...useScrollReveal(0)}>
          <WhatsappTile />
        </motion.div>

        {/* h1/64 display token, matching the hero heading. */}
        <motion.h2
          {...useScrollReveal(1)}
          className="mt-8 max-w-4xl text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-paper sm:text-5xl lg:text-display"
        >
          Stop fighting Meta&apos;s
          <br className="hidden lg:block" /> developer portal
        </motion.h2>

        {/* body/16 token. */}
        <motion.p
          {...useScrollReveal(2)}
          className="mt-6 max-w-xl text-body text-fog"
        >
          37 WhatsApp endpoints. Zero Meta headaches. Join developers who shipped
          in days instead of months.
        </motion.p>

        {/* Same action pair as the navbar/hero: coral primary + gradient outline. */}
        <motion.div
          {...useScrollReveal(3)}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          <Button className="rounded-xl">Start for free</Button>
          <Button variant="secondary" className="rounded-xl">
            View API Docs
          </Button>
        </motion.div>

        {/* Compliance badges (SOC 2 + GDPR), side by side under the actions. */}
        <motion.div
          {...useScrollReveal(4)}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <Image src={soc2Badge} alt="AICPA SOC 2" className="size-16 w-auto" />
          <Image src={gdprBadge} alt="GDPR compliant" className="size-16 w-auto" />
        </motion.div>
      </div>
    </section>
  );
}
