"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/libs/design-system/cn";
import { CopyButton } from "@/components/sections/copy-button";
import { SectionHeading } from "@/components/sections/section-heading";
import { useScrollReveal } from "@/components/sections/hero-reveal";

/**
 * Code example (Figma 30:1067), rebuilt on the v3 dark system. The terminal is the
 * same object as the hero's (components/sections/code-typewriter.tsx): identical
 * gradient stroke + fill (smoke->void border, obsidian->void body), the same dot +
 * mono-label header, the same self-typing animation, and the same restrained mist/
 * paper/ash tokens (no coral in the code).
 *
 * The "Step 1 / 2 / 3" switch lives OUTSIDE the terminal as a liquid-glass toggle
 * (frosted carbon pill with a sliding obsidian segment). Switching a step retypes its
 * code in the shared terminal, whose height is pinned to the tallest step (Step 1) so
 * it never reflows. The section is the closing block of the bordered panel (lateral +
 * bottom rails), directly under Features.
 */
const STEP_1 = `// Step 1: Create a broadcast with a Meta-approved template
const broadcast = await fetch('https://zernio.com/api/v1/broadcasts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    profileId: 'prof_123',
    accountId: 'waba_123456',
    platform: 'whatsapp',
    name: 'Order Confirmations',
    template: {
      name: 'order_confirmation',
      language: 'en',
      components: [{
        type: 'body',
        parameters: [
          { type: 'text', text: 'John' },
          { type: 'text', text: 'ORD-12345' }
        ]
      }]
    }
  })
}).then(r => r.json());`;

const STEP_2 = `// Step 2: Add recipients by phone number
await fetch(\`https://zernio.com/api/v1/broadcasts/\${broadcast.broadcast.id}/recipients\`, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ phones: ['+1234567890'] })
});`;

const STEP_3 = `// Step 3: Send
await fetch(\`https://zernio.com/api/v1/broadcasts/\${broadcast.broadcast.id}/send\`, {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});`;

const STEPS = [
  { label: "Step 1", endpoint: "POST /v1/broadcasts", code: STEP_1 },
  { label: "Step 2", endpoint: "POST /v1/broadcasts/:id/recipients", code: STEP_2 },
  { label: "Step 3", endpoint: "POST /v1/broadcasts/:id/send", code: STEP_3 },
];

// The terminal is always reserved to the tallest step, so switching steps never resizes it.
const RESERVE = STEP_1;

// Typewriter rhythm. Duration scales with length (per-char) so short and long steps keep a
// consistent, natural pace, clamped so the longest step still writes/erases in a bounded
// time. Slow and unhurried on purpose — the code reads as it is being written.
const TYPE_PER_CHAR_MS = 60;
const ERASE_PER_CHAR_MS = 34;
const TYPE_MIN_MS = 3200;
const TYPE_MAX_MS = 12_000;
const ERASE_MIN_MS = 2000;
const ERASE_MAX_MS = 7000;
const HOLD_FULL_MS = 9_000; // dwell on the written code
const HOLD_EMPTY_MS = 900; // brief blank pause before retyping
const START_BEAT_MS = 500; // beat before the first keystroke

/**
 * On-terminal highlight, hero tokens only: comments in ash, quoted strings (single and
 * template literals) in paper; everything else inherits the mist base. A trailing
 * newline joins lines except the last, so the caret sits directly after the last typed
 * character.
 */
