import Link from "next/link";

import { Container } from "@/components/container";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="surface mx-auto max-w-2xl rounded-[var(--radius-lg)] border border-[var(--line)] p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">404</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl">Page not found</h1>
          <p className="mt-4 text-[var(--muted)]">
            The page may have moved, or the content was never published.
          </p>
          <Link
            href="/projects"
            className="focus-ring mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
          >
            View projects
          </Link>
        </div>
      </Container>
    </Section>
  );
}
