"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/libs/design-system/cn";

import whatsappLogo from "@/public/whatsapp-logo.svg";

/**
 * Hero app-icon: white WhatsApp glyph on a radial brand gradient (light coral up
 * top, deep burgundy below). A wide, slow coral glow drifts across like real
 * light, and the whole tile floats very subtly. Animates opacity + transform only;
 * honors prefers-reduced-motion. Colors reference the system tokens.
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function WhatsappIconBrand({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative flex size-[75px] items-center justify-center overflow-hidden rounded-[20px]",
        className,
      )}
      style={{
        background:
          "radial-gradient(90% 70% at 50% -5%, var(--coral) 0%, var(--burgundy) 58%)",
      }}
      animate={reduce ? undefined : { y: [0, -4, 0] }}
      transition={
        reduce ? undefined : { duration: 6, ease: EASE, repeat: Infinity }
      }
    >
      {/* Wide, slow coral glow drifting like light. Oversized (-inset-1/2) and
          fully transparent at its edges so transforms never reveal a hard edge. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-1/2 mix-blend-screen"
        style={{
          background:
            "radial-gradient(40% 38% at 50% 33%, var(--coral) 0%, transparent 68%)",
          transformOrigin: "50% 33%",
        }}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.55, 1, 0.55],
                scale: [0.9, 1.28, 0.9],
                y: ["-2%", "3%", "-2%"],
              }
        }
        transition={
          reduce ? undefined : { duration: 9, ease: EASE, repeat: Infinity }
        }
      />

      {/* White WhatsApp glyph */}
      <Image
        src={whatsappLogo}
        alt="WhatsApp"
        className="relative h-8 w-auto drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]"
      />
    </motion.div>
  );
}
