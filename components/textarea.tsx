import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-40 w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-white/80 px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--muted)]",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
