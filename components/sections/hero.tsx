import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/sections/copy-button";

import whatsappLogo from "@/public/whatsapp-logo.svg";

/**
 * Hero (Figma 4:582). Two grid columns: copy left, code panel right. The right
 * column carries a cream-muted fill with the dark code card inset flush to the
 * bottom-right rail. Stacks to one column on mobile/tablet (copy first, code
 * below); the code body scrolls horizontally and never overflows. See design.md
 * for tokens; the code panel stays dark to match the Zernio docs.
 */
export function Hero() {
  return (
    <section className="grid grid-cols-1 lg:h-[633px] lg:grid-cols-2">
      {/* Left: copy */}
      <div className="flex flex-col justify-center gap-10 px-6 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-5">
          <div className="flex size-16 items-center justify-center rounded-[20px] bg-brand-gradient">
            <Image src={whatsappLogo} alt="WhatsApp" className="h-8 w-auto" />
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-charcoal lg:text-5xl">
            Ship WhatsApp integration{" "}
            <span className="text-coral">in minutes, not months</span>
          </h1>

          <p className="text-base text-charcoal-muted">
            One REST API for WhatsApp Business. No Meta app, no template maze, no
            silent webhook failures.
          </p>
        </div>

        <div className="flex flex-col gap-5">
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
        </div>
      </div>

      {/* Right: code panel on a cream-muted fill (flush to the right rail) */}
      <div className="flex bg-cream-muted pl-6 pt-6 lg:pl-10 lg:pt-10">
        <CodeBlock />
      </div>
    </section>
  );
}

function CodeBlock() {
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
        <code className="grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-6">
          {CODE_LINES.map((line, i) => (
            <span key={i} className="contents">
              <span className="select-none text-right text-white/30">
                {i + 1}
              </span>
              <span>{line}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

const CODE_TEXT = `{
  "platforms": ["whatsapp"],
  "accountId": "acc_abc123",
  "content": "Hello from Zernio!",
  "scheduledFor": "2025-01-15T19:00:00Z"
}`;

const key = (s: string) => <span className="font-bold text-coral-muted">{s}</span>;

const CODE_LINES = [
  <>{"{"}</>,
  <>
    {"  "}
    {key('"platforms"')}: [&quot;whatsapp&quot;],
  </>,
  <>
    {"  "}
    {key('"accountId"')}: &quot;acc_abc123&quot;,
  </>,
  <>
    {"  "}
    {key('"content"')}: &quot;Hello from Zernio!&quot;,
  </>,
  <>
    {"  "}
    {key('"scheduledFor"')}: &quot;2025-01-15T19:00:00Z&quot;
  </>,
  <>{"}"}</>,
];
