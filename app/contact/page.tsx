import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { Eyebrow, Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { getProfile } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Discuss projects, engineering roles, and architecture work.",
  path: "/contact",
});

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <Section>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <Eyebrow>Contact</Eyebrow>
            <Heading>Let&apos;s talk about the system before it becomes the bottleneck.</Heading>
            <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
              Reach out for product engineering, system architecture, platform reliability, or delivery planning work.
            </p>
            <div className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-4 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">Direct links</p>
              <div className="mt-4 flex flex-col gap-3 text-[var(--muted)]">
                <Link href={`mailto:${profile.contactEmail}`} className="focus-ring">
                  {profile.contactEmail}
                </Link>
                {profile.socialLinks.map((link) => (
                  <Link key={link.href} href={link.href} target="_blank" rel="noreferrer" className="focus-ring">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-4 sm:p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