function highlight(code: string): ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    const nl = i === lines.length - 1 ? "" : "\n";
    if (line.trimStart().startsWith("//")) {
      return (
        <span key={i} className="text-ash">
          {line}
          {nl}
        </span>
      );
    }
    const parts = line.split(/('[^']*'|`[^`]*`)/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith("'") || part.startsWith("`") ? (
            <span key={j} className="text-paper">
              {part}
            </span>
          ) : (
            <span key={j}>{part}</span>
          ),
        )}
        {nl}
      </span>
    );
  });
}

/**
 * Self-typing code body. Drives a char count through type -> hold -> erase -> pause on
 * requestAnimationFrame (one render per frame, bounded regardless of length), then
 * loops. Two invisible layers underneath reserve the box: `RESERVE` fixes the height to
 * the tallest step and the current `code` fixes the width, so neither typing nor step
 * switches ever reflow the terminal. Under prefers-reduced-motion the code shows
 * complete. Re-typing kicks off whenever `code` changes (a new step is selected).
 */
function TypewriterCode({ code }: { code: string }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(code.length);
      return;
    }

    setCount(0);
    const len = code.length;
    const typeDur = Math.min(TYPE_MAX_MS, Math.max(TYPE_MIN_MS, len * TYPE_PER_CHAR_MS));
    const eraseDur = Math.min(ERASE_MAX_MS, Math.max(ERASE_MIN_MS, len * ERASE_PER_CHAR_MS));

    let raf = 0;
    let phase: "type" | "holdFull" | "erase" | "holdEmpty" = "type";
    let phaseStart: number | undefined;

    const frame = (now: number) => {
      if (phaseStart === undefined) phaseStart = now + START_BEAT_MS;
      const t = now - phaseStart;

      if (t >= 0) {
        if (phase === "type") {
          const p = Math.min(1, t / typeDur);
          setCount(Math.round(p * len));
          if (p >= 1) {
            phase = "holdFull";
            phaseStart = now;
          }
        } else if (phase === "holdFull") {
          if (t >= HOLD_FULL_MS) {
            phase = "erase";
            phaseStart = now;
          }
        } else if (phase === "erase") {
          const p = Math.min(1, t / eraseDur);
          setCount(Math.round((1 - p) * len));
          if (p >= 1) {
            phase = "holdEmpty";
            phaseStart = now;
          }
        } else if (t >= HOLD_EMPTY_MS) {
          phase = "type";
          phaseStart = now;
        }
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [code, reduce]);

  const shown = code.slice(0, count);

  return (
    <pre className="overflow-x-auto p-5 font-mono text-label-sm leading-6 text-mist">
      {/* Grid stack: every layer occupies cell 1/1, so the track sizes to the tallest
          (RESERVE = Step 1) and widest (current code) child while the visible typed
          text overlays them. Fixed box; no reflow while typing or switching steps. */}
      <div className="grid">
        <span aria-hidden className="invisible whitespace-pre [grid-area:1/1]">
          {RESERVE}
        </span>
        <span aria-hidden className="invisible whitespace-pre [grid-area:1/1]">
          {code}
        </span>
        <code className="whitespace-pre [grid-area:1/1]">
          {highlight(shown)}
          <span aria-hidden className="terminal-caret ml-px" />
        </code>
      </div>
    </pre>
  );
}

/** Liquid-glass segmented toggle: a frosted carbon track with a sliding obsidian pill
 *  (motion layoutId) marking the active step. */
function StepToggle({
  active,
  onChange,
}: {
  active: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-graphite bg-carbon/60 p-1 backdrop-blur-xl">
      {STEPS.map((step, i) => (
        <button
          key={step.label}
          type="button"
          onClick={() => onChange(i)}
          aria-pressed={active === i}
          className="relative rounded-full px-4 py-2 text-label font-medium transition-colors duration-base ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
        >
          {active === i && (
            <motion.span
              aria-hidden
              layoutId="code-step-pill"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-0 rounded-full border border-smoke/70 bg-gradient-to-b from-obsidian to-carbon shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.45)]"
            />
          )}
          <span
            className={cn(
              "relative z-10",
              active === i ? "text-paper" : "text-fog hover:text-mist",
            )}
          >
            {step.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export function CodeExample() {
  const [active, setActive] = useState(0);
  const headingReveal = useScrollReveal(0);
  const terminalReveal = useScrollReveal(0.5);
  const step = STEPS[active];

  return (
    <div id="code-example" className="scroll-mt-24 border-t border-graphite pt-12">
      <motion.div {...headingReveal}>
        <SectionHeading
          eyebrow="Code example"
          lead="Send a broadcast in one file."
          tail="Create, add recipients, send. Three calls."
          stacked
        />
      </motion.div>

      <motion.div
        {...terminalReveal}
        className="flex flex-col items-center px-4 pb-12 lg:px-8"
      >
        {/* Liquid-glass toggle, outside the terminal. */}
        <StepToggle active={active} onChange={setActive} />

        {/* Terminal + a very subtle bloom behind it. */}
        <div className="relative mt-8 w-full">
          {/* Soft radial glow blooming out around the top of the panel. It has to be
              taller/wider than the terminal and centred on its top edge — the opaque
              terminal fill occludes the middle, so the haze only reads where it spills
              past the edges (mostly upward, into the gap under the toggle). Cool mist
              tint, low opacity, heavily blurred → a natural light haze, not a shape. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -top-16 -z-10 h-64"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 30%, rgba(208,214,224,0.16) 0%, rgba(208,214,224,0) 70%)",
              filter: "blur(50px)",
            }}
          />

          {/* Terminal: same gradient stroke + fill as the hero (obsidian->void body,
              smoke->void border) so the two panels read as one object. */}
          <div
            className="flex w-full flex-col overflow-hidden rounded-2xl text-left"
            style={{
              background:
                "linear-gradient(var(--obsidian), var(--void)) padding-box, linear-gradient(var(--smoke), var(--void)) border-box",
              border: "1px solid transparent",
            }}
          >
            <div className="flex items-center gap-3 border-b border-graphite px-5 py-3">
              <span className="flex gap-2" aria-hidden>
                <span className="size-3 rounded-full bg-graphite" />
                <span className="size-3 rounded-full bg-graphite" />
                <span className="size-3 rounded-full bg-graphite" />
              </span>
              <span className="font-mono text-label-sm text-fog">
                {step.endpoint}
              </span>
              <CopyButton text={step.code} className="ml-auto" />
            </div>

            <TypewriterCode code={step.code} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
