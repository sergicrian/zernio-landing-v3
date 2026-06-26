"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/libs/design-system/cn";

/**
 * Copy-to-clipboard button for the hero code panel. Same icon and placement as
 * before, but clickable: on success the icon swaps to a green check for ~2s.
 */
export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; leave the icon unchanged
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal",
        className,
      )}
    >
      {copied ? (
        <Check className="size-5 text-emerald-400" />
      ) : (
        <Copy className="size-5" />
      )}
    </button>
  );
}
