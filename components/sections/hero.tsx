"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/sections/copy-button";
import { WhatsappIconBrand } from "@/components/sections/whatsapp-icon-brand";

/**
 * Hero (Figma 4:582). Two grid columns: copy left, code panel right. On load the
 * elements enter in a light staggered cascade (icon -> heading -> subtitle ->
 * buttons -> terminal), and the JSON then types out in the terminal. The terminal
 * reserves its final height/width from the start so the typing never shifts the
 * layout. All entrance motion is disabled under prefers-reduced-motion.
 */
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const CODE_TEXT = `{
  "platforms": ["whatsapp"],
  "accountId": "acc_abc123",
  "content": "Hello from Zernio!",
  "scheduledFor": "2025-01-15T19:00:00Z"
}`;

export function Hero() {
  const reduce = useReducedMotion();

  // Entrance props for element at sequence index i (fade + small rise).
  const reveal = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.45, ease: EASE, delay: 0.05 + i * 0.09 },
        };

  return (
    <section className="flex flex-col items-center gap-10 px-6 pb-12 pt-6 text-center lg:px-10 lg:pb-16 lg:pt-8">
      <div className="flex flex-col items-center gap-5">
        <motion.div {...reveal(0)}>
          <WhatsappIconBrand />
        </motion.div>

        <motion.h1
          {...reveal(1)}
          className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-midnight-ink lg:text-5xl"
        >
          Ship WhatsApp integration in minutes, not months
        </motion.h1>

        <motion.p {...reveal(2)} className="max-w-xl text-base text-driftwood">
          One REST API for WhatsApp Business. No Meta app, no template maze, no
          silent webhook failures.
        </motion.p>
      </div>

      <motion.div
        {...reveal(3)}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex flex-wrap justify-center gap-2.5">
          <Button>Start for free</Button>
          <Button variant="outline">View API Docs</Button>
        </div>

        <p className="text-xs text-driftwood">
          No credit card required <span aria-hidden>•</span>{" "}
          <Button variant="link" className="h-auto p-0 text-xs">
            View WhatsApp API Reference
          </Button>
        </p>
      </motion.div>

      {/* Code panel, centered below the copy */}
      <motion.div {...reveal(4)} className="w-full max-w-3xl">
        <CodeBlock />
      </motion.div>
    </section>
  );
}

function CodeBlock() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  // Typewriter: reveal CODE_TEXT char by char after the terminal has entered.
  useEffect(() => {
    if (reduce) return;
    const startDelay = 800; // wait for the entrance cascade
    const typeMs = 1300; // slower, more deliberate typing
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      if (elapsed >= startDelay) {
        const p = Math.min(1, (elapsed - startDelay) / typeMs);
        setCount(Math.floor(p * CODE_TEXT.length));
        if (p >= 1) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Under reduced motion the code is shown complete, with no caret.
  const shown = reduce ? CODE_TEXT.length : count;
  const typing = shown < CODE_TEXT.length;

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[20px] border border-ash-border bg-parchment-white text-left text-midnight-ink shadow-[0_1px_2px_rgba(0,0,0,0.02),0_16px_40px_-20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 border-b border-ash-border p-4 sm:gap-5 sm:p-5">
        <span className="flex gap-2" aria-hidden>
          <span className="size-3 rounded-full bg-silver-mist" />
          <span className="size-3 rounded-full bg-silver-mist" />
          <span className="size-3 rounded-full bg-silver-mist" />
        </span>
        <span className="text-sm text-driftwood">POST /v1/posts</span>
        <CopyButton text={CODE_TEXT} className="ml-auto" />
      </div>

      <pre className="overflow-x-auto overflow-y-hidden p-4 font-mono text-xs leading-6 sm:p-5 sm:text-sm sm:leading-8">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-6">
          {/* Static line-number gutter */}
          <div className="select-none whitespace-pre text-right text-silver-mist">
            {"1\n2\n3\n4\n5\n6"}
          </div>

          {/* JSON: invisible full copy reserves height/width, typed text overlays */}
          <div className="relative">
            <span aria-hidden className="invisible whitespace-pre">
              {CODE_TEXT}
            </span>
            <code className="absolute inset-0 whitespace-pre">
              {highlightJson(CODE_TEXT.slice(0, shown))}
              {typing ? (
                <span className="ml-0.5 inline-block h-3 w-[2px] -translate-y-px bg-midnight-ink/60 align-middle" />
              ) : null}
            </code>
          </div>
        </div>
      </pre>
    </div>
  );
}

/** Colors JSON property keys (a quoted string before a colon) in coral. */
function highlightJson(text: string) {
  return text.split(/("[^"]*"\s*:)/g).map((part, i) => {
    const m = part.match(/^("[^"]*")(\s*:)$/);
    if (m) {
      return (
        <span key={i}>
          <span className="font-semibold text-coral">{m[1]}</span>
          {m[2]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
