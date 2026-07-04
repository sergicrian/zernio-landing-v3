import * as React from "react";

import { cn } from "@/libs/design-system/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // 40px height, 8px radius, graphite border, carbon surface, bone text.
          // On focus the border turns coral (no ring).
          "flex h-10 w-full rounded-lg border border-graphite bg-carbon px-3 py-2 text-label text-bone transition-colors duration-base ease-brand placeholder:text-fog focus-visible:border-coral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
