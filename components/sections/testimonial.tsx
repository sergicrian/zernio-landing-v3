"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import heymarkLogo from "@/public/heymark-logo-black.webp";
import pedro from "@/public/pedro.png";
import vibizLogo from "@/public/vibizicon.svg";
import lautaro from "@/public/lautaro.jpg";

/**
 * Testimonial (Figma 27:378). Centered quote framed by the line grid, now a
 * rotator: testimonials cross-fade (opacity only), every 7s, paused on hover.
 * Height is reserved by an invisible copy so the cross-fade never shifts the grid.
 * Under prefers-reduced-motion it doesn't auto-rotate (shows the first one).
 *
 * Placeholder: the entries below duplicate Pedro's quote; replace 2-3 with the
 * real ones.
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const INTERVAL = 7000;

type Item = {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo: StaticImageData;
  avatar: StaticImageData;
};

const PEDRO: Item = {
  quote:
    "Zernio lets us focus on the fun parts of giving people good marketing tools. They handle the business intelligence layer behind the APIs, and we build a consumer product on top of it. Without Zernio, it would be a whole different kind of business.",
  name: "Pedro Cisternas",
  role: "Co-founder, HeyMark",
  company: "HeyMark",
  logo: heymarkLogo,
  avatar: pedro,
};

const LAUTARO: Item = {
  quote:
    "We tried to build it ourselves, but it was a really long project we didn't want to waste time on. With Zernio, users connect with their own OAuth, on their own accounts, and publishing happens on their behalf, which is exactly what we needed.",
  name: "Lautaro Suarez",
  role: "CTO & Co-founder, Vibiz",
  company: "Vibiz",
  logo: vibizLogo,
  avatar: lautaro,
};

const TESTIMONIALS: Item[] = [PEDRO, LAUTARO];

function Body({ item }: { item: Item }) {
  return (
    <>
      <Image src={item.logo} alt={item.company} className="h-7 w-auto" />
      <p className="max-w-2xl text-base leading-relaxed text-charcoal">
        {item.quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="size-9 overflow-hidden rounded-full">
          <Image
            src={item.avatar}
            alt={item.name}
            className="size-full object-cover"
          />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-charcoal">{item.name}</p>
          <p className="text-xs text-charcoal-muted">{item.role}</p>
        </div>
      </div>
    </>
  );
}

export function Testimonial() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || TESTIMONIALS.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce, paused]);

  return (
    <section className="flex border-b border-cream-muted">
      {/* Left rail */}
      <div className="hidden w-[62px] shrink-0 flex-col lg:flex">
        <div className="flex-1 border-b border-cream-muted" />
        <div className="flex-1" />
      </div>

      {/* Quote (rotating) */}
      <div
        className="relative flex-1 lg:border-x lg:border-cream-muted"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Invisible copy reserves the height so the cross-fade can't shift layout */}
        <div
          aria-hidden
          className="invisible flex flex-col items-center gap-5 px-6 py-12 text-center lg:px-10 lg:py-16"
        >
          <Body item={TESTIMONIALS[index]} />
        </div>

        {/* mode="wait": the current testimonial fades fully out (no blur), the
            section sits empty for a beat, then the next one fades in. */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 py-12 text-center lg:px-10 lg:py-16"
          >
            <Body item={TESTIMONIALS[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right rail */}
      <div className="hidden w-[64px] shrink-0 flex-col lg:flex">
        <div className="flex-1 border-b border-cream-muted" />
        <div className="flex-1" />
      </div>
    </section>
  );
}
