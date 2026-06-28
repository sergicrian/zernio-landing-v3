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
    <section className="grid grid-cols-1 lg:h-[633px] lg:grid-cols-2">
      {/* Left: copy */}
      <div className="flex flex-col justify-center gap-10 px-6 py-6 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-5">
          <motion.div {...reveal(0)} className="w-fit">
            <WhatsappIconBrand />
          </motion.div>

          <motion.h1
            {...reveal(1)}
            className="text-4xl font-bold leading-tight tracking-tight text-charcoal lg:text-5xl"
          >
            Ship WhatsApp integration{" "}
            <span className="text-coral">in minutes, not months</span>
          </motion.h1>

          <motion.p {...reveal(2)} className="text-base text-charcoal-muted">
            One REST API for WhatsApp Business. No Meta app, no template maze, no
            silent webhook failures.
          </motion.p>
        </div>

        <motion.div {...reveal(3)} className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2.5">
            <Button>Start for free</Button>
            <Button variant="outline">View API Docs</Button>
          </div>

          <p className="text-xs text-charcoal-muted">
            No credit card required <span aria-hidden>•</span>{" "}
            <Button variant="link" className="h-auto p-0 text-xs">
              View WhatsApp API Reference
            </Button>
          </p>
        </motion.div>
      </div>

      {/* Right: code panel on a cream-muted fill (flush to the right rail) */}
      <div className="flex bg-cream-muted pl-6 pt-6 lg:pl-10 lg:pt-10">
        <motion.div {...reveal(4)} className="h-full w-full">
          <CodeBlock />
        </motion.div>
      </div>
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
    <div className="flex h-full w-full flex-col overflow-hidden rounded-tl-[20px] border border-white/10 bg-[#1a1a1a] text-white">
      <div className="flex items-center gap-3 border-b border-white/10 p-4 sm:gap-5 sm:p-5">
        <span className="flex gap-2" aria-hidden>
          <span className="size-3 rounded-full bg-white/20" />
          <span className="size-3 rounded-full bg-white/20" />
          <span className="size-3 rounded-full bg-white/20" />
        </span>
        <span className="text-sm text-white/50">POST /v1/posts</span>
        <CopyButton text={CODE_TEXT} className="ml-auto" />
      </div>

      <pre className="flex-1 overflow-x-auto p-4 text-xs leading-6 sm:p-5 sm:text-sm sm:leading-8">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-6">
          {/* Static line-number gutter */}
          <div className="select-none whitespace-pre text-right text-white/30">
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
                <span className="ml-0.5 inline-block h-3 w-[2px] -translate-y-px bg-white/60 align-middle" />
              ) : null}
            </code>
          </div>
        </div>
      </pre>
    </div>
  );
}

/** Colors JSON property keys (a quoted string before a colon) in coral-muted. */
function highlightJson(text: string) {
  return text.split(/("[^"]*"\s*:)/g).map((part, i) => {
    const m = part.match(/^("[^"]*")(\s*:)$/);
    if (m) {
      return (
        <span key={i}>
          <span className="font-bold text-coral-muted">{m[1]}</span>
          {m[2]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
