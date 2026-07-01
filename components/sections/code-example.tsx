"use client";

import { useState } from "react";

import { CopyButton } from "@/components/sections/copy-button";
import { SectionHeading } from "@/components/sections/section-heading";

/**
 * Code example (Figma 30:1067). A warm-sand terminal whose "Step 1 / 2 / 3" tabs are
 * real buttons that swap the code shown. The code area has a fixed height with
 * internal scroll (x + y), so switching tabs never shifts the layout.
 *
 * Step 2 and Step 3 reuse Step 1 as placeholder content for now: drop the real
 * code into STEP_2 / STEP_3 below (string per step) and the tabs work unchanged.
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
  { label: "Step 1", code: STEP_1 },
  { label: "Step 2", code: STEP_2 },
  { label: "Step 3", code: STEP_3 },
];

/** Light, on-system highlight: comments muted, quoted strings in burgundy. */
function highlight(code: string) {
  return code.split("\n").map((line, i) => {
    if (line.trimStart().startsWith("//")) {
      return (
        <span key={i} className="text-driftwood">
          {line}
          {"\n"}
        </span>
      );
    }
    const parts = line.split(/('[^']*'|`[^`]*`)/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith("'") || part.startsWith("`") ? (
            <span key={j} className="text-code-string">
              {part}
            </span>
          ) : (
            <span key={j}>{part}</span>
          ),
        )}
        {"\n"}
      </span>
    );
  });
}

export function CodeExample() {
  const [active, setActive] = useState(0);

  return (
    <section>
      <SectionHeading
        eyebrow="Code example"
        lead="Send a broadcast in one file."
        tail="Create, add recipients, send. Three calls."
        stacked
      />

      {/* warm-sand frame around the white terminal */}
      <div className="border-t border-ash-border rule-t bg-warm-sand p-6 lg:p-10">
        <div className="overflow-hidden rounded-[20px] border border-ash-border bg-parchment-white text-midnight-ink">
          {/* Header: dots + tabs + copy */}
          <div className="flex items-center gap-4 border-b border-ash-border px-4 sm:px-5">
            <span className="hidden gap-2 sm:flex" aria-hidden>
              <span className="size-3 rounded-full bg-silver-mist" />
              <span className="size-3 rounded-full bg-silver-mist" />
              <span className="size-3 rounded-full bg-silver-mist" />
            </span>

            <div className="flex flex-1 items-center overflow-x-auto overflow-y-hidden">
              {STEPS.map((step, i) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={[
                    "-mb-px shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50",
                    active === i
                      ? "border-midnight-ink text-midnight-ink"
                      : "border-transparent text-driftwood hover:text-midnight-ink",
                  ].join(" ")}
                >
                  {step.label}
                </button>
              ))}
            </div>

            <CopyButton text={STEPS[active].code} className="ml-auto" />
          </div>

          {/* Code: fits the text height (no vertical scroll), horizontal scroll only */}
          <pre className="overflow-x-auto overflow-y-hidden p-4 font-mono text-sm leading-relaxed sm:p-5">
            <code className="whitespace-pre">{highlight(STEPS[active].code)}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
