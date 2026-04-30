import Link from "next/link";

import { Container } from "@/components/container";
import { MobileNav } from "@/components/mobile-nav";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(249,245,237,0.76)] backdrop-blur-xl">
      <Container className="flex min-h-16 sm:min-h-20 items-center justify-between gap-6">
        <Link href="/" className="focus-ring font-[family-name:var(--font-display)] text-xl font-semibold">
          {siteConfig.shortName}
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </Container>
    </header>
  );
}
