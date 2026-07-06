import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/design-system/cn";

const buttonVariants = cva(
  // Labels are Geist Medium (font-medium), not mono. Focus ring is coral, offset over void.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-base ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-coral text-paper hover:bg-coral/80",
        // Gradient surface (smoke->carbon) with a smoke hairline. Hover flips to a
        // paper fill with void text and a soft white glow.
        secondary:
          "border border-smoke bg-linear-gradient text-paper transition-all hover:border-paper hover:bg-none hover:bg-paper hover:text-void hover:shadow-[0_0_16px_rgba(255,255,255,0.35)]",
        soft: "bg-coral/10 text-coral hover:bg-coral/15",
        outline:
          "border border-graphite bg-transparent text-bone hover:bg-obsidian hover:text-paper",
        ghost: "text-mist hover:bg-obsidian hover:text-paper",
        link: "text-coral underline-offset-4 hover:underline",
        destructive: "bg-red-500 text-paper hover:bg-red-600",
      },
      size: {
        // height / radius / padding-x / text from design.md Components table
        sm: "h-8 rounded-md px-3 text-tag", // 32px / 6px / 12px / 12px
        md: "h-10 rounded-lg px-4 text-label-lg", // 40px / 8px / 16px / 16px
        lg: "h-12 rounded-lg px-6 text-label-lg", // 48px / 8px / 24px / 16px
        xl: "h-14 rounded-xl px-8 text-label-lg", // 56px / 12px / 32px / 16px
        icon: "h-10 w-10 rounded-lg", // 40x40px / 8px
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
