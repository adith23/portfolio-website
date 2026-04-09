import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const baseClassName =
  "focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors";

export function Button({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const className = cn(
    baseClassName,
    variant === "primary"
      ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]"
      : "border border-[var(--line)] bg-white/70 text-[var(--foreground)] hover:bg-white",
  );

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
