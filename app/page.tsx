import Link from "next/link";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Eyebrow, Heading } from "@/components/heading";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { getFeaturedProjects, getProfile } from "@/lib/content";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/jsonld";

export default async function HomePage() {
  const [profile, featuredProjects] = await Promise.all([getProfile(), getFeaturedProjects()]);

  return (
    <>
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
            <div className="space-y-6">
              <Eyebrow>Software engineer portfolio</Eyebrow>
              <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-[1.02] md:text-7xl">
                Architecting reliable systems and shipping products that stay fast under load.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">{profile.shortBio}</p>
              <div className="flex flex-wrap gap-3">
                <Button href="/projects">View projects</Button>
                <Button href="/contact" variant="secondary">
                  Start a conversation
                </Button>
              </div>
            </div>
            <aside className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                Quick profile
              </p>
              <div className="mt-5 space-y-5">
                <p className="text-2xl font-semibold">{profile.headline}</p>
                <p className="leading-7 text-[var(--muted)]">{profile.longBio}</p>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {profile.stats.map((stat) => (
                    <div key={stat.label} className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-white/70 p-4">
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Featured work</Eyebrow>
              <Heading>Selected systems and product delivery work.</Heading>
            </div>
            <Link href="/projects" className="focus-ring text-sm font-semibold text-[var(--accent-strong)]">
              Browse all projects
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="surface rounded-[var(--radius-lg)] border border-[var(--line)] p-8 md:p-10">
            <Eyebrow>Preferred engagement</Eyebrow>
            <Heading className="max-w-3xl">I work best on products that need technical clarity before they need more code.</Heading>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                "Architecture reviews and delivery planning for new systems.",
                "Backend and integration-heavy products that need reliable interfaces.",
                "Frontend experiences that must stay responsive across mobile and desktop.",
              ].map((item) => (
                <div key={item} className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-white/65 p-5 text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([buildPersonJsonLd(profile), buildWebsiteJsonLd()]),
        }}
      />
    </>
  );
}
