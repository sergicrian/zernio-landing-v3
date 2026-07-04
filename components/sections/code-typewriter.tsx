"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { CopyButton } from "@/components/sections/copy-button";

const CODE_TEXT = `{
  "platforms": ["whatsapp"],
  "accountId": "acc_abc123",
  "content": "Hello from Zernio!",
  "scheduledFor": "2025-01-15T19:00:00Z"
}`;

// Loop rhythm. The JSON types out char-by-char, holds fully written for HOLD_FULL_MS,
// then erases at a gentle, near-typing pace and pauses before repeating.
const TYPE_MS = 42; // per-char delay while writing
const ERASE_MS = 38; // per-char delay while deleting (gentle, near typing speed)
const HOLD_FULL_MS = 10_000; // dwell on the fully-written code
const HOLD_EMPTY_MS = 650; // brief blank pause before typing again

/**
 * Animated hero terminal. The code writes itself out, waits ~10s, then erases and
 * loops. A vertical caret sits at the end of the typed text and blinks continuously
 * (CSS `.terminal-caret`). The full code is rendered invisibly underneath to reserve
 * the panel's final height/width, so the layout never shifts as characters appear.
 *
 * Under prefers-reduced-motion the code is shown complete and the loop never runs.
 */
export function CodeTypewriter() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(CODE_TEXT.length);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    // Drive the char count through the four phases with self-scheduling timeouts.
    let n = 0;
    let dir: 1 | -1 = 1;

    const step = () => {
      n += dir;
      setCount(n);

      if (dir === 1 && n >= CODE_TEXT.length) {
        // Fully written: hold, then start erasing.
        dir = -1;
        timer = setTimeout(step, HOLD_FULL_MS);
        return;
      }
      if (dir === -1 && n <= 0) {
        // Fully erased: brief pause, then type again.
        dir = 1;
        timer = setTimeout(step, HOLD_EMPTY_MS);
        return;
      }
      timer = setTimeout(step, dir === 1 ? TYPE_MS : ERASE_MS);
    };

    timer = setTimeout(step, 600); // small beat before the first keystroke
    return () => clearTimeout(timer);
  }, [reduce]);

  const shown = CODE_TEXT.slice(0, count);

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-2xl text-left"
      style={{
        // Fill fades obsidian -> void, stroke fades smoke -> void, so the panel melts
        // into the canvas at the bottom. Double-background gradient-border technique.
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
        <span className="font-mono text-label-sm text-fog">POST /v1/posts</span>
        <CopyButton text={CODE_TEXT} className="ml-auto" />
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-label-sm leading-6">
        <div className="grid grid-cols-[auto_1fr] gap-x-5">
          <div className="select-none whitespace-pre text-right text-ash/60">
            {"1\n2\n3\n4\n5\n6"}
          </div>
          {/* Invisible full copy reserves the final box; the typed text overlays it. */}
          <div className="relative">
            <span aria-hidden className="invisible whitespace-pre">
              {CODE_TEXT}
            </span>
            <code className="absolute inset-0 whitespace-pre">
              {highlightJson(shown)}
              <span aria-hidden className="terminal-caret ml-px" />
            </code>
          </div>
        </div>
      </pre>
    </div>
  );
}

/**
 * Restrained JSON highlighting on the dark terminal, system tokens only: property keys
 * `mist`, string values `paper`, punctuation `ash`.
 */
function highlightJson(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /"(?:[^"\\]|\\.)*"(\s*:)?|[^"]+/g;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = re.exec(text)) !== null) {
    const tok = match[0];
    if (tok.startsWith('"')) {
      if (match[1]) {
        const key = tok.slice(0, tok.length - match[1].length);
        nodes.push(
          <span key={i++} className="text-mist">
            {key}
          </span>,
        );
        nodes.push(
          <span key={i++} className="text-ash">
            {match[1]}
          </span>,
        );
      } else {
        nodes.push(
          <span key={i++} className="text-paper">
            {tok}
          </span>,
        );
      }
    } else {
      nodes.push(
        <span key={i++} className="text-ash">
          {tok}
        </span>,
      );
    }
  }
  return nodes;
}
