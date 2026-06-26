"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/libs/design-system/cn";

import whatsappLogo from "@/public/whatsapp-logo.svg";

/**
 * Hero app-icon, Zernio brand version: the original coral->burgundy gradient tile
 * with the WhatsApp glyph, now alive. The gradient drifts very subtly (transform
 * only), and it reuses the white inset bevel + top sheen from the premium icon for
 * depth. Honors prefers-reduced-motion (static gradient).
 *
 * The darker premium variant lives in whatsapp-icon.tsx (kept for reverting).
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // system easing

export function WhatsappIconBrand({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "relative size-16 overflow-hidden rounded-2xl border border-white/15 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.55),inset_0_-12px_24px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      {/* Animated Zernio brand gradient (oversized layer drifting subtly) */}
      <motion.div
        aria-hidden
        className="absolute inset-[-40%] bg-brand-gradient"
        animate={
          reduce
            ? undefined
            : { rotate: [-6, 6], x: ["-3%", "3%"], y: ["2%", "-2%"] }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 10,
                ease: EASE,
                repeat: Infinity,
                repeatType: "mirror",
              }
        }
      />

      {/* WhatsApp glyph in relief */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={whatsappLogo}
          alt="WhatsApp"
          className="h-8 w-auto drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]"
        />
      </div>

      {/* Static top sheen (glass reflection) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0.04) 60%, transparent)",
        }}
      />
    </div>
  );
}
