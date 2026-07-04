import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/design-system/cn";

const badgeVariants = cva(
  // Full-radius pill, px-2.5 py-0.5, tag 14px text, set in Menlo Bold (font-mono +
  // the tag token's baked font-weight). Never wraps.
  "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-tag font-mono",
  {
    variants: {
      variant: {
        default: "bg-coral text-paper",
        soft: "bg-coral/10 text-coral",
        outline: "border border-graphite text-mist",
        secondary: "bg-burgundy text-paper",
        neutral: "bg-bone text-void",
        // Luminous status pairs, legible on the near-black canvas.
        success: "bg-emerald-500/10 text-emerald-300",
        info: "bg-sky-500/10 text-sky-300", // blue, never the brand coral
        warning: "bg-amber-500/10 text-amber-300",
        error: "bg-red-500/10 text-red-300",
        destructive: "bg-red-500/10 text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
