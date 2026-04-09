import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "focus-ring min-h-12 w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-white/80 px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--muted)]",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
