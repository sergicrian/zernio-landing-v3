"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCheck, Hash, Plus } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { useScrollReveal } from "@/components/sections/hero-reveal";

import cardImage from "@/public/card-image.png";
import usFlag from "@/public/usflag.png";
import spainFlag from "@/public/spainflag.png";

/**
 * How it works (Figma 1:486), on the v3 dark system. An asymmetric grid: step 1
 * ("Connect in one click") is a full-width card that pairs a text column with a
 * connection-picker panel over the aurora beam (card-image.png, screen-blended);
 * steps 2 and 3 sit below as two equal cards, each with a product micro-UI on a
 * frosted panel over the graphite->void gradient and the step copy beneath. Cards
 * stack to a single column below `lg`, all full width.
 *
 * Each mock runs a subtle looping micro-demo of the real product action, on the
 * design-system tokens (no coral highlight): step 1 fills the recommended option,
 * step 2 approves the pending number, step 3 lands the incoming reply. Loops only
 * run while the mock is in view and the cursor is NOT over it; under
 * prefers-reduced-motion each mock shows its static resting state.
 *
 * Token mapping from the Figma variables: Coral/Paper/Mist/Fog/Carbon/Void/
 * Obsidian/Bone/Ash/Graphite map 1:1; Figma "Smoke" reads as our smoke hairline.
 * Card and mock strokes use the `.gradient-ring` smoke->void hairline.
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** Play loops only while the mock is in view and the cursor is not over it. */
function usePlay(amount = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  return {
    ref,
    reduce,
    play: inView && !hovered,
    hoverProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}

/** Rounded-square step marker: mono numeral in a smoke-hairline tile (no fill). */
function StepBadge({ n }: { n: number }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-smoke font-mono text-tag text-paper">
      {n}
    </div>
  );
}

/** Numbered heading row + body copy shared by every step. */
function StepText({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <StepBadge n={n} />
        <h3 className="text-label-lg font-medium text-paper">{title}</h3>
      </div>
      <p className="text-body text-fog">{body}</p>
    </div>
  );
}

/** White icon tile used inside the connection picker (dark glyph on paper). */
function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-paper text-void">
      {children}
    </div>
  );
}

/** Cross-fades the "In review" (warning) pill to "Active" (success) on `active`. */
function StatusBadge({ active }: { active: boolean }) {
  return (
    <div className="relative inline-flex">
      <motion.span
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <Badge variant="warning" className="text-label-xs! font-sans! font-medium!">
          In review
        </Badge>
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <Badge variant="success" className="text-label-xs! font-sans! font-medium!">
          Active
        </Badge>
      </motion.span>
    </div>
  );
}

/**
 * Step 1 mock: the "Get a number" picker. On a slow, asymmetric loop the
 * recommended option fills in (carbon surface + gradient hairline fade in) and
 * back out — the design-system equivalent of the old coral selection.
 */
