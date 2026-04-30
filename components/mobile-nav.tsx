"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="focus-ring rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      {open ? (
        <div
          id="mobile-nav"
          className="surface absolute inset-x-4 sm:inset-x-5 top-16 sm:top-20 z-50 rounded-[var(--radius-md)] border border-[var(--line)] p-4"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring rounded-[var(--radius-sm)] px-4 py-3 text-base font-medium",
                  pathname === item.href ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]" : "hover:bg-white",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
