import { Container } from "@/components/container";
import { Eyebrow, Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { getProfile } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "Background, engineering focus, and working style.",
  path: "/about",
});

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <Section>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-5 sm:p-8">
            <Eyebrow>Profile</Eyebrow>
            <Heading className="text-3xl">{profile.fullName}</Heading>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{profile.headline}</p>
            <dl className="mt-8 space-y-4">
              <div>
                <dt className="text-sm font-semibold text-[var(--foreground)]">Location</dt>
                <dd className="text-[var(--muted)]">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-[var(--foreground)]">Availability</dt>
                <dd className="text-[var(--muted)]">{profile.availabilityStatus}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-[var(--foreground)]">Contact</dt>
                <dd className="text-[var(--muted)]">{profile.contactEmail}</dd>
              </div>
            </dl>
          </aside>
          <div className="space-y-8">
            <div className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-5 sm:p-8">
              <Eyebrow>Approach</Eyebrow>
              <Heading className="text-3xl">Design for change, not just delivery.</Heading>
              <p className="mt-5 text-base leading-8 text-[var(--muted)]">{profile.longBio}</p>
            </div>
            <div className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-5 sm:p-8">
              <Eyebrow>Core strengths</Eyebrow>
              <div className="mt-5 flex flex-wrap gap-3">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
