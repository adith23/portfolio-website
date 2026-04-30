import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-[family-name:var(--font-display)] text-3xl sm:text-4xl leading-tight md:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
