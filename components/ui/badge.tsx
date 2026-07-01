import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/design-system/cn";

const badgeVariants = cva(
  // Full-radius pill, px-2.5 py-0.5, 12px text, set in Menlo (font-mono).
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-mono",
  {
    variants: {
      variant: {
        default: "bg-coral text-white",
        soft: "bg-coral/10 text-coral",
        outline: "border border-ash-border text-midnight-ink",
        secondary: "bg-burgundy text-white",
        neutral: "bg-midnight-ink text-parchment-white",
        success: "bg-emerald-100 text-emerald-700",
        info: "bg-sky-100 text-sky-700", // blue, never the brand coral
        warning: "bg-amber-100 text-amber-700",
        error: "bg-red-100 text-red-700",
        destructive: "bg-red-100 text-red-700",
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
