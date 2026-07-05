"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import heymarkLogo from "@/public/heymark-logo-black.webp";
import pedro from "@/public/pedro.webp";
import vibizLogo from "@/public/vibizicon.svg";
import lautaro from "@/public/lautaro.jpg";

/**
 * Testimonial (Figma 27:378), rebuilt on the v3 dark system. A centered quote that
 * rotates: testimonials cross-fade (opacity only) every 7s, paused on hover. The block
 * height is reserved by an invisible stack of BOTH testimonials, so switching between a
 * short and a long quote never reflows the layout and the divider above stays put. Under
 * prefers-reduced-motion it doesn't auto-rotate and the quote reads full-paper.
 *
 * It's the closing block of the bordered panel chain: it inherits the lateral rails
 * (border-x) from the panel / error-reference above and adds the bottom rail (border-b)
 * that squares off the frame. Inside, two inset rails (Attio-style) flank the quote
 * column, each carrying a mid-height hairline, recreated on graphite.
 *
 * A decorative divider sits above the company logo: a smoke->void hairline that fades
 * into the background, with a soft mist bloom over its centre — no coral, so the single
 * accent stays reserved for the primary action.
 *
 * The quote reveals on scroll: words start in fog and turn paper as the section moves up
 * through the viewport (scroll-linked color per word). Name in paper (label, font-medium),
 * role in fog. Company logos are black marks (heymark on a white webp canvas, the vibiz
 * icon on transparent), so they're inverted to white and screen-blended — the mark reads
 * paper and its background dissolves into the void.
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

/**
 * Decorative divider above the logo. A smoke->void hairline (fades to the background at
 * both ends) lit by a point of light at its centre: a tight near-white hot core over a
 * wider soft halo, so it reads like real light on the line rather than a flat segment.
 * The glow breathes on a slow, low-amplitude loop (opacity + scale) so it feels alive
 * without drawing attention; static under prefers-reduced-motion.
 */
function Divider() {
  const reduce = useReducedMotion();
  const breathe = reduce
    ? undefined
    : {
        animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] },
        transition: {
          duration: 6,
          ease: "easeInOut" as const,
          repeat: Infinity,
        },
      };
  return (
    <div aria-hidden className="relative h-px w-full max-w-md">
      {/* base hairline: smoke fading into the void at both ends */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-smoke to-transparent" />
      {/* brighter mist core over the centre of the line */}
      <div className="absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-mist to-transparent" />
      {/* the light: a wide soft halo with a tight hot core, gently breathing */}
      <motion.div
        {...breathe}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div className="h-16 w-64 rounded-[50%] bg-[radial-gradient(closest-side,rgba(208,214,224,0.10),transparent)] blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-3 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.5),transparent)] blur-md" />
      </motion.div>
    </div>
  );
}

/**
 * Company logo painted for the dark canvas. Both marks are black, so `invert` flips them
 * to white and `mix-blend-screen` lets their background (heymark's white webp fill)
 * dissolve into the void — the mark reads paper, no rectangle.
 */
function CompanyLogo({ item }: { item: Item }) {
  return (
    <Image
      src={item.logo}
      alt={item.company}
      className="h-8 w-auto opacity-90 invert mix-blend-screen"
    />
  );
}

/** One word of the scroll-revealed quote: interpolates fog -> paper over its scroll slice. */
function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const color = useTransform(progress, range, ["var(--fog)", "var(--paper)"]);
  return <motion.span style={{ color }}>{children} </motion.span>;
}

/**
 * The quote, revealed word by word as the section scrolls up: each word owns a slice of
 * the scroll progress and shifts from fog to paper across it. Under reduced motion it
 * renders static in paper.
 */
function RevealQuote({
  quote,
  progress,
  reduce,
}: {
  quote: string;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const base = "w-full text-heading text-center";
  if (reduce) {
    return <p className={`${base} text-paper`}>{quote}</p>;
  }
  const words = quote.split(" ");
  const n = words.length;
  return (
    <p className={base}>
      {words.map((word, i) => (
        <Word key={i} progress={progress} range={[i / n, (i + 1) / n]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

/** Logo + quote + attribution, shared by the visible layer and the (invisible) reserver. */
function Frame({ item, quote }: { item: Item; quote: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <CompanyLogo item={item} />
      {quote}
      <div className="flex items-center gap-3">
        <div className="size-10 overflow-hidden rounded-full">
          <Image
            src={item.avatar}
            alt={item.name}
            className="size-full object-cover"
          />
        </div>
        <div className="text-left">
          <p className="text-label font-medium text-paper">{item.name}</p>
          <p className="text-label text-fog">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

/** Inset rail: a vertical column carrying a mid-height hairline (Attio grid). */
function Rail({ width }: { width: string }) {
  return (
    <div
      className={`hidden shrink-0 flex-col lg:flex ${width}`}
      aria-hidden
    >
      <div className="flex-1 border-b border-graphite" />
      <div className="flex-1" />
    </div>
  );
}

export function Testimonial() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  // Words fill from fog to paper as the section's top travels from near the bottom of
  // the viewport up to roughly a third of the way down.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  useEffect(() => {
    if (reduce || paused || TESTIMONIALS.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce, paused]);

  return (
    <div
      ref={ref}
      id="testimonial"
      className="scroll-mt-24 border-x border-b border-graphite"
    >
      <div className="flex">
        <Rail width="w-[62px]" />

        {/* Quote column: inset rails on both sides, generous vertical rhythm. */}
        <div className="relative flex flex-1 flex-col items-center px-6 py-16 lg:border-x lg:border-graphite lg:px-10 lg:py-24">
          <Divider />

          {/* Rotating quote. An invisible stack of BOTH testimonials reserves the height
              (max of the two) so the cross-fade never shifts layout; hovering pauses it. */}
          <div
            className="relative mt-12 w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Height reserver: both frames overlaid in one grid cell, invisible. */}
            <div aria-hidden className="grid">
              {TESTIMONIALS.map((item) => (
                <div key={item.company} className="invisible [grid-area:1/1]">
                  <Frame
                    item={item}
                    quote={<p className="w-full text-heading text-center">{item.quote}</p>}
                  />
                </div>
              ))}
            </div>

            {/* mode="wait": the current testimonial fades fully out, the block sits empty
                for a beat, then the next one fades in. */}
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <Frame
                  item={TESTIMONIALS[index]}
                  quote={
                    <RevealQuote
                      quote={TESTIMONIALS[index].quote}
                      progress={scrollYProgress}
                      reduce={reduce}
                    />
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Rail width="w-[64px]" />
      </div>
    </div>
  );
}
