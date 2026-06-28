"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCheck, Hash, Plus } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";

import usFlag from "@/public/usflag.png";
import spainFlag from "@/public/spainflag.png";

/**
 * How it works (Figma 30:1065). Each card runs a subtle looping micro-demo of the
 * real product action (Resend style). Loops only run while the card is in view and
 * the cursor is NOT over it; under prefers-reduced-motion they show a static state.
 * Number badge on top, title + copy below; 3 across on desktop, stacked on mobile.
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

// Brand colors as concrete values for the card 1 color cross-fade (motion can't
// interpolate CSS vars). These mirror --coral / --cream-muted.
const CORAL = "#EB3514";
const CREAM_MUTED = "#D9D8D3";

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
    <div className="flex flex-col gap-2 rounded-xl bg-cream p-2 font-geist">
      <motion.div
        className="flex gap-3 rounded-lg border p-3 shadow-sm"
        initial={{ borderColor: CREAM_MUTED, backgroundColor: "#FFFFFF" }}
        animate={{
          borderColor: sel ? CORAL : CREAM_MUTED,
          backgroundColor: sel ? "rgba(235, 53, 20, 0.06)" : "#FFFFFF",
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-cream-muted text-charcoal">
          <Plus className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-charcoal">Get a number</span>
            <Badge variant="success">recommended</Badge>
          </div>
          <span className="text-xs text-charcoal-muted">
            From $2/mo. Pick a country, we handle setup.
          </span>
        </div>
      </motion.div>
      <div className="flex gap-3 rounded-lg p-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-cream-muted text-charcoal-muted">
          <Hash className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-charcoal">
            Use my own number
          </span>
          <span className="text-xs text-charcoal-muted">
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
    <div className="overflow-hidden rounded-xl border border-cream-muted bg-white font-geist">
      <p className="border-b border-cream-muted px-3 py-2 text-xs font-bold text-charcoal-muted">
        Number
      </p>
      <div className="flex items-center gap-2 border-b border-cream-muted px-3 py-3">
        <Image src={usFlag} alt="US" className="size-4 rounded-sm" />
        <span className="flex-1 text-sm text-charcoal">+1 2002 908 7457</span>
        <Badge variant="success">Active</Badge>
      </div>
      {/* This row gets approved on the loop */}
      <div className="flex items-center gap-2 border-b border-cream-muted px-3 py-3">
        <Image src={spainFlag} alt="ES" className="size-4 rounded-sm" />
        <div className="flex-1">
          <p className="text-sm font-bold text-charcoal">New ES number</p>
          <p className="text-xs text-charcoal-muted">Awaiting approval</p>
        </div>
        <StatusBadge active={apr} />
      </div>
      {/* This row stays in review */}
      <div className="flex items-center gap-2 border-b border-cream-muted px-3 py-3">
        <Image src={spainFlag} alt="ES" className="size-4 rounded-sm" />
        <div className="flex-1">
          <p className="text-sm font-bold text-charcoal">New ES number</p>
          <p className="text-xs text-charcoal-muted">Awaiting approval</p>
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
    <div className="flex flex-col gap-3 font-geist">
      {/* First message is always on screen so the card never goes empty between
          loops; only the read ticks and the reply cycle. */}
      <div className="max-w-[75%] self-end rounded-xl rounded-tr-sm bg-coral-muted/30 px-3 py-2">
        <p className="text-sm text-charcoal">Hi</p>
        <p className="flex items-center justify-end gap-1 text-[10px] text-charcoal-muted">
          12.00
          <span className="relative inline-flex">
            <motion.span
              animate={{ opacity: read ? 0 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <CheckCheck className="size-3 text-charcoal-muted" aria-hidden />
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
        className="rounded-xl border border-cream-muted bg-white p-3 shadow-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showReply ? 1 : 0, y: showReply ? 0 : 8 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="mb-2 border-l-2 border-coral pl-2">
          <p className="text-xs font-bold text-coral">You</p>
          <p className="text-xs text-charcoal-muted">Hi</p>
        </div>
        <p className="text-sm text-charcoal">Hello!</p>
        <p className="text-sm text-charcoal">
          This is a test message to try your flow.
        </p>
        <p className="mt-1 text-right text-[10px] text-charcoal-muted">12.00</p>
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
      <div className="h-[320px] overflow-hidden rounded-xl border border-cream-muted bg-cream p-5">
        <div className="mb-5 flex size-10 items-center justify-center rounded-2xl border border-cream-muted bg-cream text-lg font-bold text-charcoal">
          {step.n}
        </div>
        <Mock play={play} />
      </div>

      <h3 className="text-lg font-bold text-charcoal">{step.title}</h3>
      <p className="text-base text-charcoal-muted">{step.body}</p>
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

      <div className="grid grid-cols-1 gap-5 border-y border-cream-muted p-6 md:grid-cols-3 lg:p-10">
        {STEPS.map((step) => (
          <StepCard key={step.n} step={step} />
        ))}
      </div>
    </section>
  );
}
