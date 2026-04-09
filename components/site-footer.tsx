import Link from "next/link";

import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-8">
      <Container className="flex flex-col gap-4 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>Built with Next.js, Sanity, and a static-first content architecture.</p>
        <div className="flex gap-4">
          <Link href={siteConfig.socialLinks.github} target="_blank" rel="noreferrer" className="focus-ring">
            GitHub
          </Link>
          <Link href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer" className="focus-ring">
            LinkedIn
          </Link>
          <Link href="/contact" className="focus-ring">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}
