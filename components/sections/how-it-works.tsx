"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCheck, Hash, Plus } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/libs/design-system/cn";

import usFlag from "@/public/usflag.png";
import spainFlag from "@/public/spainflag.png";

/**
 * How it works (Figma 30:1065). Each card runs a subtle looping micro-demo of the
 * real product action (Resend style). Loops only run while the card is in view and
 * the cursor is NOT over it; under prefers-reduced-motion they show a static state.
 * Number badge on top, title + copy below; 3 across on desktop, stacked on mobile.
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** Card 1: the recommended option selects itself on a slow loop. */
function NumberSelectorMock({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (reduce || !play) return;
    let t: ReturnType<typeof setTimeout>;
    // Asymmetric: long unselected hold, short selected hold.
    const cycle = (next: boolean) => {
      setSelected(next);
      t = setTimeout(() => cycle(!next), next ? 2000 : 4500);
    };
    t = setTimeout(() => cycle(true), 4500);
    return () => clearTimeout(t);
  }, [reduce, play]);

  const sel = reduce ? false : selected;

  return (
    <div className="mock-surface flex flex-col gap-2 rounded-xl border border-ash-border p-2 font-sans">
      {/* Color cross-fade via CSS transition on themed tokens (so it adapts to
          the dark theme); motion can't interpolate CSS vars. */}
      <div
        className={cn(
          "flex gap-3 rounded-lg border p-3 shadow-sm transition-colors duration-500 ease-brand",
          sel
            ? "border-coral bg-coral/10"
            : "border-ash-border bg-parchment-white",
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-ash-border text-midnight-ink">
          <Plus className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-midnight-ink">Get a number</span>
            <Badge variant="success">recommended</Badge>
          </div>
          <span className="text-xs text-driftwood">
            From $2/mo. Pick a country, we handle setup.
          </span>
        </div>
      </div>
      <div className="flex gap-3 rounded-lg p-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-ash-border text-driftwood">
          <Hash className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-midnight-ink">
            Use my own number
          </span>
          <span className="text-xs text-driftwood">
            Bring your existing phone number. Requires verification during setup.
          </span>
        </div>
      </div>
    </div>
  );
}

/** Cross-fades a "In review" badge to "Active" (and back) on `active`. */
function StatusBadge({ active }: { active: boolean }) {
  return (
    <div className="relative inline-flex">
      <motion.span
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Badge variant="warning">In review</Badge>
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Badge variant="success">Active</Badge>
      </motion.span>
    </div>
  );
}

/** Card 2: one number gets approved (In review -> Active) once per loop. */
function NumberTableMock({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (reduce || !play) return;
    const id = setInterval(() => setApproved((a) => !a), 3200);
    return () => clearInterval(id);
  }, [reduce, play]);

  const apr = reduce ? false : approved;

  return (
    <div className="mock-surface overflow-hidden rounded-xl border border-ash-border font-sans">
      <p className="border-b border-ash-border px-3 py-2 text-xs font-semibold text-driftwood">
        Number
      </p>
      <div className="flex items-center gap-2 border-b border-ash-border px-3 py-3">
        <Image src={usFlag} alt="US" className="size-4 rounded-sm" />
        <span className="flex-1 text-sm text-midnight-ink">+1 2002 908 7457</span>
        <Badge variant="success">Active</Badge>
      </div>
      {/* This row gets approved on the loop */}
      <div className="flex items-center gap-2 border-b border-ash-border px-3 py-3">
        <Image src={spainFlag} alt="ES" className="size-4 rounded-sm" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-midnight-ink">New ES number</p>
          <p className="text-xs text-driftwood">Awaiting approval</p>
        </div>
        <StatusBadge active={apr} />
      </div>
      {/* This row stays in review */}
      <div className="flex items-center gap-2 border-b border-ash-border px-3 py-3">
        <Image src={spainFlag} alt="ES" className="size-4 rounded-sm" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-midnight-ink">New ES number</p>
          <p className="text-xs text-driftwood">Awaiting approval</p>
        </div>
        <Badge variant="warning">In review</Badge>
      </div>
    </div>
  );
}

