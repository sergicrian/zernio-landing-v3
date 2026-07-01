"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";

import zernioIcon from "@/public/zernio-icon.svg";

/**
 * Final CTA (Figma 27:344). Brand-gradient card inset 40px from the section rails
 * (12px radius), section stays light so the grid rails show. Background is a
 * radial gradient: light coral concentrated up top, deep burgundy dominating the
 * lower half. A soft coral glow at the top breathes very subtly (opacity + scale
 * only). Honors prefers-reduced-motion. Colors reference the system tokens.
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-ash-border rule-b p-6 lg:p-10">
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          background:
            "radial-gradient(90% 70% at 50% -5%, var(--coral) 0%, var(--burgundy) 58%)",
        }}
      >
        {/* Wide, slow coral glow drifting like light. Oversized (-inset-1/2) and
            fully transparent at its edges so transforms never reveal a hard edge. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-1/2 mix-blend-screen"
          style={{
            background:
              "radial-gradient(40% 36% at 50% 33%, var(--coral) 0%, transparent 68%)",
            transformOrigin: "50% 33%",
          }}
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.5, 1, 0.5],
                  scale: [0.9, 1.3, 0.9],
                  y: ["-2%", "3%", "-2%"],
                }
          }
          transition={
            reduce
              ? undefined
              : { duration: 11, ease: EASE, repeat: Infinity }
          }
        />

        {/* Content */}
        <div className="relative flex flex-col items-center gap-10 px-6 py-16 text-center lg:px-10 lg:py-20">
          <div className="size-14 overflow-hidden rounded-2xl">
            <Image src={zernioIcon} alt="Zernio" className="size-full" />
          </div>

          <div className="flex max-w-xl flex-col gap-5">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Stop fighting Meta&apos;s developer portal
            </h2>
            <p className="text-lg text-white/90">
              37 WhatsApp endpoints. Zero Meta headaches. Join developers who
              shipped in days instead of months.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button>Start for free</Button>
            <Button variant="outline">View API Docs</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
