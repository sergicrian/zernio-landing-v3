import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/design-system/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-base ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-coral text-white hover:bg-coral/90",
        secondary: "bg-burgundy text-white hover:bg-burgundy/90",
        soft: "bg-coral/10 text-coral hover:bg-coral/15 font-mono",
        outline:
          "border border-ash-border bg-parchment-white text-midnight-ink hover:bg-warm-sand",
        ghost: "text-midnight-ink hover:bg-warm-sand",
        link: "text-coral underline-offset-4 hover:underline",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        // height / radius / padding-x / text from design.md Components table
        sm: "h-8 rounded-md px-3 text-xs", // 32px / 6px / 12px / 12px
        md: "h-10 rounded-lg px-4 text-sm", // 40px / 8px / 16px / 14px
        lg: "h-12 rounded-lg px-6 text-base", // 48px / 8px / 24px / 16px
        xl: "h-14 rounded-xl px-8 text-base", // 56px / 12px / 32px / 16px
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
