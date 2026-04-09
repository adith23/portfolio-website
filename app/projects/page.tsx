import { Container } from "@/components/container";
import { Eyebrow, Heading } from "@/components/heading";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { getProjectsIndex } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Selected software engineering and system design work.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjectsIndex();

  return (
    <Section>
      <Container>
        <div className="mb-10 max-w-3xl">
          <Eyebrow>Projects</Eyebrow>
          <Heading>Case studies, product systems, and delivery work.</Heading>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Each project focuses on the engineering decisions behind the outcome, not just screenshots.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
