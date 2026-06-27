"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/libs/design-system/cn";

import whatsappLogo from "@/public/whatsapp-logo.svg";

/**
 * Hero app-icon: white WhatsApp glyph on a radial brand gradient (light coral up
 * top, deep burgundy below) with the same subtle breathing glow as the Final CTA.
 * Animates opacity + transform only; honors prefers-reduced-motion. Colors
 * reference the system tokens.
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function WhatsappIconBrand({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex size-16 items-center justify-center overflow-hidden rounded-[20px]",
        className,
      )}
      style={{
        background:
          "radial-gradient(90% 70% at 50% -5%, var(--coral) 0%, var(--burgundy) 58%)",
      }}
    >
      {/* Subtle breathing coral glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(70% 65% at 50% 10%, var(--coral) 0%, transparent 72%)",
          transformOrigin: "50% 10%",
        }}
        animate={
          reduce ? undefined : { opacity: [0.4, 1, 0.4], scale: [0.95, 1.12, 0.95] }
        }
        transition={
          reduce ? undefined : { duration: 5, ease: EASE, repeat: Infinity }
        }
      />

      {/* White WhatsApp glyph */}
      <Image
        src={whatsappLogo}
        alt="WhatsApp"
        className="relative h-8 w-auto drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}