/** Card 3: a chat plays out as a real conversation, looping. */
function ChatMock({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  // phase 0 empty, 1 outgoing Hi, 2 read ticks, 3 reply
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce || !play) return;
    let t: ReturnType<typeof setTimeout>;
    const at = (fn: () => void, ms: number) => {
      t = setTimeout(fn, ms);
    };
    const p0 = () => {
      setPhase(0);
      at(p1, 800);
    };
    const p1 = () => {
      setPhase(1);
      at(p2, 600); // quick: Hi read soon after sending
    };
    const p2 = () => {
      setPhase(2);
      at(p3, 500); // quick: reply arrives right after
    };
    const p3 = () => {
      setPhase(3);
      at(p0, 5000); // long hold with both messages static
    };
    at(p0, 200);
    return () => clearTimeout(t);
  }, [reduce, play]);

  const p = reduce ? 3 : phase;
  const read = p >= 2;
  const showReply = p >= 3;

  return (
    <div className="flex flex-col gap-3 font-sans">
      {/* First message is always on screen so the card never goes empty between
          loops; only the read ticks and the reply cycle. */}
      <div className="max-w-[75%] self-end rounded-xl rounded-tr-sm bg-coral-muted/30 px-3 py-2">
        <p className="text-sm text-midnight-ink">Hi</p>
        <p className="flex items-center justify-end gap-1 text-[10px] text-driftwood">
          12.00
          <span className="relative inline-flex">
            <motion.span
              animate={{ opacity: read ? 0 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <CheckCheck className="size-3 text-driftwood" aria-hidden />
            </motion.span>
            <motion.span
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: read ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <CheckCheck className="size-3 text-sky-500" aria-hidden />
            </motion.span>
          </span>
        </p>
      </div>

      <motion.div
        className="mock-surface rounded-xl border border-ash-border p-3 shadow-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showReply ? 1 : 0, y: showReply ? 0 : 8 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="mb-2 border-l-2 border-coral pl-2">
          <p className="text-xs font-semibold text-coral">You</p>
          <p className="text-xs text-driftwood">Hi</p>
        </div>
        <p className="text-sm text-midnight-ink">Hello!</p>
        <p className="text-sm text-midnight-ink">
          This is a test message to try your flow.
        </p>
        <p className="mt-1 text-right text-[10px] text-driftwood">12.00</p>
      </motion.div>
    </div>
  );
}

const STEPS = [
  {
    n: 1,
    title: "Connect in one click",
    body: "Meta Embedded Signup creates the WABA and links your number. No Business Manager, no App Review.",
    Mock: NumberSelectorMock,
  },
  {
    n: 2,
    title: "Send your first message",
    body: "One POST request to send templates, media, or interactive messages. Webhooks deliver replies in a consistent format across all platforms.",
    Mock: NumberTableMock,
  },
  {
    n: 3,
    title: "Scale with broadcasts",
    body: "Bulk send to 100 recipients per request with per-user personalization. Schedule, track delivery and read receipts, cancel before send.",
    Mock: ChatMock,
  },
];

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [hovered, setHovered] = useState(false);
  const play = inView && !hovered;
  const { Mock } = step;

  return (
    <div
      ref={ref}
      className="flex flex-col gap-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-[320px] overflow-hidden rounded-xl border border-ash-border bg-parchment-white p-5">
        <div className="mock-surface mb-5 flex size-10 items-center justify-center rounded-2xl border border-ash-border font-mono text-lg font-bold text-driftwood">
          {step.n}
        </div>
        <Mock play={play} />
      </div>

      <h3 className="text-lg font-semibold text-midnight-ink">{step.title}</h3>
      <p className="text-base text-driftwood">{step.body}</p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section>
      <SectionHeading
        eyebrow="How it works"
        lead="From zero to first message"
        tail="in three steps"
      />

      <div className="grid grid-cols-1 gap-5 border-y border-ash-border rule-y p-6 md:grid-cols-3 lg:p-10">
        {STEPS.map((step) => (
          <StepCard key={step.n} step={step} />
        ))}
      </div>
    </section>
  );
}