function ConnectMock() {
  const { ref, reduce, play, hoverProps } = usePlay();
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

  const sel = reduce ? true : selected;

  return (
    <div
      ref={ref}
      {...hoverProps}
      className="gradient-ring flex w-full flex-col rounded-t-xl bg-carbon/80 p-4 backdrop-blur-2xl"
    >
      <div className="flex flex-col">
        {/* Recommended option: the carbon fill + hairline fade in on selection. */}
        <div className="relative flex gap-2.5 rounded-lg p-2">
          {/* `absolute!` beats `.gradient-ring`'s unlayered position:relative, so
              the fill stays an out-of-flow overlay (no gap, no reflow). */}
          <motion.div
            aria-hidden
            className="gradient-ring absolute! inset-0 rounded-lg bg-carbon"
            initial={false}
            animate={{ opacity: sel ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          <div className="relative flex gap-2.5">
            <IconTile>
              <Plus className="size-4" aria-hidden />
            </IconTile>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-paper">Get a number</span>
                <Badge variant="success" className="text-label-xs! font-sans! font-medium!">
                  recommended
                </Badge>
              </div>
              <span className="text-xs font-medium text-fog">
                From $2/mo. Pick a country, we handle setup.
              </span>
            </div>
          </div>
        </div>
        {/* Secondary option, flat. */}
        <div className="flex gap-2.5 p-2">
          <IconTile>
            <Hash className="size-4" aria-hidden />
          </IconTile>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-paper">
              Use my own number
            </span>
            <span className="text-xs font-medium text-fog">
              Bring your existing phone number. Requires verification during
              setup.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 2 mock: a numbers table. On a loop the pending ES row gets approved —
 * its badge cross-fades In review -> Active and the "Awaiting approval" caption
 * collapses, so the row matches the active US row above.
 */
function NumberTableMock() {
  const { ref, reduce, play, hoverProps } = usePlay();
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (reduce || !play) return;
    const id = setInterval(() => setApproved((a) => !a), 3200);
    return () => clearInterval(id);
  }, [reduce, play]);

  const apr = reduce ? false : approved;

  return (
    <div
      ref={ref}
      {...hoverProps}
      className="gradient-ring overflow-hidden rounded-tl-2xl bg-gradient-to-b from-graphite to-carbon"
    >
      <p className="border-b border-graphite p-4 text-xs font-semibold text-fog">
        Number
      </p>
      <div className="flex flex-col gap-2 py-2">
        <div className="flex items-center gap-2.5 px-4">
          <Image src={usFlag} alt="US" className="size-4 rounded-sm" />
          <span className="flex-1 text-xs font-semibold text-bone">
            +1 2002 908 7457
          </span>
          <Badge variant="success" className="text-label-xs! font-sans! font-medium!">
            Active
          </Badge>
        </div>
        <div className="flex items-center gap-2.5 px-4">
          <Image src={spainFlag} alt="ES" className="size-4 rounded-sm" />
          {/* Fixed height so the approval cross-fade never reflows the step copy
              below. Pending name+caption cross-fades to the approved number. */}
          <div className="relative h-9 flex-1">
            <motion.div
              className="absolute inset-0 flex flex-col justify-center"
              initial={false}
              animate={{ opacity: apr ? 0 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="text-xs font-semibold text-bone">New ES number</span>
              <span className="mt-1 text-xs font-semibold text-ash">
                Awaiting approval
              </span>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: apr ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="text-xs font-semibold text-bone">
                +34 683 38 38 44
              </span>
            </motion.div>
          </div>
          <StatusBadge active={apr} />
        </div>
      </div>
    </div>
  );
}

/**
 * Step 3 mock: an outgoing message is read (ticks cross-fade to blue) and the
 * incoming reply slides in, on a loop.
 */
function ChatMock() {
  const { ref, reduce, play, hoverProps } = usePlay();
  // 0: sent, 1: read (blue ticks), 2: reply arrived.
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce || !play) return;
    let t: ReturnType<typeof setTimeout>;
    const at = (fn: () => void, ms: number) => {
      t = setTimeout(fn, ms);
    };
    const p0 = () => {
      setPhase(0);
      at(p1, 900);
    };
    const p1 = () => {
      setPhase(1);
      at(p2, 700);
    };
    const p2 = () => {
      setPhase(2);
      at(p0, 4500);
    };
    at(p0, 300);
    return () => clearTimeout(t);
  }, [reduce, play]);

  const p = reduce ? 2 : phase;
  const read = p >= 1;
  const showReply = p >= 2;

  return (
    <div
      ref={ref}
      {...hoverProps}
      className="flex flex-col gap-3 px-5 pb-5 pt-2"
    >
      {/* Outgoing bubble: paper, blue read ticks, tail on the bottom-right. */}
      <div className="relative min-w-[92px] max-w-[75%] self-end rounded-2xl rounded-br-sm bg-paper px-3 pb-5 pt-2">
        <p className="text-sm leading-tight text-void">Hi</p>
        <span className="absolute bottom-1.5 right-3 flex items-center gap-1 text-label-xs text-void/45">
          12.00
          <span className="relative inline-flex size-4">
            <motion.span
              animate={{ opacity: read ? 0 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <CheckCheck className="size-4 text-void/45" aria-hidden />
            </motion.span>
            <motion.span
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: read ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <CheckCheck className="size-4 text-sky-500" aria-hidden />
            </motion.span>
          </span>
        </span>
        <span
          aria-hidden
          className="absolute -right-1.5 bottom-0 size-3 bg-paper [clip-path:polygon(0_0,0_100%,100%_100%)]"
        />
      </div>
      {/* Incoming reply: graphite bubble, tail on the bottom-left, slides in. */}
      <motion.div
        initial={false}
        animate={{ opacity: showReply ? 1 : 0, y: showReply ? 0 : 8 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-graphite px-3 pb-5 pt-2"
      >
        <p className="pr-10 text-sm leading-snug text-paper">
          Hello! This is a test message to try your flow.
        </p>
        <span className="absolute bottom-1.5 right-3 text-label-xs text-ash">
          12.00
        </span>
        <span
          aria-hidden
          className="absolute -left-1.5 bottom-0 size-3 bg-graphite [clip-path:polygon(100%_0,100%_100%,0_100%)]"
        />
      </motion.div>
    </div>
  );
}

/** Steps 2 and 3: mock on a frosted panel, step copy beneath. Reveals on scroll. */
function StepCard({
  n,
  title,
  body,
  revealStep,
  children,
}: {
  n: number;
  title: string;
  body: string;
  revealStep: number;
  children: React.ReactNode;
}) {
  const reveal = useScrollReveal(revealStep);
  return (
    <motion.div
      {...reveal}
      className="flex flex-col overflow-hidden rounded-xl bg-gradient-to-b from-obsidian to-void"
    >
      {/* rounded-t-xl on the frosted panel itself: a backdrop-filter child isn't
          clipped by the parent's rounded corners in Chromium, so it must round its
          own top corners to match the card. */}
      <div className="rounded-t-xl bg-carbon/60 pl-5 pt-5 backdrop-blur-2xl">
        {children}
      </div>
      <div className="p-5">
        <StepText n={n} title={title} body={body} />
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const headingReveal = useScrollReveal(0);
  const step1Reveal = useScrollReveal(0.5);

  return (
    <div id="how-it-works" className="scroll-mt-24 pt-12">
      <motion.div {...headingReveal}>
        <SectionHeading
          eyebrow="How it works"
          lead="From zero to first message"
          tail="in three steps"
        />
      </motion.div>

      <div className="flex flex-col gap-5 px-4 pb-12 lg:px-8">
        {/* Step 1: text column + connection picker over the aurora beam. */}
        <motion.div
          {...step1Reveal}
          className="relative flex flex-col items-stretch gap-5 overflow-hidden rounded-xl pt-4 lg:flex-row"
        >
          {/* Isolated group so the screen-blended beam composes against the
              graphite->void gradient rather than the page. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 isolate z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-obsidian to-void" />
            <Image
              src={cardImage}
              alt=""
              fill
              sizes="1080px"
              className="object-cover object-[right_28%] mix-blend-screen lg:object-right"
            />
          </div>
          <div className="relative z-10 flex flex-1 flex-col justify-start gap-5 px-5 pb-5 pt-3 lg:pb-3">
            <StepText
              n={1}
              title="Connect in one click"
              body="Meta Embedded Signup creates the WABA and links your number. No Business Manager, no App Review."
            />
          </div>
          <div className="relative z-10 flex flex-1 items-end px-5 lg:pl-5 lg:pr-5">
            <ConnectMock />
          </div>
        </motion.div>

        {/* Steps 2 and 3. */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <StepCard
            n={2}
            title="Send your first message"
            body="One POST request to send templates, media, or interactive messages. Webhooks deliver replies in a consistent format across all platforms."
            revealStep={1}
          >
            <NumberTableMock />
          </StepCard>
          <StepCard
            n={3}
            title="Scale with broadcasts"
            body="Bulk send to 100 recipients per request with per-user personalization. Schedule, track delivery and read receipts, cancel before send."
            revealStep={1.5}
          >
            <ChatMock />
          </StepCard>
        </div>
      </div>
    </div>
  );
}
