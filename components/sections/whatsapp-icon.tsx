"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/libs/design-system/cn";

import whatsappLogo from "@/public/whatsapp-logo.svg";

/**
 * Premium app-icon for the hero (Resend/Vercel style, no Three.js). Dark glossy
 * rounded-square surface with a beveled edge, a vivid green glow rising from
 * behind the glyph, marked specular highlights, a subtle diagonal glare that
 * sweeps across the surface, and a cursor-following reflection. Static (no float),
 * and the icon casts no glow onto the page. Honors prefers-reduced-motion (no
 * sweep; static reflection).
 *
 * ACCENT is a one-off WhatsApp green for this asset only, intentionally NOT added
 * to the Zernio token system.
 */
const ACCENT = "#00D656";
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // system easing

export function WhatsappIcon({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Specular offset from center, in px (transform translate only).
  const [spec, setSpec] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 28;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 28;
    setSpec({ x: dx, y: dy });
  };

  const onLeave = () => setSpec({ x: 0, y: 0 });

  return (
    <div className={cn("relative size-16", className)}>
      {/* App-icon body (static) */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative size-16 overflow-hidden rounded-2xl border border-white/15 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.55),inset_0_-12px_24px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.04)]"
        style={{
          background:
            "linear-gradient(180deg, #3a3a3a 0%, #161616 45%, #0b0b0b 100%)",
        }}
      >
        {/* Vivid green glow, concentrated low-center (the gradient core) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(58% 52% at 50% 64%, ${ACCENT} 0%, ${ACCENT}88 28%, ${ACCENT}22 52%, transparent 72%)`,
            opacity: 0.95,
          }}
        />

        {/* Warm green rim light along the bottom edge */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${ACCENT}aa, transparent 42%)`,
          }}
        />

        {/* WhatsApp glyph in relief */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={whatsappLogo}
            alt="WhatsApp"
            className="h-8 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Strong static top sheen (glass reflection) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.32), rgba(255,255,255,0.04) 60%, transparent)",
          }}
        />

        {/* Specular highlight following the cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute size-20 rounded-full blur-lg mix-blend-screen"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: -40,
            marginTop: -40,
            background: `radial-gradient(circle, rgba(255,255,255,0.55), ${ACCENT}3a 42%, transparent 70%)`,
          }}
          animate={{ x: spec.x, y: spec.y }}
          transition={{ duration: 0.3, ease: EASE }}
        />

        {/* Subtle diagonal glare sweeping across the surface */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-y-4 w-6 rotate-[35deg] mix-blend-screen"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
          }}
          animate={reduce ? { x: 110 } : { x: [-44, 110] }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 4,
                  ease: EASE,
                  repeat: Infinity,
                  repeatDelay: 2,
                }
          }
        />
      </div>
    </div>
  );
}
